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
      return require('../assets/logo' + (this.color ? '-' + this.color : '-white') + '.svg')
    }
  }
}
</script>

<style scoped>

</style>
