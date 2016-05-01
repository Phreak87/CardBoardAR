				var vid = document.getElementById('V1');
				var overlay = document.getElementById('canvas1');
				var overlayCC = overlay.getContext('2d');
				
				var ctrack = new clm.tracker();
				ctrack.init(pModel);
				ctrack.start(vid);
				drawLoop();

				function drawLoop() {
					requestAnimFrame(drawLoop);
					overlayCC.clearRect(0, 0, 400, 300);
					//psrElement.innerHTML = "score :" + ctrack.getScore().toFixed(4);
					if (ctrack.getCurrentPosition()) {
						ctrack.draw(overlay);
					}
				}

				