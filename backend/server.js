const express = require('express');
const session = require('express-session');
const axios = require('axios');
const dotenv = require('dotenv');
const querystring = require('querystring');
const crypto = require('crypto');
const cors = require('cors');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

dotenv.config();
const port = process.env.PORT
const app = express();
const endpoint_prefix = '/api';
const server_url = `http://localhost:3000${endpoint_prefix}`;
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}))
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());

// Firebase configuration
admin.initializeApp({
    credential: admin.credential.cert({
        type: process.env.gf_type,
        project_id: process.env.gf_project_id,
        private_key_id: process.env.gf_private_key_id,
        private_key: process.env.gf_private_key,
        client_email: process.env.gf_client_email,
        client_id: process.env.gf_client_id,
        auth_uri: process.env.gf_auth_uri,
        token_uri: process.env.gf_token_uri,
        auth_provider_x509_cert_url: process.env.gf_auth_provider_x509_cert_url,
        client_x509_cert_url: process.env.gf_client_x509_cert_url,
        universe_domain: process.env.gf_universe_domain,
    })
})
const db = admin.firestore();
const auth = admin.auth();

// LinkedIn OAuth configuration
const linkedInRedirectUri = `${server_url}/linkedin/callback`;
const linkedinClientId = process.env.LINKEDIN_CLIENT_ID;
const linkedinClientSecret = process.env.LINKEDIN_CLIENT_SECRET;

// Email configuration
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE_PROVIDER, // e.g., 'Gmail'
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

app.get(`${endpoint_prefix}/account`, (req, res) => {
    const userEmail = req.session.userData?.email;
    if (!userEmail) {
        return res.status(401).send('User not authenticated');
    }

    if (req.session.account) {
        return res.json(req.session.account);
    }

    db.collection('accounts').doc(userEmail).get()
        .then(doc => {
            if (doc.exists) {
                const response = { id: doc.id, ...doc.data() };
                req.session.account = response;
                res.json(response);
            } else {
                res.status(404).send('Account not found');
            }
        })
        .catch(error => {
            console.error('Error fetching account:', error);
            res.status(500).send('Error fetching account');
        });
})

app.get(`${endpoint_prefix}/employee`, (req, res) => {
    db.collection('employees').where('feature', '==', true)
        .get()
        .then(snapshot => {
            const featuredEmployees = snapshot.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            });
            res.json(featuredEmployees);
        })
});

app.get(`${endpoint_prefix}/myEmployees`, (req, res) => {
    const account = req.session.account;
    if (!account) {
        return res.status(401).send('No active account in session');
    }
    const employeesRef = db.collection('employees');
    if (account.admin) {
        var query = employeesRef;
    } else {
        var query = employeesRef.where('id', '==', account.id);
    }

    query.get()
        .then(snapshot => {
            const myEmployees = snapshot.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            });
            res.json(myEmployees);
        })
});

app.get(`${endpoint_prefix}/linkedin/auth`, (req, res) => {
    const state = crypto.randomBytes(16).toString('hex'); // Generate a random state
    const redirectUrl = req.query.redirect || 'http://localhost:5173/account'; // Fallback if not specified

    req.session.oauth_state = state; // Store state in session
    req.session.redirect_url = redirectUrl; // Store redirect URL in session

    const authorizationUrl = 'https://www.linkedin.com/oauth/v2/authorization';
    const params = querystring.stringify({
        response_type: 'code',
        client_id: linkedinClientId,
        redirect_uri: linkedInRedirectUri,
        scope: 'openid profile email',
        state: state,
    });
    res.redirect(`${authorizationUrl}?${params}`);
});

app.get(`${endpoint_prefix}/linkedin/callback`, async (req, res) => {
    const { code, state } = req.query;
    const storedState = req.session.oauth_state;

    // Verify the state parameter to protect against CSRF
    if (!state || state !== storedState) {
        console.error('Invalid state parameter');
        return res.status(400).send('Invalid state parameter');
    }

    if (!code) {
        console.error('No code provided');
        return res.status(400).send('No code provided');
    }

    try {
        const tokenResponse = await axios.post(
            'https://www.linkedin.com/oauth/v2/accessToken',
            querystring.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: linkedInRedirectUri,
                client_id: linkedinClientId,
                client_secret: linkedinClientSecret,
            }),
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }
        );

        const accessToken = tokenResponse.data.access_token;

        // Fetch User Data using Access Token
        const userInfoResponse = await axios.get('https://api.linkedin.com/v2/userinfo', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        const userData = userInfoResponse.data;
        req.session.userData = userData; // Store user data in session
        res.redirect(req.session.redirect_url || 'http://localhost:5173/account');
    } catch (error) {
        console.error('Error during LinkedIn OAuth:', error);
        res.status(500).send('Error during authentication');
    }
});

app.get(`${endpoint_prefix}/logout`, (req, res) => {
    req.session.userData = null;
    res.redirect('http://localhost:5173');
});

app.get(`${endpoint_prefix}/user`, (req, res) => {
    if (req.session.userData) {
        res.json(req.session.userData);
    } else {
        res.status(401).send('User not authenticated');
    }
});

app.post(`${endpoint_prefix}/contactForm`, (req, res) => {
    const { name, email, phone, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'parsamdaa@gmail.com', // Replace with your recipient email
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending message');
        } else {
            res.status(200).send('Message sent successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
