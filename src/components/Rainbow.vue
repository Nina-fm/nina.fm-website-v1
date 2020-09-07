<template>
  <div :style="styles" class="rainbow"></div>
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
    transition() {
      const { duration, delay } = this.params.transition
      return `background-color ${duration || 1000}ms linear ${
        delay ? delay + 'ms' : ''
      }`
    },
    styles() {
      return {
        opacity: this.active ? 1 : 0,
        transition: `opacity 0.3s ease-in-out, ${this.transition}`,
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
    this.colors = _.reverse(this.params.colors)
    this.count = this.params.colors.length
    this.current = this.count - 1
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    start() {
      this.animate()
      this.intervalID = setInterval(() => {
        this.animate()
      }, this.params.interval)
    },
    reset() {
      this.intervalID = null
      this.current = this.count - 1
    },
    animate() {
      if (this.params.random) {
        this.current = Math.round(Math.random() * this.count)
      } else {
        this.current = this.current - 1 === 0 ? this.count : this.current - 1
      }
    }
  }
}
</script>
