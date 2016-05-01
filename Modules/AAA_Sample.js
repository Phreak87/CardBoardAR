var Last___Stat = 0;

window.onload=function (){
	if (Use___ == true){
		head.load (
			"___.js",
				function (){
					Init___();
					UIkit.notify({message: "Modul ___ geladen", timeout: 1000});
				}
			)
	}
}

function Init___(){
	$("#Selector").html ("Status");
	UIkit.notify({message: "Status", timeout: 600});
	setTimeout ("Init___()",6000);
}