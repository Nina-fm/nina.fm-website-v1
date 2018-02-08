<template>
  <div id="logo"></div>
</template>

<script>
let cache = new Map()
export default {
  name: 'Logo',
  props: {
    src: {type: String, required: true},
    listeners: {type: Number}
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
        @include respond-to(phone) {
          width: 150px;
        }
      }
      svg {
        $stroke-color: #FFF;
        $main-word-stroke-w: 6.4px;
        $sub-word-stroke-w: 2.5px;
        $delay-before: 2s;
        $anim-out: tothin 3s 7s linear;
        .line {
          fill:none;
          stroke:$stroke-color;
          stroke-linecap:round;
          stroke-linejoin: round;
          stroke-dasharray: 1000 1000;
          stroke-dashoffset: 1000;
          stroke-width: 1px;
          transition: all 3s ease-out;
        }
        .letter-n { animation: dash 1.8s #{$delay-before+0ms} linear forwards; stroke-width:$main-word-stroke-w; }
        .letter-i { animation: dash 2.2s #{$delay-before+400ms} linear forwards; stroke-width:$main-word-stroke-w; }
        .letter-i-dot { animation: dash 1s #{$delay-before+600ms} linear forwards; stroke-width:$main-word-stroke-w*1.25; }
        .letter-n2 { animation: dash 1.8s #{$delay-before+800ms} linear forwards; stroke-width:$main-word-stroke-w; }
        .letter-a { animation: dash 1.8s #{$delay-before+1200ms} linear forwards; stroke-width:$main-word-stroke-w; }
        .letter-a-bar { animation: dash 1.5s #{$delay-before+1400ms} linear forwards; stroke-width:$main-word-stroke-w; }
        .dot-fm { animation: dash 1.8s #{$delay-before+2000ms} linear forwards; stroke-width:$sub-word-stroke-w*1.25; }
        .letter-f { animation: dash 1.2s #{$delay-before+2100ms} linear forwards; stroke-width:$sub-word-stroke-w; }
        .letter-f-bar { animation: dash 1.6s #{$delay-before+2100ms} linear forwards; stroke-width:$sub-word-stroke-w; }
        .letter-m { animation: dash 1s #{$delay-before+2200ms} linear forwards; stroke-width:$sub-word-stroke-w; }
        @keyframes dash {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
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
