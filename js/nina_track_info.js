var old_track_info;

function getTrackInfo() {

    function display(info) {
        // Skip during the track play
        if (old_track_info == info.title) return;

        // Get the track title
        // info.title = '120 & Le Chapelier - Kheops'; // For debug mixtapes
        var infos = info.title.split(' - ');
        var artist = infos[0];
        var title = infos[1];

        // New track, reset track viewer
        $('body').removeClass('mixtape');
        $('#track-info-viewer').removeClass('animated');
        old_track_info = info.title;
        $('[data-append="trackinfo"]').html('');
        $('[data-append="tracklist"]').html('');
        $('[data-append="tracktype"]').html('');
        $('[data-append="trackauthor"]').html('');
        $('[data-append="trackcover"]').html('');

        // Set new page title
        $('[data-append="trackinfo"]').html(
            '<strong>' + artist + '</strong> '+
            '<i class="nina-icon-navigate_next"></i> ' +
            title
        );

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
                if (data == null) return;

                var isMixtape = data.type == 'mixtape';

                // Display the tracklist if is a mixtape
                if (isMixtape) {

                    var tracklist;

                    // TODO: Add the preference for tracks array instead of tracks text
                    if (!data.text_tracks && data.tracks) {
                        tracklist = $('<ol class="tracklist"></ol>');
                        for (var i = 0; i < data.tracks.length - 1; i++) {
                            tracklist.append($('<li><span class="artist">' + data.tracks[i]['artist'] + '</span> – <span class="title">' + data.tracks[i]['title'] + '</span></li>'));
                        }
                    } else {
                        tracklist = data.text_tracks.replace(/\n/g, "<br>") || '';
                    }
                    $('[data-append="tracklist"]').append(tracklist).removeClass().addClass(data.type);

                    // Update the track type and author
                    $('[data-append="trackauthor"]').html('proposée par <strong>' + artist + '</strong>');

                    // Update the track cover image
                    if (data.cover) {
                        var img = $(document.createElement('img'));
                        img.attr('src', metadata_base_url + '/' + data.cover);
                        img.attr('onerror', 'this.style.display="none"');
                        $('[data-append="trackcover"]').html(img);
                    }

                    // Update the body class
                    $('body').addClass('mixtape');
                }

                $('[data-append="tracktype"]').html(isMixtape ? 'Une mixtape Nina.fm' : 'Une suggestion Nina.fm');
                $('#track-info-viewer').addClass('animated');
            },
            error: function (e) {
                // If no track info, it's a suggestion
                // $('[data-append="tracktype"]').html('Une suggestion Nina.fm');
                // $('#track-info-viewer').toggleClass('animated', true);
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
            setTimeout(function(){getTrackInfo()}, 5000);

        },
        error: function (e) {
            console.log(e.message);
            setTimeout(function(){getTrackInfo()}, 5000);
        }
    });
}
