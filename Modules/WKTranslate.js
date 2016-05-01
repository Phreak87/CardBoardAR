function Translate(Text) {
	var http = new XMLHttpRequest();
	http.open("GET", "https://mymemory.translated.net/api/get?q=" + Text + "&langpair=de|en", true);
	http.onload = function(e) {
		if (this.status === 200) {
			var fileToLoad = http.response;		
			var data = jQuery.parseJSON(fileToLoad);
			UIkit.notify({message: "de-en: " + data.matches[0].translation, timeout: 2000});
		}
	}
	http.send();
}