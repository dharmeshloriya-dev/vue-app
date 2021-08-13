import LoginService from '../../services/auth.service';
import TokenService from '../../services/token.service';
import AuthenticationError from '../../services/error.service';
import router from '../../router';

// initial state
const state = () => ({
	accessToken: TokenService.getToken(),
	authenticationSuccess: false,
	authenticationErrorCode: 0,
	authenticationError: ''
})
// getters
const getters = {
	loggedIn: (state) => {
		return state.accessToken ? true : false;
	},
	authenticationErrorCode: (state) => {
		return state.authenticationErrorCode;
	},
	authenticationError(state){
        return state.authenticationError
    }
}
// actions
const actions = {
	login: async ({commit}, user) => {
		try {
			const token = await LoginService.login(user);
			commit('loginSuccess', token);
			router.push(router.history.current.query.redirect || '/products');
			return true;
		} catch(e) {
			if (e instanceof AuthenticationError) {
				commit('loginFailed', {errorCode: e.errorCode, message: e.message});
				return false;
			}
		}
	},
	logout: async ({commit}) => {
		const token = LoginService.logout();
		commit('logoutSuccess', token);
		router.push('/login');
	}
}
// mutations
const mutations = {
	loginSuccess(state, token) {
		state.accessToken = token;
		state.authenticationSuccess = true
	},
	loginFailed(state, error) {
		state.authenticationErrorCode = error.errorCode;
		state.authenticationError = error.message;
	},
	logoutSuccess(state, token) {
		state.accessToken = token;
		state.authenticationSuccess = false
	}
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}