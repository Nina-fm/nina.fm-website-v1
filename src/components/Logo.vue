<template>
  <div id="logo"></div>
</template>

<script>
let cache = new Map()
export default {
  name: 'Logo',
  props: {
    src: {type: String, required: true}
  },
  async mounted () {
    if (!cache.has(this.src)) {
      try {
        cache.set(this.src, fetch(this.src).then(r => r.text()))
      } catch (e) {
        cache.delete(this.src)
      }
    }
    if (cache.has(this.src)) {
      this.$el.innerHTML = await cache.get(this.src)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~$scss/base.scss";

  @keyframes heartBeat {
    0% { width: 200px; }
    1% { width: 210px }
    4% { width: 200px; }
    5% { width: 200px; }
    7% { width: 210px }
    9% { width: 200px; }
    20% { width: 200px; }
    21% { width: 210px; }
    24% { width: 200px }
    25% { width: 200px; }
    27% { width: 210px }
    29% { width: 200px; }
  }
  #logo {
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
      svg {
        width: 200px;
        /*@include prefix(transition, $animation);*/
        /*@include prefix(animation, heartBeat 10s infinite);*/
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
