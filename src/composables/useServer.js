const server_url = 'http://localhost:3000/api'

export function useServer() {
    async function fetchMyEmployees() {
        return fetchServer('myEmployees')
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching my employee:', error)
            });
    }

    async function fetchAccount() {
        return fetchServer('account')
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching account:', error)
            });
    }

    async function fetchUser() {
        return fetchServer('user')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('userData', JSON.stringify(data))
                return data
            })
    }

    async function fetchEmployees() {
        return fetchServer('employee')
            .then(response => response.json())
    }

    function linkedInLogin() {
        window.location.href = `${server_url}/linkedin/auth`
    }

    function logout() {
        localStorage.removeItem('userData')
        window.location.href = `${server_url}/logout`
    }

    async function fetchServer(endpoint) {
        return await fetch(`${server_url}/${endpoint}`, {
            credentials: 'include',
        })
    }

    async function submitContactForm(data) {
        return fetch(`${server_url}/contactForm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    }

    return {
        fetchAccount,
        fetchUser,
        fetchEmployees,
        fetchMyEmployees,
        linkedInLogin,
        logout,
        submitContactForm,
    }
}