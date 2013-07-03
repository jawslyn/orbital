
var button1 = document.getElementById("button1");
var ctxb1 = button1.getContext("2d");
button1.width = 66;
button1.height = 63;


var buttonI1 = new Image();
var buttondownI1 = new Image();
buttonI1.src = "images/templates/button.png";
buttondownI1.src = "images/templates/buttonclicked.png";

buttonI1.onload = function(){
	ctxb1.drawImage(buttonI1,0, 0);
	
};

button1.onmousedown = function(){
   ctxb1.drawImage(buttondownI1,0,0);
   buttonclicked1=true;
    
};

button1.onmouseup = function(){button1clicked()};
var button1clicked = function(){
	if(buttonclicked1){
		ctxb1.drawImage(buttonI1,0,0);
		if(lightscreen){//if screen is lights, button 1 functions differently
			if (lightsToBeOn){
				lightsToBeOn=false;
				ctx.drawImage(lightsoff,0,0);
			}
			else{
				lightsToBeOn=true;
				ctx.drawImage(lightson,0,0);
			}
		}
		else if (trainGameInProgress){
			userChoice = 1;
			playoutTrain();
		}
		else if (sickGameInProgress){
			if (syringePos > 1)
				syringePos--;
		}
			
		else
			changeIcon();
		buttonclicked1=false;
	}
};

button1.onmouseout = function(){
	ctxb1.drawImage(buttonI1,0,0);
};

button1.onmouseover = function(){
	if(buttonclicked1)
		ctxb1.drawImage(buttondownI1,0,0);
};