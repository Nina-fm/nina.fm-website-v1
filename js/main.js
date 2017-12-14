jQuery(function ($) {

    // Fix the go to anchors on tab key press
    $('a').attr('tabindex', '-1');

    // Function for toggling sound
    function toggleSound() {
        var muted = !$('audio').prop('muted');
        $('body').toggleClass('muted', muted);
        $('audio').prop('muted', muted);
    }

    // Load the audio player dynamically
    $('#audioplayer').attr('src', stream_url).on('canplaythrough', function(e){
        $('body').removeClass('loading');
    });

    //Retrieve track info every 5 seconds
    setInterval(function () {
        getTrackInfo();
    }, 5000);

    // Auto toggle body classes for screen parts
    $('[data-bodyclass]').click(function (e) {
        e.preventDefault();
        var bodyclass = $(this).data('bodyclass');
        $('body').toggleClass(bodyclass);
    });

    var player = $('audio')[0];
    $('html').click(function () {
        player.play();
    });

    // Reloading when sound is down
    var time = player.currentTime;
    var check_stream = setInterval(function () {
        if (time >= player.currentTime && time > 0) {
            //Stream is not playing any more
            checkConnection = function () {
                $.ajax({
                    type: 'GET',
                    url: metadata_base_url,
                    success: function () {
                        console.log('reloading');
                        location.reload();
                    },
                    error: checkConnection
                });
            };
            checkConnection();
            clearInterval(check_stream);
        }
        time = player.currentTime;
    }, 1000);

    // Add the ability to toggle the sound mute with space key
    $(window).keydown(function (e) {
        if (e.keyCode == 32) toggleSound();
    });

    // Add the ability to toggle the sound mute with equalizer
    $('[data-toggle="mute"]').click(function(e){
       toggleSound();
    });

});
