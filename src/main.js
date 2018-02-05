// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueJsonp from 'vue-jsonp'
import axios from 'axios'
import config from './config.js'

Vue.prototype.$http = axios
Vue.prototype.$config = config
Vue.use(VueJsonp)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
