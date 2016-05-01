var Lastlongitude = 0;
var Lastlatitude = 0;

function logPosition(position){
	if (Lastlongitude == position.coords.longitude && Lastlatitude == position.coords.latitude) {return null}
	UIkit.notify({
		message : "<img style='opacity:0.3' src='http://maps.googleapis.com/maps/api/staticmap?center=" + position.coords.latitude + "," + position.coords.longitude + "&zoom=14&size=320x240&sensor=true'></img>",
		status  : 'info',
		timeout : 2000,
		pos     : 'top-right'
	});
	Lastlongitude = position.coords.longitude;
	Lastlatitude = position.coords.latitude;
}
	 
var logoElement = document.getElementById('img1');
function handleDeviceOrientation(e) {
  var transform = 'rotate(' + e.alpha + 'deg)';
  logoElement.style.webkitTransform = transform;
  logoElement.style.transform = transform;
}

if (UseGeoLoc == true) {
	if (window.DeviceOrientationEvent) {
	  window.ondeviceorientation = handleDeviceOrientation;
	}
	navigator.geolocation.watchPosition(logPosition);
}