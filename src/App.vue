<template>
  <div id="app" :class="status">
    <Screen :listeners="listeners" :night="nightMode" />
    <Player :url="streamUrl" :night="nightMode" :status="playerStatus" :message="playerMessage" @statusChange="toggleStatusClass" @toggle="toggleStatusClass"/>
    <Posts @toggle="toggleStatusClass" status-class="show-posts" :content="posts"/>
    <IconButton id="night-toggle" :size="11" :title="nightModeMsg" :active="nightMode" @click="toggleNightMode" icon-active="nina-icon-wb_sunny" icon-inactive="nina-icon-brightness_2"/>
    <IconButton id="fullscreen-toggle" :size="13" :title="fullscreenMsg" :active="fullscreen" @click="toggleFullScreen" icon-active="nina-icon-fullscreen_exit" icon-inactive="nina-icon-fullscreen"/>
  </div>
</template>

<script>
import Screen from './components/Screen'
import Player from './components/Player'
import Posts from './components/Posts'
import IconButton from './components/IconButton'
export default {
  name: 'App',
  components: { Screen, Player, Posts, IconButton },
  data () {
    return {
      fullscreen: false,
      nightMode: false,
      status: ['loading'],
      listeners: null,
      playerMessage: '',
      nightModeMsg: 'Mode nuit',
      fullscreenMsg: 'Mode plein écran'
    }
  },
  computed: {
    streamUrl () { return process.env.STREAM_URL },
    playerStatus () { return this.status.indexOf('show-posts') !== -1 },
    posts () { return require(`@/contents/posts.html`) }
  },
  watch: {
    nightMode: function (newVal) { this.toggleStatusClass(newVal, 'nightMode') }
  },
  methods: {
    updateNightMode () {
      const hours = new Date().getHours()
      const isDayTime = hours > 6 && hours < 19
      this.nightMode = !isDayTime
    },
    getListeners () {
      this.$jsonp(process.env.STREAM_API_OLD_URL, { callbackName: 'parseMusic' }).then(json => {
        let data = json[process.env.STREAM_MOUNT_POINT]
        this.listeners = parseInt(data.listeners)
      }, (error) => {
        console.log(error)
      })
    },
    toggleStatusClass: function (status, classname) {
      let exists = this.status.indexOf(classname) !== -1
      if (!status) {
        this.status = this.status.filter(item => { return classname !== item })
      } else {
        this.status = exists ? this.status : [...this.status, classname]
      }
    },
    toggleNightMode () {
      this.nightMode = !this.nightMode
    },
    toggleFullScreen () {
      this.$fullscreen.toggle(this.$el, {
        wrap: false,
        callback: fullscreen => { this.fullscreen = fullscreen }
      })
    },
    disableTabindex () {
      let links = document.querySelectorAll('a, [id]')
      for (let i = 0, j = links.length; i < j; i++) {
        links[i].setAttribute('tabindex', -1)
      }
    }
  },
  created () {
    this.disableTabindex()
    this.getListeners()
  },
  updated () {
    this.disableTabindex()
    this.getListeners()
  },
  mounted () {
    this.updateNightMode()
    // this.interval = setInterval(this.updateNightMode, 300000)
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
    color: $color-main-text;
  }
  #app {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    color: $color-main-text;
    background-color: $color-main-bg;
    &.nightMode {
      color: $night-color-main-text;
      background-color: $night-color-main-bg;
    }
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
    @include respond-to(phone) {
      top:  $margin-global-sm*3;
      left: $margin-global-sm*2;
      right: $margin-global-sm*2;
      margin-bottom: $margin-global-sm*2;
    }
    a {
      color: $color-info-text;
      #app.nightMode & {
        color: $night-color-info-text;
      }
    }
  }
  #night-toggle {
    bottom: #{$margin-global*3.5};
    right: #{$margin-global*2};
    @include respond-to(phone) {
      bottom: #{$margin-global*2.5 + $margin-global-sm};
      right: #{$margin-global + $margin-global-sm};
    }
  }
  #fullscreen-toggle {
    bottom: #{$margin-global*2};
    right: #{$margin-global*2};
    @include respond-to(phone) {
      bottom: #{$margin-global + $margin-global-sm};
      right: #{$margin-global + $margin-global-sm};
    }
  }
</style>
