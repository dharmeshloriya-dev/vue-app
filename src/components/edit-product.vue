<template>
	<div class="edit-product">
		<b-overlay :show="loading">
			<h1 class="mt-4 mb-4">Edit Product </h1>
			<div class="text-right mb-3"><b-button to="/products" variant="secondary">Back</b-button></div>
			<b-form @submit.prevent="onSubmit()">
				<b-form-group id="product-input-group-1" label="Name:" label-for="name">
					<b-form-input
						id="name"
						v-model="product.name"
						type="text"
						name="name"
						v-validate.disabled="{ required: true }"
						:state="validateState('name')"
						placeholder="Product Name"
					></b-form-input>
					<b-form-invalid-feedback id="product-input-1-live-feedback">{{ veeErrors.first('name') }}</b-form-invalid-feedback>
				</b-form-group>
				<b-form-group id="product-input-group-2" label="Price:" label-for="price">
					<b-form-input
						id="price"
						v-model="product.price"
						type="text"
						name="price"
						v-validate.disabled="{ required: true }"
						:state="validateState('price')"
						placeholder="Product Price"
					></b-form-input>
					<b-form-invalid-feedback id="product-input-2-live-feedback">{{ veeErrors.first('price') }}</b-form-invalid-feedback>
				</b-form-group>
				<b-form-group id="product-input-group-3" label="Description:" label-for="description">
					<b-form-textarea
						id="description"
						v-model="product.description"
						type="textarea"
						name="description"
						v-validate.disabled="{ required: true }"
						:state="validateState('description')"
						placeholder="Product Description"
					></b-form-textarea>
					<b-form-invalid-feedback id="product-input-3-live-feedback">{{ veeErrors.first('description') }}</b-form-invalid-feedback>
				</b-form-group>
				<div class="text-right">
					<b-button type="submit" variant="primary">Update Product</b-button>
				</div>
			</b-form>
		</b-overlay>
	</div>
</template>
<script>
	import { mapActions } from 'vuex'
	export default {
		name: 'add-product',
		data() {
			return {
				product: {
                    name: '',
                    description: '',
                    price: ''
				},
				loading: false
			}
		},
		async mounted() {
			this.loading = true;
			this.product = await this.getProduct(this.$route.params.id);
			this.loading = false;
		},
		methods: {
            ...mapActions('products', ['getProduct', 'updateProduct']),
            validateState(ref) {
                if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
                    return !this.veeErrors.has(ref);
                }
                return null;
			},
			async onSubmit() {
				this.$validator.validateAll()
				if (this.product.name && this.product.price && this.product.description) {
					try {
						this.loading = true;
						await this.updateProduct(this.product);
						this.loading = false;
					} catch(e) {
						this.loading = false;
						this.$toasted.show(e.message, {type: 'error'});
					}
				}
			}
		}
	}
</script>
