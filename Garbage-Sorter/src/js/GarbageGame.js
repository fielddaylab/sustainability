// This is the main class of the Garbage-Sorter Game

(function (window) {
	/*
	// global variables
	var Canvas;
	var Stage;
	var Level;
	var ContentManager;

	// settings
	var START_TIME = 35000; //ms
	var WARNING_TIME = 20000; //ms
	var GAME_ON = true;
	var SETTING = 'easy';
	var ENDGAME = false;

	// checks to see if mobile
	var isMobile;
	var container;
	<------- if have something before this then not a constructor
	*/
	// constructor for the game
	function GarbageGame(stage, contentManager, gameWidth, gameHeight, data){

		// set canvas
		this.GarbageGameStage = stage;
		this.GGContentManger = contentManager;
		this.gameWidth = gameWidth;
		this.gameHeight= gameHeight;
		this.level = null;
		this.gameOver = false;
		this.feedbackDisplayed = false;

		//intro();
		this.startLevel();
	};


	// adjust the canvas size to match the screen
	GarbageGame.prototype.adjustCanvas = function(canvas) {

	};

	// load game assets
	GarbageGame.prototype.loadAssets = function() {

	};

	// display intro
	GarbageGame.prototype.intro = function() {
		var w = this.gameWidth;
		var h = this.gameHeight;

		var intro = new createjs.Container();
		intro.x = 10;
		intro.y = 10;
		intro.setBounds(w * .10,h * .10, w * .78, h *.68);
		intro.mouseEnabled = true;

		var endOverlay = new createjs.Shape();
		endOverlay.graphics.beginFill('green').drawRoundRect(w*.12, h*.12, w *.76, h *.66, 10);
		endOverlay.alpha = .8;
		intro.addChild(endOverlay);

		var overlay = new createjs.Shape();
		overlay.graphics.beginFill('#AAAAAA').drawRoundRect(w*.15, h*.15, w*.7, h*.6, 10);
		overlay.alpha = 1;
		intro.addChild(overlay);

		//end text
		var stageText = new createjs.Text("--", "bold 36px Arial", "#ffffff"); 
		stageText.text = "Garbage-Sorter";
		stageText.x = w * .17;
		stageText.y = h * .17;

		intro.addChild(stageText);

		var button = new createjs.Shape();
		button.graphics.beginFill('#ffffff').drawRoundRect(w*.3, h*.6,w*.4,h*.1,10);
		intro.addChild(button);

		button.addEventListener("rollover", function(evt){
			evt.target.alpha = .5;
		});

		button.addEventListener("rollout", function(evt){
			evt.target.alpha = 1;
		});

		button.addEventListener("click", function(evt){
			var SETTING = "hard";

			this.GarbageGameStage.removeChild(intro);
			
		})

		var buttonText = new createjs.Text("PLAY", "bold 30px Arial", "green");
		buttonText.x = w*.44;
		buttonText.y = h*.62;
		intro.addChild(buttonText);
		
		this.GarbageGameStage.addChild(intro);
	};

	// level starts
	GarbageGame.prototype.startLevel = function() {
		console.log("in startLevel");
		this.level = new Level(this.GarbageGameStage, this.GGContentManger, this.gameWidth, this.gameHeight);
		console.log(this.level);
	};

	// updates the game
	GarbageGame.prototype.updateGame = function() {

		if(this.levelEnd){
			if(!this.feedbackDisplayed){
				this.showScore();
				this.feedbackDisplayed = !this.feedbackDisplayed;
			}
		}else{
			this.level.Update();
		}

		this.GarbageGameStage.update();

	}; 

	// display feedback
	GarbageGame.prototype.showScore = function() {
		this.feedbackDisplayed = true;

		var w = this.gameWidth;
		var h = this.gameHeight;

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
		stageText.text = "Stage: " + this.level.stageLevel;
		stageText.x = w * .17;
		stageText.y = h * .17;

		var stagePoint = new createjs.Text("--", "bold 36px Arial", "#ffffff"); 
		stagePoint.text = "Score: " + this.level.levelScore;
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
		for(var i = 0; i < this.level.levelBins.length; i++){
			tmp = new createjs.Text("--", "bold 30px Arial", "#ffffff"); 
			tmp.text = this.level.levelBins[i] + ": " + this.level.garbageBin[i].contentCountCorrect;
			tmp.x = w * .18;
			tmp.y = h * (.35 + (.03 *i));
			
			itemsText.push(tmp);
			container.addChild(itemsText[i]);
			incorrectCount += this.level.garbageBin[i].contentCountWrong;
		}

		var wrongText = new createjs.Text("--", "bold 30px Arial", "red"); 
		wrongText.text = "incorrectly recycled: " + incorrectCount;
		wrongText.x = w * .18;
		wrongText.y = h * (.35 + (.03 * this.level.levelBins.length));

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
			console.log("QUIT");
			if(buttonText.text === "Quit"){

				if(level.levelScore > topScore){
					localStorage.setItem('topScore', this.level.levelScore);
				}

				createjs.Sound.stop();
			}

			stageText.text = "Top Score:"
			stageText.x += (w*.20);

			container.removeChild(recycleText);
			container.removeChild(wrongText);

			/*
			if(level.levelScore > topScore){
				stagePoint.text = this.level.levelScore;
			}
			else{
				stagePoint.text = topScore;
			}
			stagePoint.x += (w*.3);

			for (var i = 0; i < this.level.levelBins.length; i++){
				container.removeChild(itemsText[i]);
			};
			*/
			buttonText.text = "Quit";
		})

		var buttonText = new createjs.Text("NEXT", "bold 30px Arial", "green");
		buttonText.x = w*.44;
		buttonText.y = h*.62;
		container.addChild(buttonText);
		
		this.GarbageGameStage.addChild(container);
	}; 


	window.GarbageGame = GarbageGame;
}(window))