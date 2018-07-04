<template>
  <div id="app" :class="status" @click="play">
    <Screen :listeners="listeners" :night="nightMode" />
    <Player :url="streamUrl" :night="nightMode" :status="playerStatus" :autoplay="playerAutoplay" :message="playerMessage" @statusChange="toggleStatusClass" @toggle="toggleStatusClass"/>
    <Posts @toggle="toggleStatusClass" status-class="show-posts" :content="posts"/>
    <IconButton id="night-toggle" :size="11" :infoText="nightModeMsg" :circle="true" :active="nightMode" @click="toggleNightMode" icon-active="nina-icon-wb_sunny" icon-inactive="nina-icon-brightness_2"/>
    <IconButton id="fullscreen-toggle" :size="13" :infoText="fullscreenMsg" :circle="true" :active="fullscreen" @click="toggleFullScreen" icon-active="nina-icon-fullscreen_exit" icon-inactive="nina-icon-fullscreen"/>
    <div class="maintenance-overlay" v-if="maintenanceOn">
      <div class="content" v-html="maintenanceContent"></div>
    </div>
  </div>
</template>

<script>
import Screen from './components/Screen'
import Player from './components/Player'
import Posts from './components/Posts'
import IconButton from './components/IconButton'
import Events from './Events'

export default {
  name: 'App',
  components: { Screen, Player, Posts, IconButton },
  data () {
    return {
      initialized: false,
      fullscreen: false,
      nightMode: false,
      status: ['loading'],
      listeners: null,
      playerMessage: '',
      nightModeMsg: 'Mode nuit',
      fullscreenMsg: 'Plein écran'
    }
  },
  computed: {
    maintenanceOn () { return process.env.MAINTENANCE },
    maintenanceContent () { return require(`@/contents/maintenance.html`) },
    streamUrl () { return process.env.STREAM_URL },
    playerStatus () { return this.status.indexOf('loading') === -1 },
    playerAutoplay () { return this.status.indexOf('no-autoplay') === -1 },
    posts () { return require(`@/contents/posts.html`) }
  },
  watch: {
    nightMode (newVal) { this.toggleStatusClass(newVal, 'nightMode') }
  },
  methods: {
    play () {
      if (!this.initialized && this.noAutoplay()) {
        this.initialized = true
        Events.$emit('play')
        this.toggleStatusClass(false, 'no-autoplay')
      }
    },
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
    toggleStatusClass (status, classname) {
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
    },
    noAutoplay () {
      return (this.isSafari() || this.isMobile())
    },
    isSafari () {
      return !!navigator.userAgent.match(/Version\/[\d.]+.*Safari/)
    },
    isMobile () {
      return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1)
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
    if (this.noAutoplay()) {
      this.status.push('no-autoplay')
    }
    this.updateNightMode()
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
    &.no-autoplay {
      &:after {
        pointer-events: none;
        content: "\e039";
        font-family: 'nina-icons' !important;
        speak: none;
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        font-size: 50vmin;
        color: $color-main-text;
        opacity: 0.5;
        z-index: 0;
        position: absolute;
        left: 50%;
        top: 50%;
        @include prefix(transform, translate(-50%, -50%));
        /* Better Font Rendering =========== */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      &.nightMode:after {
        color: $night-color-main-text;
      }
    }
  }
  .maintenance-overlay {
    z-index: 1000000;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(#000000, 0.9);
    color: white;

    .content {
      font-size: 1.3em;
      line-height: 1.3em;
      width: 500px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }
  }
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    margin: 0 0 0.4em 0;
    line-height: 1em;
  }
  .lightbox {
    z-index: 1000 !important;
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
  .spaced {
    letter-spacing: 0.1em !important;
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
    bottom: #{$margin-global*3.7};
    right: #{$margin-global*1.5};
    @include respond-to(phone) {
      bottom: #{$margin-global*2.5 + $margin-global-sm};
      right: #{$margin-global-sm*2};
    }
  }
  #fullscreen-toggle {
    bottom: #{$margin-global*1.7};
    right: #{$margin-global*1.5};
    @include respond-to(phone) {
      bottom: #{$margin-global-sm*2};
      right: #{$margin-global-sm*2};
    }
  }
</style>
