import App from './App'
import Fullscreen from 'vue-fullscreen'
import Lightbox from 'vue-pure-lightbox'
import Vue from 'vue'
import VueAxios from 'vue-axios'
import VueHead from 'vue-head'
import VueJsonp from 'vue-jsonp'
import axios from 'axios'

Vue.use(VueHead)
Vue.use(Lightbox)
Vue.use(VueAxios, axios)
Vue.use(VueJsonp)
Vue.use(Fullscreen)

Vue.config.productionTip = process.env.NODE_ENV === 'production'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
