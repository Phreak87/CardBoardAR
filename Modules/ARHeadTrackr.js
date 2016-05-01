
		  // set up video and canvas elements needed
		
			var videoInput = document.getElementById('V1');
			var canvasInput = document.getElementById('canvas3');
			var canvasOverlay = document.getElementById('canvas4')
			var debugOverlay = document.getElementById('canvas4');
			var overlayContext = canvasOverlay.getContext('2d');

			//var htracker = new headtrackr.Tracker({calcAngles : false, ui : false, headPosition : true, debug : debugOverlay});
			var htracker = new headtrackr.Tracker({calcAngles : false, ui : false, headPosition : false});
			htracker.init(videoInput, canvasInput);
			htracker.start();
			
			document.addEventListener("facetrackingEvent", function( event ) {
				overlayContext.clearRect(0,0,videoInput.clientWidth,videoInput.clientHeight);
				// once we have stable tracking, draw rectangle
				if (event.detection == "CS") {
					overlayContext.translate(event.x, event.y)
					overlayContext.rotate(event.angle-(Math.PI/2));
					overlayContext.strokeStyle = "#00CC00";
					overlayContext.strokeRect((-(event.width/2)) >> 0, (-(event.height/2)) >> 0, event.width, event.height);
					overlayContext.rotate((Math.PI/2)-event.angle);
					overlayContext.translate(-event.x, -event.y);
				}
			});
			
			// turn off or on the canvas showing probability
			function showProbabilityCanvas() {
				var debugCanvas = document.getElementById('debug');
				if (debugCanvas.style.display == 'none') {
					debugCanvas.style.display = 'block';
				} else {
					debugCanvas.style.display = 'none';
				}
			}
		