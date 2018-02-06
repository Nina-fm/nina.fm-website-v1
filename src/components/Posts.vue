<template>
  <div id="posts">
    <a id="posts-toggle" class="btn" :title="showPostsMsg" @click="togglePosts">
      <i :class="{'nina-icon-reorder' : !open, 'nina-icon-close': open}"></i>
    </a>
    <div id="posts-box" v-html="content"></div>
  </div>
</template>

<script>
export default {
  name: 'Posts',
  props: ['content'],
  data () {
    return {
      open: false,
      statusClass: 'show-posts',
      showPostsMsg: 'Afficher/masquer les actualités.'
    }
  },
  methods: {
    togglePosts: function (action) {
      this.open = typeof action === 'boolean' ? action : !this.open
      this.$emit('toggle', this.open, this.statusClass)
    }
  },
  mounted: function () {
    // this.getPosts()
    window.addEventListener('keyup', event => {
      switch (event.code) {
        case 'Escape': this.togglePosts(false); break
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~$scss/base.scss';

#posts {
  position: absolute;
  left: $margin-global;
  right: $margin-global;
  top: $margin-global;
  bottom: $margin-global;
  overflow: hidden;
  @include respond-to(phone) {
    left: $margin-global-sm;
    top: $margin-global-sm;
    right: $margin-global-sm;
    bottom: $margin-global-sm;
  }
}

#posts-toggle{
  z-index: 10;
  position:absolute;
  top: #{$margin-global - 6};
  right: #{$margin-global - 3};
  height: 15px;
  width: 20px;
  color:$color-info-text;
  @include prefix(transition, $animation);

  @include respond-to(small-height) {
    opacity:0;
  }

  @include respond-to(tablet) {
    z-index: 10;
  }

  #app.show-posts & {
    z-index: 10;
    background: transparent;
    color: $color-info-text;
  }

  #app.show-details & {
    display: none !important;
  }

  i {
    position: absolute;
    left:50%;
    top:50%;
    @include prefix(transform, translate(-50%, -50%));
    font-size: 1.7em;
  }
}

#posts-box {
  @include prefix(transition, $animation);
  width:50%;
  z-index: 5;
  position:absolute;
  top: 0;
  bottom: 0;
  left: 100%;
  overflow-y: scroll;

  @include respond-to(tablet) {
    top: 220px !important;
    width: 100% !important;
    left: 100% !important;
  }
  .container {
    @include respond-to(tablet) {
      top: 0px !important;
    }
  }
  #app.show-posts & {
    left: 50%;
    @include respond-to(tablet) {
      left: 0 !important;
    }
  }
  #app.show-details & {
    left: 100%;

    @include respond-to(tablet) {
      left: 100% !important;
    }
  }

  /deep/ {
    .block {
      background: rgba($color-info-bg, $opacity-info-bg);
      color:$color-info-text;
      padding: $margin-global;
      margin-bottom: $margin-global/2;
      @include prefix(border-radius, 3px);

      &:last-child {
        margin-bottom: 0;
      }
    }
    h1, h2, h3, h4, h5, h6 {
      color:$color-main-text;
      font-weight: 700;
    }
    #edito {
      background: transparent;
      color:$color-info-text;
      padding: $margin-global;
      margin-bottom: $margin-global/2;

      &:first-child {
        padding-top:0 !important;
      }

      h1, h2, h3, h4, h5, h6 {
        color:$color-info-text;
        font-family: $font-condensed;
        font-size: 1.6em;
        font-weight: 300;
        line-height: 1.2em;
        text-align: center;
      }
      small {
        text-transform: uppercase;
        font-size: 0.5em;
        border-bottom: 1px solid $color-main-text;
      }
      strong {
        letter-spacing: 0;
      }
    }
  }
}

</style>
