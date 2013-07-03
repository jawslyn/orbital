
var gametemplate = document.getElementById("gametemplate");
var ctxtemp = gametemplate.getContext("2d");
gametemplate.width = 489;
gametemplate.height = 305;


var gametemp = new Image();


gametemp.src = "images/templates/template.png";

gametemp.onload = function(){
	ctxtemp.drawImage(gametemp,0, 0);
	
};










