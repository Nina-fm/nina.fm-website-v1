<template>
  <div :style="{ opacity: active ? 1 : 0 }" class="rainbow">
    <div :style="styles" class="rainbow-content"></div>
  </div>
</template>

<script>
export default {
  name: 'Rainbow',
  props: {
    params: { type: Object, default: () => ({}) },
    active: { type: Boolean, default: false }
  },
  data() {
    return {
      colors: null,
      current: null,
      count: null,
      intervalID: null
    }
  },
  computed: {
    styles() {
      return {
        backgroundColor: this.colors[this.current]
      }
    }
  },
  watch: {
    active(value) {
      if (!value) this.reset()
      else this.start()
    }
  },
  created() {
    this.colors = this.params.colors
    this.count = this.params.colors.length
    this.reset()
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    start() {
      this.reset()
      this.animate()
      this.intervalID = setInterval(() => {
        this.animate()
      }, this.params.interval)
    },
    reset() {
      this.intervalID = null
      this.current = 0
    },
    animate() {
      if (this.params.random) {
        this.current = Math.round(Math.random() * this.count)
      } else {
        this.current = this.current + 1 === this.count ? 0 : this.current + 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.rainbow {
  background: transparent;
  z-index: 1000000000;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
  mix-blend-mode: difference;

  .rainbow-content {
    z-index: 1000000000;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    pointer-events: none;
    background-color: transparent;
    transition: background-color 10s linear;
  }
}
</style>
