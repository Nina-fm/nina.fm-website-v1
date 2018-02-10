<template>
  <div id="audience">
    <div class="auditor"
         v-for="(item, index) in listeners"
         :key="index"
         :style="item.styles"
         :title="'Nous sommes actuellement ' + count + ' à écouter Nina.fm !'"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'Audience',
  props: ['count'],
  data () {
    return {
      sizes: { min: 3, max: 6 },
      positions: {
        left: { min: 10, max: 90 },
        top: { min: 10, max: 25 }
      },
      listeners: []
    }
  },
  watch: {
    count () { this.updateListeners() }
  },
  methods: {
    updateListeners () {
      // Update listener objects
      this.listeners = Array.from(Array(this.count), (_, x) => {
        // Re-use if existent
        if (this.listeners[x]) {
          return this.listeners[x]
        }
        // Else create new
        return this.getRandomStyles(x)
      })
    },
    getRandomStyles () {
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
    getRandom (min, max) {
      // min and max are included in the range
      return Math.floor(Math.random() * ((max + 1) - min) + min)
    }
  },
  mounted () {
    this.updateListeners()
  }
}
</script>

<style lang="scss" scoped>
  @import "~$scss/base.scss";
  $brightness: 0 0 5em 0.3em $color-audience;
  .auditor {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    opacity: 0;
    background: $color-audience;
    #app.nightMode & {
      background: $night-color-audience;
    }
    @include prefix(animation, appear 1s ease-in);
    @include prefix(box-shadow, $brightness);
    @include prefix(border-radius, 50%);
    @include prefix(transition, $animation);

    @include respond-to(phone) {
      @include prefix(transform, scale(0.6));
    }

    @include respond-to(tablet) {
      @include prefix(transform, scale(0.8));
    }
  }
  @include keyframes(appear) {
    from { opacity:0; }
  }
</style>
