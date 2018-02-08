<template>
  <div id="logo" :class="{animated}" @click="toggleAnimation"></div>
</template>

<script>
let cache = new Map()
export default {
  name: 'Logo',
  props: {
    src: {type: String, required: true},
    listeners: {type: Number}
  },
  data () {
    return {
      animated: false
    }
  },
  methods: {
    toggleAnimation: function (event) {
      this.animated = !this.animated
    }
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
    cursor: pointer;
    padding-top: none;
    z-index: 1;
    position: absolute;
    top: 30%;
    left: 50%;
    @include prefix(transform, translate(-50%, -50%));
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
        transition: all 0.2s ease-out;

        $stroke-color: #FFF;
        $main-word-stroke-w: 6.4px;
        $sub-word-stroke-w: 2.5px;
        $delay-before: 1.5s;
        $anim-out: exit 3s 7s linear forwards infinite;
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
        .letter-a-bar, .letter-i-dot, .sub-word {
          transition: opacity 0.3s;
        }
        @keyframes dash {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes exit {
          to { stroke-width: 0; }
        }
      }
      #app:not(.muted) &.animated {
        svg {
          opacity: 0.3;

          .letter-a-bar, .letter-i-dot, .sub-word {
            opacity: 0;
          }
          .line:not(.sub-word):not(.letter-i-dot):not(.letter-a-bar) {
            transition: stroke-dasharray 0s;
            animation-iteration-count: infinite !important;
            stroke-dasharray: 100 100 !important;
          }
        }
      }
    }
    #app.show-posts & {
      left: 25% !important;
      @include respond-to(tablet) {
        top: 150px !important;
        left: 0 !important;
      }
    }
    #app.show-details & {
      left: 75% !important;
    }
    .logo {
      width: 40vw;
      max-width: 200px;
    }
  }
</style>
