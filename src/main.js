// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
// import Loading from 'vue-loading-overlay';
// import 'vue-loading-overlay/dist/vue-loading.min.css';
import goTop from 'vue-gotop';
import 'bootstrap';
import App from './App';
import router from './router';
import store from './store';
import jQuery from 'jquery'
window.jQuery = jQuery
window.$ = jQuery
// import jvectormap from '../static/jquery-jvectormap-1.2.2.min.js';
// import jvectormapWord from '../static/jquery-jvectormap-world-mill.js';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(Vuex);
// Vue.component('Loading', Loading);
Vue.use(goTop);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  },
  store,
  jQuery,
  // jvectormap,
  // jvectormapWord,
  components: { App },
  template: '<App/>',
});