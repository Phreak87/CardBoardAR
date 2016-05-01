
		var smoother = new Smoother([0.9999999, 0.9999999, 0.999, 0.999], [0, 0, 0, 0]),
			video = document.getElementById('V2'),
			detector1;
			canvas = document.getElementById('canvas3');
			context = canvas.getContext('2d');
			compatibility.requestAnimationFrame(play);


		function play() {
			compatibility.requestAnimationFrame(play);

			if (video.readyState === video.HAVE_ENOUGH_DATA && video.videoWidth > 0) {
	          	if (!detector1) {
		      		var width = video.videoWidth /4;
					var height  = video.videoHeight/4 ;
		      		detector1 = new objectdetect.detector(width, height, 2, objectdetect.handfist);
		      		detector2 = new objectdetect.detector(width, height, 1.4, objectdetect.handopen);
		      	}

          		// Perform the actual detection:
				var coords1 = detector1.detect(video, 1);
				var coords2 = detector2.detect(video, 1);
				
				if (coords1[0]) {
					var coord = coords1[0];
					context.clearRect(0, 0, video.clientHeight, video.clientWidth);
					coord[0] *= video.videoWidth / detector1.canvas.width;
					coord[1] *= video.videoHeight / detector1.canvas.height;
					coord[2] *= video.videoWidth / detector1.canvas.width;
					coord[3] *= video.videoHeight / detector1.canvas.height;
					context.strokeRect(coord[0], coord[1] -50, coord[2], coord[3]-10);
					UIkit.notify({message: "Hand Faust", timeout: 500});
				}
				if (coords2[0]) {
					var coord = coords2[0];
					context.clearRect(0, 0, video.clientHeight, video.clientWidth);
					coord[0] *= video.videoWidth / detector2.canvas.width;
					coord[1] *= video.videoHeight / detector2.canvas.height;
					coord[2] *= video.videoWidth / detector2.canvas.width;
					coord[3] *= video.videoHeight / detector2.canvas.height;
					context.strokeRect(coord[0], coord[1] -50, coord[2], coord[3]-10);
					UIkit.notify({message: "Hand Offen", timeout: 500});
				}
			}
		}

