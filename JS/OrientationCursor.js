
var cursor = null;		// Cursor
var cursorL = 0;		// Initial Left
var cursorT = 0;		// Initial Top
var AccelL 	= 10;		// Acceleration Left
var AccelT	= 10;		// Acceleration Top
var OrientL = "A";		// Orient Left (Alpha, Beta, Gamma) PC(G), Landscape (B), Portrait ()
var OrientT = "G";		// Orient Top  (Alpha, Beta, Gamma) PC(B), Landscape (G), Portrait ()
var InvertL = false;	// Invertiere Left 
var InvertT = false;	// Invertiere Top

var InitA 	= 0;	// Initial Alpha
var InitB	= 0;	// Initial Beta
var InitG	= 0;	// Initial Gamma

var BoxWidth 	= 40;
var BoxHeight 	= 40;
var Opt1Selected = false;
var Opt2Selected = false;
var Opt1Timer = 0;
var Opt2Timer = 0;
var option1
var option2

function InitCursor(Left, Top){
	if (Left == 0){Left = window.innerWidth / 2;};  cursorL = Left;
	if (Top  == 0){Top  = window.innerHeight / 2;}; cursorT = Top;
	cursor = document.createElement ('img');
	cursor.src = "img/Mauszeiger.png";
	cursor.style.width = "20";
	cursor.style.position = "absolute";
	cursor.style.top = Top;
	cursor.style.left = Left;
	cursor.style.zIndex = 9999;
	document.body.appendChild (cursor);
}
function InitOnOff (){
	option1 = document.createElement ('input');
		option1.type 			= "button";
		option1.style.width 	= BoxWidth;
		option1.style.height 	= BoxHeight;
		option1.style.position 	= "absolute";
		option1.style.top 		= (window.innerHeight / 2) + 25;
		option1.style.left 		= (window.innerWidth / 2) + 25;
		option1.style.zIndex 	= 9998;
		option1.value 			= "Ein"
		document.body.appendChild (option1);
		
	option2 = document.createElement ('input');
		option2.type 			= "button";
		option2.style.width 	= BoxWidth;
		option2.style.height 	= BoxHeight;
		option2.style.position 	= "absolute";
		option2.style.top 		= (window.innerHeight / 2) + BoxHeight + 25;
		option2.style.left 		= (window.innerWidth / 2) + 25;
		option2.style.zIndex 	= 9998;
		option2.value 			= "Aus"
		document.body.appendChild (option2);
}

if (window.DeviceOrientationEvent) {
	window.addEventListener('deviceorientation', deviceMotionHandler, false);
}

function setOrientation (){
	if (eventData.gamma > 75 && eventData.gamma < 105){
		// Quer seitlich
		OrientL = "A";
		OrientT = "G";
		InvertT = true;
	}
	if (eventData.beta > 75 && eventData.beta < 105){
		// Hoch stehend
		OrientL = "G";
		OrientT = "B";
		InvertT = true;
	}
	if (eventData.alpha > 75 && eventData.alpha < 105){
		// Quer stehend
		OrientL = "B";
		OrientT = "G";
		InvertT = true;
	}
}

function deviceMotionHandler(eventData) {
	if (cursor == null) {return ""};
	
	// Ersten Status als Referenz merken
	// und bei jeder Bewegung mit Accel abziehen
	if (InitA == 0){InitA = eventData.alpha}
	if (InitB == 0){InitB = eventData.beta}
	if (InitG == 0){InitG = eventData.gamma}
	
	// Neue Cursorvariablen definieren
	// und den Cursor invertieren
	var CLeft	= 0;
	var CTop  	= 0;
	var InvL 	= 1; if (InvertL == true){InvL = -1}
	var InvT 	= 1; if (InvertT == true){InvT = -1}

	// Neue Cursorposition berechnen
	if (OrientL == "A"){CLeft = cursorL + (eventData.alpha * AccelL * InvL) - (InitA * AccelL)}
	if (OrientL == "B"){CLeft = cursorL + (eventData.beta  * AccelL * InvL) - (InitB * AccelL)}
	if (OrientL == "G"){CLeft = cursorL + (eventData.gamma * AccelL * InvL) - (InitG * AccelL)}
	if (OrientT == "A"){CTop  = cursorT + (eventData.alpha * AccelT * InvT) - (InitA * AccelT)}
	if (OrientT == "B"){CTop  = cursorT + (eventData.beta  * AccelT * InvT) - (InitB * AccelT)}
	if (OrientT == "G"){CTop  = cursorT + (eventData.gamma * AccelT * InvT) - (InitG * AccelT)}
	
	// Wenn Cursor ansteht
	if (CLeft >= window.innerWidth - AccelL){
		CLeft = window.innerWidth -1 - AccelL;
		cursorL = window.innerWidth -1 - AccelL;
		if (OrientL == "A"){InitA = 0};
		if (OrientL == "B"){InitB = 0};
		if (OrientL == "G"){InitG = 0};
	}
	if (CLeft <= window.innerWidth / 2){
		CLeft 	= (window.innerWidth / 2) + 1;		
		cursorL = (window.innerWidth / 2) + 1;
		if (OrientL == "A"){InitA = 0};
		if (OrientL == "B"){InitB = 0};
		if (OrientL == "G"){InitG = 0};
	}
	if (CTop  >= window.innerHeight - AccelT){
		CTop 	= window.innerHeight -1 - AccelT;
		cursorT = window.innerHeight -1 - AccelT;
		if (OrientT == "A"){InitA = 0};
		if (OrientT == "B"){InitB = 0};
		if (OrientT == "G"){InitG = 0};
	}
	if (CTop  <= 0)					{
		CTop 	= 1;
		cursorT = 1;
		if (OrientT == "A"){InitA = 0};
		if (OrientT == "B"){InitB = 0};
		if (OrientT == "G"){InitG = 0};
	}
	
	// Cursor setzen
	cursor.style.left = CLeft;
	cursor.style.top  = CTop;

	// gewählte Optionen prüfen
	if (CLeft >= option1.offsetLeft - 20 			&& 
		CLeft <= option1.offsetLeft - 20 + BoxWidth	&&
		CTop  >= option1.offsetTop 					&&
		CTop  <= option1.offsetTop  + BoxHeight)
		{
			option1.style.backgroundColor = "grey";
			if (Opt1Selected == false){
				Opt1Selected = true;
				setTimeout ("Increase(1)",250);
				setTimeout ("CheckClick(1)",2000);
			}
		} else {
			option1.style.backgroundColor = "white";
			Opt1Selected = false;
			Opt1Timer    = 0;
		}
	
	if (CLeft >= option2.offsetLeft - 20 			&& 
		CLeft <= option2.offsetLeft - 20 + BoxWidth	&&
		CTop  >= option2.offsetTop 					&&
		CTop  <= option2.offsetTop  + BoxHeight)
		{
			option2.style.backgroundColor = "grey";
			if (Opt2Selected == false){
				Opt2Selected = true;
				setTimeout ("Increase(2)",250);
				setTimeout ("CheckClick(2)",3000);
			}
		} else {
			option2.style.backgroundColor = "white";
			Opt2Selected = false;
			Opt2Timer    = 0;
		}
	
}

function CheckClick (val) {
	// Ticks abwarten 
	// ersten und letzten Tick abziehen
	if (val == 1) {
		if (Opt1Selected  == true){
			if (Opt1Timer >= 6){
				Opt1Timer 	 = 0;
				Opt1Selected = false;
				UIkit.notify({message: "Option 1 wurde geklickt", timeout: 1000});
				var http = new XMLHttpRequest();
				http.open("GET", "https://192.168.7.120:8000/" + lastQRCode + " ein" , true);
				http.send();
				cursor.parentNode.removeChild(cursor);
				option1.parentNode.removeChild(option1);
				option2.parentNode.removeChild(option2);
				option1 = null;
				option2 = null;
				cursor  = null;
			}
		}
	}
	if (val == 2) {
		if (Opt2Selected  == true){
			if (Opt2Timer >= 6){
				Opt2Timer 	 = 0;
				Opt2Selected = false;
				UIkit.notify({message: "Option 2 wurde geklickt", timeout: 1000});
				var http = new XMLHttpRequest();
				http.open("GET", "https://192.168.7.120:8000/" + lastQRCode + " aus" , true);
				http.send();
				cursor.parentNode.removeChild(cursor);
				option1.parentNode.removeChild(option1);
				option2.parentNode.removeChild(option2);
				option1 = null;
				option2 = null;
				cursor  = null;
			}
		}
	}
}
function Increase (val) {
	if (val == 1) {
		if (Opt1Selected == true){
			Opt1Timer 	 += 1;
			setTimeout ("Increase(1)",250);
		}else{
			Opt1Timer 	 == 0;
			Opt1Selected = false;
		}
	}
	if (val == 2) {
		if (Opt2Selected == true){
			Opt2Timer 	 += 1;
			setTimeout ("Increase(2)",250);
		}else{
			Opt2Timer 	 == 0;
			Opt2Selected = false;
		}
	}
}