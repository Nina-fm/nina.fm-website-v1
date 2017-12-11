var old_track_info;

function getTrackInfo() {

    function display(info) {
        // Get the track title
        var infos = info.title.split(' - ');
        var artist = infos[0];
        var title = infos[1];

        if (old_track_info == info.title) return;

        //New track, reset infos
        $('#track-info-viewer').removeClass('animated');
        old_track_info = info.title;
        $('[data-append="trackinfo"]').html('');
        $('[data-append="tracklist"]').html('');
        $('[data-append="tracktype"]').html('');
        $('[data-append="trackcover"]').html('');

        // Set new page title
        $('[data-append="trackinfo"]').html('<strong>' + artist + '</strong> – ' + title);
        document.title = info.title + ' sur Nina.fm';

        // Look for current track meta data
        $.ajax({
            type: 'GET',
            url: metadata_base_url,
            data: {
                artist: artist,
                title: title
            },
            async: true,
            contentType: 'text/plain',
            success: function (data) {
                data = JSON.parse(data)[0];
                console.log(data);
                if (data == null) return;

                var isMixtape = data.type == 'mixtape';

                // Display the tracklist if is a mixtape
                if (isMixtape) {
                    var tracklist = data.text_tracks.replace(/\n/g, "<br>") || '';

                    // TODO: Add the preference for tracks array instead of tracks text
                    if (!data.text_tracks && data.tracks) {
                        tracklist = $('<ol class="tracklist"></ol>');
                        for (var i = 0; i < data.tracks.length - 1; i++) {
                            tracklist.append($('<li><span class="artist">' + data.tracks[i]['artist'] + '</span> – <span class="title">' + data.tracks[i]['title'] + '</span></li>'));
                        }
                    }
                    $('[data-append="tracklist"]').append(tracklist).removeClass().addClass(data.type);

                    // Update the track type and author
                    $('[data-append="trackauthor"]').html('proposée par <strong>' + artist + '</strong>');
                }

                $('[data-append="tracktype"]').html(isMixtape ? 'Une mixtape Nina.fm' : 'Une suggestion Nina.fm');
                $('#track-info-viewer').addClass('animated');

                // Update the body class
                $('body').toggleClass('mixtape', isMixtape);

                // Update the track cover image
                if (data.cover) {
                    var img = $(document.createElement('img'));
                    img.attr('src', metadata_base_url + '/' + data.cover);
                    img.attr('onerror', 'this.style.display="none"');
                    $('[data-append="trackcover"]').html(img);
                }
            }
        });
    }

    // Look for current track info
    $.ajax({
        type: 'GET',
        url: track_info_url,
        async: true,
        jsonpCallback: 'parseMusic',
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function (data) {
            display(data[mountpoint]);
        },
        error: function (e) {
            console.log(e.message);
        }
    });
}
