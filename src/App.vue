<template>
  <div id="app" :class="status">
    <Screen :url="screen.background" :mask="screen.mask" :credits="screen.credits"/>
    <Logo :color="screen.logoColor" :alt="screen.credits"/>
    <Player :url="streamUrl" :status="playerStatus" :message="screen.playerMessage" @statusChange="toggleStatusClass" @toggle="toggleStatusClass"/>
    <Posts @toggle="toggleStatusClass" status-class="show-posts" :content="posts"/>
  </div>
</template>

<script>
import Logo from './components/Logo'
import Screen from './components/Screen'
import Player from './components/Player'
import Posts from './components/Posts'

export default {
  name: 'App',
  components: { Logo, Screen, Player, Posts },
  data () {
    return {
      status: ['loading'],
      screen: {
        playerMessage: '',
        logoColor: 'white',
        background: require('@/assets/images/background.jpg'),
        mask: require('@/assets/images/mask.png'),
        credits: '© Photo:Bobin - Montage:120'
      }
    }
  },
  computed: {
    streamUrl () { return process.env.STREAM_URL },
    playerStatus () { return this.status.indexOf('show-posts') !== -1 },
    posts () { return require(`@/contents/posts.html`) }
  },
  methods: {
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
