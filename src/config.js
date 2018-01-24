var config = {

  defaultSettings: {
    message: '',
    edito: '',
    background: { path: '' },
    credits: '',
    logoColor: ''
  },

  cockpit: {
    url: 'http://ninacockpit.fugu.fr/',
    token: '66294d50dc455e33b8f6fb5a9ef4d6',
    refreshTime: 600000, // ms
    fileURL: function (file) {
      return file ? this.url + file.path : ''
    },
    apiURL: function (route) {
      return this.url + 'api' + route + '?token=' + this.token
    }
  },

  audio: {
    streamUrl: 'http://flux.nina.fm/nina.mp3',
    trackInfoUrl: 'http://flux.nina.fm/json.xsl',
    mountPoint: '/nina.mp3',
    metadataBaseUrl: 'http://www.nina.fm/metadata',
    refreshTime: 1000 // ms
  }
}

export default config
