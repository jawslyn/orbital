
var iconbar = document.getElementById("iconbar");
var ctxicon = iconbar.getContext("2d");
iconbar.width = 289;
iconbar.height = 205;

var buttonclicked1 = false;
var buttonclicked2 = false;
var buttonclicked3 = false;
var iconbartop = new Image();
var iconbarbot = new Image();
var iconfood = new Image();
var icontrain = new Image();
var iconflush = new Image();
var iconmedicine = new Image();
var iconlights = new Image();
var iconalert = new Image();
var iconalertoff = new Image();

iconbartop.src = "images/icons/topbar.png";
iconbarbot.src = "images/icons/bottombar.png";
iconfood.src = "images/icons/food.png";
icontrain.src = "images/icons/train.png";
iconflush.src = "images/icons/flush.png";
iconmedicine.src = "images/icons/medicine.png";
iconlights.src = "images/icons/lights.png";
iconalert.src = "images/icons/alert.png";
iconalertoff.src = "images/icons/alertoff.png";
iconbartop.onload = function(){
	ctxicon.drawImage(iconbartop,0, 0);
};
iconbarbot.onload = function(){
	ctxicon.drawImage(iconbarbot,0, 175);
};
iconalertoff.onload = function(){
	ctxicon.drawImage(iconalertoff,0, 175);
};


var changeIcon = function(){
	if(!pet.isDead && pet.level!=0 && !pet.isBusy){ //if pet is not dead or egg or busy, then you can navigate
		if (iconstat ==0){
			ctxicon.drawImage(iconfood,0, 0);
		}
		else if (iconstat==1){
			ctxicon.drawImage(icontrain,0, 0);
		}
		else if (iconstat==2){
			ctxicon.drawImage(iconflush,0, 0);
		}
		else if (iconstat==3){
			ctxicon.drawImage(iconbartop,0, 0);
			ctxicon.drawImage(iconmedicine,0, 175);
		}
		else if (iconstat==4){
			ctxicon.drawImage(iconlights,0, 175);
		}
		else if (iconstat==5){
			ctxicon.drawImage(iconbartop,0, 0);
			ctxicon.drawImage(iconbarbot,0, 175);
			iconstat=-1;
		
		}
		iconstat++;
	}
	else if(!pet.lights){ 
		if (iconstat ==0){
			ctxicon.drawImage(iconfood,0, 0);
		}
		else if (iconstat==1){
			ctxicon.drawImage(icontrain,0, 0);
		}
		else if (iconstat==2){
			ctxicon.drawImage(iconflush,0, 0);
		}
		else if (iconstat==3){
			ctxicon.drawImage(iconbartop,0, 0);
			ctxicon.drawImage(iconmedicine,0, 175);
		}
		else if (iconstat==4){
			ctxicon.drawImage(iconlights,0, 175);
		}
		else if (iconstat==5){
			ctxicon.drawImage(iconbartop,0, 0);
			ctxicon.drawImage(iconbarbot,0, 175);
			iconstat=-1;
		
		}
		iconstat++;
	}
};

var needAttention = function(){
	clearTimeout( mistakeTimer );
	ctxicon.drawImage(iconalert,0, 175);
	mistakeTimer = setTimeout(function(){ctxicon.drawImage(iconalertoff,0, 175);
		},120000); //2mins of negligence will make 1 care mistake
	if (foodattention)
		foodmistakeTimer= setTimeout(function(){foodattention==false;pet.careMistakes++;
		},120000); 
	else if (sickattention)
		sickmistakeTimer=setTimeout(function(){sickattention==false;;pet.careMistakes++;
		},120000); 
};


var iconstat = 0; //0 is default
var mistakeTimer;
var foodmistakeTimer;
var sickmistakeTimer;
var instructchange = 1;
var lightscreen = false;
var lightsToBeOn = true;
var powerscreen = false;
