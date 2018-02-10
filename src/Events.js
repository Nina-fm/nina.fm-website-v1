import Vue from 'vue'
let Events = new Vue({
  methods: {
    isMobileDevice () {
      return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1)
    }
  }
})
export default Events
