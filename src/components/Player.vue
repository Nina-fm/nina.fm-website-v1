<template>
  <div id="player">
    <audio id="audioplayer" ref="audio" :src="url" @canplaythrough="updateStatus" autoplay="autoplay" type="audio/mpeg">
      {{legacyMsg}}
    </audio>
    <div id="player-track">
      <div id="equalizer" :title="controlsMsg" @click="toggleMute"></div>
      <div id="track-viewer">
        <div class="slider" :class="{animated: typeText}">
          <div id="track-text" data-append="trackinfo">
            <span v-if="artist && title">
              <strong v-if="artist">{{artist}}</strong> {{title}}
            </span>
            <span v-else>{{defaultText}}</span>
          </div>
          <div id="track-type" data-append="tracktype">{{typeText}}</div>
        </div>
      </div>
      <a id="player-toggle" class="btn" :title="showTrackMsg">
        <i :class="{'nina-icon-add_circle_outline' : !open, 'nina-icon-remove_circle_outline': open}"></i>
      </a>
    </div>
  </div>
</template>

<script>
import config from '../config.js'
export default {
  name: 'Player',
  props: ['url', 'message'],
  data () {
    return {
      interval: null,
      artist: '',
      title: '',
      type: '',
      tracks: {},
      open: false,
      statusClass: 'show-track',
      defaultText: 'Recherche des infos...',
      controlsMsg: 'Activer/désactiver le son, vous pouvez aussi utiliser la barre d\'espace.',
      showTrackMsg: 'Afficher/masquer le détail de la mixtape.',
      legacyMsg: 'Votre navigateur est un vieux machin dépassé. Il ne supporte pas la musique, ce qui est un peu con quand on veut écouter la radio.'
    }
  },
  computed: {
    audio () {
      return this.$refs.audio
    },
    typeText () {
      return this.message || this.type
    }
  },
  methods: {
    toggleMute: function () {
      this.audio.muted = !this.audio.muted
      this.$emit('toggle', this.audio.muted, 'muted')
    },
    updateStatus: function () {
      this.$emit('statusChange', !this.audio.played, 'loading')
      if (this.audio.played) this.getAudioInfos()
    },
    checkStream: function () {
      if (!this.audio.played) {
        this.audio.load()
        this.audio.play()
      }
    },
    setTitle: function (title) {
      if (this.title === title) return
      let infos = title.split(' - ')
      this.artist = infos[0]
      this.title = infos[1]
    },
    getAudioInfos: function () {
      this.$jsonp(config.audio.trackInfoUrl, {
        callbackName: 'parseMusic'
      }).then(json => {
        let data = json[config.audio.mountPoint]
        this.setTitle(data.title)
      }, (error) => {
        console.log(error)
      })
    }
  },
  mounted () {
    window.addEventListener('keyup', event => {
      if (event.keyCode === 32) this.toggleMute()
    })
    this.interval = setInterval(() => {
      this.checkStream()
      this.updateStatus()
    }, config.audio.refreshTime)
  },
  beforeDestroy: function () {
    clearInterval(this.interval)
  }
}
</script>

<style lang="scss" scoped>
  @import "~$scss/base.scss";
  @keyframes playerLoop {
    0% { top: 0; }
    78% { top: 0; }
    80% { top: -20px; }
    99% { top: -20px }
    100% { top: 0; }
  }
  #player-track {
    z-index: 100;
    text-align: left;
    position: absolute;
    top: $margin-global;
    left: $margin-global;
    height: 40px;
    padding: 15px 40px 0 20px;
    color: $color-main-text;
    background-color: rgba($color-main-bg, 0);
    @extend .noSelect;
    overflow: hidden;
    font-size: 1.1em;
    font-family: $font-condensed;
    i {
      position: relative;
      top: 0.1em;
    }
    @include respond-to(phone) {
      max-width: calc(100% - #{$margin-global*3});
    }
    &.fullscreen {
      max-width: 100%;
    }
    h1, h2, h3, h4, h5, h6 {
      font-weight: 400;
    }
  }
  #track-viewer {
    height: 20px;
    overflow: hidden;
    .slider {
      position: relative;
      top: 0;
      &.animated {
        @include prefix(animation, playerLoop 10s infinite);
      }
    }
  }
  #track-text {
    margin: 0;
    width: auto;
    margin-left: #{$margin-global + 15};
    height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    strong {
      text-transform: uppercase;
      margin-right: #{$margin-global - 10};
    }
  }
  #track-type {
    margin-left: 35px;
    height: 20px;
    white-space: nowrap;
  }
  #player-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    @include prefix(transform, translateY(-50%));
    font-size: 1.2em;
    margin-top: 0.04em;
    display: none;
    @include respond-to(tablet) {
      margin-top: 0;
    }
    #app.mixtape & {
      display: block;
    }
  }
  #equalizer {
    z-index: 10;
    width: $equalizer-size;
    height: $equalizer-size;
    background: url('../assets/images/equalizer.gif') no-repeat center;
    background-size: contain;
    position: absolute;
    top: 50%;
    @include prefix(transform, translateY(-50%));
    margin-top: 0.05em;
    cursor: pointer;
    #app.muted & {
      opacity: 0.2;
    }
    #app.loading & {
      background-image: url('../assets/images/loader.gif');
    }
  }

</style>
