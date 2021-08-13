import axios from 'axios';

const ProcutsService = {
    getProducts: async () => {
        let products = [];
        await axios.get('http://localhost:3001/products')
        .then((res) => {
            products = res.data;
        })
        .catch((error) => {
            if (error) {
                throw new Error('Products not found.');
            }
        });
        return products;
    },
    addProduct: async (product) => {
        let newProduct = {};
        await axios.post('http://localhost:3001/products', product)
        .then((res) => {
            newProduct = res.data;
        })
        .catch((error) =>  {
            if (error) {
                throw new Error('Add product failed.');
            }
        });
        return newProduct;
    },
    deleteProduct: async (id) => {
        let newProduct = {};
        await axios.delete(`http://localhost:3001/products/${id}`)
        .then((res) => {
            newProduct = res.data;
        })
        .catch((error) =>  {
            if (error) {
                throw new Error('Product not deleted successfully.');
            }
        });
        return newProduct;
    },
    getProduct: async (id) => {
        let newProduct = {};
        await axios.get(`http://localhost:3001/products/${id}`)
        .then((res) => {
            newProduct = res.data;
        })
        .catch((error) =>  {
            if (error) {
                throw new Error('Product not found.');
            }
        });
        return newProduct;
    },
    updateProduct: async (data) => {
        let product = {};
        await axios.put(`http://localhost:3001/products/${data.id}`, data)
        .then((res) => {
            product = res.data;
        })
        .catch((error) =>  {
            if (error) {
                throw new Error('Product not updated.');
            }
        });
        return product;
    }
}

export default ProcutsService;