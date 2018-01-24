<template>
  <div id="player">
    <audio id="audioplayer" ref="audio" :src="url" @canplaythrough="updateStatus" autoplay="autoplay" type="audio/mpeg">
      {{legacyMsg}}
    </audio>
    <div id="player-track">
      <div id="equalizer" :title="controlsMsg" @click="toggleMute"></div>
      <div id="track-viewer">
        <div class="slider">
          <div id="track-text" data-append="trackinfo">
            <span v-if="artist && title">
              <strong v-if="artist">{{artist}}</strong> {{title}}
            </span>
            <span v-else>{{defaultText}}</span>
          </div>
          <div id="track-type" data-append="tracktype">{{type}}</div>
        </div>
      </div>
      <a id="player-toggle" class="btn" data-bodyclass="show-track"
         title="Afficher/masquer le détail de la mixtape.">
        <i class="nina-icon-add_circle_outline open"></i>
        <i class="nina-icon-remove_circle_outline close"></i>
      </a>
    </div>
  </div>
</template>

<script>
import config from '../config.js'

export default {
  name: 'Player',
  props: ['url'],
  data () {
    return {
      interval: null,
      defaultText: 'Recherche des infos...',
      artist: '',
      title: '',
      type: '',
      tracks: {},
      controlsMsg: 'Activer/désactiver le son, vous pouvez aussi utiliser la barre d\'espace.',
      showTrackMsg: 'Afficher/masquer le détail de la mixtape.',
      legacyMsg: 'Votre navigateur est un vieux machin dépassé. Il ne supporte pas la musique, ce qui est un peu con quand on veut écouter la radio.'
    }
  },
  computed: {
    audio () {
      return this.$refs.audio
    }
  },
  methods: {
    toggleMute: function () {
      this.audio.muted = !this.audio.muted
      this.$emit('toggle', this.audio.muted, 'muted')
    },
    updateStatus: function () {
      this.$emit('stream', !this.audio.played, 'loading')
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
  created () {
    this.getAudioInfos()
  },
  mounted () {
    window.addEventListener('keyup', event => {
      if (event.keyCode === 32) this.toggleMute()
    })
    this.interval = setInterval(() => {
      this.checkStream()
      this.getAudioInfos()
    }, config.audio.refreshTime)
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
    }

    &.animated {
      .slider {
        -webkit-animation: playerLoop 15s infinite; /* Safari 4+ */
           -moz-animation: playerLoop 15s infinite; /* Fx 5+ */
             -o-animation: playerLoop 15s infinite; /* Opera 12+ */
                animation: playerLoop 15s infinite; /* IE 10+, Fx 29+ */
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
    transform: translateY(-50%);
    font-size: 1.2em;
    margin-top: 0.04em;
    display: none;

    @include respond-to(tablet) {
      margin-top: 0;
    }

    #app.mixtape & {
      display: block;
    }

    i.close {
      display: none;
    }
    i.open {
      display: block;
    }

    #app.show-track & {
      i.close {
        display: block;
      }
      i.open {
        display: none;
      }
    }
  }

  #equalizer {
    z-index: 10;
    width: $equalizer-size;
    height: $equalizer-size;
    background-image: url('../assets/images/equalizer.gif');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
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
