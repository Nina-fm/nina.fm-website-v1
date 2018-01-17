jQuery(function ($) {

    var WPAPI = 'https://public-api.wordpress.com/rest/v1.1/sites/nina725466975.wordpress.com';

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

    getTrackInfo();

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

    var checkPlayer = setInterval(function(){
        if (!player.paused) {
            $('body').removeClass('loading');
        }
    }, 200);

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



    // Get posts from WP.COM

    var $container = $('#posts-box .posts');
    const postTemplate = $.parseHTML($('#post-template').html());
    const categoryTemplate = $.parseHTML($('#category-template').html());
    var currentCategory = null;

    $.ajax( {
        url: WPAPI+'/posts/',
        success: function ( data ) {
            if ($(data.posts).length) {
                $container.html('');
                $(data.posts).each(function(){
                    // Check category
                    var category = Object.values(this.categories)[0];
                    if (category.ID !== currentCategory || currentCategory === null) {
                        currentCategory = category.ID;
                        var catHTML = $(categoryTemplate).clone();
                        var catID = 'category-'+category.ID;
                        catHTML.attr('id', catID);
                        $container.append(catHTML);
                        $('#'+catID).find('.name').html(category.name);
                        $('#'+catID).find('.description').html(category.description);
                    }
                    // Add post
                    var postHTML = $(postTemplate).clone();
                    var postID = 'post-'+this.ID;
                    postHTML.attr('id', postID);
                    $container.append(postHTML);
                    $('#'+postID).find('.title').html(this.title);
                    $('#'+postID).find('.content').html(this.content);
                });
            }
        },
        cache: false
    } );

});
