<template>
  <div id="app">
    <Background :url="background" :mask="mask" :credits="credits" />
    <Logo :color="logoColor" :alt="credits" />
  </div>
</template>

<script>
import axios from 'axios'
import Logo from './components/Logo'
import Background from './components/Background'

export default {
  name: 'App',
  components: { Logo, Background },
  data () {
    return {
      cockpitAPI: 'http://ninacockpit.fugu.fr/',
      cockpitToken: '66294d50dc455e33b8f6fb5a9ef4d6',
      interval: null,
      settings: {
        background: { path: '' },
        credits: '',
        logoColor: 'white',
      }
    }
  },
  computed: {
    mask () {
      return require('./assets/mask.png')
    },
    credits () {
      return this.settings.credits
    },
    logoColor() {
      return this.settings.logoColor
    },
    background () {
      return this.cockpit(this.settings.background.path)
    }
  },
  methods: {
    cockpit: function (route, tokenize) {
      let url = route ? this.cockpitAPI + route : ''
      url += route && tokenize ? '?token=' + this.cockpitToken : ''
      return url
    },
    fetchSettings: function () {
      axios.get(this.cockpit('api/regions/data/display', true)).then((response) => {
        this.settings = response.data
      }, (error) => {
        console.log(error)
      })
    }
  },
  mounted: function () {
    this.fetchSettings()
    this.interval = setInterval(function () {
      this.fetchSettings()
    }.bind(this), 5000)
  },
  beforeDestroy: function () {
    clearInterval(this.interval)
  }
}
</script>

<style>
  @import './assets/styles.css';
</style>
