<template>
	<div class="product-listing">
		<h1 class="mt-4 mb-4"> Products </h1>
		<div class="text-right mb-3"><b-button to="/products/add" variant="primary">Add Product</b-button></div>
		<b-overlay :show="loading">
			<b-table striped hover :items="products" :fields="fields">
				<template #cell(price)="data">
					{{ '$' + data.item.price }}
				</template>
				<template #cell(actions)="data">
					<b-link :to="`/products/edit/${data.item.id}`" class="mr-3" href="#"><b-icon icon="pencil-fill" variant="primary" font-scale="1"></b-icon></b-link>
					<b-link @click="removeProduct(data.item.id)" href="#"><b-icon icon="trash" variant="danger" font-scale="1"></b-icon></b-link>
				</template>
			</b-table>
		</b-overlay>
	</div>
</template>
<script>
	import { mapGetters, mapActions } from 'vuex'
	export default {
		data() {
			return {
				fields: ['name', 'description', 'price', 'actions'],
				loading: false
			}
		},
		async mounted() {
			try {
				this.loading = true;
				await this.getProducts();
				this.loading = false;
			} catch(e) {
				this.loading = false;
				this.$toasted.show(e.message, {type: 'error'});
			}
		},
		methods: {
			...mapActions('products', ['getProducts', 'deleteProduct']),
			removeProduct(id) {
				this.$confirm('Are you sure?', 'Confirm!').then( async () => {
					try {
						await this.deleteProduct(id)
					} catch(e) {
						this.$toasted.show(e.message, {type: 'error'});
					}
				});
			}
		},
		computed: {
			...mapGetters('products', ['products'])
		}
	}
</script>
