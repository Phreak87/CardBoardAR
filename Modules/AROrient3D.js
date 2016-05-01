
var camera, scene, renderer;
var geometry, material, mesh;
var Lastlongitude = 500;
var Lastlatitude = 500;

function logPosition(position){
	if (Lastlongitude == position.coords.longitude && Lastlatitude == position.coords.latitude) {return null}
	Lastlongitude = position.coords.longitude;
	Lastlatitude = position.coords.latitude;
	initOrient3D();
	animate();
}
navigator.geolocation.watchPosition(logPosition);

function initOrient3D() {

	camera = new THREE.PerspectiveCamera( 70, 50, 1, 1000 );
	controls = new THREE.DeviceOrientationControls( camera );
	scene = new THREE.Scene();

	var imgUrl = 'http://maps.googleapis.com/maps/api/staticmap?center=' + Lastlatitude + ',' + Lastlongitude + '&zoom=14&size=320x240&sensor=true';
	var imgWea = "http://st.wetteronline.de/city/prozess/graphiken/symbole/standard/farbe/png/50x35/ms____.png";
	var sides = [
		{
			url: 'IMG/W.jpg',
			position: [ -70, 0, 0 ],
			rotation: [ 0, Math.PI / 2, 0 ]
		},
		{
			url: 'IMG/O.jpg',
			position: [ 70, 0, 0 ],
			rotation: [ 0, -Math.PI / 2, 0 ]
		},
		{
			url: imgWea,
			position: [ 0,  70, 0 ],
			rotation: [ Math.PI / 2, 0, Math.PI ]
		},
		{
			url: imgUrl,
			position: [ 0, -70, 0 ],
			rotation: [ - Math.PI / 2, 0, Math.PI ]
		},
		{
			url: 'IMG/N.jpg',
			position: [ 0, 0, 70 ],
			rotation: [ 0, Math.PI, 0 ]
		},
		{
			url: 'IMG/w.jpg',
			position: [ 0, 0, -70 ],
			rotation: [ 0, 0, 0 ]
		}
	];

	var cube = new THREE.Object3D();
	scene.add( cube );

	for ( var i = 0; i < sides.length; i ++ ) {

		var side = sides[ i ];
		var element = document.createElement( 'img' );
		element.style.opacity = "0.3";
		element.src = side.url;

		var object = new THREE.CSS3DObject( element );
		object.position.fromArray( side.position );
		object.rotation.fromArray( side.rotation );
		cube.add( object );

	}

	renderer = new THREE.CSS3DRenderer();
	renderer.setSize(70, 70);
	renderer.domElement.style.zindex = "9999";
	renderer.domElement.id = "O3D";
	document.getElementById ('VR').appendChild ( renderer.domElement );
	animate();
}
function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
}
