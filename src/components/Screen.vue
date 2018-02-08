<template>
  <div id="screen" :style="{ backgroundImage: 'url('+background+')' }">
    <Audience :count="listeners" />
    <Logo :src="logo" />
    <div id="mask" v-if="mask"><img :src="mask"></div>
    <div id="credits">{{credits}}</div>
  </div>
</template>

<script>
import Logo from './Logo'
import Audience from './Audience'
export default {
  name: 'Screen',
  props: ['listeners'],
  components: { Logo, Audience },
  data () {
    return {
      background: require('@/assets/images/background.jpg'),
      mask: require('@/assets/images/mask.png'),
      logo: require('@/assets/images/logo-stroke.svg'),
      credits: '© Photo:Bobin - Montage:120'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~$scss/base.scss";
  #screen {
    position: absolute;
    left: $body-margin;
    top: $body-margin;
    right: $body-margin;
    bottom: $body-margin;
    background-color: $color-main-bg;
    background-repeat: no-repeat;
    background-position: left center;
    -webkit-background-size: cover;
    background-size: cover;
    @include respond-to(phone) {
      left: $body-margin-sm;
      top: $body-margin-sm;
      right: $body-margin-sm;
      bottom: $body-margin-sm;
    }
    #mask {
      pointer-events: none;
      z-index: 1;
      position: absolute;
      left: -1px;
      top: -1px;
      right: -1px;
      bottom: -1px;
      overflow: hidden;
      img {
        position: absolute;
        bottom:0;
        left:0;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  #credits {
    z-index: 10;
    position: absolute;
    bottom: 0;
    left: 2px;
    font-size: 0.5em;
    font-weight: 500;
    letter-spacing: 0.11em;
    text-transform: uppercase;
    line-height: 1em;
    padding:0;
    color: $color-main-text;
    @include prefix(transition, $animation);
    @include respond-to(tablet) {
      font-size: 0.3em;
      #app.show-posts &,
      #app.show-details &{
        opacity: 0;
      }
    }
  }

</style>
