/**
 * Created by xaoyang on 12/13/13.
 */
 
var canvas;
var stage;
var level;
var contentManager;
var screen_width;
var screen_height;

var START_TIME = 35000; //ms
var WARNING_TIME = 20000; //ms
var GAME_ON = true;
var SETTING = 'easy';
var ENDGAME = false;

// checks to see if mobile
var isMobile;
var window_width;
var window_height;

var container;

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

	canvas.width = window.innerWidth * .98;
	canvas.height= window.innerHeight * .98;
}

var topScore = 0;
var GarbageGame;
function init(){

	if(localStorage.getItem('topScore')){
		topScore = localStorage.getItem('topScore');
	}
	else{
		topScore = 0;
	}

	handleCanvas();

    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    screen_width = canvas.width;
    screen_height= canvas.height;

	isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/); 
	if(isMobile){
		createjs.Touch.enable(stage);
	}
	else{
		stage.enableMouseOver(10);
	}

    contentManager = new ContentManager();
    contentManager.SetDownloadCompleted(startGame);
    contentManager.StartDownload();

    garbageGame = new GarbageGame(stage, contentManager, screen_width, screen_height);
    sound();
}

function reset(){
    stage.removeAllChildren();
    createjs.Ticker.removeAllEventListeners();
    stage.update();
    
    pointInt = 0;
    ONCE = true;
    ENDGAME = false;
    ITEM_SPEED = 1;
    console.log("Game has been reset");
}

function setText() {
	
	fpsLabel = new createjs.Text("-- fps", "bold 20px Arial", "#FFF");
    fpsLabel.x = 15;
    fpsLabel.y = 70;
}

var src;            // the audio src we are trying to play
var src2;
var soundInstance;  // the soundInstance returned by Sound when we create or play a src

function sound() {

    // Create a single item to load.
    var assetsPath = "assets/";
    src3 = "src/sound/thud.ogg";
    src2 = "src/sound/Son_Of_A_Rocket.ogg";
    src = "src/sound/GemCollected.ogg";
    // NOTE the "|" character is used by Sound to separate source into distinct files, which allows you to provide multiple extensions for wider browser support

	createjs.Sound.alternateExtensions = ["mp3"];	// add other extensions to try loading if the src file extension is not supported
    createjs.Sound.addEventListener("fileload", playSound); // add an event listener for when load is completed
    createjs.Sound.registerSound(src);  // register sound, which preloads by default
    //createjs.Sound.registerSound(src2);  // register sound, which preloads by default

    //stage.addEventListener("stagemousedown", clickCanvas);
}

function playThud(event){
    createjs.Sound.play(src3);
}

function getSound(event){
	createjs.Sound.play(src);
}

function playSound(event) {
	console.log("sound loaded");
	soundInstance = createjs.Sound.play(src2);  // start playing the sound we just loaded, storing the playing instance
    soundInstance.setVolume(.5);
}

function startGame(){

	setText();
	garbageGame.level.start(SETTING);

    stage.update();
    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(60);
}


function tick(){

		garbageGame.updateGame();
		fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " fps";
}