
  var video = document.getElementById('V1');
  var canvas = document.getElementById('canvas3');
  var context = canvas.getContext('2d');

  var tracker = new tracking.ObjectTracker('face');
  tracker.setInitialScale(2.0);
  tracker.setStepSize(1.5);
  tracker.setEdgesDensity(0.1);

  tracking.track('#V1', tracker, { camera: true });

  tracker.on('track', function(event) {

	context.clearRect(0, 0, canvas.width, canvas.height);
	event.data.forEach(function(rect) {
	  context.strokeStyle = '#red';
	  context.strokeRect(rect.x + 130, rect.y +70, rect.width, rect.height);
	  context.font = '11px Helvetica';
	  context.fillStyle = "#fff";
	  context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 10, rect.y + 31);
	  context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 10, rect.y + 52);
	});
  }

  );
