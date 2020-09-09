<template>
  <div :class="{ rainbow: true, active }">
    <div :style="styles" class="rainbow-content"></div>
  </div>
</template>

<script>
export default {
  name: 'Rainbow',
  props: {
    colors: { type: Array, default: () => [] },
    active: { type: Boolean, default: false }
  },
  data() {
    return {
      current: null,
      cycle: null,
      interval: 10500
    }
  },
  computed: {
    count() {
      return this.colors.length
    },
    styles() {
      return {
        backgroundColor: this.colors[this.current]
      }
    }
  },
  watch: {
    active(value) {
      this.reset()
      if (value) this.start()
    }
  },
  created() {
    this.reset()
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    start() {
      setTimeout(() => {
        this.animate()
        this.cycle = setInterval(() => {
          this.animate()
        }, this.interval)
      }, 100)
    },
    reset() {
      clearInterval(this.cycle)
      this.current = 0
    },
    animate() {
      this.current = this.current + 1 === this.count ? 0 : this.current + 1
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
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
  mix-blend-mode: difference;

  &.active {
    opacity: 1;
  }

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
