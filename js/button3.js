
var button3 = document.getElementById("button3");
var ctxb3 = button3.getContext("2d");
button3.width = 66;
button3.height = 63;


var buttonI3 = new Image();
var buttondownI3 = new Image();
buttonI3.src = "images/templates/button.png";
buttondownI3.src = "images/templates/buttonclicked.png";

buttonI3.onload = function(){
	ctxb3.drawImage(buttonI3,0, 0);
	
};

button3.onmousedown = function(){
   ctxb3.drawImage(buttondownI3,0,0);
   buttonclicked3=true;
};

button3.onmouseup = function(){button3clicked()};
var button3clicked = function(){
	if(buttonclicked3){
		ctxb3.drawImage(buttonI3,0,0);
		if(!pet.isBusy){
			iconstat=5;
			changeIcon();
		}
		
		else if (trainGameInProgress){
			userChoice = 3;
			playoutTrain();
		}
		else if (sickGameInProgress){
			if (syringePos < 3)
				syringePos++;
		}
			
		else if(lightscreen){
			pet.isBusy=false;
			lightscreen=false;
			main();
			mainInt = setInterval(main,777); 
		}
		else if(!pet.lights){
			iconstat=5;
			changeIcon();
		}
	buttonclicked3=false;
	}
};

button3.onmouseout = function(){
	ctxb3.drawImage(buttonI3,0,0);
};

button3.onmouseover = function(){
	if(buttonclicked3)
		ctxb3.drawImage(buttondownI3,0,0);
};

