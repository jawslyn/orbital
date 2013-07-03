var trainGameInProgress=false;
var sickGameInProgress=false;
var sickPlayOut = false;
var syringePos = 2;
var sickCounterGame = 0;
var randomCounter = 0;
var sickHit = false;
var sicknessMoveUp = true;
if (Math.ceil(Math.random()*2) == 1)
	sicknessMoveUp = false;
else
	sicknessMoveup = true;
var userChoice = 0;
var needleFlight = 0;
var needleHeight =0;
var petChoice =0;
var powerCount =0;//0-20
var increasing = true;
var powerseq = null;
var sickseq = null;
var sickHeight = 55;
var scissors1 = new Image();
var scissors2 = new Image();
var rock = new Image();
var paper = new Image();
var toilet1 = new Image();
var toilet2 = new Image();
var toilet3 = new Image();
var toilet4 = new Image();
var toilet5 = new Image();
var noshit = new Image();
var powermeter = new Image();
var blackpixel = new Image();
var whitepixel = new Image();
var playthegame = new Image();
var syringe = new Image();
var sickness1 = new Image();
var sickness2 = new Image();
var sickness3 = new Image();
scissors1.src = "images/templates/scissors1.png";
scissors2.src = "images/templates/scissors2.png";
rock.src = "images/templates/stone.png";
paper.src = "images/templates/paper.png";
blackpixel.src = "images/blackpixel.png";
whitepixel.src = "images/whitepixel.png";
toilet1.src = "images/templates/toilet1.png";
toilet2.src = "images/templates/toilet2.png";
toilet3.src = "images/templates/toilet3.png";
toilet4.src = "images/templates/toilet4.png";
toilet5.src = "images/templates/toilet5.png";
noshit.src = "images/templates/noshit.png";
powermeter.src = "images/templates/powermeter.png";
playthegame.src = "images/templates/play.png";
syringe.src = "images/templates/syringe.png";
sickness1.src = "images/templates/healtarget.png";
sickness2.src = "images/templates/healtarget2.png";
sickness3.src = "images/templates/healtarget3.png";

var foodgame = function(){
	var snakeBg = new Image();
	
	
	var endgameover = new Image();
	var endgamefull = new Image();
	snakeBg.src = "images/templates/gamestart.png";
	
	endgameover.src = "images/templates/gameover.png";
	endgamefull.src = "images/templates/petisfull.png";
	snakeBg.onload = function(){
		ctx.drawImage(snakeBg,0,0);
	};
	 document.onkeydown = function(e) { return handleKeys(e) };
	//document.onkeypress = function(e) { return handleKeys(e) };

var NORTH = 0, EAST = 1, SOUTH = 2, WEST = 3;

// keys
var UP = 38, DOWN = 40, LEFT = 37, RIGHT = 39; 
var startsnakegame=null;
var foodForEnergyCount =0;

var snake = {
		direction: EAST,
		pending_direction: EAST,
		body: {
    	    y:[],
            x:[]
		},
		yhead: 11,
		xhead: 4 ,
	  }
var food = {
		y:0,
		x:0
}

var game_on = false;
var gridpixels = new Array(24);
var gridpixels = new Array(24);
for (var i=0; i<5; i++){
	snake.body.x.push(i);
	snake.body.y.push(11);
}
free_space = false;
			while (!free_space) {
			  free_space = true;
			  food.x = (Math.floor(Math.random() * 48));
			  food.y = (Math.floor(Math.random() * 24));

			  // make sure apple is draw in free space, not on top of snake
			  for(i = 0;i < snake.body.x.length; i++)
				if(snake.body.x[i] == food.x && snake.body.y[i] == food.y)
				  free_space = false;
			}


		
		
		
// directions

function startgame(){
	game_on=true;
	ctx.drawImage(bgImage,0,0);
	ctx.drawImage(blackpixel, 1, 67);
	ctx.drawImage(blackpixel, 7, 67);
	ctx.drawImage(blackpixel, 13, 67);
	ctx.drawImage(blackpixel, 19, 67);
	ctx.drawImage(blackpixel, 1+snake.xhead*6, 1+snake.yhead*6);
	ctx.drawImage(blackpixel, 1+food.x*6, 1+6*food.y);
	startsnakegame = setInterval(snakegame,50);
};		
	

var snakegame = function(){
	if (snake.pending_direction !== null) {
        snake.direction = snake.pending_direction;
        snake.pending_direction = null;
	}
	if (snake.direction==NORTH)
		snake.yhead--;
	else if (snake.direction==EAST)
		snake.xhead++;
	else if (snake.direction==SOUTH)
		snake.yhead++;
	else if (snake.direction==WEST)
		snake.xhead--;
	
	if (snake.xhead < 0 || snake.xhead >= 48 || snake.yhead < 0 || snake.yhead >= 24)
		  gameOver();
	else{
		ctx.drawImage(blackpixel, 1+snake.xhead*6, 1+snake.yhead*6);
		snake.body.x.push(snake.xhead);
		snake.body.y.push(snake.yhead);
		
		if(food.x == snake.xhead && food.y == snake.yhead){
			foodForEnergyCount++
			if (foodForEnergyCount>=5){//every 5 pieces of food you eat, energy increase by 1
				foodForEnergyCount=0;
				if(pet.energyLevel<pet.maxEnergy)
					pet.energyLevel++;
			}
			pet.isHungry=false;
			hungryOnset=false;
			foodattention=false;
			clearTimeout(foodmistakeTimer);
			if (!sickattention){
				clearTimeout( mistakeTimer );
				ctxicon.drawImage(iconalertoff,0, 175);
			}
			pet.currentFoodLevel+=2;
			document.getElementById("pet details").innerHTML = ("<b><u><font size=2>"+pet.name+"'s Details</font></u></b><br><b>Age:</b> " + pet.age + " days<br><b>Hungry:</b> "+ pet.currentFoodLevel +"/"+pet.currentFoodCapacity+ "<br><b>Energy:</b> "+ (Math.floor(pet.energyLevel/pet.maxEnergy*100))+" % ");	
			free_space = false;
			while (!free_space) {
			  free_space = true;
			  food.x = (Math.floor(Math.random() * 48));
			  food.y = (Math.floor(Math.random() * 24));

			  // make sure apple is draw in free space, not on top of snake
			  for(i = 0;i < snake.body.x.length; i++)
				if(snake.body.x[i] == food.x && snake.body.y[i] == food.y)
				  free_space = false;
			}
			ctx.drawImage(blackpixel, 1+food.x*6, 1+6*food.y);
		}
		else
			ctx.drawImage(whitepixel, 1+snake.body.x.shift()*6,1+snake.body.y.shift()*6);
		for (var i = 0; i < snake.body.x.length-1; i++)
			if (snake.body.x[i] == snake.xhead && snake.body.y[i] == snake.yhead)
				gameOver();
		if (pet.currentFoodLevel == pet.currentFoodCapacity)
			gameFull();
	}
	
};	

var gameFull = function(){
	clearInterval(startsnakegame);
	ctx.drawImage(endgamefull,0,0);
	pet.x =pet.x = Math.ceil((canvas.width/2 - pet.imagesize/2-1)/12+1)*12+1;
	setTimeout(function(){
			mainInt = setInterval(main,777);
			pet.isBusy=false;
			}, 400);
};
var gameOver = function(){
	clearInterval(startsnakegame);
	ctx.drawImage(endgameover,0,0);
	pet.x =pet.x = Math.ceil((canvas.width/2 - pet.imagesize/2-1)/12+1)*12+1;
	setTimeout(function(){
			mainInt = setInterval(main,777);
			pet.isBusy=false;
			}, 400);
};
		 // keyboard handler
function handleKeys(e) {
		var char;
		var evt = (e) ? e : window.event;

		char = (evt.charCode) ?
		  evt.charCode : evt.keyCode;
		 if (char==32 && !game_on){
			startgame();
		}
		if(char==32)
			e.preventDefault();
		if (char > 36 && char < 41) {
		  handleChar(char);
		  return false;
		};
		return true;
	  }

// character specific keyboard handling
function handleChar(char) {
		if (!game_on)
		  return;

		switch (char) {
		  case UP:
			if (snake.direction != SOUTH)
			  snake.pending_direction = NORTH;
			break;
		  case DOWN:
			if (snake.direction != NORTH)
			  snake.pending_direction = SOUTH;
			break;
		  case LEFT:
			if (snake.direction != EAST)
			  snake.pending_direction = WEST;
			break;
		  case RIGHT:
			if (snake.direction != WEST)
			  snake.pending_direction = EAST;
			break;
		}
	  }
	 };
	 
var flushGame = function(){
	ctx.drawImage(powermeter,0,0);
	powerscreen=true;
	powerCount=0;
	increasing=true;
	powerseq = setInterval(powerMet,70);
};	 
 var flushGameResults = function(){
	if (pet.shitcount>0){
		if(powerCount>=20){
			pet.shitcount=0;
			screenleftlimit=0;
			ctx.drawImage(toilet1,0,0);ctx.drawImage(shit1_1,138,-72);
			setTimeout(function(){ctx.drawImage(bgImage,0,0);ctx.drawImage(shit1_1,138,-66);ctx.drawImage(toilet2,0,0);},250);
			setTimeout(function(){ctx.drawImage(bgImage,0,0);ctx.drawImage(shit1_1,138,-60);ctx.drawImage(toilet3,0,0);},500);
			setTimeout(function(){ctx.drawImage(bgImage,0,0);ctx.drawImage(shit1_1,138,-54);ctx.drawImage(toilet4,0,0);},750);
			setTimeout(function(){ctx.drawImage(bgImage,0,0);ctx.drawImage(shit1_1,138,-48);ctx.drawImage(toilet5,0,0);},1000);
			setTimeout(function(){ctx.drawImage(bgImage,0,0);ctx.drawImage(shit1_1,138,-42);ctx.drawImage(toilet5,0,0);},1250);
			setTimeout(function(){ctx.drawImage(bgImage,0,0);ctx.drawImage(shit1_1,138,-36);ctx.drawImage(toilet5,0,0);},1500);
			setTimeout(function(){ctx.drawImage(bgImage,0,0);ctx.drawImage(shit1_1,138,-30);ctx.drawImage(toilet5,0,0);},1750);
			setTimeout(function(){ctx.drawImage(bgImage,0,0);ctx.drawImage(shit1_1,138,-24);ctx.drawImage(toilet5,0,0);},2000);
			if(!pet.isSleeping)
				setTimeout(happy,2400);
			else{
				setTimeout(function(){mainInt = setInterval(main,777); pet.isBusy = false;},2400);
			}
			
		}
		else{
			ctx.drawImage(toilet1,0,0);ctx.drawImage(shit1_1,138,-72);
			setTimeout(function(){ctx.drawImage(bgImage,0,0);ctx.drawImage(shit1_1,138,-72);ctx.drawImage(toilet2,0,0);},250);
			setTimeout(function(){ctx.drawImage(bgImage,0,0);ctx.drawImage(shit1_1,138,-72);ctx.drawImage(toilet3,0,0);},500);
			setTimeout(function(){ctx.drawImage(bgImage,0,0);ctx.drawImage(shit1_1,138,-72);ctx.drawImage(toilet4,0,0);},750);
			setTimeout(function(){ctx.drawImage(bgImage,0,0);ctx.drawImage(shit1_1,138,-72);ctx.drawImage(toilet5,0,0);},1000);
			setTimeout(function(){	mainInt = setInterval(main,777); pet.isBusy = false;},1400);
		}
			
	}
	else{
		ctx.drawImage(noshit,0,0);
		setTimeout(function(){
			mainInt = setInterval(main,777); pet.isBusy = false},777);
	} 
 }; 
	
var powerMet = function(){
	if(increasing){
		if(powerCount>=0 && powerCount<=19){
			ctx.drawImage(blackpixel,25+12*powerCount,67);
			ctx.drawImage(blackpixel,25+12*powerCount,73);
		}
		
		powerCount++;
		if (powerCount==20){
			powerCount++;
			increasing=false;
		}
	}
	else{
		if(powerCount>=1 && powerCount<=20){
			ctx.drawImage(whitepixel,13+12*powerCount,67);
			ctx.drawImage(whitepixel,13+12*powerCount,73);
		}
		powerCount--;
		if(powerCount==0)
			increasing=true;
	}
	
};

	
	 
var trainGame = function(){
	trainGameInProgress=true;
	
	ctx.drawImage(bgImage,0,0);
	ctx.drawImage(playthegame,0,0);
	ctx.drawImage(petImage1,145,0);
	
	
};

var playoutTrain = function(){
	document.getElementById("pet details").innerHTML = ("<b><u><font size=2>"+pet.name+"'s Details</font></u></b><br><b>Age:</b> " + pet.age + " days<br><b>Hungry:</b> "+ pet.currentFoodLevel +"/"+pet.currentFoodCapacity+ "<br><b>Energy:</b> "+ (Math.floor(pet.energyLevel/pet.maxEnergy*100))+" % ");	
	trainGameInProgress=false;
	ctx.drawImage(bgImage,0,0);
	ctx.drawImage(playthegame,0,0);
	ctx.drawImage(petImage0,145,0);
	var petWin = null;
	petChoice = Math.ceil(Math.random()*3);
	if (userChoice==1){
		ctx.drawImage( scissors2,7, 73);
	}
	else if (userChoice==2){
		ctx.drawImage( rock,7, 73);
	}
	else if (userChoice==3){
		ctx.drawImage( paper,7, 73);
	}
	if (petChoice==1){
		ctx.drawImage( scissors1,79, 73);
	}
	else if (petChoice==2){
		ctx.drawImage( rock,79, 73);
	}
	else if (petChoice==3){
		ctx.drawImage( paper,79, 73);
	}
	if((petChoice==2 && userChoice==1)||(petChoice==3 && userChoice==2)||(petChoice==1 && userChoice==3)){
		petWin=true;
	}
	else
		petWin=false;
	
	
	
	
	
	
	
	
	setTimeout(function(){
		if (petWin==true){
			happy();
			pet.training++;
			if(pet.level==3){//if pet is adult, training increases its lifespan
				countForEvolution-=39; //each successful training increase its life span by 30 seconds
			}
		}
		else if (petWin==false){
			sad();
		}
	}
	,777);
};



var sickGame = function(){
	sickGameInProgress=true;
	
	ctx.drawImage(bgImage,0,0);
	ctx.drawImage(syringe,1,61);
	ctx.drawImage(sickness1,241,sickHeight);
	sickseq = setInterval(sickInterval,70);
	
};

var sickInterval = function(){
	if (sickGameInProgress){
		ctx.drawImage(bgImage,0,0);
		if (syringePos == 1)
			ctx.drawImage(syringe,1,19);
		else if (syringePos == 2)
			ctx.drawImage(syringe,1,61);
		else if (syringePos == 3)
			ctx.drawImage(syringe,1,103);
	}
	if (sickPlayOut){
		if (sickHit)
			randomCounter++;
		if(needleFlight<31)
			ctx.drawImage(bgImage, 240,0);
		if (syringePos == 1){
			if (!sickHit){ 
				ctx.drawImage(blackpixel, 43 + (needleFlight+3)*6,needleHeight );
				ctx.drawImage(blackpixel, 43 + (needleFlight+2)*6,needleHeight );
				ctx.drawImage(blackpixel, 43 + (needleFlight+1)*6,needleHeight );
			}
			if (randomCounter<3)
				ctx.drawImage(whitepixel, 43 + needleFlight*6,needleHeight );
		}
		else if (syringePos == 2){
			if (!sickHit){ 
				ctx.drawImage(blackpixel, 43 + (needleFlight+3)*6,needleHeight);
				ctx.drawImage(blackpixel, 43 + (needleFlight+2)*6,needleHeight);
				ctx.drawImage(blackpixel, 43 + (needleFlight+1)*6,needleHeight);
			}
			if (randomCounter<3)
				ctx.drawImage(whitepixel, 43 + needleFlight*6,needleHeight);
		}
		else if (syringePos == 3){
			if (!sickHit){ 
				ctx.drawImage(blackpixel, 43 + (needleFlight+3)*6,needleHeight);
				ctx.drawImage(blackpixel, 43 + (needleFlight+2)*6,needleHeight);
				ctx.drawImage(blackpixel, 43 + (needleFlight+1)*6,needleHeight);
			}
			if (randomCounter<3)
				ctx.drawImage(whitepixel, 43 + needleFlight*6,needleHeight);
		}
		needleFlight++;
	}
	if (needleFlight<31){
		if (sickCounterGame >= 1){
			if (sicknessMoveUp)
				sickHeight -= 6;
			else
				sickHeight += 6;
			sickCounterGame = 0;
		}
		else
			sickCounterGame++;
	}
	if(needleFlight<32)
		ctx.drawImage(sickness1,241,sickHeight);
	if (sickHeight <= 1)
		sicknessMoveUp = false;
	else if  (sickHeight >= 103)
		sicknessMoveUp = true;
	if (needleFlight >=31)
		if (needleHeight >= sickHeight+6 && needleHeight <= sickHeight+24)
			sickHit = true;
	if (needleFlight >=32)
		if (needleHeight == sickHeight || needleHeight == sickHeight+30 || needleHeight == sickHeight+36)
			sickHit = true;
	if (randomCounter > 5){ // virus is hitted
		clearInterval(sickseq);
		setTimeout(function( ) { ctx.drawImage(bgImage, 240,0); ctx.drawImage(sickness2, 241,sickHeight);}, 400);
		setTimeout(function( ) { ctx.drawImage(bgImage, 240,0); ctx.drawImage(sickness3, 241,sickHeight);}, 800);
		setTimeout(function( ) { ctx.drawImage(bgImage, 240,0); }, 1200);
		setTimeout(function( ) { happy(); sickPlayOut = false;}, 2000);
		sickCountersickCounter=0;
		sickattention=false;
		pet.isSick = false;
		clearTimeout(sickmistakeTimer);
		if (!foodattention){
			clearTimeout( mistakeTimer );
			ctxicon.drawImage(iconalertoff,0, 175);
		}
		
	}
	else if (randomCounter == 0 && needleFlight > 43){
		clearInterval(sickseq);
		setTimeout(function(){	mainInt = setInterval(main,777); pet.isBusy = false; sickPlayOut = false;},500); // if virus is not hit and needle flies out of range
		
	}
};