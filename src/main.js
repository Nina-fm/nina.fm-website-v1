// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueJsonp from 'vue-jsonp'
import axios from 'axios'
import VueProgress from 'vue-progress-path'

Vue.prototype.$http = axios
Vue.use(VueProgress)
Vue.use(VueJsonp)
Vue.config.productionTip = process.env.NODE_ENV === 'production'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
