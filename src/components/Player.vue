<template>
  <div id="audio">
    <div id="player">
      <audio id="audioplayer" ref="audio" :src="url" @canplaythrough="updateStatus" autoplay="autoplay" type="audio/mpeg">
        {{legacyMsg}}
      </audio>
      <div id="player-track">
        <div id="equalizer" :title="controlsMsg" @click="toggleMute"></div>
        <div id="track-viewer">
          <div class="slider" :class="{animated: typeText, btn: hasDetails}" @click="toggleDetails">
            <div id="track-text" data-append="trackinfo">
              <span v-if="trackArtist && trackTitle">
                <strong v-if="trackArtist">{{trackArtist}}</strong> {{trackTitle}}
              </span>
              <span v-else>{{defaultText}}</span>
            </div>
            <div id="track-type" data-append="tracktype">{{typeText}}</div>
          </div>
        </div>
        <a id="player-toggle" class="btn" :title="showTrackMsg" @click="toggleDetails" v-if="hasDetails">
          <i :class="{'nina-icon-add_circle_outline' : !open, 'nina-icon-remove_circle_outline': open}"></i>
        </a>
      </div>
    </div>
    <Details :data="details" :defaultText="defaultText"/>
  </div>
</template>

<script>
import Details from './Details'
export default {
  name: 'Player',
  props: ['url', 'message'],
  components: { Details },
  data () {
    return {
      interval: null,
      updatable: true,
      title: '',
      trackArtist: '',
      trackTitle: '',
      type: '',
      details: {},
      open: false,
      statusClass: 'show-details',
      defaultText: 'Recherche des infos...',
      controlsMsg: 'Activer/désactiver le son, vous pouvez aussi utiliser la barre d\'espace.',
      showTrackMsg: 'Afficher/masquer le détail de la mixtape.',
      legacyMsg: 'Votre navigateur est un vieux machin dépassé. Il ne supporte pas la musique, ce qui est un peu con quand on veut écouter la radio.'
    }
  },
  computed: {
    hasDetails () {
      return this.type === 'mixtape'
    },
    audio () {
      return this.$refs.audio
    },
    typeText () {
      return this.message || (this.type ? 'Une ' + this.type + ' Nina.fm' : '')
    }
  },
  methods: {
    toggleDetails: function (action) {
      if (this.hasDetails) {
        this.open = typeof action === 'boolean' ? action : !this.open
        this.$emit('toggle', this.open, this.statusClass)
      }
    },
    toggleMute: function (action) {
      this.audio.muted = typeof action === 'boolean' ? action : !this.audio.muted
      this.$emit('toggle', this.audio.muted, 'muted')
    },
    updateStatus: function () {
      this.$emit('statusChange', !this.audio.played, 'loading')
      if (this.audio.played) this.getCurrentTrack()
    },
    checkStream: function () {
      if (!this.audio.played) {
        this.audio.load()
        this.audio.play()
      }
    },
    setTrack: function (title) {
      this.updatable = this.title !== title
      if (!this.updatable) return
      let infos = title.split(' - ')
      this.title = title
      this.trackArtist = infos[0]
      this.trackTitle = infos[1]
    },
    getCurrentTrack: function () {
      this.$jsonp(this.$config.trackInfoUrl, { callbackName: 'parseMusic' }).then(json => {
        let data = json[this.$config.mountPoint]
        this.setTrack(data.title)
      }, (error) => {
        console.log(error)
      })
    },
    getTrackDetails: function () {
      if (this.updatable && this.title) {
        this.$http({
          type: 'get',
          url: this.$config.metadataBaseUrl,
          params: {
            artist: this.trackArtist,
            title: this.trackTitle
          }
        }).then((response) => {
          this.details = response.data[0]
          this.type = this.details.type
          this.details.cover = this.$config.metadataBaseUrl + '/' + this.details.cover
        }, (error) => {
          console.log(error)
        })
      }
    }
  },
  mounted () {
    window.addEventListener('keyup', event => {
      switch (event.code) {
        case 'Space': this.toggleMute(); break
        case 'Escape': this.toggleDetails(false); break
      }
    })
    this.interval = setInterval(() => {
      this.checkStream()
      this.updateStatus()
      this.getTrackDetails()
    }, this.$config.refreshTime)
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
  #audio {
    position: absolute;
    left: $margin-global;
    right: $margin-global;
    top: $margin-global;
    bottom: $margin-global;
    overflow: hidden;
  }
  #player-track {
    z-index: 100;
    text-align: left;
    position: absolute;
    top: 0;
    left: 0;
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
    margin-top: 0.1em;
    @include respond-to(tablet) {
      margin-top: 0;
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
