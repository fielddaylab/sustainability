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
		this.winComplete = false;
		this.levelName = name;
		this.levelVersion = levelVersion;
		this.args = null;
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

		/*
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
		*/

		var w = this.gameWidth;
		var h = this.gameHeight;

		var intro = new createjs.Container();
		intro.x = 0;
		intro.y = 0;
		intro.setBounds(w * .10,h * .10, w * .78, h *.68);
		intro.mouseEnabled = true;

		var levelCompleteOverlay = new createjs.Bitmap("src/img/waste_level_complete_overlay.gif");
		levelCompleteOverlay.scaleX = 1.55;
		levelCompleteOverlay.scaleY = 1.55;
		intro.addChild(levelCompleteOverlay);

		//end text

		var buildingText = new createjs.Text("--", "bold 60px Arial", "#FFFFFF"); 
		buildingText.text = this.level.stageLevel;
		buildingText.x = w * .05;
		buildingText.y = h * .05;
		intro.addChild(buildingText);

		var introText = new createjs.Text("--", "bold 54px Arial", "#0000000"); 
		introText.text = "Sort the waste for this building! ";
		introText.x = w * .1;
		introText.y = h * .28;
		intro.addChild(introText);

		var explainText = new createjs.Text("--", "bold 36px Arial", "#0000000"); 
		explainText.text = "Beat all 3 waves of garbage!";
		explainText.x = w * .45;
		explainText.y = h * .35;
		intro.addChild(explainText);

		var explainText2 = new createjs.Text("--", "bold 36px Arial", "#0000000"); 
		explainText2.text = "Don't let the garbage pile up.";
		explainText2.x = w * .47;
		explainText2.y = h * .38;
		intro.addChild(explainText2);

		var explainText3 = new createjs.Text("--", "bold 36px Arial", "#0000000"); 
		explainText3.text = "You'll lose if the bar fills ups.";
		explainText3.x = w * .47;
		explainText3.y = h * .58;
		intro.addChild(explainText3);

		var button = new createjs.Shape();
		button.graphics.beginFill('#ffffff').drawRoundRect(w*.5, h*.6,w*.6,h*.1,10);
		button.alpha = .2;
		intro.addChild(button);

		var self = this;
		button.addEventListener("click", function(evt){
			self.GarbageGameStage.removeChild(intro);

			// go to next step
			self.intro = false;
			//playSound();
			self.level.startWait();

		});

		var buttonText = new createjs.Text("Start", "bold 42px Arial", "#00000");
		buttonText.x = w*.8;
		buttonText.y = h*.63;
		intro.addChild(buttonText);

		this.GarbageGameStage.addChild(intro);
	};

	// lose, should display lose transition
	GarbageGame.prototype.loseScreen = function() {


		this.feedbackDisplayed = true;

		var w = this.gameWidth;
		var h = this.gameHeight;

		console.log('lose overlay');
		var loseOverlay = new createjs.Bitmap("src/img/waste_loose_lower_overlay.gif");
		loseOverlay.y = 165;
		loseOverlay.scaleX = 1.55;
		loseOverlay.scaleY = 1.55;
		this.GarbageGameStage.addChild(loseOverlay);

		// container
		var container = new createjs.Container();
		container.x = 0;
		container.y = 0;
		container.setBounds(w * .10,h * .10, w * .78, h *.68);
		container.mouseEnabled = true;

		//end text
		var stageText = new createjs.Text("--", "bold 42px Arial", "#000000"); 
		stageText.text = "YOU LOSE...";
		stageText.x = w * .5;
		stageText.y = h * .7;

		container.addChild(stageText);

		var button = new createjs.Shape();
		button.graphics.beginFill('#ffffff').drawRoundRect(w*.55, h*.9,w*.45,h*.1,10);
		button.alpha = .5;
		container.addChild(button);

		var self = this;
		button.addEventListener("click", function(evt){

			createjs.Sound.stop();
			window.location = window.location.search;
		});

		var buttonText = new createjs.Text("RETRY", "bold 42px Arial", "#000000");
		buttonText.x = w*.75;
		buttonText.y = h*.94;
		container.addChild(buttonText);
		
		this.GarbageGameStage.addChild(container);
	}

	// display feedback
	GarbageGame.prototype.winScreen = function() {
		
		this.feedbackDisplayed = true;

		var w = this.gameWidth;
		var h = this.gameHeight;

		var levelCompleteOverlay = new createjs.Bitmap("src/img/waste_level_complete_overlay.gif");
		levelCompleteOverlay.scaleX = 1.55;
		levelCompleteOverlay.scaleY = 1.55;
		this.GarbageGameStage.addChild(levelCompleteOverlay);

		var container = new createjs.Container();
		container.x = 0;
		container.y = 0;
		container.setBounds(w * .10,h * .10, w * .78, h *.68);
		container.mouseEnabled = true;

		//end text
		var winText = new createjs.Text("--", "bold 54px Arial", "#FFFFFF"); 
		winText.text = "ALMOST THERE! ";
		winText.x = 10;
		winText.y = h * .2;

		if(this.levelVersion == 3){
			winText.text = "YOU DID IT!";
		}


		var stageText = new createjs.Text("--", "bold 42px Arial", "#000000"); 
		stageText.text = "Stage: " + this.level.stageLevel + " " + this.levelVersion + " of 3";
		stageText.x = w * .4;
		stageText.y = h * .3;

		var stagePoint = new createjs.Text("--", "bold 42px Arial", "#000000"); 
		stagePoint.text = "Score: " + this.level.levelScore;
		stagePoint.x = w * .47;
		stagePoint.y = h * .35;

		var recycleText = new createjs.Text("--", "bold 42px Arial", "#000000"); 
		recycleText.text = "Recycled Items";
		recycleText.x = w * .5;
		recycleText.y = h * .4;

		container.addChild(winText);
		container.addChild(stageText);
		container.addChild(stagePoint);
		container.addChild(recycleText);

		var tmp = null;
		var itemsText = [];
		var incorrectCount = 0;
		for(var i = 0; i < this.level.levelBins.length; i++){
			tmp = new createjs.Text("--", "bold 30px Arial", "#000000"); 
			tmp.text = this.level.levelBins[i] + ": " + this.level.garbageBin[i].contentCountCorrect;
			tmp.x = w * .5;
			tmp.y = h * (.45 + (.03 *i));
			
			itemsText.push(tmp);
			container.addChild(itemsText[i]);
			incorrectCount += this.level.garbageBin[i].contentCountWrong;
		}

		var wrongText = new createjs.Text("--", "bold 36px Arial", "red"); 
		wrongText.text = "incorrectly recycled: " + incorrectCount;
		wrongText.x = w * .5;
		wrongText.y = h * (.45 + (.03 * this.level.levelBins.length));

		container.addChild(wrongText);

		var button = new createjs.Shape();
		button.graphics.beginFill('#ffffff').drawRoundRect(w*.5, h*.6,w*.6,h*.1,10);
		button.alpha = .2;
		container.addChild(button);

		var self = this;
		button.addEventListener("click", function(evt){

			createjs.Sound.stop();

			// create query string
			// checks url input

			var search;
	   		var query = window.location.search;
	    	if(query.substring(0,1) == '?'){
	        	query = query.substring(1);
	        	self.args = query.split("&");
	    	}

			if(this.levelVersion == 3){
				self.winComplete = true;
				console.log("should have new screen");
			}
			else{

	    		var stageName = self.args[0]; 
	    		var levelVersion = 0;

	    		if(self.args.length == 2){
	    			console.log("arg = 2");

	        		levelVersion = self.args[1].split("=")[1];
	        		search = "?" + self.args[0] + "&" + self.args[1].split("=")[0] + "=" + (parseInt(this.levelVersion) + 1);
	        		window.location = "garbagesorter.html" + search;
	    		}

	    		// not working for aris, but below works <-- DUH ARIS HAS 5 arguments: 2 + game id + webpageid + playerID... lol
			    if(self.args.length == 4){
			    	console.log("arg = 4");

			        var playerId = self.args[1].split("=")[1];
			        var gameId = self.args[2].split("=")[1];
			        search = "?" + self.args[0] + "&" + self.args[1].split("=")[0] + "=" + (parseInt(this.levelVersion) + 1) + "&" + self.args[2] + "&" + self.args[3]; 
	        		
	        		window.location = "garbagesorter.html" + search;
			    }

			    //window.location.search = search;
			    search = "?" + self.args[0] + "&" + self.args[1].split("=")[0] + "=" + (parseInt(this.levelVersion) + 1) + "&" + args[2] + "&" + self.args[3]; 
				window.location = "garbagesorter.html" + search;
			}

		});

		var buttonText = new createjs.Text("Sort the next batch.", "bold 36px Arial", "#00000");
		buttonText.x = w*.6;
		buttonText.y = h*.63;
		container.addChild(buttonText);
			
		if(this.levelVersion == 3){
			buttonText.text = "Continue";
			buttonText.x = w * .75;
		}

		this.GarbageGameStage.addChild(container);
	}; 

	GarbageGame.prototype.completeScreen = function() {
		this.winComplete = false;

		var w = this.gameWidth;
		var h = this.gameHeight;

		var backOverlay = new createjs.Shape();
		backOverlay.graphics.beginFill('#AAAAAA').drawRoundRect(0, 0,w,h,10);				
		this.GarbageGameStage.addChild(backOverlay);

		var levelCompleteOverlay = new createjs.Bitmap("src/img/waste_win_lower_overlay.gif");
		levelCompleteOverlay.scaleX = 1.55;
		levelCompleteOverlay.scaleY = 1.55;
		levelCompleteOverlay.y = 10;
		this.GarbageGameStage.addChild(levelCompleteOverlay);

		//
		var button = new createjs.Shape();
		button.graphics.beginFill('#FFFFFF').drawRoundRect(w*.35, h*.9,w*.65,h*.1,10);
		button.alpha = .2;
		this.GarbageGameStage.addChild(button);

		var buttonText = new createjs.Text("Continue saving the campus!", "bold 36px Arial", "#000000");
		buttonText.x = w*.40;
		buttonText.y = h*.945;
		this.GarbageGameStage.addChild(buttonText);

		var self = this;
		button.addEventListener("click", function(evt){
			console.log("SHOULD SEND ARIS REQUEST");
			
			//console.log('query: ' + query);
			var playerId = self.args[2].split("=")[1];
			console.log('playerId: ' + playerId);

			var x = new XMLHttpRequest();	
			x.open("GET", "http://arisgames.org/server/json.php/v1.webhooks.setWebHookReq/13080/911/0/" + playerId, true);
			x.send();

			// exit and reload
			var x = new XMLHttpRequest();	
			x.open("GET", "aris://closeMe", true);
			x.send();
		});

		var completeText = new createjs.Text("--", "bold 36px Arial", "#000000"); 
		completeText.text = "You did it! The trash is just... vanishing!"
		completeText.x = w * .05;
		completeText.y = h * .8;
		this.GarbageGameStage.addChild(completeText);

		var awesomeText = new createjs.Text("--", "bold 36px Arial", "#000000"); 
		awesomeText.text = "This is AWESOME!";
		awesomeText.x = w * .05;
		awesomeText.y = h * .85;
		this.GarbageGameStage.addChild(awesomeText);

	}

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

				if(this.winComplete){
					this.completeScreen();
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