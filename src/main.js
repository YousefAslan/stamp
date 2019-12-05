/*!

=========================================================
* Vue Argon Design System - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Argon from "./plugins/argon-kit";
// import popper from "popper.js";
// import jquary from "jquery";
import './registerServiceWorker';
import axiosApi from 'axios';
import BootstrapVue from 'bootstrap-vue'



Vue.config.productionTip = false;

Vue.use(BootstrapVue);
// Vue.use(jquary);
const axios = axiosApi.create({
  baseURL: `http://localhost`,
  // headers: { header: value }
});

//Use the window object to make it available globally.
window.axios = axios;
Vue.use(Argon);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
