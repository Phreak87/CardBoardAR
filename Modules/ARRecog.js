var recognition = new webkitSpeechRecognition();
var lastRecog  = "" ;
		
recognition.lang = "de-DE";
//recognition.continuous = true;
recognition.interimResults = false;
recognition.onresult = function(event) { 
		var resu = event.results[0][0].transcript;
		if (resu != ""){
			//if (resu != lastRecog) {
				UIkit.notify({
					message : resu,
					status  : 'info',
					timeout : 2000,
					pos     : 'top-right'
				});
				lastRecog = resu;
				Translate (resu);
				say(resu);
				var http = new XMLHttpRequest();
				http.open("GET", "https://192.168.7.120:8000/" + lastQRCode , true);
				http.send();
			//}
		}
}
recognition.onend = function(event) { 
	recognition.start();
}
recognition.start();