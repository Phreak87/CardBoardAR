	function say(Words){
		var msg = new SpeechSynthesisUtterance();
		var voices 	= window.speechSynthesis.getVoices();
		msg.voice 	= voices[10];
		msg.voiceURI = 'native';
		msg.volume 	= 1; 	// 0 to 1
		msg.rate 	= 1; 	// 0.1 to 10
		msg.pitch 	= 2; 	// 0 to 2
		msg.text 	= Words;
		msg.lang 	= 'de-DE';
		speechSynthesis.speak(msg);
	}