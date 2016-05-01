
function initColors (){
		  var video = document.getElementById('V1');
		  var canvas = document.getElementById('canvas1');
		  var context = canvas.getContext('2d');

		  // #523e3e 82, 62, 62 
		  // #7f6b6b 130, 107, 107
		  tracking.ColorTracker.registerColor('haut', function(r, g, b) {
		  if (r > 0 && r < 80 && g > 0 && g < 80 && b > 0 && b < 80) {
			return true;
		  }
		  return false;
		});

		  var tracker = new tracking.ColorTracker(['haut']);
		  
		  tracking.track('#V1', tracker, { camera: true });
		  tracker.on('track', function(event) {

			context.clearRect(0, 0, video.clientHeight, video.clientWidth);
			event.data.forEach(function(rect) {
			  if (rect.color === 'custom') {
				rect.color = tracker.customColor;
			  }
			  context.strokeStyle = rect.color;
			  context.strokeRect(rect.x / 2, rect.y / 2, rect.width / 2, rect.height/ 2);
			  context.font = '11px Helvetica';
			  context.fillStyle = "#fff";
			  context.fillText('x: ' + rect.x / 2 + 'px', rect.x / 2 + rect.width, rect.y);
			  context.fillText('y: ' + rect.y /2 + 'px', rect.x /2 + rect.width, rect.y);
			});
		  });
    };
	initColors();