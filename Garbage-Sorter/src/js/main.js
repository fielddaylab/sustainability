/**
 * Created by xaoyang on 12/13/13.
 */
 
var canvas;
var stage;
var level;
var contentManager;
var screen_width;
var screen_height;

var titleText;
var scoreText;
var timerText;
var pointText;
var pointInt = 0;

// timer stuff
var currentCountDown;

var garbage;
var recycle;
var reuse;
var landfill;
var compost;

var INSTANCE_COUNT = 100;
var START_TIME = 45000; //ms
var WARNING_TIME = 20000; //ms
var GAME_ON = true;

// checks to see if mobile
var isMobile;
var window_width;
var window_height;


// SET UP SETTINGS CLASS
var no_type_map = {
	0 : "compost",
	1 : "landfill",
	2 : "landfill",
	3 : "reuse", 
	4 : "recycle", 
	5 : "recycle", 
};

// uses date.now() to set up timer
function createCountDown(timeRemaining) {
    var startTime = Date.now();
    return function() {
       return timeRemaining - ( Date.now() - startTime );
    }
}

// takes millseconds and converts to seconds with one digit following the period
function convertMStoS(num, p){
	p = typeof p !== 'undefined' ? p : 1;
	return (num/ 1000).toFixed(p);
}


function handleCanvas(){

	canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth * .985 ;
	canvas.height= window.innerHeight * .9 ;	// need to display buttons at bottom

}

function init(){

	isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/); 

    handleCanvas();

    canvas = document.getElementById("canvas");

    stage = new createjs.Stage(canvas);
    screen_width = canvas.width;
    screen_height= canvas.height;
    
    // enable mouse/touch events
	stage.enableMouseOver(10);
	createjs.Touch.enable(stage);

    contentManager = new ContentManager();
    contentManager.SetDownloadCompleted(startGame);
    contentManager.StartDownload();

    // testing out the level class
    level = new Level(stage, contentManager, 'complex', screen_width, screen_height);
}

function reset(){
    stage.removeAllChildren();
    createjs.Ticker.removeAllEventListeners();
    stage.update();
    
    pointInt = 0;
    GAME_ON = true;
    ITEM_SPEED = 1;
    currentCountDown = createCountDown(START_TIME); 
    console.log("Game has been reset");
}

function speedUp(){
	level.SpeedUp();
}

function speedDown(){
	level.SpeedDown();
}

function setText() {

    titleText = new createjs.Text("Garbage Sorter", "bold 36px Arial", "#ffffff");
    titleText.x = 10;
    titleText.y = 10;

    timerText = new createjs.Text("Time Remaining: ", "bold 20px Arial", "#ffffff");
    timerText.x = 15;
    timerText.y = 45;
	
	timeText = new createjs.Text( convertMStoS(START_TIME) + " s", "bold 20px Arial", "#ffffff");
	timeText.x = 180;
	timeText.y = 45;
		
	scoreText = new createjs.Text("SCORE:", "bold 20px Arial", "#ffffff");
	scoreText.x = screen_width - 200;
	scoreText.y = 15;
	
	pointText = new createjs.Text(pointInt, "bold 20px Arial", "#ffffff");
	pointText.x = screen_width - 105;
	pointText.y = 15;
}

function startGame(){
    console.log("Game has started");

	setText();

    stage.addChild(titleText);
    stage.addChild(timerText);
    stage.addChild(timeText);
    stage.addChild(scoreText);
	stage.addChild(pointText);
	
	level.StartLevel();

	// start timer
	currentCountDown = createCountDown(START_TIME); 
		
    stage.update();
    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(60);
}

function tick(){

	if(GAME_ON){

		timeText.text = convertMStoS(currentCountDown()) + " seconds";  
		if(convertMStoS(currentCountDown()) < 0 || convertMStoS(currentCountDown()) == 0){
			timeText.text = "0.0 seconds";
			GAME_ON = !GAME_ON;
		}
		if(convertMStoS(currentCountDown()) < convertMStoS(WARNING_TIME)){
			timeText.color = "red";
		}

		// quick fix, update later
		pointInt += level.Update();
		pointText.text = pointInt;
	}
}