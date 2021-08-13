import ProductService from '../../services/product.service';
import router from '../../router';

// initial state
const state = () => ({
    products: [],
    product: []
})
// getters
const getters = {
    products: (state) => {
        return state.products;
    },
    product: (state) => {
        return state.product;
    }
}
// actions
const actions = {
    getProducts: async ({commit}) => {
        const response = await ProductService.getProducts();
        commit('setProducts', response);
    },
    addProduct: async ({commit}, product) => {
        const response = await ProductService.addProduct(product);
        commit('addProduct', response);
        router.push('/products');
    },
    deleteProduct: async({commit}, id) => {
        const response = await ProductService.deleteProduct(id);
        commit('removeProduct', response);
    },
    getProduct: async({commit}, id) => {
        const response = await ProductService.getProduct(id);
        commit('getProduct', response);
        return response;
    },
    updateProduct: async ({commit}, product) => {
        const response = await ProductService.updateProduct(product);
        commit('updateProduct', response);
        router.push('/products');
    },
}
// mutations
const mutations = {
    setProducts: (state, products) => {
        state.products = products;
    },
    addProduct: (state, response) => {
        state.products.push(response);
    },
    removeProduct: (state, response) => {
        state.products.pop(response)
    },
    getProduct: (state, response) => {
        state.product = response;
    },
    updateProduct: (state, response) => {
        state.products = state.products.map((product) => {
            if (product.id === response.id) {
                product = response;
            }
            return product;
        });
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}