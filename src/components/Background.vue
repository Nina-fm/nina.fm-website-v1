<template>
  <div id="background" :style="{ backgroundImage: 'url('+url+')' }">
    <div id="mask"><img v-if="mask" :src="mask"></div>
    <div id="credits">{{credits}}</div>
  </div>
</template>

<script>
export default {
  name: 'Background',
  props: ['url', 'mask', 'credits']
}
</script>

<style lang="scss" scoped>
  @import "~$scss/base.scss";
  #background {
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
    #mask {
      z-index: 1;
      position: absolute;
      left: -1px;
      top: -1px;
      right: -1px;
      bottom: -1px;
      img {
        position: absolute;
        bottom:0;
        left:0;
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
