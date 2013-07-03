// Create the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 289;
canvas.height = 145;

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/screen.png";
var screenleftlimit =0;
var shitanimation = false;
var playerName = "defaultPlayer";
var sleepanimation = false;
var egganimation = false;
var happyAnimation = false;
var noAnimation = false;

// pet image
var petReady = false;
var egg1 = new Image();
var egg2 = new Image();
var hatch1 = new Image();
var petImage1 = new Image();
var petImage2 = new Image();
var petImage3 = new Image();
var petImage4 = new Image();
var petImage0 = new Image();
var petHappy = new Image();
var petSad = new Image();
var petNo1 = new Image();
var petNo2 = new Image();
var shit1_1 = new Image();
var shit1_2 = new Image();
var shit2_1 = new Image();
var shit2_2 = new Image();
var sickLogo = new Image();
var sun = new Image();
var sad1 = new Image();
var sad2 = new Image();
var sickorsleep = new Image();
var sleepLogo1 = new Image();
var sleepLogo2 = new Image();
var deathscreen = new Image();
var lightson = new Image();
var lightsoff = new Image();
var e_ = new Image();
var v_ = new Image();
var o_ = new Image();
var l_ = new Image();
var u_ = new Image();
var t_ = new Image();
var i_ = new Image();
var n_ = new Image();
var s_ = new Image();
var num = new Array();
petImage1.onload = function () {
	petReady = true;
};
egg1.src = "images/egg/egg1.png";
egg2.src = "images/egg/egg2.png";
hatch1.src = "images/egg/hatch.png";
petImage1.src = "images/baby/movement/1.png";
petImage2.src = "images/baby/movement/-1.png";
petImage3.src = "images/baby/movement/2.png";
petImage4.src = "images/baby/movement/-2.png";
petImage0.src = "images/baby/movement/4.png";
petHappy.src = "images/baby/happy.png";
petSad.src = "images/baby/sad.png";
petNo1.src = "images/baby/no1.png";
petNo2.src = "images/baby/no2.png";
sickorsleep.src = "images/baby/sickorsleep.png";
sleepLogo1.src ="images/sleep1.png";
sleepLogo2.src ="images/sleep2.png";
shit1_1.src = "images/poop1.png";
shit1_2.src = "images/poop2.png";
shit2_1.src = "images/2poop1.png";
shit2_2.src = "images/2poop2.png";
sickLogo.src = "images/sickLogo.png";
sun.src = "images/sun.png";
sad1.src = "images/sad1.png";
sad2.src = "images/sad2.png";
deathscreen.src = "images/death.png";
lightson.src="images/templates/on.png";
lightsoff.src="images/templates/off.png";
e_.src = "images/alphabet/e.png";
v_.src = "images/alphabet/v.png";
o_.src = "images/alphabet/o.png";
l_.src = "images/alphabet/l.png";
u_.src = "images/alphabet/u.png";
t_.src = "images/alphabet/t.png";
i_.src = "images/alphabet/i.png";
n_.src = "images/alphabet/n.png";
s_.src = "images/alphabet/s.png";
for (var i=0; i<=9; i++){
	num[i] = new Image();
	num[i].src = "images/alphabet/" + i + ".png";
}



// Game objects
var pet = {
	name: "MyPet",
	imagesize: 0,
	isBusy:false, //if pet is doing stuff
	chanceToFallSick: 10, // 10/10000 chance of falling sick by default , i.e. 0.1% chance
	age: 0, //age is seconds
	level: 0, //level 0 is egg, level 1 is baby, level 2 is child, level 3 is adult
	type: 0, //type is the different evolution paths, child have 2 types, adult have 3 types
	careMistakes: 0, //care mistakes determine evolution path
	training: 0, //training is prerequisites to evolve
	currentFoodLevel: 2,
	currentFoodCapacity: 0,//the max amount of food pet can consume, this amount will increase as pet grows bigger
	energyLevel: 100,	//0-100% when energy becomes 0, pet goes to sleep
	maxEnergy: 100,
	isDead: false, //if pet died
	isHungry: false, //if pet is hungry
	isSleeping: false, //if pet is sleeping
	isSick: false, //if pet is sick
	lights: true, //on or off the lights for pet to sleep
	chanceToShit: 7,
	shitcount: 0, //how many shit there are
	willEvolveAt: 39, //countdown time to evolve to next stage, default value is 39, i.e. 30 secs for egg to hatch
	
	moveleftbefore:true,
	moverightbefore:false,
	stayinspotbefore:false,
	goingLeft: true
};


// movements
var update = function (modifier) {
	var randomnum=(Math.random()*100); //this will randomize movements of pet, and if the pet moves left, it will tend to go left again
	if (pet.goingLeft)			// same for the right direction, but if it stays in the sport, its next move is most probably left or right depending on the the next last move
		randomnum-=22;
	else if (!pet.goingLeft)
		randomnum+=22;
	else if	(pet.stayinsportbefore){
		if (randomnum >=50)
			randomnum+=7;
		else
			randomnum-=7;
	}
	if (randomnum<43 && pet.x >=  screenleftlimit+19) { 
		pet.x -= 12;
		pet.moveleftbefore=true;
		pet.moverightbefore=false;
		pet.stayinsportbefore=false;
	}
	else if (randomnum<57 && pet.x >=  screenleftlimit+19){ 
		pet.stayinsportbefore=true;
		if (Math.random()*100<50){
			pet.moveleftbefore=true;
			pet.moverightbefore=false;
		}
		else{
			pet.moveleftbefore=false;
			pet.moverightbefore=true;
		}
	}
	else if (pet.x<=canvas.width-pet.imagesize-19){ 
		pet.x += 12;
			pet.moveleftbefore=false;
			pet.moverightbefore=true;
		pet.stayinsportbefore=false;
		if(pet.x>=canvas.width-pet.imagesize-19){ //when pet moves to the right most side, tweak next move to be left
			pet.moveleftbefore=true;
		}
		
	}
	if (pet.x<=screenleftlimit+18)
		pet.goingLeft=false;
	else if (pet.x>=canvas.width-pet.imagesize-18)
		pet.goingLeft = true;

};

// Draw everything
var render = function () {
	if (bgReady) { //draw background pixel grid
		ctx.drawImage(bgImage, 0, 0);
	}
	
	
	
	if (petReady) { //
		if (pet.shitcount==1){
			if (shitanimation){
				ctx.drawImage(shit1_1,0, 0);
				shitanimation = !shitanimation;
			}
			else {
				ctx.drawImage(shit1_2,0, 0);
				shitanimation = !shitanimation;
			}
		}
		else if (pet.shitcount==2){
			if (shitanimation){
				ctx.drawImage(shit2_1,0, 0);
				shitanimation = !shitanimation;
			}
			else {
				ctx.drawImage(shit2_2,0, 0);
				shitanimation = !shitanimation;
			}
		}
		else if (pet.shitcount==3){
			if (shitanimation){
				ctx.drawImage(shit1_1,42, 0);
				ctx.drawImage(shit2_1,0, 0);
				shitanimation = !shitanimation;
			}
			else {
				ctx.drawImage(shit1_2,42, 0);
				ctx.drawImage(shit2_2,0, 0);
				shitanimation = !shitanimation;
			}
		}
		else if (pet.shitcount==4){
			if (shitanimation){
				ctx.drawImage(shit2_1,0, 0);
				ctx.drawImage(shit2_1,42, 0);
				shitanimation = !shitanimation;
			}
			else {
				ctx.drawImage(shit2_2,0, 0);
				ctx.drawImage(shit2_2,42, 0);
				shitanimation = !shitanimation;
			}
		}
		var randomnum=Math.floor((Math.random()*100))%2;
		if(!pet.isSick && !pet.isSleeping){
			if(pet.x>13+screenleftlimit){ //randomized pictures of pet
				if(pet.moverightbefore){
					if (randomnum===0)
						ctx.drawImage(petImage3, pet.x, pet.y);
					else if (randomnum===1)
						ctx.drawImage(petImage4, pet.x, pet.y);
				}
				else if(pet.moveleftbefore){
					if(randomnum==0)
						ctx.drawImage(petImage1, pet.x, pet.y);
					else if (randomnum===1)
						ctx.drawImage(petImage2, pet.x, pet.y);
				}
			}	
			else
				ctx.drawImage(petImage0, pet.x, pet.y);
		}
		else if (pet.isSleeping){
			if(sleepanimation){
				ctx.drawImage(sleepLogo1,0, 0);
				ctx.drawImage(sickorsleep, pet.x , 0);
				sleepanimation = !sleepanimation;
			}
			else{
				ctx.drawImage(sleepLogo2,0,0);
				ctx.drawImage(sickorsleep, pet.x , 0);
				sleepanimation=!sleepanimation;
			}
				
		}
		else{ //if pet is sick && not sleeping
			ctx.drawImage(sickLogo, 0, 0);
			ctx.drawImage(sickorsleep, pet.x , 0);
		}
	}
	

};

var renderEgg = function () {
	if (bgReady) { //draw background pixel grid
		ctx.drawImage(bgImage, 0, 0);
	}
	if (egganimation){
		ctx.drawImage(egg1,0,0);
		egganimation = false;
	}
	else{
		ctx.drawImage(egg2,0,0);
		egganimation = true;
	}
}
//hatch
var hatch = function(){
	var hatchInterval = setInterval(hatching, 30);
	setTimeout(function( ) { clearInterval(hatchInterval); }, 1300);
	setTimeout(function( ) { ctx.drawImage(hatch1,0,0); }, 1350);
	
};
var hatching = function(){
	if(eggCount==2 || eggCount==10 || eggCount==18 || eggCount==26 || eggCount==34){
		ctx.drawImage(egg1,-12,0);
	}
	else if (eggCount==1 || eggCount==3 || eggCount==9 || eggCount==11 || eggCount==17 || eggCount==19 || eggCount==25 || eggCount==27 || eggCount==33 || eggCount==35){
		ctx.drawImage(egg1,-6,0);
	}
	else if (eggCount==0 || eggCount==4 || eggCount==8 || eggCount==12 || eggCount==16 || eggCount==20 || eggCount==24 || eggCount==28 || eggCount==32 || eggCount==36 || eggCount==40){
		ctx.drawImage(egg1,0,0);
	}
	else if (eggCount==5 || eggCount==7 || eggCount==13 || eggCount==15 || eggCount==21 || eggCount==23 || eggCount==29 || eggCount==31 || eggCount==37 || eggCount==39){
		ctx.drawImage(egg1,6,0);
	}
	else if (eggCount==6 || eggCount==14 || eggCount==22 || eggCount==30 || eggCount==38){
		ctx.drawImage(egg1,12,0);
	}
	eggCount++;
	
};
var evolution = function(){
	
	if(evolveseqcount==0){
		if (bgReady) { //draw background pixel grid
			ctx.drawImage(bgImage, 0, 0);
		}
		ctx.drawImage(e_, 31,55);
	}
	else if(evolveseqcount==1)
		ctx.drawImage(v_, 55, 55);
	else if(evolveseqcount==2)
		ctx.drawImage(o_, 79 , 55);
	else if(evolveseqcount==3)
		ctx.drawImage(l_, 103 , 55);
	else if(evolveseqcount==4)
		ctx.drawImage(u_, 127 , 55);
	else if(evolveseqcount==5)
		ctx.drawImage(t_, 151 , 55);
	else if(evolveseqcount==6)
		ctx.drawImage(i_, 175 , 55);
	else if(evolveseqcount==7)
		ctx.drawImage(o_, 199, 55);
	else if(evolveseqcount==8)
		ctx.drawImage(n_, 223, 55);
	evolveseqcount++;
};
//creation of shit
var shit = function (){ 
	var randomnum = Math.random()*1000;//chance of getting a shit is pet.chanceToShit/1000% every 0.777second
	if (pet.currentFoodLevel*2 > pet.currentFoodCapacity)//if current food level is more than half of food capacity, chance to shit increase by 0.3%
		randomnum-=3;
	if (randomnum < pet.chanceToShit){
		pet.shitcount++;
		if (pet.shitcount ==1 ||pet.shitcount ==3){
			screenleftlimit+=42;
			pet.x+=42;
		}
		if (pet.shitcount ==4) //letting shitcount reach 4 contributes to a caremistake
			pet.careMistakes++;
	}

};


var fallsick = function(){
	var randomnum = Math.random()*10000;//chance of getting sick is 0.09% every 0.777second
	if (randomnum < (pet.chanceToFallSick + pet.shitcount*4 - (pet.level)*2)){ //each shit increases chance of falling sick by 0.04%
		pet.isSick=true;												// every increase in level reduce chance by 0.02% level 1 reduction is 0, level2 reduction is 2, level 3 reduction is 4
		sickOnset = true;
	}
};
//feed pet
var feed = function(){
	clearInterval(mainInt);
	pet.isBusy=true;
	if (pet.currentFoodLevel>=pet.currentFoodCapacity){
		if(overfeedOnset){
			overfeedOnset=false;
			pet.careMistakes++;
		}
		no();
	}
	else{
		foodgame();
	}
};
//training
var train = function(){
	if(pet.energyLevel>=3)
		pet.energyLevel-=3;
	else
		pet.energyLevel=0;
	
	trainGame();
	
};
//flush shit away
var flush = function(){
	clearInterval(mainInt);
	pet.isBusy=true;
	flushGame();
	
};
//heal pet
var medicine = function(){
	if(pet.isSick){
		sickGameInProgress=false;
		sickPlayOut = false;
		syringePos = 2;
		sickCounterGame = 0;
		randomCounter = 0;
		sickHit = false;
		if (Math.ceil(Math.random()*2) == 1)
			sicknessMoveUp = false;
		else
			sicknessMoveup = true;
		needleFlight = 0;
		needleHeight =0;
		var sickHeight = 55;
		clearInterval(mainInt);
		pet.isBusy=true;
		sickGame();
	}
	else{
		clearInterval(mainInt);
		pet.isBusy=true;
		no();
	}
};
// on and off lights
var lightsToggle = function(){ 
	if(!lightsToBeOn){ //if lights are on, and want to turn lights off
		bgImage.src= "images/lightsout.png"
		sleepLogo1.src ="images/sleep1white.png";
		sleepLogo2.src ="images/sleep2white.png";
		pet.lights=false;
		pet.isBusy=true;
	}
	else{//if lights are off, and want to turn lights on
		bgImage.src= "images/screen.png"
		sleepLogo1.src ="images/sleep1.png";
		sleepLogo2.src ="images/sleep2.png";
		pet.lights=true;
		pet.isBusy=false;
	}
	setTimeout(main, 5);
	mainInt = setInterval(main,777); 
};
//happy!
var happy = function(){
	pet.x = Math.ceil((canvas.width/2 - pet.imagesize/2-1)/12+1)*12+1;
	if (bgReady) { //draw background pixel grid
		ctx.drawImage(bgImage, 0, 0);
		ctx.drawImage(petImage1, pet.x, 0);
	}
	happyAnimation = false;
	var happyseq = setInterval(happyrender, 777);
	setTimeout(function( ) { clearInterval(happyseq); pet.isBusy=false;}, 4690);
	setTimeout(function(){mainInt = setInterval(main,777);},4700);
};
var happyrender = function(){
	if (bgReady) { //draw background pixel grid
		ctx.drawImage(bgImage, 0, 0);
	}
	if (happyAnimation){
		happyAnimation = false;
		ctx.drawImage(petImage1, pet.x, 0);
	}
	else{
		happyAnimation = true;
		ctx.drawImage(petHappy, pet.x, 0);
		ctx.drawImage(sun,0,0);
		
	}
};
var sad = function(){
	pet.x = Math.ceil((canvas.width/2 - pet.imagesize/2-1)/12+1)*12+1;
	if (bgReady) { //draw background pixel grid
		ctx.drawImage(bgImage, 0, 0);
		ctx.drawImage(petImage1, pet.x, 0);
		ctx.drawImage(sad2,0,0);
	}
	happyAnimation = false;
	var sadseq = setInterval(sadrender, 777);
	setTimeout(function( ) { clearInterval(sadseq); pet.isBusy=false;}, 4690);
	setTimeout(function(){mainInt = setInterval(main,777);},4700);
};
var sadrender = function(){
	if (bgReady) { //draw background pixel grid
		ctx.drawImage(bgImage, 0, 0);
	}
	if (happyAnimation){
		happyAnimation = false;
		ctx.drawImage(petImage1, pet.x, 0);
		ctx.drawImage(sad2,0,0);
	}
	else{
		happyAnimation = true;
		ctx.drawImage(petSad, pet.x, 0);
		ctx.drawImage(sad1,0,0);
		
	}
};
//no i dun want
var no = function(){
	pet.x = Math.ceil((canvas.width/2 - pet.imagesize/2-1)/12+1)*12+1;
	if (bgReady) { //draw background pixel grid
		ctx.drawImage(bgImage, 0, 0);
		ctx.drawImage(petNo1, pet.x, 0);
	}
	var noseq = setInterval(norender, 777);
	setTimeout(function( ) { clearInterval(noseq); pet.isBusy=false;}, 3140);
	setTimeout(function(){mainInt = setInterval(main,777);},3150);
};
var norender = function(){
	if (bgReady) { //draw background pixel grid
		ctx.drawImage(bgImage, 0, 0);
	}
	if (noAnimation){
		noAnimation = false;
		ctx.drawImage(petNo1, pet.x, 0);
	}
	else{
		noAnimation = true;
		ctx.drawImage(petNo2, pet.x, 0);
		
	}
};
//evolution
var evolve = function(){
	if (pet.level == 0){//egg to hatch
		clearInterval(mainInt);
		hatch();
		setTimeout(function(){
			mainInt = setInterval(main, 777);  /////////////////////////////////////////////////main timing
			pet.level++;
			pet.willEvolveAt= 1158; //to be changed to 1158, i.e. 15 mins
			pet.currentFoodCapacity=20;
			pet.careMistakes=0; //to be changed
			pet.maxEnergy= 20;
			pet.imagesize=71;
			petImage1.src = "images/baby/movement/1.png";
			petImage2.src = "images/baby/movement/-1.png";
			petImage3.src = "images/baby/movement/2.png";
			petImage4.src = "images/baby/movement/-2.png";
			petImage0.src = "images/baby/movement/4.png";
			petHappy.src = "images/baby/happy.png";
			petSad.src = "images/baby/sad.png";
			petNo1.src = "images/baby/no1.png";
			petNo2.src = "images/baby/no2.png";
			sickorsleep.src = "images/baby/sickorsleep.png";
			countForEvolution=0;
			pet.chanceToShit = 9;
			pet.x = Math.ceil((canvas.width/2 - pet.imagesize/2-1)/12+1)*12+1;
		}
		, 2100);
		
	}
	else if(pet.level==1){//baby to child
		
		clearInterval(mainInt);
		evolveseqcount = 0;	
		pet.isBusy = true;
		var evolutionseq = setInterval(evolution, 100);
		setTimeout(function( ) { clearInterval(evolutionseq); }, 950);
		setTimeout(function(){
			mainInt = setInterval(main,777);
			if(pet.careMistakes<=2)
				pet.type=1;
			else if(pet.careMistakes>=3 && pet.careMistakes <10)
				pet.type=2;
			else if(pet.careMistakes>=10)
				pet.type=3;
			pet.level++;
			pet.careMistakes=0;//to be changed
			pet.willEvolveAt = 3475; //to be changed to 3475, i.e. 45mins
			pet.chanceToShit = 5;
			if (pet.type == 1){
				pet.imagesize=101;
				pet.currentFoodCapacity=38;
				pet.maxEnergy= 50;
				petImage1.src = "images/child1/movement/1.1.png";
				petImage2.src = "images/child1/movement/2.1.png";
				petImage3.src = "images/child1/movement/1.2.png";
				petImage4.src = "images/child1/movement/2.2.png";
				petImage0.src = "images/child1/movement/0.png";
				petHappy.src = "images/child1/happy.png";
				petSad.src = "images/child1/sad.png";
				petNo1.src = "images/child1/no1.png";
				petNo2.src = "images/child1/no2.png";
				sickorsleep.src = "images/child1/sickorsleep.png";
			}
			else if (pet.type == 2){
				pet.imagesize=71;
				pet.currentFoodCapacity=42;
				pet.maxEnergy= 46;
				petImage1.src = "images/child2/movement/1.1.png";
				petImage2.src = "images/child2/movement/2.1.png";
				petImage3.src = "images/child2/movement/1.2.png";
				petImage4.src = "images/child2/movement/2.2.png";
				petImage0.src = "images/child2/movement/0.png";
				petHappy.src = "images/child2/happy.png";
				petSad.src = "images/child2/sad.png";
				petNo1.src = "images/child2/no1.png";
				petNo2.src = "images/child2/no2.png";
				sickorsleep.src = "images/child2/sickorsleep.png";
			}
			else if (pet.type == 3){
				pet.imagesize=65;
				pet.currentFoodCapacity=32;
				pet.maxEnergy= 30;
				petImage1.src = "images/child3/movement/1.1.png";
				petImage2.src = "images/child3/movement/2.1.png";
				petImage3.src = "images/child3/movement/1.2.png";
				petImage4.src = "images/child3/movement/2.2.png";
				petImage0.src = "images/child3/movement/0.png";
				petHappy.src = "images/child3/happy.png";
				petSad.src = "images/child3/sad.png";
				petNo1.src = "images/child3/no1.png";
				petNo2.src = "images/child3/no2.png";
				sickorsleep.src = "images/child3/sickorsleep.png";
			}
			pet.x = Math.ceil((canvas.width/2 - pet.imagesize/2-1)/12+1)*12+1;
			pet.isBusy = false;
			countForEvolution=0;
			}
			,1200);
	}
	else if(pet.level==2){//child to adult
		if (countForEvolution >= 6950)//if pet stays at child level, its life span is 90mins or 1.5hours 
			pet.level+=2;
		if (pet.training<5)//to evolve to adult level, need to train at least 5 times
			return;
		clearInterval(mainInt);
		evolveseqcount = 0;
		pet.isBusy = true;
		var evolutionseq = setInterval(evolution, 100);
		setTimeout(function( ) { clearInterval(evolutionseq); }, 950);
		setTimeout(function(){
			mainInt = setInterval(main,777);
			if(pet.type==1){
				if(pet.careMistakes<=3){
					if(pet.training>30)
						pet.type=1;
					else
						pet.type=2;
				}
				else if(pet.careMistakes>3)
					pet.type=2;
			}
			else if(pet.type==2){
				if(pet.careMistakes<=3){
					if(pet.training>15)
						pet.type=2;
					else
						pet.type=4;
				}
				else if(pet.careMistakes>3){
					if(pet.training>10)
						pet.type=4;
					else
						pet.type=3;
				}
			}
			else if(pet.type==3){
				if(pet.careMistakes>=10){
					if(pet.training<=6)
						pet.type=5;
					else
						pet.type=4;
				}
				else if (pet.careMistakes<10)
					pet.type=4;
			}
			pet.level++;
			pet.careMistakes=0;
			pet.willEvolveAt = 11583; //to be changed to 11583, i.e. 2 hours 30mins
			pet.chanceToShit = 2;
			//input care mistakes conditions here and change type
			if (pet.type == 1){
				pet.imagesize=137;
				pet.currentFoodCapacity=60;
				pet.maxEnergy= 100;
				petImage1.src = "images/adult1/movement/1.1.png";
				petImage2.src = "images/adult1/movement/2.1.png";
				petImage3.src = "images/adult1/movement/1.2.png";
				petImage4.src = "images/adult1/movement/2.2.png";
				petImage0.src = "images/adult1/movement/0.png";
				petHappy.src = "images/adult1/happy.png";
				petSad.src = "images/adult1/sad.png";
				petNo1.src = "images/adult1/no1.png";
				petNo2.src = "images/adult1/no2.png";
				sickorsleep.src = "images/adult1/sickorsleep.png";
			}
			else if (pet.type == 2){
				pet.imagesize=143;
				pet.currentFoodCapacity=64;
				pet.maxEnergy= 80;
				petImage1.src = "images/adult2/movement/1.1.png";
				petImage2.src = "images/adult2/movement/2.1.png";
				petImage3.src = "images/adult2/movement/1.2.png";
				petImage4.src = "images/adult2/movement/2.2.png";
				petImage0.src = "images/adult2/movement/0.png";
				petHappy.src = "images/adult2/happy.png";
				petSad.src = "images/adult2/sad.png";
				petNo1.src = "images/adult2/no1.png";
				petNo2.src = "images/adult2/no2.png";
				sickorsleep.src = "images/adult2/sickorsleep.png";
			}
			else if (pet.type == 3){
				pet.imagesize=89;
				pet.currentFoodCapacity=54;
				pet.maxEnergy= 86;
				petImage1.src = "images/adult3/movement/1.1.png";
				petImage2.src = "images/adult3/movement/2.1.png";
				petImage3.src = "images/adult3/movement/1.2.png";
				petImage4.src = "images/adult3/movement/2.2.png";
				petImage0.src = "images/adult3/movement/0.png";
				petHappy.src = "images/adult3/happy.png";
				petSad.src = "images/adult3/sad.png";
				petNo1.src = "images/adult3/no1.png";
				petNo2.src = "images/adult3/no2.png";
				sickorsleep.src = "images/adult3/sickorsleep.png";
			}
			else if(pet.type==4){
				pet.imagesize=47;
				pet.currentFoodCapacity=50;
				pet.maxEnergy= 60;
				petImage1.src = "images/adult4/movement/1.1.png";
				petImage2.src = "images/adult4/movement/2.1.png";
				petImage3.src = "images/adult4/movement/1.2.png";
				petImage4.src = "images/adult4/movement/2.2.png";
				petImage0.src = "images/adult4/movement/0.png";
				petHappy.src = "images/adult4/happy.png";
				petSad.src = "images/adult4/sad.png";
				petNo1.src = "images/adult4/no1.png";
				petNo2.src = "images/adult4/no2.png";
				sickorsleep.src = "images/adult4/sickorsleep.png";
			}
			else if (pet.type == 5){
				pet.imagesize=95;
				pet.currentFoodCapacity=58;
				pet.maxEnergy= 90;
				petImage1.src = "images/adult5/movement/1.1.png";
				petImage2.src = "images/adult5/movement/2.1.png";
				petImage3.src = "images/adult5/movement/1.2.png";
				petImage4.src = "images/adult5/movement/2.2.png";
				petImage0.src = "images/adult5/movement/0.png";
				petHappy.src = "images/adult5/happy.png";
				petSad.src = "images/adult5/sad.png";
				petNo1.src = "images/adult5/no1.png";
				petNo2.src = "images/adult5/no2.png";
				sickorsleep.src = "images/adult5/sickorsleep.png";
			}
			pet.x = Math.ceil((canvas.width/2 - pet.imagesize/2-1)/12+1)*12+1;
			pet.isBusy = false;
			countForEvolution=0;
		}
		,1200);
	}
	else if(pet.level==3){//adult to grave
		pet.level++;
	}
	if (pet.level>4)
		pet.level=4;
};

var dieFromSick = function(){
	var randomnum =(Math.random()*10000)
	if (randomnum<1 && sickCounter<38){//by default 0.01 percent chance to die from sickness
		death();
	}
	else if (randomnum<4 && sickCounter>=38 && sickCounter< 154){//if sick for at least 29.5sec, chance increase to 0.04%
		death();
	}
	else if (randomnum<20 && sickCounter>=154)//if sick for at least 2mins, chance increase to 0.2%
		death();
};

var death = function(){
	pet.chanceToShit = 0;
	pet.pooCount=0;
	pet.willEvolveAt=0;
	pet.energyLevel=0;
	pet.currentFoodLevel =0;
	pet.currentFoodCapacity=0;
	pet.isDead = true;
	pet.lights=true;
	iconstat =0;
	document.getElementById("pet details").innerHTML = ("<b><u><font size=2>"+pet.name+"'s Details</font></u></b><br><b>Age:</b> " + pet.age + " days<br><b>Hungry:</b> "+ pet.currentFoodLevel +"/"+pet.currentFoodCapacity+ "<br><b>Energy:</b> "+ (Math.floor(pet.energyLevel/pet.maxEnergy*100))+" % ");
	clearInterval(mainInt);
	if (bgReady) { //draw background pixel grid
		ctx.drawImage(bgImage, 0, 0);
		ctxicon.drawImage(iconbartop,0, 0);
		ctxicon.drawImage(iconbarbot,0, 175);
		ctxicon.drawImage(iconalertoff,0, 175);
	}
	ctx.drawImage(deathscreen, 0, 0);
	var firstdigit = Math.floor(pet.age/10);
	var seconddigit = pet.age%10;
	if (pet.age!=1)
		ctx.drawImage(s_,223,103);
	if (firstdigit!=0){
		ctx.drawImage(num[firstdigit],151,61);
		ctx.drawImage(num[seconddigit],175,61);
	}
	else{
		ctx.drawImage(num[seconddigit],151,61);
	}
};

// The main game loop
var main = function () {
	
	if(pet.level < 4){//evolution counter
		countForEvolution++;
		if (countForEvolution >= pet.willEvolveAt){
			evolve();
		}
	}
	if(pet.level==3){//if pet is adult, care mistakes makes it die faster
		while(pet.careMistakes>0){ //for every care mistake, adult pet's life span is reduced by 30seconds
			pet.careMistakes--;
			countForEvolution+=39;
		}
	}
	
	if (pet.level == 0){//draw egg picture
		renderEgg();
		return;
	}
	
	timeCounter++; //age counter
	if (timeCounter >=386){ //about 5 mins of human time is 1day of pet's time
		timeCounter=0;
		if(pet.age<99)//pet age will never be above 99, 99days in pet times is about 8hrs 15mins!
			pet.age++;
	}
	if(!pet.isHungry)
		hungryCount++; //get hungry over time if pet is not already hungry
	
	
	if(!pet.isSleeping && !pet.isHungry){//is not sleeping and not hungry, every 20 secs -2 hunger
		if (hungryCount>= 26){
			hungryCount=0;
			if (pet.currentFoodLevel == 1 || pet.currentFoodLevel == 2)
				hungryOnset=true;
			else if(pet.currentFoodLevel==pet.currentFoodCapacity)
				overfeedOnset = true;
				
			pet.currentFoodLevel-=2;
		}
	}
	else if (pet.isSleeping && !pet.isHungry){//is sleeping and not hungry, every 60secs -2 hunger
		if(hungryCount>=77){
			hungryCount=0;
			if (pet.currentFoodLevel == 1 || pet.currentFoodLevel == 2)
				hungryOnset=true;
			else if(pet.currentFoodLevel==pet.currentFoodCapacity)
				overfeedOnset = true;
			pet.currentFoodLevel-=2;
		}
	}
	if(pet.currentFoodLevel<=0){ //once food level reaches 0
		pet.currentFoodLevel=0;
		pet.isHungry=true;
		if(hungryOnset && !pet.isSleeping){ //if pet is not sleeping, then require attention
			hungryOnset=false;
			foodattention=true;
			needAttention();
		}
	}
	else if (pet.currentFoodLevel>=pet.currentFoodCapacity)
		pet.currentFoodLevel=pet.currentFoodCapacity;
	countForEnergy++;
	if (!pet.isSleeping){//updating of energy level
		if (countForEnergy>=29){//count will reach 29 every 22.5secs, i.e. every 45secs, energy level-2
			pet.energyLevel-=1;
			countForEnergy=0;
		}
	}
	else if(pet.isSleeping){
		if (countForEnergy>=7 && pet.lights){//about every 5.4 secs with lights on, energy level +1
			pet.energyLevel+=1;
			countForEnergy=0;
		}
		else if (countForEnergy>=2 && !pet.lights){//about every 1.5secs with lights off, energy level +1
			pet.energyLevel++;
			countForEnergy=0;
		}
	}
	if (pet.energyLevel<=0){ //can never be negative
		pet.energyLevel=0;
		pet.isSleeping=true;
	}
	if (pet.energyLevel>=pet.maxEnergy){//auto wake up when 100% energy, and can never be more tha  100%
		pet.energyLevel=pet.maxEnergy;
		if(pet.isSleeping){
			pet.isSleeping=false;
			pet.lights=true;
			bgImage.src= "images/screen.png"
			sleepLogo1.src ="images/sleep1.png";
			sleepLogo2.src ="images/sleep2.png";
			pet.isBusy=false;
			lightsToBeOn=true;
		}
	}
	
	
	if (!pet.isDead && pet.level !=0){ //if pet is dead or is egg, no movements allowed
		if(pet.isSick || pet.isSleeping) //no shit allowed if dead and egg, cannot fall sick also
			pet.x = Math.ceil((canvas.width/2 - pet.imagesize/2-1)/12+1)*12+1;;
		if(!pet.isSick && !pet.isSleeping)
			update();
		render();
		if (pet.shitcount<4)
			shit();
		if (!pet.isSick)
			fallsick();
	}
	
	if(pet.isSick && !pet.isSleeping){ //sick counter wont increase when sleeping
		sickCounter++;
	}
	if(sickOnset){
		sickOnset = false;
		sickattention = true;
		needAttention();
	}
	document.getElementById("pet details").innerHTML = ("<b><u><font size=2>"+pet.name+"'s Details</font></u></b><br><b>Age:</b> " + pet.age + " days<br><b>Hungry:</b> "+ pet.currentFoodLevel +"/"+pet.currentFoodCapacity+ "<br><b>Energy:</b> "+ (Math.floor(pet.energyLevel/pet.maxEnergy*100))+" % ");
	if(sickCounter>12)// if pet is sick for about 9.3seconds, it can die from sickness	
		dieFromSick();
	if (pet.level==4) //time to die
		death(); 
	
};

// Initialize game 
var evolveseqcount = 0, eggCount =0, countForEnergy = 0, countForEvolution = 0,timeCounter=0, hungryCount=77, sickattention = false, foodattention = false, hungryOnset=false, overfeedOnset=false,sickOnset = false,sickCounter=0, mainInt = null;

var startGame = function(){
	pet.x = 103;
	pet.y = 0;
	TINY.box.hide();
	pet.name=document.getElementById('petname').value;
	document.getElementById("pet details").innerHTML = ("<b><u><font size=2>"+pet.name+"'s Details</font></u></b><br><b>Hatching...</b>");
	mainInt = setInterval(main, 600); //updates per 600 milisecond for egg
};