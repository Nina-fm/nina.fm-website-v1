import Vue from 'vue'

var config = new Vue({
  data () {
    return {
      streamUrl: 'http://flux.nina.fm/nina.mp3',
      oldTrackInfoUrl: 'http://flux.nina.fm/json.xsl',
      trackInfoUrl: 'https://prog.nina.fm/api/live-info',
      mountPoint: '/nina.mp3',
      metadataBaseUrl: 'http://www.nina.fm/metadata/',
      refreshTime: 5000, // ms
      apiSettings: {
        use: 'directus',
        directus: {
          base: 'http://ninadirectus.fugu.fr/',
          token: 'oYOYJ0AK6VMxqv5U1EknhrlFTMW2c2pi',
          refreshTime: 900000, // ms
          getURL: function (route, params) {
            return this.base + 'api/1.1' + route + '?access_token=' + this.token + (params ? '&' + params : '')
          }
        },
        cockpit: {
          base: 'http://ninacockpit.fugu.fr/',
          token: '66294d50dc455e33b8f6fb5a9ef4d6',
          refreshTime: 900000, // ms
          fileURL: function (file) {
            return file ? this.base + file.path : ''
          },
          getURL: function (route, params) {
            return this.base + 'api' + route + '?token=' + this.token + (params ? '&' + params : '')
          }
        }
      },
      defaultSettings: {
        message: '',
        edito: '',
        background: { path: '' },
        credits: '',
        logoColor: ''
      }
    }
  },
  computed: {
    API () { return this.apiSettings[this.apiSettings.use] }
  }
})

export default config
