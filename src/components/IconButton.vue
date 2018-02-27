<template>
  <button :id="id" :class="{iconButton: true, circle: circle}" :title="infoText" :style="styles" @click="handleClick">
    <i :class="icon" :style="iconStyles"></i>
  </button>
</template>

<script>
export default {
  name: 'IconButton',
  props: ['id', 'active', 'iconActive', 'iconInactive', 'infoText', 'size', 'circle'],
  computed: {
    icon () { return this.active ? this.iconActive : this.iconInactive },
    styles () { return {height: this.size, width: this.size} },
    iconStyles () { return {fontSize: (this.size / 10) + 'em'} }
  },
  methods: {
    handleClick (event) { this.$emit('click', event) }
  }
}
</script>

<style lang="scss" scoped>
  @import "~$scss/base.scss";
  .iconButton {
    cursor: pointer;
    background: transparent;
    border:none;
    padding:0;
    margin: 0;
    display: inline-block;
    font-size: 1em;
    z-index: 10;
    position:absolute;
    color:$color-info-text;
    @include prefix(transition, $animation);
    #app.nightMode & {
      color: $night-color-info-text;
    }
    i {
      cursor: pointer;
      position: absolute;
      left:50%;
      top:50%;
      @include prefix(transform, translate(-50%, -50%));
      font-size: 1em;
    }
    &.circle {
      @include prefix(border-radius, 50%);
      background: rgba($color-main-bg, 0.01);
      padding: 10px;
      width: 30px;
      height: 30px;
      #app.nightMode & {
        background: rgba($night-color-main-bg, 0.01);
      }
    }
  }
</style>
