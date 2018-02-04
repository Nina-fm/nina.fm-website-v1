import Vue from 'vue'

var config = new Vue({
  data () {
    return {
      streamUrl: 'http://my-stream-url',
      trackInfoUrl: 'https://prog.nina.fm/api/live-info',
      oldTrackInfoUrl: 'http://flux.nina.fm/json.xsl',
      mountPoint: '/stream',
      metadataBaseUrl: 'http://my-metadata-base-url',
      refreshTime: 5000, // ms
      apiSettings: {
        use: 'myAPI',
        myAPI: {
          base: 'http://my-api-url/',
          token: 'mytoken',
          refreshTime: 900000, // ms
          getURL: function (route, params) {
            // Edit this line to match your API url scheme
            return this.base + 'api/1.0' + route + '?token=' + this.token + (params ? '&' + params : '')
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
