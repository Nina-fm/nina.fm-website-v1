<template>
  <div id="logo">
    <img :src="logo" class="logo" :alt="alt">
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: ['color', 'alt'],
  computed: {
    logo () {
      return require('../assets/images/logo' + (this.color ? '-' + this.color : '-white') + '.svg')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~$scss/base.scss";

  #logo {
    z-index: 1;
    position: absolute;
    top: 30%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    text-align: center;
    transition: $animation;

    @include respond-to(small-height) {
      opacity:0;
    }

    #app.show-posts & {
      width: 50% !important;

      @include respond-to(tablet) {
        top: 150px !important;
        width: 100% !important;
      }
    }

    #app.show-track & {
      width: 50% !important;
      left: 50% !important;
    }

    .logo {
      width: 40vw;
      max-width: 200px;
    }
  }
</style>
