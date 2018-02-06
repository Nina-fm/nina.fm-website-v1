<template>
  <div class="progress">
    <div :style="progressStyle" class="progress__bar"></div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: ['progress'],
  computed: {
    progressStyle: function () {
      return { width: this.progress + '%' }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~$scss/base.scss";
  .progress {
    background: $color-progress-track;
    height: $progress-width;
    position: relative;
    margin-bottom: 1em;
    box-sizing: border-box;

    &__bar {
      position: absolute;
      top: 50%;
      @include prefix(transform, translateY(-50%));
      height: $progress-width;
      background-color: $color-progress-bar;
      text-align: center;
      box-sizing: border-box;
      @include prefix(transition, all 0.8s ease-in);
    }
  }
</style>
