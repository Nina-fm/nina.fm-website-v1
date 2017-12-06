var old_track_info;

function getTrackInfo() {		

	function display(info){

		var infos = info.title.split(' - ');

		if(old_track_info == info.title) return;

		//New track, reset infos
		old_track_info = info.title;
		$('#track-info').html('');
		$('#track-details-text').html('');
		$('#track-type-infos').html('');
		$('#cover').html('');

		//Set new title
		$('#track-info').html(info.title);

		//Look for meta data
		$.ajax({  type: 'GET',
			url: metadata_base_url,
			data : {
				artist : infos[0],
				title : infos[1]
			},
          	async: true,
          	contentType: "text/plain",
          	success: function(data){
          		data = JSON.parse(data)[0];

 				if(data == null) return;

 				var tracklist = data.text_tracks || '';
 				if(!data.text_tracks && data.tracks){
 					for (var i = 0; i < data.tracks.length; i++) {
 						tracklist = tracklist + data.tracks[i]['artist'] + ' : ' + data.tracks[i]['title'] + '\n';
 					};
 				}

          		$('#track-details-text').html('<p>' + tracklist + '</p>');
          		$('#track-details-text').removeClass().addClass(data.type);
          		$('#track-type-infos').html(data.type == 'mixtape' ? 'une mixtape nina.fm' : 'une suggestion nina.fm');

          		if(data.cover){
          			var img = $(document.createElement('img'));
					img.attr('src', metadata_base_url + '/' + data.cover);
					img.attr('onerror', 'this.style.display="none"');
					$('#cover').html(img);
          		}
			}
    	});
	}

    $.ajax({  type: 'GET',
          url: track_info_url,
          async: true,
          jsonpCallback: 'parseMusic',
          contentType: "application/json",
          dataType: 'jsonp',
          success: function(data){display(data[mountpoint]);},
          error: function (e) {console.log(e.message);  
        }
    });
}