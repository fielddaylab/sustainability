// This is the main class of the Garbage-Sorter Game

(function (window) {
	function GarbageGame(stage, contentManager, gameWidth, gameHeight, name, levelVersion){

		// set canvas
		this.GarbageGameStage = stage;
		this.GGContentManger = contentManager;
		this.gameWidth = gameWidth;
		this.gameHeight= gameHeight;
		this.level = null;
		this.gameOver = false;
		this.feedbackDisplayed = false;
		this.levelName = name;
		this.levelVersion = levelVersion;

		this.intro = false;
	};


	// adjust the canvas size to match the screen
	GarbageGame.prototype.adjustCanvas = function(canvas) {
	};

	// load game assets
	GarbageGame.prototype.loadAssets = function() {
	};

	GarbageGame.prototype.startGame = function() {
		
		// get the level started
		this.startLevel();
		this.level.startLevel(this.levelName);
		if(this.levelVersion == 1){
			this.introScreen();
		}else{
			this.level.startWait();
		}
	}

	// display intro
	GarbageGame.prototype.introScreen = function() {
		this.intro = true;

		var w = this.gameWidth;
		var h = this.gameHeight;

		var intro = new createjs.Container();
		intro.setBounds(w * .10,h * .10, w * .78, h *.68);
		intro.mouseEnabled = true;

		// background screen
		var screenIntro = new createjs.Shape();
		screenIntro.graphics.beginFill('#54B368').drawRoundRect(0,0,w,h,10);
		intro.addChild(screenIntro);

		// small screen in center
		var overlay = new createjs.Shape();
		overlay.graphics.beginFill('green').drawRoundRect(w*.02, h*.02, w*.96, h*.96, 5);
		overlay.alpha = 1;
		intro.addChild(overlay);

		// title text
		var stageText = new createjs.Text("--", "bold 72px Arial", "#ffffff"); 
		stageText.text = "Sort the Garbage!!";
		stageText.x = w * .05;
		stageText.y = h * .05;
		intro.addChild(stageText);

		// small screen in center
		var littleScreen = new createjs.Shape();
		littleScreen.graphics.beginFill('#FFFFFF').drawRoundRect(w*.10, h*.15, w*.8, h*.40, 5);
		littleScreen.alpha = 1;
		intro.addChild(littleScreen);

		var screenText = new createjs.Text("--", "bold 32px Arial", "#AAAAAA");
		screenText.text = "IMAGE";
		screenText.x = w * .45;
		screenText.y = h * .35;
		intro.addChild(screenText);

		// text for the instructions
		var instructionText = new createjs.Text("--", "bold 32px Arial", "#ffffff");
		instructionText.text = "TO PLAY: Sort the garbage into the proper bins.";
		instructionText.x = w * .1;
		instructionText.y = h * .57;
		intro.addChild(instructionText);

		var instructionText2 = new createjs.Text("--", "bold 32px Arial", "#ffffff");
		instructionText2.text = "Be careful, don't let the garbage overflow.";
		instructionText2.x = w * .1;
		instructionText2.y = h * .60;
		intro.addChild(instructionText2);

		var waveText = new createjs.Text("--", "bold 42px Arial", "#ffffff");
		waveText.text = "Beat all 3 waves!";
		waveText.x = w * .1;
		waveText.y = h * .65;
		intro.addChild(waveText);

		// buttons
		var button = new createjs.Shape();
		button.graphics.beginFill('#ffffff').drawRoundRect(w*.3, h*.73,w*.4,h*.08,10);
		intro.addChild(button);

		var buttonText = new createjs.Text("PLAY", "bold 30px Arial", "green");
		buttonText.x = w*.44;
		buttonText.y = h*.75;
		intro.addChild(buttonText);
	
		button.addEventListener("rollover", function(evt){
			evt.target.alpha = .5;
		});

		button.addEventListener("rollout", function(evt){
			evt.target.alpha = 1;
		});

		// not pretty
		var self = this;
		button.addEventListener("click", function(evt){
			// this => is the window
			// make this, remove child intro
			self.GarbageGameStage.removeChild(intro);

			// go to next step
			self.intro = false;
			//playSound();
			self.level.startWait();
		})
		
		this.GarbageGameStage.addChild(intro);
	};

	GarbageGame.prototype.loseScreen = function() {


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
		container.addChild(endOverlay);

		var overlay = new createjs.Shape();
		overlay.graphics.beginFill('#54B368').drawRoundRect(w*.15, h*.15, w*.7, h*.6, 10);
		overlay.alpha = 1;
		container.addChild(overlay);

		//end text
		var stageText = new createjs.Text("--", "bold 36px Arial", "#ffffff"); 
		stageText.text = "YOU LOSE";
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

		var self = this;
		button.addEventListener("click", function(evt){

			createjs.Sound.stop();
			window.location = window.location.search;
		});

		var buttonText = new createjs.Text("RETRY", "bold 30px Arial", "green");
		buttonText.x = w*.44;
		buttonText.y = h*.62;
		container.addChild(buttonText);
		
		this.GarbageGameStage.addChild(container);

	}

	// display feedback
	GarbageGame.prototype.winScreen = function() {
		
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
		container.addChild(endOverlay);

		var overlay = new createjs.Shape();
		overlay.graphics.beginFill('#54B368').drawRoundRect(w*.15, h*.15, w*.7, h*.6, 10);
		overlay.alpha = 1;
		container.addChild(overlay);

		//end text
		var stageText = new createjs.Text("--", "bold 36px Arial", "#ffffff"); 
		stageText.text = "Stage: " + this.level.stageLevel + " " + this.levelVersion + " of 3";
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

		var self = this;
		button.addEventListener("click", function(evt){

			createjs.Sound.stop();

			// create query string
			// checks url input

			if(this.levelVersion == 3){
				// send webhook to aris for completion
			}
			else{

				var search;
	   			var query = window.location.search;
	    		if(query.substring(0,1) == '?'){
	        		query = query.substring(1);
	        		var args = query.split("&");
	    		}

	    		var stageName = args[0]; 
	    		var levelVersion = 0;

	    		if(args.length == 2){
	    			console.log("arg = 2");

	        		levelVersion = args[1].split("=")[1];
	        		search = "?" + args[0] + "&" + args[1].split("=")[0] + "=" + (parseInt(this.levelVersion) + 1);
	        		window.location = "garbagesorter.html" + search;
	    		}

			    if(args.length == 4){
			    	console.log("arg = 4");

			        var playerId = args[1].split("=")[1];
			        var gameId = args[2].split("=")[1];
			        search = "?" + args[0] + "&" + args[1].split("=")[0] + "=" + (parseInt(this.levelVersion) + 1) + "&" + args[2] + "&" + args[3]; 
	        		
	        		window.location = "garbagesorter.html" + search;
			    }

			    //window.location.search = search;
			    search = "?" + args[0] + "&" + args[1].split("=")[0] + "=" + (parseInt(this.levelVersion) + 1) + "&" + args[2] + "&" + args[3]; 
				window.location = "garbagesorter.html" + search;
			}

		});

		var buttonText = new createjs.Text("Finish the next Wave.", "bold 30px Arial", "green");
		buttonText.x = w*.35;
		buttonText.y = h*.62;
		container.addChild(buttonText);
		
		this.GarbageGameStage.addChild(container);
	}; 

	// level starts
	GarbageGame.prototype.startLevel = function() {
		this.level = new Level(this.GarbageGameStage, this.GGContentManger, this.gameWidth, this.gameHeight, this.levelName, this.levelVersion);
	};

	// updates the game
	GarbageGame.prototype.updateGame = function() {
		
		
		if(this.level.levelEnd){

			if(this.level.levelWin){
				if(!this.feedbackDisplayed){
					this.winScreen();
				}
			}
			else{
				if(!this.feedbackDisplayed){
					this.loseScreen();
				}
			}
		}
		else if(this.intro){
			// just wait....
		}
		else{
			this.level.Update();
		}

		this.GarbageGameStage.update();
		
	}; 



	window.GarbageGame = GarbageGame;
}(window))