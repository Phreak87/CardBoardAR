var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;

function logBattery(battery) {
	$("#Battery").html (battery.level + "% Bat.");
	setTimeout ("InitBat()",6000);
}

function InitBat(){
	if(navigator.getBattery) {
		navigator.getBattery().then(logBattery, function() {});
	} else if (battery) {
		logBattery(battery);
	} else {}
}

InitBat();