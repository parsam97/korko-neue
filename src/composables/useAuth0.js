// import { useServer } from '@/composables/useServer'
import { useAuth0 } from '@auth0/auth0-vue';

export function useOAuth0() {
    const {
        isAuthenticated,
        user,
        loginWithRedirect,
        logout: auth0Logout,
        getAccessTokenSilently
    } = useAuth0();

    // const { fetchLinkedInToken } = useServer()

    const params = {
        audience: 'linkedin-consumer-api',
        scope: 'openid profile email r_liteprofile r_basicprofile',
        prompt: 'consent',
    }

    function login() {
        loginWithRedirect(params);
    }

    function logout() {
        auth0Logout({ returnTo: window.location.origin });
    }

    async function getToken() {
        return await getAccessTokenSilently(params);
    }

    return { isAuthenticated, user, login, logout, getToken };
}