<template>
  <div id="audience">
    <div class="auditor" v-for="(item, index) in listeners" :key="index" :style="item.styles" :title="'Nous sommes actuellement ' + count + ' a écouter Nina.fm !'"></div>
  </div>
</template>

<script>
export default {
  name: 'Audience',
  props: ['count'],
  data () {
    return {
      sizes: { min: 4, max: 7 },
      positions: {
        left: { min: 10, max: 90 },
        top: { min: 10, max: 25 }
      },
      listeners: []
    }
  },
  watch: {
    count: function (newVal, oldVal) {
      if (newVal !== oldVal) this.updateListeners()
    }
  },
  methods: {
    updateListeners: function () {
      // Update listener objects
      let newListeners = Array.from(Array(this.count), (_, x) => {
        // Re-use if existent
        if (this.listeners[x]) {
          return this.listeners[x]
        }
        // Else create new
        return this.getRandomStyles(x)
      })
      this.listeners = newListeners
    },
    getRandomStyles: function () {
      let size = this.getRandom(this.sizes.min, this.sizes.max)
      // Calculate the opacity from the size ratio
      let range = this.sizes.max - this.sizes.min + 1
      let step = (size - range + 2) * (100 / range)
      let opacity = step + (50 * ((100 - step) / 100))
      // Return styles
      return {
        styles: {
          width: size + 'px',
          height: size + 'px',
          left: this.getRandom(this.positions.left.min, this.positions.left.max) + '%',
          top: this.getRandom(this.positions.top.min, this.positions.top.max) + '%',
          opacity: opacity / 100
        }
      }
    },
    getRandom: function (min, max) {
      // min and max are included in the range
      return Math.floor(Math.random() * ((max + 1) - min) + min)
    }
  },
  mounted: function () {
    this.updateListeners()
  }
}
</script>

<style lang="scss" scoped>
  @import "~$scss/base.scss";

  $small: 0 0 5em 0.3em $color-audience;
  $big: 0 0 1.1em 0.2em $color-audience;

  @at-root {
    @include keyframes(sparkle) {
      0% { @include prefix(box-shadow, $small); }
      20% { @include prefix(box-shadow, $big); }
      40% { @include prefix(box-shadow, $small); }
      70% { @include prefix(box-shadow, $small); }
      80% { @include prefix(box-shadow, $big); }
      90% { @include prefix(box-shadow, $small); }
      100% { @include prefix(box-shadow, $small); }
    }
  }
  .auditor {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    background: $color-audience;
    @include prefix(box-shadow, $small);
    @include prefix(border-radius, 50%);
    @include prefix(transition, $animation);
  }
  .sparkle {
    @include prefix(animation, sparkle 3s infinite)
  }
</style>
