<template>
  <div id="app" :class="status">
    <Background :url="settings.background" :mask="mask" :credits="settings.credits"/>
    <Logo :color="settings.logoColor" :alt="settings.credits"/>
    <Player :url="streamURL" :status="playerStatus" :message="settings.playerMessage" @statusChange="toggleStatusClass" @toggle="toggleStatusClass"/>
    <Posts @toggle="toggleStatusClass" status-class="show-posts" :edito="settings.edito"/>
  </div>
</template>

<script>
import config from './config.js'
import Logo from './components/Logo'
import Background from './components/Background'
import Player from './components/Player'
import Posts from './components/Posts'

export default {
  name: 'App',
  components: { Logo, Background, Player, Posts },
  data () {
    return {
      status: ['loading'],
      settings: config.defaultSettings
    }
  },
  computed: {
    api () { return config[config.api] },
    streamURL () { return config.audio.streamUrl },
    mask () { return require('./assets/images/mask.png') },
    playerStatus () {
      return this.status.indexOf('show-posts') !== -1
    }
  },
  methods: {
    fetchSettings: function () {
      this.$http.get(this.api.apiURL('/tables/settings/rows')).then((response) => {
        let data = response.data.data
        data.map(item => { this.settings[item.key] = item.value })
      }, (error) => {
        console.log(error)
      })
      setTimeout(this.fetchSettings, this.api.refreshTime)
    },
    toggleStatusClass: function (status, classname) {
      let exists = this.status.indexOf(classname) !== -1
      if (!status) {
        this.status = this.status.filter(item => { return classname !== item })
      } else {
        this.status = exists ? this.status : [...this.status, classname]
      }
    },
    disableTabindex: function () {
      let links = document.querySelectorAll('a, [id]')
      for (let i = 0, j = links.length; i < j; i++) {
        links[i].setAttribute('tabindex', -1)
      }
    }
  },
  created: function () {
    this.disableTabindex()
  },
  updated: function () {
    this.disableTabindex()
  },
  mounted: function () {
    this.fetchSettings()
  }
}
</script>

<style lang="scss">
  @import "~$scss/base.scss";
  * {
    box-sizing: border-box;
  }
  :focus {
    outline: none !important;
  }
  html {
    /* Adjust font size */
    font-size: 100%;
    -webkit-text-size-adjust: 100%;
    /* Font varient */
    font-variant-ligatures: none;
    -webkit-font-variant-ligatures: none;
    /* Smoothing */
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    font-smoothing: antialiased;
    -webkit-font-smoothing: antialiased;
    text-shadow: rgba(0, 0, 0, .01) 0 0 1px;
  }
  html, body {
    font-size: $font-size;
    font-family: $font-family;
    line-height: $line-height;
    color: $color-main-text;
    width: 100%;
    height: 100%;
    min-height: 100%;
    padding: 0px;
    margin: 0px;
    overflow: hidden;
  }
  body {
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    overflow: hidden;
  }
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    margin: 0 0 0.4em 0;
    line-height: 1em;
  }
  .heading {
    font-family: $font-condensed;
    font-weight: 300;
    margin-bottom: 2em;
    text-align: center;
  }
  .centered {
    text-align: center;
  }
  .spacer {
    display: inline;
    width:0;
    margin: 0 0 0 #{$margin-global - 6};
  }
  .spacer-half {
    display: inline;
    width:0;
    margin: 0 0 0 1em;
  }
  p {
    margin: 0 0 1em 0;
  }
  p:last-child {
    margin: 0;
  }
  .btn {
    cursor:pointer;
    text-decoration: none;
  }
  .container{
    position: absolute;
    top:  $margin-global*3;
    left: $margin-global*2;
    right: $margin-global*2;
    margin-bottom: $margin-global*2;
    color: $color-info-text;
    a {
      color: $color-info-text;
    }
  }
</style>