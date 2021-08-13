import Vue from 'vue'
import VeeValidate from 'vee-validate'
import Toasted from 'vue-toasted'
import store from './store'
import './plugins/bootstrap-vue'
import VueSimpleAlert from "vue-simple-alert"
import App from './App.vue'
import router from './router'

Vue.use(VueSimpleAlert)
Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: "veeFields",
  errorBagName: "veeErrors"
});
Vue.use(Toasted, {
  duration: 2000,
  position: 'top-right',
  fitToScreen: true,
  fullWidth: true
});
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
