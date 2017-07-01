function getTrackInfo() {

	function setTrackDetails(path, type){
		$.ajax({  type: 'GET',
			url: path,
          	async: true,
          	contentType: "text/plain",
          	success: function(html){
          		$('#track-details-text').html('<p>' + html + '</p>');
          		$('#track-details-text').removeClass().addClass(type);
          		$('#track-type-infos').html(type == 'mixtape' ? 'une mixtape nina.fm' : 'une suggestion nina.fm')
			}
    	});
	}

	function setCover(path, type){
		$.ajax({  type: 'GET',
			url: path,
          	async: true,
          	success: function(html){
          		var img = $(document.createElement('img'));
				img.attr('src', path);
				img.attr('onerror', 'this.style.display="none"');
				$('#cover').html(img);
			}
    	});
	}			

	function display(info){

		var infos = info.title.split(' - ');

		if($('#track-info').html() == info.title) return;

		//New track, reset infos
		$('#track-info').html('');
		$('#track-details-text').html('');
		$('#track-type-infos').html('');
		$('#cover').html('');

		//Set new title
		$('#track-info').html(info.title);
		document.title = info.title + ' sur nina.fm';

		//Look for meta data
		
		//Mixtape?
		setTrackDetails(metadata_base_url + '/mixtapes/' + infos[0] + '/' + infos[1] + '/tracklist', 'mixtape');
		setCover(metadata_base_url + '/mixtapes/' + infos[0] + '/' + infos[1] + '/cover');

		//Artist?
		setTrackDetails(metadata_base_url + '/artists/' + infos[0] + '/infos', 'artist');
		setCover(metadata_base_url + '/artists/' + infos[0] + '/cover', 'artist')
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