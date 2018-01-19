// var WPAPI = 'http://ninadmin.fugu.fr/wp-json/wp/v2';
var cockpitAPI = 'http://ninacockpit.fugu.fr/';
var cockpitToken = '66294d50dc455e33b8f6fb5a9ef4d6';

function cockpit(route, tokenize) {
    var url = cockpitAPI + route;
    if (tokenize) {
        url +=  '?token=' + cockpitToken;
    }
    return url;
}

jQuery(function ($) {

    // Load the frontpage data before loading
    $.ajax({
        url: cockpit('api/regions/data/display', true),
        success: function(page){
            $frontpage = page;
            init();
        }
    });

    function init() {

        // Set the background image
        $('#background').css('background-image', 'url('+cockpit($frontpage.background.path)+')');

        // Set the credits
        $('#credits').html($frontpage.credits);

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



        // Get posts from the Ninadmin Wordpress

        var $container = $('#posts-box .posts');
        const postTemplate = $.parseHTML($('#post-template').html());

        // Get post list
        $.ajax( {
            url: cockpit('api/collections/get/posts', true),
            method: 'POST',
            data: {
                filter: {published:true},
                sort: {_created:-1}
            },
            success: function ( response ) {
                var posts = response.entries;

                // Init the container
                $container.html('');

                // Set the posts main title
                var postsHeading = $frontpage.edito;
                $container.append(postsHeading);

                if (posts.length) {
                    $(posts).each(function(){
                        var post = this;
                        // Add the post
                        if (post.published) {
                            var postHTML = $(postTemplate).clone();
                            var postID = 'post-' + post._id;
                            postHTML.attr('id', postID);
                            $container.append(postHTML);
                            $('#' + postID).find('.title').html(post.title);
                            $('#' + postID).find('.content').html(post.content);
                        }
                    });
                }
            },
            cache: false
        } );
    }

});
