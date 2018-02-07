<template>
  <div id="details">
    <div id="track-details">
      <div class="container">
        <div id="track-details-cover" v-if="data.cover">
          <img :src="data.cover" :alt="data.artist+' - '+data.title">
        </div>
        <div id="track-details-type">
          <ProgressBar :progress="progress" />
          <span class="type">{{type}}</span> proposée par <span class="artist">{{artist}}</span>
        </div>
        <div id="track-details-text">
          <div data-append="tracklist">
            <div v-if="tags.includes('use_text_tracks')" class="text_tracks">{{tracksText}}</div>
            <div v-else>
              <ol class="tracklist">
                <li v-for="track in data.tracks" :key="track.id">
                  <span class="artist">{{track.artist}}</span> – <span class="title">{{track.title}}</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBar from './ProgressBar'
export default {
  name: 'Details',
  props: ['data', 'defaultText', 'trackProgress'],
  components: { ProgressBar },
  computed: {
    progress () { return this.trackProgress },
    artist () { return this.data.artist },
    type () { return this.data.type ? 'Une ' + this.data.type + ' Nina.fm' : 'À l\'écoute sur Nina.fm' },
    tracksText () { return this.data.text_tracks || this.defaultText },
    tags () { return this.data.tags || []}
  } 
}
</script>

<style lang="scss" scoped>
  @import "~$scss/base.scss";
  #details {
    z-index: 10;
    transition: $animation;
    width:50%;
    height:100%;
    position:absolute;
    top: 0;
    bottom: 0;
    left: -50%;
    color: $color-info-text;
    background-color:rgba($color-info-bg, $opacity-info-bg);
    @include respond-to(tablet) {
      width:100%;
      left: -100%;
    }
    .container {
      top: 0;
      overflow: hidden;
      left: $margin-global;
      margin-bottom: $margin-global;
    }
    #app.show-details & {
      left: 0;
    }
    .artist {
      font-weight: bold;
    }
  }
  #track-details {
    overflow-y: scroll;
    position: absolute;
    top: $margin-global*2.5;
    bottom: 0;
    left: 0;
    right: 0;
  }
  #track-details-type {
    font-family: $font-condensed;
    text-align: right;
    span {
      position: relative;
      display: inline-block;
      &.artist {
        margin-left: 0.2em;
      }
      &:not(:empty) {
        margin-bottom: 1em;
      }
    }
  }
  #track-details-text {
    font-family: $font-condensed;
    overflow: scroll;
    color: $color-info-text;
    ol, ul {
      margin:0;
      padding:0 0 0 0;
      line-height: 1.5em;
      li {
        margin-left: 1.5em;
        padding-left: 0.6em;
        white-space: nowrap;
      }
    }
    p {
      margin: 35px 0px 25px 0px;
    }
  }
  #track-details-cover {
    img {
      margin: auto;
      margin-bottom: 1em;
      width: 100%;
    }
  }
  .vue-progress-path path {
    stroke-width: 12;
  }

  .vue-progress-path .progress {
    stroke: red;
  }

  .vue-progress-path .background {
    stroke: #edd;
  }

  .text_tracks{
    white-space: pre;
  }
</style>
