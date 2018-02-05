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
      screenSettings: {
        message: '',
        background: require('./assets/images/background.jpg'),
        mask: require('./assets/images/mask.png'),
        credits: '© Photo:Bobin - Montage:120',
        logoColor: 'white'
      }
    }
  }
})

export default config
