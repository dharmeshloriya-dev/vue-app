import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import TokenService from '../services/token.service'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Default',
		component: Login,
		meta: {
			public: true,  // Allow access to guest user.
			onlyWhenLoggedOut: true
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		meta: {
			public: true,  // Allow access to guest user.
			onlyWhenLoggedOut: true
		}
	},
	{
		path: '/products',
		component: () => import('../views/Products.vue'),
		children: [
			{
				path: 'add',
				component: () => import('../components/add-product.vue')
			},
			{
				path: 'edit/:id',
				component: () => import('../components/edit-product.vue')
			},
			{
				path: '',
				component: () => import('../components/product-listing.vue')
			}
		],
		meta: {
			public: false
		},
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	const isPublic = to.matched.some(record => record.meta.public)
	const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)
	const loggedIn = !!TokenService.getToken();

	if (!isPublic && !loggedIn) {
		return next({
		path:'/login',
		query: {redirect: to.fullPath}  // Store the full path to redirect the user to after login
		});
	}

	// Do not allow user to visit login page or register page if they are logged in
	if (loggedIn && onlyWhenLoggedOut) {
		return next('/products')
	}

	next();
})

export default router
