<template>
  <div id="screen">
    <div
      v-if="!night"
      :style="{
        backgroundImage: `url(${muted ? background : animatedBackground})`
      }"
      class="background"
    ></div>
    <div
      v-else
      :style="{
        backgroundImage: `url(${
          muted ? backgroundNight : animatedBackgroundNight
        })`
      }"
      class="background"
    ></div>
    <Audience :count="listeners" />
    <Logo :src="logo" />
    <div id="mask">
      <img v-show="!night" :src="mask" />
      <img v-show="night" :src="maskNight" />
    </div>
    <div id="credits">{{ credits }}</div>
  </div>
</template>

<script>
import Logo from './Logo'
import Audience from './Audience'

export default {
  name: 'Screen',
  components: { Logo, Audience },
  props: {
    listeners: { type: Number, default: 0 },
    night: { type: Boolean, default: false },
    muted: { type: Boolean, default: true }
  },
  data() {
    return {
      logo: require('@/assets/images/logo-stroke.svg'),
      mask: require('@/assets/images/mask.png'),
      maskNight: require('@/assets/images/mask-night.png'),
      background: require('@/assets/images/background.jpg'),
      backgroundNight: require('@/assets/images/background-night.jpg'),
      animatedBackground: require('@/assets/images/animated-background.gif'),
      animatedBackgroundNight: require('@/assets/images/animated-background-night.gif'),
      credits: '© Photo:Bobin - Montage:120'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~$scss/base.scss';
#screen {
  position: absolute;
  left: $body-margin;
  top: $body-margin;
  right: $body-margin;
  bottom: $body-margin;
  @include respond-to(phone) {
    left: $body-margin-sm;
    top: $body-margin-sm;
    right: $body-margin-sm;
    bottom: $body-margin-sm;
  }
  .background {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: left center;
    -webkit-background-size: cover;
    background-size: cover;
  }
  #mask {
    pointer-events: none;
    position: absolute;
    left: -1px;
    top: -1px;
    right: -1px;
    bottom: -1px;
    overflow: hidden;
    img {
      position: absolute;
      bottom: 0;
      left: 0;
      max-width: 100%;
      max-height: 100%;
    }
  }
}
#credits {
  z-index: 0;
  position: absolute;
  bottom: 0;
  left: 2px;
  font-size: 0.5em;
  font-weight: 500;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  line-height: 1em;
  padding: 0;
  color: $color-main-text;
  #app.nightMode & {
    color: $night-color-main-text;
  }
  @include prefix(transition, $animation-nobg);
  @include respond-to(tablet) {
    font-size: 0.3em;
    #app.show-posts &,
    #app.show-details & {
      opacity: 0;
    }
  }
}
</style>
