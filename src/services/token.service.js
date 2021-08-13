const token_key = 'access_token';

const TokenService = {
    getToken: () => {
        return localStorage.getItem(token_key)
    },
    setToken: (token) => {
        localStorage.setItem(token_key, token);
    },
    removeToken: () => {
        localStorage.removeItem(token_key)
    }
}

export default TokenService;