import Vue from 'vue'
import App from './App.vue'
import {router} from './_helpers/router'
import {requestService} from './_helpers/base.service';
import {store} from './_modules'

requestService.setupClient(process.env.VUE_APP_BASE_URL);
const token = JSON.parse(localStorage.getItem('user') ? localStorage.getItem('user') : null);
requestService.setToken(token ? token.access_token : '');

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');