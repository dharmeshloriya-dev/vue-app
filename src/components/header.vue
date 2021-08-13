<template>
    <div>
		<b-navbar toggleable="lg" type="dark" variant="info">
			<b-navbar-brand class="mr-5" href="#">Vue-App</b-navbar-brand>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<b-nav-item to="/products">Products</b-nav-item>
				</b-navbar-nav>

				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto">
					<b-nav-item right>
						<b-nav-item href="#" @click="signOut()">Logout</b-nav-item>
					</b-nav-item>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>
<script>
	import { mapActions } from 'vuex';
	export default {
		methods: {
			...mapActions('login', ['logout']),
			signOut() {
				this.logout();
			}
		}
	}
</script>