var X1 = 0;
var X2 = 0;
var X3 = 0;

function handleDeviceMotion(e) {
	var x = e.acceleration.x;
	var y = e.acceleration.y;
	var z = e.acceleration.z;
	var xg = e.accelerationIncludingGravity.x;
	var yg = e.accelerationIncludingGravity.y;
	var zg = e.accelerationIncludingGravity.z;
	var alpha = e.rotationRate.alpha;
	var beta = e.rotationRate.beta;
	var gamma = e.rotationRate.gamma;

	try {
		X1 = "X: " + x.toString().substr (1,4) + ' |XG ' + xg.toString().substr (1,4) + ' |A ' + alpha.toString().substr (1,4);
		X2 = "Y: " + y.toString().substr (1,4) + ' |YG ' + yg.toString().substr (1,4) + ' |B ' + beta.toString().substr (1,4);
		X3 = "Z: " + z.toString().substr (1,4) + ' |ZG ' + zg.toString().substr (1,4) + ' |G ' + gamma.toString().substr (1,4);
	}
	catch (err){

	}
}

if (UseOrientat == true){
	if (window.DeviceMotionEvent) {
	  window.ondevicemotion = handleDeviceMotion;
	} else {	};
}