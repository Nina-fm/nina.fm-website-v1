<template>
  <div id="background" :style="{ backgroundImage: 'url('+url+')' }">
    <div id="mask"><img v-if="mask" :src="mask"></div>
    <div id="credits">{{credits}}</div>
  </div>
</template>

<script>
export default {
  name: 'Background',
  props: ['url', 'mask', 'credits']
}
</script>

<style scoped>

</style>
