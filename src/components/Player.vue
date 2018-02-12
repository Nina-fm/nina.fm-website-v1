<template>
  <div id="audio">
    <div id="player">
      <audio id="audioplayer" ref="audio" :src="url" @canplaythrough="updateStatus" autoplay="autoplay" type="audio/mpeg">{{legacyMsg}}</audio>
      <div id="player-track">
        <div id="equalizer" :title="controlsMsg" @click="toggleMute" :style="{ backgroundImage: 'url('+equalizerImg+')' }"></div>
        <div id="track-viewer">
          <div class="slider" :class="{animated: typeText, btn: hasDetails}" @click="toggleDetails">
            <div id="track-text" data-append="trackinfo">
              <span v-if="trackArtist && trackTitle">
                <strong v-if="trackArtist" v-html="trackArtist"></strong> <span v-html="trackTitle"></span>
              </span>
              <span v-else>{{defaultText}}</span>
            </div>
            <div id="track-type" data-append="tracktype">{{typeText}}</div>
          </div>
        </div>
        <IconButton id="player-toggle" :size="10" v-if="hasDetails" :active="open" @click="toggleDetails" icon-active="nina-icon-remove_circle_outline" icon-inactive="nina-icon-add_circle_outline"/>
      </div>
    </div>
    <Details :data="details" :defaultText="defaultText" :trackProgress="trackProgress"/>
  </div>
</template>

<script>
import Details from './Details'
import IconButton from './IconButton'
import Events from '../Events'
export default {
  name: 'Player',
  props: ['url', 'message', 'night', 'status'],
  components: { Details, IconButton },
  data () {
    return {
      muted: false,
      debugMixtape: false,
      title: '',
      trackArtist: '',
      trackTitle: '',
      type: '',
      trackProgress: null,
      details: {},
      open: false,
      statusClass: 'show-details',
      defaultText: 'Recherche des infos...',
      legacyMsg: 'Votre navigateur est un vieux machin dépassé. Il ne supporte pas la musique, ce qui est un peu con quand on veut écouter la radio.'
    }
  },
  computed: {
    audio () { return this.$refs.audio },
    hasDetails () { return this.type === 'mixtape' },
    controlsMsg () {
      return (this.muted ? 'Activer' : 'Désactiver') + ' le son (vous pouvez aussi utiliser la barre d\'espace)'
    },
    equalizerImg () {
      return require('@/assets/images/equalizer' + (!this.status ? '-loader' : '') + (this.night ? '-night' : '') + '.gif')
    },
    typeText () {
      return this.message || (this.type ? 'Une ' + this.type + ' Nina.fm' : null) || 'À l\'écoute sur Nina.fm'
    }
  },
  methods: {
    audioPlayed () { return this.audio.duration > 0 && !this.audio.paused },
    toggleDetails (action) {
      if (this.hasDetails) {
        this.open = typeof action === 'boolean' ? action : !this.open
        this.$emit('toggle', this.open, this.statusClass)
      }
    },
    toggleMute (action) {
      this.muted = this.audio.muted = typeof action === 'boolean' ? action : !this.audio.muted
      this.$emit('toggle', this.audio.muted, 'muted')
    },
    updateStatus () {
      this.$emit('statusChange', !this.audioPlayed(), 'loading')
      if (this.audioPlayed()) this.getCurrentTrack()
    },
    checkStream () {
      if (!this.audioPlayed()) {
        this.audio.load()
        this.audio.play()
      }
    },
    setTrack (title) {
      if (title === this.title) return
      if (process.env.DEBUG_MIXTAPE && this.debugMixtape) {
        title = this.debugMixtape
      }
      let infos = title.split(/ - (.+)/)
      this.title = title
      this.trackArtist = infos[0]
      this.trackTitle = infos[1]
      this.getTrackDetails()
    },
    oldGetCurrentTrack () {
      this.$jsonp(process.env.STREAM_API_OLD_URL, { callbackName: 'parseMusic' }).then(json => {
        let data = json[process.env.STREAM_MOUNT_POINT]
        this.setTrack(data.title)
      }, (error) => {
        if (process.env.NODE_ENV === 'development') console.log(error)
      })
    },
    getCurrentTrack () {
      this.$jsonp(process.env.STREAM_API_URL).then(response => {
        if (response.current) {
          this.setTrack(response.current.name)

          // Scheduler time is one hour ahead of start and end times, probably due to encoding diffences
          var trackElapsed = (new Date(response.schedulerTime) - new Date(response.current.starts) - 3600000)
          var trackLength = (new Date(response.current.ends) - new Date(response.current.starts))

          this.trackProgress = trackElapsed / trackLength * 100
        } else {
          this.oldGetCurrentTrack()
        }
      }, (error) => {
        if (process.env.NODE_ENV === 'development') console.log(error)
        this.oldGetCurrentTrack()
      })
    },
    getTrackDetails () {
      this.$http({
        type: 'get',
        url: process.env.STREAM_METADATA_URL,
        params: {
          artist: this.trackArtist,
          title: this.trackTitle
        }
      }).then((response) => {
        this.details = response.data[0]
        this.type = this.details.type
        this.details.cover = process.env.STREAM_METADATA_URL + this.details.cover
      }, (error) => {
        if (process.env.NODE_ENV === 'development') console.log(error)
      })
    }
  },
  created () {
    let params = (new URL(document.location)).searchParams
    this.debugMixtape = params.get('mixtape')
  },
  mounted () {
    // Play music event
    Events.$on('play', () => {
      this.audio.play()
    })

    // Handle keys events
    window.addEventListener('keyup', event => {
      switch (event.code) {
        case 'Space': this.toggleMute(); break
        case 'Escape': this.toggleDetails(false); break
      }
    })

    // Check if the stream is alive
    this.interval = setInterval(() => {
      this.checkStream()
      this.updateStatus()
    }, process.env.STREAM_REFRESH_TIME)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>

<style lang="scss" scoped>
  @import "~$scss/base.scss";
  @include keyframes(playerLoop) {
    0% { top: 0; }
    78% { top: 0; }
    80% { top: -20px; }
    99% { top: -20px }
    100% { top: 0; }
  }
  #audio {
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
    #app.nightMode & {
      color: $night-color-main-text;
      background-color: rgba($night-color-main-bg, 0);
    }
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
      i {
        top: 0.2em;
      }
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
    right: 10px;
    top: 50%;
    @include prefix(transform, translateY(-50%));
    margin-top: 0.25em;
    @include respond-to(tablet) {
      /*margin-top: 0;*/
    }
  }
  #equalizer {
    z-index: 10;
    width: $equalizer-size;
    height: $equalizer-size;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    position: absolute;
    top: 50%;
    @include prefix(transform, translateY(-50%));
    margin-top: 0.05em;
    cursor: pointer;
    #app.muted & {
      opacity: 0.2;
    }
  }

</style>
