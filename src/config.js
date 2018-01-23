var config = {
  defaultSettings: {
    message: '',
    edito: '',
    background: { path: '' },
    credits: '',
    logoColor: ''
  },
  cockpit: {
    apiUrl: 'http://ninacockpit.fugu.fr/',
    token: '66294d50dc455e33b8f6fb5a9ef4d6',
    refreshTime: 10000, // ms
    get: function (route, tokenize) {
      let url = route ? this.apiUrl + route : ''
      url += route && tokenize ? '?token=' + this.token : ''
      return url
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
