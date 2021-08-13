<template>
  <div class="login">
	<div class="login-form">
		<div v-if="authenticationError">
			<b-alert :variant="authenticationErrorCode" show>
				{{authenticationError}}
			</b-alert>
		</div>
		<b-form @submit.stop.prevent="onSubmit">
			<b-form-group id="input-group-1" label="Email address:" label-for="Email">
				<b-form-input
					id="email"
					v-model="form.email"
					type="text"
					name="email"
					v-validate="{ required: true, email: true }"
					:state="validateState('email')"
					placeholder="Enter email"
				></b-form-input>
				<b-form-invalid-feedback id="input-1-live-feedback">{{ veeErrors.first('email') }}</b-form-invalid-feedback>
			</b-form-group>
			<b-form-group id="input-group-2" label="Password:" label-for="password">
				<b-form-input
					id="password"
					v-model="form.password"
					name="password"
					type="password"
					v-validate="{ required: true }"
					:state="validateState('password')"
					placeholder="Enter password"
				></b-form-input>
				<b-form-invalid-feedback id="input-2-live-feedback">{{ veeErrors.first('password') }}</b-form-invalid-feedback>
			</b-form-group>
			<div class="text-right">
				<b-button type="submit" variant="primary">Sign in</b-button>
			</div>
		</b-form>
	</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	name: 'Login',
	data() {
		return {
			form: {
				email: '',
				password: ''
			}
		}
	},
	methods: {
		...mapActions('login', ['login']),
		onSubmit() {
			if (this.form.email && this.form.password) {
				this.login(this.form);
			}
		},
		validateState(ref) {
			if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
				return !this.veeErrors.has(ref);
			}
			return null;
		},
	},
	computed: {
		...mapGetters('login', ['authenticationErrorCode', 'authenticationError'])
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-form {
	text-align: left;
	width: 33.33%;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
</style>
