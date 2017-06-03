function getTrackInfo() {
	
		function display(info){
			var infos = info.title.split(' - ');
			
			if($('#track-info').html() == info.title) return;

			//New track, reset infos
			$('#tracklist').html('');
			$('#cover').html('');

			//Set new title
			$('#track-info').html(info.title);
			document.title = info.title + ' sur nina.fm';
			
			//Set cover
			var img = $(document.createElement('img'));
			img.attr('src', playlist_info_base_url + '/' + infos[0] + '/' + infos[1] + '/cover');
			img.attr('onerror', 'this.style.display="none"');
			$('#cover').html(img);
			
			//Set tracklist
			$.ajax({  type: 'GET',
				url: playlist_info_base_url + '/' + infos[0] + '/' + infos[1] + '/tracklist',
	          	async: true,
	          	contentType: "text/plain",
	          	success: function(html){
	          		$('#tracklist').html('<p>' + html + '</p>');
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