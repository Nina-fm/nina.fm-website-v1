jQuery(function ($) {

  // Fix the go to anchors on tab key press
  $('a').attr('tabindex', '-1')

  // Function for toggling sound
  function toggleSound () {
    $('audio').prop('muted', !$('audio').prop('muted'))
  }

  //Retrieve track info every 5 seconds
  setInterval(function () {
    getTrackInfo()
  }, 5000)

  // Auto toggle body classes for screen parts
  $('[data-bodyclass]').click(function (e) {
    e.preventDefault()
    var bodyclass = $(this).data('bodyclass')
    $('body').toggleClass(bodyclass)
  })

  var player = $('audio')[0]
  $('html').click(function () {
    player.play()
  })

  $(window).keydown(function (e) {
    if (e.keyCode == 32) toggleSound()
  })

})
