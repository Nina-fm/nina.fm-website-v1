<template>
  <div id="posts">
    <IconButton
      id="posts-toggle"
      :size="16"
      :title="showPostsMsg"
      :active="open"
      icon-active="nina-icon-close"
      icon-inactive="nina-icon-reorder"
      @click="togglePosts"
    />
    <div id="posts-box">
      <div class="container">
        <div v-html="content"></div>
        <div class="footer">
          <a
            class="social-btn"
            href="https://www.facebook.com/nina.webradio/"
            target="_blank"
            rel="noopener noreferrer"
            ><i class="nina-icon-facebook-f"></i>Nina sur Facebook</a
          >
          <a
            class="social-btn"
            href="mailto:infos@nina.fm"
            rel="noopener noreferrer"
            ><i class="nina-icon-paper-plane"></i>Contacter Nina</a
          >
          <a
            class="social-btn"
            href="https://www.mixcloud.com/Nina_fm/"
            target="_blank"
            rel="noopener noreferrer"
            >Podcasts</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconButton from './IconButton'
export default {
  name: 'Posts',
  components: { IconButton },
  props: {
    content: { type: String, default: null }
  },
  data() {
    return {
      open: false,
      statusClass: 'show-posts'
    }
  },
  computed: {
    showPostsMsg() {
      return (this.open ? 'Masquer' : 'Afficher') + ' les inos Nina'
    }
  },
  watch: {
    open() {
      this.$emit('toggle', this.open, this.statusClass)
    }
  },
  mounted() {
    window.addEventListener('keyup', (event) => {
      switch (event.code) {
        case 'Escape':
          this.togglePosts(false)
          break
      }
    })
  },
  methods: {
    togglePosts(action) {
      this.open = typeof action === 'boolean' ? action : !this.open
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~$scss/base.scss';
@import url('https://fonts.googleapis.com/css?family=Caveat:400,700');

#posts {
  pointer-events: none;
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
  * {
    pointer-events: all;
  }
}

#posts-toggle {
  top: #{$margin-global + 3};
  right: #{$margin-global + 5};
  @include prefix(transition, $animation-nobg);
  @include respond-to(small-height) {
    opacity: 0;
  }
  @include respond-to(tablet) {
    z-index: 10;
  }
  #app.show-posts & {
    z-index: 10;
    background: transparent;
    color: $color-info-text;
  }
  #app.show-posts.nightMode & {
    color: $night-color-info-text;
  }
  #app.show-details & {
    display: none !important;
  }
}

#posts-box {
  @include prefix(transition, $animation);
  width: 50%;
  z-index: 5;
  position: absolute;
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
      color: $color-info-text;
      #app.nightMode & {
        background: rgba($night-color-info-bg, $opacity-info-bg);
        color: $night-color-info-text;
      }
      padding: $margin-global;
      margin-bottom: $margin-global/2;
      @include prefix(border-radius, 3px);

      &:last-child {
        margin-bottom: 0;
      }
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: $color-main-text;
      #app.nightMode & {
        color: $night-color-main-text;
      }
      font-weight: 700;
    }
    #edito {
      background: transparent;
      color: $color-info-text;
      #app.nightMode & {
        color: $night-color-info-text;
      }
      padding: $margin-global;
      margin-bottom: $margin-global/2;

      &:first-child {
        padding-top: 0 !important;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        color: $color-info-text;
        #app.nightMode & {
          color: $night-color-info-text;
        }
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
        #app.nightMode & {
          border-bottom: 1px solid $night-color-main-text;
        }
      }
      strong {
        letter-spacing: 0;
      }
    }
    .footer {
      padding-top: $margin-global;
      text-align: center;
    }
    .social-btn {
      box-sizing: border-box;
      font-family: $font-condensed;
      font-size: 1.2em;
      font-weight: 500;
      display: inline-block;
      background: rgba($color-info-text, $opacity-info-bg);
      color: $color-info-bg;
      #app.nightMode & {
        background: transparent;
        border: 1px solid $night-color-info-text;
        color: $night-color-info-text;
      }
      padding: 0.6em 1.2em;
      margin: 0 0.25em $margin-global / 2;
      text-decoration: none;
      @include prefix(border-radius, 2px);
      @include prefix(transition, $animation);
      i {
        position: relative;
        line-height: 1.1em;
        top: 0.1em;
        margin-right: 0.6em;
      }
      &:hover {
        background: rgba($color-info-bg, $opacity-info-bg);
        color: $color-info-text;
        #app.nightMode & {
          background: $night-color-info-bg;
          border: 1px solid $night-color-info-bg;
          color: $night-color-info-text;
        }
      }
    }
    blockquote {
      position: relative;
      padding: 0 $margin-global;
      margin: 0 0 0 0;
      color: $color-info-text;
      #app.nightMode & {
        color: $night-color-info-text;
      }

      p {
        position: relative;
        z-index: 1;
        font-family: 'Caveat', cursive;
        font-size: 2vw;
        line-height: 1.2em;
        @include respond-to(tablet) {
          font-size: 4vw;
        }
        @include respond-to(tablet) {
          font-size: 5vw;
        }
      }

      &:before {
        content: '\e902';
        font-family: 'nina-icons' !important;
        speak: none;
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        font-size: 4em;
        color: $color-progress-track;
        #app.nightMode & {
          color: $night-color-progress-track;
        }
        z-index: 0;
        position: absolute;
        right: 0;
        top: 0;
        /* Better Font Rendering =========== */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      cite {
        font-font: $font-family;
        font-size: 0.8em;
        font-style: normal;
        text-align: right;
        display: block;
        color: inherit;
      }
    }
  }
}
</style>
