<template>
  <div id="app" :class="status">
    <Screen :listeners="listeners" :night="nightMode" />
    <Player :url="streamUrl" :night="nightMode" :status="playerStatus" :message="playerMessage" @statusChange="toggleStatusClass" @toggle="toggleStatusClass"/>
    <Posts @toggle="toggleStatusClass" status-class="show-posts" :content="posts"/>
    <a id="night-toggle" class="btn" :title="nightModeMsg" @click="toggleNightMode">
      <i :class="{'nina-icon-brightness_2' : !nightMode, 'nina-icon-wb_sunny': nightMode}"></i>
    </a>
  </div>
</template>

<script>
import Screen from './components/Screen'
import Player from './components/Player'
import Posts from './components/Posts'
export default {
  name: 'App',
  components: { Screen, Player, Posts },
  data () {
    return {
      nightMode: false,
      status: ['loading'],
      listeners: null,
      playerMessage: '',
      nightModeMsg: 'Night mode'
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
    updateNightMode: function () {
      const hours = new Date().getHours()
      console.log(hours)
      const isDayTime = hours > 6 && hours < 19
      this.nightMode = !isDayTime
    },
    getListeners: function () {
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
    toggleNightMode: function () {
      this.nightMode = !this.nightMode
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
    this.getListeners()
  },
  updated: function () {
    this.disableTabindex()
    this.getListeners()
  },
  mounted: function () {
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
    z-index: 10;
    position:absolute;
    bottom: #{$margin-global*2 - 3};
    right: #{$margin-global*2 - 6};
    height: 15px;
    width: 20px;
    color:$color-info-text;
    #app.nightMode & {
      color: $night-color-info-text;
    }
    @include prefix(transition, $animation);
    @include respond-to(phone) {
      bottom: #{$margin-global-sm*2};
      right: #{$margin-global-sm*2};
    }
    i {
      position: absolute;
      left:50%;
      top:50%;
      @include prefix(transform, translate(-50%, -50%));
      font-size: 1.2em;
    }
  }
</style>
