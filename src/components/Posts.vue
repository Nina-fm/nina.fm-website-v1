<template>
  <div id="posts">
    <a id="posts-toggle" class="btn" :title="showPostsMsg" @click="togglePosts">
      <i class="nina-icon-reorder open"></i>
      <i class="nina-icon-close close"></i>
    </a>
    <div id="posts-box">
      <div class="container">
        <div id="edito" v-html="edito"></div>
        <div class="block" v-for="post in posts" :key="post.id">
          <h3 class="title">{{post.title}}</h3>
          <p class="content" v-html="post.content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '../config.js'

export default {
  name: 'Posts',
  props: ['edito'],
  data () {
    return {
      open: false,
      statusClass: 'show-posts',
      showPostsMsg: 'Afficher/masquer les actualités.',
      posts: []
    }
  },
  methods: {
    togglePosts: function () {
      this.open = !this.open
      this.$emit('toggle', this.open, this.statusClass)
    },
    loadPosts: function () {
      axios({
        url: config.cockpit.apiURL('/collections/get/posts'),
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
          filter: {published: true},
          sort: {_created: -1},
          populate: 1
        }
      }).then((response) => {
        this.posts = response.data.entries
      }, (error) => {
        console.log(error)
      })
    }
  },
  mounted: function () {
    this.loadPosts()
    this.interval = setInterval(function () {
      this.loadPosts()
    }.bind(this), config.cockpit.refreshTime)
  },
  beforeDestroy: function () {
    clearInterval(this.interval)
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
}

#posts-toggle{
  z-index: 10;
  position:absolute;
  top: #{$margin-global - 6};
  right: #{$margin-global - 3};
  height: 15px;
  width: 20px;
  color:$color-info-text;
  transition: $animation;

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

  #app.show-track & {
    display: none !important;
  }

  i {
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%, -50%);
    font-size: 1.7em;

    &.close { display: none; }
    &.open { display: block; }

    #app.show-posts & {
      &.close { display: block; }
      &.open { display: none; }
    }
  }
}

#posts-box {
  transition: $animation;
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
  #app.show-track & {
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
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;

      &:last-child {
        margin-bottom: 0;
      }
    }
    h1, h2, h3, h4, h5, h6 {
      color:$color-main-text;
      font-weight: 700;
    }
  }
}

#edito {
  background: transparent;
  color:$color-info-text;
  padding: $margin-global;
  margin-bottom: $margin-global/2;

  &:first-child {
    padding-top:0 !important;
  }

  /deep/ {
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

</style>
