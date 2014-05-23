/**
 * Created by xaoyang on 12/13/13.
 */
 
 // game objects
var canvas;
var stage;
var level;
var contentManager;
var GarbageGame;

var soundThud;
var soundCorrect;            // the audio src we are trying to play

// device information
var screen_width;
var screen_height;
var isMobile;

// create a timer class
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


function initCanvas(){

	canvas = document.getElementById("canvas");

    // look into why 980 and 1409
    canvas.width = 980;
    canvas.height = 1409;

    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);

    if(isMobile){
        createjs.Touch.enable(stage);

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

    }
    else{
        stage.enableMouseOver(10);
    }

    screen_width = canvas.width;
    screen_height= canvas.height;
}

function init(){

     // checks what type of device is accessing the game
    isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/); 

    // adjusts canvas size
    // sets up the stage
    initCanvas();
    // initializes sound
    initSound();

    // checks url input
    var query = window.location.search;
    if(query.substring(0,1) == '?'){
        query = query.substring(1);
        var args = query.split("&");
    }

    // console.log(window.location.search);
    var stageName = args[0]; 
    var levelVersion = 1;

    if(args.length == 2){
        levelVersion = args[1].split("=")[1];
        // console.log("level: " + levelVersion);
    }

    if(args.length == 3){
        var playerId = args[1].split("=")[1];
        var gameId = args[2].split("=")[1];
    }

    if(args.length == 4){
        levelVersion = args[1].split("=")[1];
        var playerId = args[2].split("=")[1];
        var gameId = args[3].split("=")[1];
    }

    // initializes the content manager
    contentManager = new ContentManager();
    contentManager.SetDownloadCompleted(startGame);
    contentManager.StartDownload();

    // initializes the game
    garbageGame = new GarbageGame(stage, contentManager, screen_width, screen_height, stageName, levelVersion);
}

// content handler should  handle this
function initSound() {

    // Create a single item to load.
    var assetsPath = "assets/";
    soundThud = "src/sound/thud.ogg";
    soundCorrect = "src/sound/GemCollected.ogg";

	createjs.Sound.alternateExtensions = ["mp3"];	// add other extensions to try loading if the src file extension is not supported
    createjs.Sound.registerSound(soundCorrect);  // register sound, which preloads by default
}


function startGame(){

	garbageGame.startGame();

    stage.update();
    createjs.Ticker.addEventListener("tick", function() {
        garbageGame.updateGame();
    });
    
    createjs.Ticker.setFPS(60);
}

// game should handle this
function playThud(event){
    createjs.Sound.play(soundThud);
}

function playCorrect(event){
    createjs.Sound.play(soundCorrect);
}