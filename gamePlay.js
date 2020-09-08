/////// These are the global variables ////
var s;
let button;
var direction = "right";
var scl = 20;
var gameScore = 0;
var bestScore = 0;
var food;
var xArray = new Array();
var yArray = new Array();
var win = false;
var res = false;
var cnv;
/////// These are the global variables ////

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}


function windowResized() {
  centerCanvas();
}



function setup() {

	cnv = createCanvas(550, 550);
	centerCanvas();


	s = new Snake();
	frameRate(10);

	pickLocation();
}

function arrayMap(longness)
{
	// Create an array with respect to length of the canvas
	//Snake rectangle area must be considired

	myLen = floor((longness-scl)/(scl));
	
	myArray = Array.from(Array(myLen).keys());
	myArray = myArray.map(function(x) { return x * scl; });

	return myArray;
}

function vectorMap(xCoordinates,yCoordinates)
{
	//Create grid map for each location on the screen

	var counter = 0;
	var freePositions = [];
	
	for (var i=0; i< xArray.length;i++)
	{
		for (var j=0; j<yArray.length;j++)
		{
			freePositions[counter] = createVector(xArray[i],yArray[j]);
			counter ++;
		}
	}

	return freePositions;
}

function getFreePositions(vectorizedMap)
{
	//Took snake position with its tail
	//Extract free positions from grid map

	var positions = s.getPositions();

	for(var i=0; i < positions.length;i++)
	{
		xPos = positions[i].x;
		yPos = positions[i].y;

		for(var j=0; j< vectorizedMap.length; j++)
		{
			if(vectorizedMap[j].x == xPos && vectorizedMap[j].y == yPos)
			{
				vectorizedMap.splice(j, 1);
				break;
			}
		}
		

	}

	return vectorizedMap;
}

function pickLocation() {
	//Pick free location for food
	//Snake location and food location have to be different
	//If there is no free location it means that user won
	
	xArray = arrayMap(width);
	yArray = arrayMap(height);

	
	vectorizedMap = vectorMap(xArray,yArray);

	
	
	freePositions = getFreePositions(vectorizedMap);

	if (freePositions.length == 0)
	{

		win = true;
	}
	else
	{

		var randomInd = Math.floor(Math.random() * freePositions.length);

	
		var elementX = freePositions[randomInd].x;
		var elementY = freePositions[randomInd].y;
	
	
		food = createVector(floor(elementX), floor(elementY));
	}


	
}

function finishGame(message){
	//Stop the game
	//Print messages on the screen

	noLoop();
	gameScore = s.getscore();
	textSize(64);
	text(message, width/6, height/2);
	fill(0, 102, 153);
	textSize(20);
	text('Your Score: '+gameScore.toString(), width/6, height/2+64);
	fill(0, 102, 153);

	bestScore = getBestScore();
	textSize(20);
	text('Highest Score: '+bestScore.toString(), width/6, height/2+84);
	fill(0, 102, 153);

	fill(218,165,32);
	text('Click to Restart! ', width/6, height/2+124);
	res = true;
	
	
}

function draw() 
{

	background(51);
	if (s.eat(food))
	{
		

		s.update();
		pickLocation();
		
	}

	if (s.death()==false)
	{
		
		if(win == false)
		{	
			s.update();
			s.show();
			fill(255, 0, 100);
			rect(food.x, food.y, scl, scl);
		}
		else
		{
			finishGame("Game Winner!");
			
		}
		

	}
	
	else
	{

		finishGame("Game Over!");


	}
	
}

function restart()

{
	//To restart game
	//Initial direction should be right => Initial speed of snake is on the right direction
	//Call restart function of snake class => Initialize snake

	direction = "right";
	
	s.restart();
	loop();
}



function getBestScore() 
{
	//Return highes score to show on the screen

	if (gameScore > bestScore)
	{
		return gameScore

	}

	else
	{
		return bestScore
	}

}


function keyPressed() 
{
	//Program enters into this function for each keybord touch
	//setTimeour: sleep and call checkKeys function => To sync directions and snake update between frames

	setTimeout(checkKeys, 27);
}

function checkKeys()
{
	// Control keybord value to decide direction of the snake

	if (direction != "down" && keyCode == UP_ARROW)
	{
		
		s.dir(0, -1);
		direction = "up";

	} else if (direction != "up" && keyCode === DOWN_ARROW)
	{
		
		s.dir(0,1);
		direction = "down";

	}else if (direction != "left" && keyCode === RIGHT_ARROW)
	{
		
		s.dir(1,0);
		direction = "right";

	}else if (direction != "right" && keyCode === LEFT_ARROW)
	{
		
		s.dir(-1,0);
		direction = "left";

	}
		
}

function mouseClicked() // Checker for left mouse click to restart game
{
	//Program enters into this function for every mouse click
	//Res variable: Avoid to restart game before end of the game
	
  if (res==true && mouseX) 
  {
  	res = false;
    restart();
  }

}


