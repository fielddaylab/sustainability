/**
 * Created by xaoyang on 12/13/13.
 */
 
var canvas;
var stage;
var level;
var contentManager;
var screen_width;
var screen_height;

var INSTANCE_COUNT = 100;
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
	//canvas.width = window.innerWidth * .985 ;
	//canvas.height= window.innerHeight * .9 ;	// need to display buttons at bottom

	var w = 640;
	var h = 1136;

	canvas.width = w * .985 ;
	canvas.height= h * .9 ;	// need to display buttons at bottom

}

var topScore = 0;
function init(){

	if(localStorage.getItem('topScore')){
		topScore = localStorage.getItem('topScore');
	}
	else{
		topScore = 0;
	}

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
    level = new Level(stage, contentManager, screen_width, screen_height);
}

function reset(){
    stage.removeAllChildren();
    createjs.Ticker.removeAllEventListeners();
    stage.update();
    
    pointInt = 0;
    GAME_ON = true;
    ENDGAME = false;
    ITEM_SPEED = 1;
    currentCountDown = createCountDown(START_TIME); 
    console.log("Game has been reset");
}

function easy(){
	reset();
	SETTING = 'easy';
	init();
}

function normal(){
	reset();
	SETTING = 'normal';
	init();
}

function hard(){
	reset();
	SETTING = 'hard';
	init();
}

function setText() {
	
	fpsLabel = new createjs.Text("-- fps", "bold 20px Arial", "#FFF");
    fpsLabel.x = 15;
    fpsLabel.y = 70;
}

function drawLines(num){

	var x = canvas.width / (num + 1);
	var y = canvas.height;

	var g = [];

	for(var i = 0; i < num; i ++){
		g.push(new createjs.Shape());
		g[i].graphics.setStrokeStyle(3).beginStroke("blue").moveTo(x+(x * i),0).lineTo(x+(x*i),y);
		stage.addChild(g[i]);
	}

}

var src;            // the audio src we are trying to play
var src2;
var soundInstance;  // the soundInstance returned by Sound when we create or play a src

function sound() {

    // Create a single item to load.
    var assetsPath = "assets/";
    src2 = "src/sound/18-machinae_supremacy-lord_krutors_dominion.ogg";
    src = "src/sound/GemCollected.ogg";
    // NOTE the "|" character is used by Sound to separate source into distinct files, which allows you to provide multiple extensions for wider browser support

	createjs.Sound.alternateExtensions = ["mp3"];	// add other extensions to try loading if the src file extension is not supported
    createjs.Sound.addEventListener("fileload", playSound); // add an event listener for when load is completed
    createjs.Sound.registerSound(src);  // register sound, which preloads by default
    createjs.Sound.registerSound(src2);  // register sound, which preloads by default

    //stage.addEventListener("stagemousedown", clickCanvas);
}

function getSound(event){
	createjs.Sound.play(src);
}

function playSound(event) {
	console.log("sound loaded");
	soundInstance = createjs.Sound.play(src2);  // start playing the sound we just loaded, storing the playing instance
}


function startGame(){

	setText();
	stage.addChild(fpsLabel);
	
	level.StartLevel(SETTING);
	
    stage.update();
    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(60);
}

function endGame(){
	
	
	if(!ENDGAME){
		var w = canvas.width;
		var h = canvas.height;

		var container = new createjs.Container();
		container.x = 10;
    	container.y = 10;
    	container.setBounds(w * .10,h * .10, w * .78, h *.68);
    	container.mouseEnabled = true;

		var endOverlay = new createjs.Shape();
		endOverlay.graphics.beginFill('green').drawRoundRect(w*.12, h*.12, w *.76, h *.66, 10);
		endOverlay.alpha = .8;
		container.addChild(endOverlay);

		var overlay = new createjs.Shape();
		overlay.graphics.beginFill('#AAAAAA').drawRoundRect(w*.15, h*.15, w*.7, h*.6, 10);
		overlay.alpha = 1;
		container.addChild(overlay);

		//end text
		var stageText = new createjs.Text("--", "bold 36px Arial", "#ffffff"); 
		stageText.text = "Stage: " + level.stageLevel;
		stageText.x = w * .17;
		stageText.y = h * .17;

		var stagePoint = new createjs.Text("--", "bold 36px Arial", "#ffffff"); 
		stagePoint.text = "Score: " + pointInt;
		stagePoint.x = w * .17;
		stagePoint.y = h * .21;

		var recycleText = new createjs.Text("--", "bold 36px Arial", "green"); 
		recycleText.text = "Recycled Items";
		recycleText.x = w * .17;
		recycleText.y = h * .30;

		container.addChild(stageText);
		container.addChild(stagePoint);
		container.addChild(recycleText);

		var tmp = null;
		var itemsText = [];
		var incorrectCount = 0;
		for(var i = 0; i < level.levelBins.length; i++){
			tmp = new createjs.Text("--", "bold 30px Arial", "#ffffff"); 
			tmp.text = level.levelBins[i] + ": " + level.garbageBin[i].contentCountCorrect;
			tmp.x = w * .18;
			tmp.y = h * (.35 + (.03 *i));
			
			itemsText.push(tmp);
			container.addChild(itemsText[i]);
			incorrectCount += level.garbageBin[i].contentCountWrong;
		}

		var wrongText = new createjs.Text("--", "bold 30px Arial", "red"); 
		wrongText.text = "incorrectly recycled: " + incorrectCount;
		wrongText.x = w * .18;
		wrongText.y = h * (.35 + (.03 * level.levelBins.length));

		container.addChild(wrongText);

		var button = new createjs.Shape();
		button.graphics.beginFill('#ffffff').drawRoundRect(w*.3, h*.6,w*.4,h*.1,10);
		container.addChild(button);

		button.addEventListener("rollover", function(evt){
			evt.target.alpha = .5;
		});

		button.addEventListener("rollout", function(evt){
			evt.target.alpha = 1;
		});

		button.addEventListener("click", function(evt){
			if(buttonText.text === "Quit"){

				if(pointInt > topScore){
					localStorage.setItem('topScore', pointInt);
				}

				reset();
			}

			stageText.text = "Top Score:"
			stageText.x += (w*.20);

			container.removeChild(recycleText);
			container.removeChild(wrongText);

			if(pointInt > topScore){
				stagePoint.text = pointInt;
			}
			else{
				stagePoint.text = topScore;
			}
			stagePoint.x += (w*.3);

			for (var i = 0; i < level.levelBins.length; i++){
				container.removeChild(itemsText[i]);
			};

			buttonText.text = "Quit";
		})

		var buttonText = new createjs.Text("NEXT", "bold 30px Arial", "green");
		buttonText.x = w*.44;
		buttonText.y = h*.62;
		container.addChild(buttonText);
		
		stage.addChild(container);
    	ENDGAME = true;
    }
	

}

function tick(){

		level.Update();
		fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " fps";
		//endGame();
		stage.update();
}