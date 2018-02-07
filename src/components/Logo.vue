<template>
  <div id="logo">
    <img :src="src" />
  </div>
</template>

<script>
// let cache = new Map()
export default {
  name: 'Logo',
  props: {
    src: {type: String, required: true},
    listeners: {type: Number}
  }
  // async mounted () {
  //   if (!cache.has(this.src)) {
  //     try {
  //       cache.set(this.src, fetch(this.src).then(r => r.text()))
  //     } catch (e) {
  //       cache.delete(this.src)
  //     }
  //   }
  //   if (cache.has(this.src)) {
  //     this.$el.innerHTML = await cache.get(this.src)
  //   }
  // }
}
</script>

<style lang="scss" scoped>
  @import "~$scss/base.scss";
  #logo {
    padding-top: none;
    z-index: 1;
    position: absolute;
    top: 30%;
    left: 0;
    width: 100%;
    text-align: center;
    @include prefix(transform, translateY(-50%));
    @include prefix(transition, $animation);
    @include respond-to(small-height) {
      opacity: 0;
    }
    /deep/ {
      img,
      svg {
        pointer-events: auto;
        width: 200px;
      }
    }
    #app.show-posts & {
      width: 50% !important;
      @include respond-to(tablet) {
        top: 150px !important;
        width: 100% !important;
      }
    }
    #app.show-details & {
      width: 50% !important;
      left: 50% !important;
    }
    .logo {
      width: 40vw;
      max-width: 200px;
    }
  }
</style>
