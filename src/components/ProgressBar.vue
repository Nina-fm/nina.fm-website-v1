<template>
  <div class="progress">
    <div :style="progressStyle" class="progress__bar"></div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    progress: { type: Number, default: 0 }
  },
  computed: {
    progressStyle() {
      return { width: this.progress + '%' }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~$scss/base.scss';
.progress {
  background-color: $color-progress-track;
  #app.nightMode & {
    background-color: $night-color-progress-track;
  }
  height: $progress-width;
  position: relative;
  margin-bottom: 1em;
  box-sizing: border-box;
  @include prefix(transition, $animation-nobg);

  &__bar {
    position: absolute;
    top: 50%;
    @include prefix(transform, translateY(-50%));
    height: $progress-width;
    background-color: $color-progress-bar;
    #app.nightMode & {
      background-color: $night-color-progress-bar;
    }
    text-align: center;
    box-sizing: border-box;
    @include prefix(transition, #{$animation-nobg, width 5s linear});
  }
}
</style>
