
var button2 = document.getElementById("button2");
var ctxb2 = button2.getContext("2d");
button2.width = 66;
button2.height = 63;


var buttonI2 = new Image();
var buttondownI2 = new Image();
buttonI2.src = "images/templates/button.png";
buttondownI2.src = "images/templates/buttonclicked.png";

buttonI2.onload = function(){
	ctxb2.drawImage(buttonI2,0, 0);
	
};

button2.onmousedown = function(){
   ctxb2.drawImage(buttondownI2,0,0);
   buttonclicked2=true;
};

button2.onmouseup = function(){
	if(buttonclicked2){
		ctxb2.drawImage(buttonI2,0,0);
		if(!pet.isBusy && !pet.isDead && pet.level!=0){	
			if(iconstat==1){
				feed();
				if(pet.isSleeping){
					if(pet.energyLevel<2)
						pet.energyLevel+=2;
					pet.isSleeping=false;
					pet.careMistakes++;
				}
			}
			else if (iconstat==2){
				pet.isBusy=true;
				clearInterval(mainInt);
				if(pet.isSick || pet.energyLevel<3){
					no();
					if(pet.isSleeping){
						if(pet.energyLevel<2)
							pet.energyLevel+=2;
						pet.isSleeping=false;
						pet.careMistakes++;
					}
				}
				else{
					train();
					if(pet.isSleeping){
						if(pet.energyLevel<2)
							pet.energyLevel+=2;
						pet.isSleeping=false;
						pet.careMistakes++;
					}
				}
			}
			else if (iconstat==3){
				flush();
			}
			else if (iconstat==4){
				medicine();
				if(pet.isSleeping){
					if(pet.energyLevel<2)
						pet.energyLevel+=2;
					pet.isSleeping=false;
					pet.careMistakes++;
				}
			}
			else if (iconstat==5){
				pet.isBusy=true;
				clearInterval(mainInt);
				lightscreen = true;
				if(lightsToBeOn)
					ctx.drawImage(lightson,0,0);
				else
					ctx.drawImage(lightsoff,0,0);
			}
		}
		else if (trainGameInProgress){
			userChoice = 2;
			playoutTrain();
		}
		else if (sickGameInProgress){
			if (syringePos == 1)
				needleHeight = 31;
			else if (syringePos == 2)
				needleHeight = 73;
			else if (syringePos == 3)
				needleHeight = 115;
			sickGameInProgress = false;
			sickPlayOut = true;
			
		}
			
		else if(powerscreen){
			clearInterval(powerseq);
			powerscreen=false;
			setTimeout(flushGameResults,500);
		}
		else if(lightscreen){
			lightscreen = false;
			lightsToggle();
		}
		else if(!pet.lights && iconstat==5 && !pet.isDead && pet.level!=0){
			pet.isBusy=true;
			clearInterval(mainInt);
			lightscreen = true;
			if(lightsToBeOn)
				ctx.drawImage(lightson,0,0);
			else
				ctx.drawImage(lightsoff,0,0);
		}
		buttonclicked2=false;
	}
	
};

button2.onmouseout = function(){
	ctxb2.drawImage(buttonI2,0,0);
};

button2.onmouseover = function(){
	if(buttonclicked2)
		ctxb2.drawImage(buttondownI2,0,0);
};