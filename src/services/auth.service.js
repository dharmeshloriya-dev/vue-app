import loginData from '../json/login';
import TokenService from './token.service';
import HashService from './hash.service';
import AuthenticationError from './error.service';

const LoginService = {
    login: async (user) => {
        if (user.email === loginData.email && user.password === loginData.password) {
            const token = await HashService.encrypt({'email': user.email, 'password': user.password});
            TokenService.setToken(token);
            alert('Login successfull!');
            return token;
        } else {
            throw new AuthenticationError('danger', 'Email and Password are not matched');
        }
    },
    logout: () => {
        TokenService.removeToken();
        alert('Logout successfull!');
    }
}

export default LoginService;