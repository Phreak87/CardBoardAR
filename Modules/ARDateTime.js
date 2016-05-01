function Time() {
	$("#DateTime").html (new Date().toLocaleString())
	setTimeout(Time,1000);
}
Time();