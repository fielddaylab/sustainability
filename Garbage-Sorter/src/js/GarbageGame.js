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

		var intro = new createjs.Container();
		intro.x = 0;
		intro.y = 0;
		intro.setBounds(w * .10,h * .10, w * .78, h *.68);
		intro.mouseEnabled = true;


		var buildingOverlay = "";
		var buildingOverlayWidth = "";
		switch(this.levelName) {
			case "uSouth":
				buildingOverlay = new createjs.Bitmap(this.GGContentManger.badUnion.src);
				buildingOverlayWidth = this.GGContentManger.badUnion.width;
				break;
			case "Dejope":
				buildingOverlay = new createjs.Bitmap(this.GGContentManger.badDejope.src);
				buildingOverlayWidth = this.GGContentManger.badDejope.width;
				break;
			case "Chemistry":
				buildingOverlay = new createjs.Bitmap(this.GGContentManger.badChemistry.src);
				buildingOverlayWidth = this.GGContentManger.badChemistry.width;
				break;
			case "Grainger":
				buildingOverlay = new createjs.Bitmap(this.GGContentManger.badGrainger.src);
				buildingOverlayWidth = this.GGContentManger.badGrainger.width;
				break;
			case "Gordon":
				buildingOverlay = new createjs.Bitmap(this.GGContentManger.badGordon.src);
				buildingOverlayWidth = this.GGContentManger.badGordon.width;
				break;
		}

		// pan the image background
		buildingOverlay.scaleX = 1.55;
		buildingOverlay.scaleY = 2;
		intro.addChild(buildingOverlay);

		// math for panning the background
		//

		var stopDistance = (buildingOverlayWidth* 1.55 )- w;
		buildingOverlay.addEventListener("tick", function(evt){
			if(!(buildingOverlay.x < -stopDistance)){
				buildingOverlay.x -= 3;
			}
		})

		var overlayHeight = this.GGContentManger.introOverlay.height;
		var introLevelOverlay = new createjs.Bitmap(this.GGContentManger.introOverlay.src);
		introLevelOverlay.scaleX = 1.55;
		introLevelOverlay.scaleY = 1.55;

		//pin to bottom
		introLevelOverlay.y = h - (1.55 * overlayHeight);
		intro.addChild(introLevelOverlay);

		var showText = new createjs.Text("--", "48px Times", "#0000000"); 
		showText.text = "Show your staff how to sort";
		showText.x = w * .36;
		showText.y = h * .7;
		intro.addChild(showText);

		var showText2 = new createjs.Text("--", "48px Times", "#0000000"); 
		showText2.text = "the waste.";
		showText2.x = w * .36;
		showText2.y = h * .74;
		intro.addChild(showText2);

		var showText3 = new createjs.Text("--", "48px Times", "#0000000"); 
		showText3.text = "It will set off a";
		showText3.x = w * .36;
		showText3.y = h * .8;
		intro.addChild(showText3);

		var showText4 = new createjs.Text("--", "bold 48px Times", "#0000000"); 
		showText4.text = "chain-reaction";
		showText4.x = w * .67;
		showText4.y = h * .8;
		intro.addChild(showText4);

		var showText5 = new createjs.Text("--", "48px Times", "#0000000"); 
		showText5.text = "and";
		showText5.x = w * .36;
		showText5.y = h * .84;
		intro.addChild(showText5);

		var showText6 = new createjs.Text("--", "bold 48px Times", "#0000000"); 
		showText6.text = "save the future!";
		showText6.x = w * .45;
		showText6.y = h * .84;
		intro.addChild(showText6);

		var button = new createjs.Shape();
		button.graphics.beginFill('#FFFFFF').drawRoundRect(w*.5, h*.9,w*.6,h*.1,10);
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

		var buttonText = new createjs.Text("Begin", "bold 54px Arial", "#00000");
		buttonText.x = w*.75;
		buttonText.y = h*.93;
		intro.addChild(buttonText);

		this.GarbageGameStage.addChild(intro);
	};

	// lose, should display lose transition
	GarbageGame.prototype.loseScreen = function() {


		this.feedbackDisplayed = true;

		var w = this.gameWidth;
		var h = this.gameHeight;

		var buildingOverlay = "";
		var buildingOverlayWidth = "";
		switch(this.levelName) {
			case "uSouth":
				buildingOverlay = new createjs.Bitmap(this.GGContentManger.badUnion.src);
				buildingOverlayWidth = this.GGContentManger.badUnion.width;
				break;
			case "Dejope":
				buildingOverlay = new createjs.Bitmap(this.GGContentManger.badDejope.src);
				buildingOverlayWidth = this.GGContentManger.badDejope.width;
				break;
			case "Chemistry":
				buildingOverlay = new createjs.Bitmap(this.GGContentManger.badChemistry.src);
				buildingOverlayWidth = this.GGContentManger.badChemistry.width;
				break;
			case "Grainger":
				buildingOverlay = new createjs.Bitmap(this.GGContentManger.badGrainger.src);
				buildingOverlayWidth = this.GGContentManger.badGrainger.width;
				break;
			case "Gordon":
				buildingOverlay = new createjs.Bitmap(this.GGContentManger.badGordon.src);
				buildingOverlayWidth = this.GGContentManger.badGordon.width;
				break;
		}

		buildingOverlay.scaleX = 1.55;
		buildingOverlay.scaleY = 2;
		this.GarbageGameStage.addChild(buildingOverlay);

		var loseOverlayHeight = this.GGContentManger.loseOverlay.height;
		var loseOverlay = new createjs.Bitmap(this.GGContentManger.loseOverlay.src);
		loseOverlay.scaleX = 1.55;
		loseOverlay.scaleY = 1.55;
		loseOverlay.y = h - (1.55 * loseOverlayHeight);
		this.GarbageGameStage.addChild(loseOverlay);

		// container
		var container = new createjs.Container();
		container.x = 0;
		container.y = 0;
		container.setBounds(w * .10,h * .10, w * .78, h *.68);
		container.mouseEnabled = true;

		//end text
		var stageText = new createjs.Text("--", "bold 42px Arial", "#000000"); 
		stageText.text = "It didn't work.";
		stageText.x = w * .5;
		stageText.y = h * .7;
		container.addChild(stageText);

		var stageText2 = new createjs.Text("--", "42px Arial", "#000000"); 
		stageText2.text = "Too many items were lost";
		stageText2.x = w * .45;
		stageText2.y = h * .75;
		container.addChild(stageText2);

		var stageText3 = new createjs.Text("--", "42px Arial", "#000000"); 
		stageText3.text = "or mis-sorted. The programs";
		stageText3.x = w * .4;
		stageText3.y = h * .79;
		container.addChild(stageText3);

		var stageText4 = new createjs.Text("--", "42px Arial", "#000000"); 
		stageText4.text = "to compost and recycle cost";
		stageText4.x = w * .4;
		stageText4.y = h * .83;
		container.addChild(stageText4);

		var stageText5 = new createjs.Text("--", "42px Arial", "#000000"); 
		stageText5.text = "too much and were cut.";
		stageText5.x = w * .4;
		stageText5.y = h * .86;
		container.addChild(stageText5);

		var button = new createjs.Shape();
		button.graphics.beginFill('#ffffff').drawRoundRect(w*.55, h*.9,w*.45,h*.1,10);
		button.alpha = .5;
		container.addChild(button);

		var self = this;
		button.addEventListener("click", function(evt){

			createjs.Sound.stop();
			window.location = window.location.search;
		});

		var buttonText = new createjs.Text("Try again", "bold 42px Arial", "#000000");
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

		var levelCompleteOverlayHeight = this.GGContentManger.levelCompleteOverlay.height;
		var levelCompleteOverlay = new createjs.Bitmap(this.GGContentManger.levelCompleteOverlay.src);
		levelCompleteOverlay.scaleX = 1.55;
		levelCompleteOverlay.scaleY = 1.55;
		this.GarbageGameStage.addChild(levelCompleteOverlay);

		levelCompleteOverlay.y = h - (1.55 * levelCompleteOverlayHeight);

		var container = new createjs.Container();
		container.x = 0;
		container.y = 0;
		container.setBounds(w * .10,h * .10, w * .78, h *.68);
		container.mouseEnabled = true;

		//end text
		var winText = new createjs.Text("--", "bold 54px Times", "#000000"); 
		winText.text = "Almost there. ";
		winText.x = w * .5;
		winText.y = h * .28;

		if(this.levelVersion == 3){
			winText.text = "YOU DID IT!";
		}


		var stagePoint = new createjs.Text("--", "bold 42px Arial", "#000000"); 
		stagePoint.text = "SCORE: " + this.level.levelScore;
		stagePoint.x = w * .5;
		stagePoint.y = h * .33;

		var recycleText = new createjs.Text("--", "bold 42px Arial", "#000000"); 
		recycleText.text = "Recycled Items";
		recycleText.x = w * .5;
		recycleText.y = h * .38;

		container.addChild(winText);
		container.addChild(stagePoint);
		container.addChild(recycleText);

		var tmp = null;
		var itemsText = [];
		var incorrectCount = 0;
		for(var i = 0; i < this.level.levelBins.length; i++){
			tmp = new createjs.Text("--", "bold 30px Arial", "#000000"); 
			tmp.text = this.level.levelBins[i] + ": " + this.level.garbageBin[i].contentCountCorrect;
			tmp.x = w * .5;
			tmp.y = h * (.43 + (.03 *i));
			
			itemsText.push(tmp);
			container.addChild(itemsText[i]);
			incorrectCount += this.level.garbageBin[i].contentCountWrong;
		}

		var wrongText = new createjs.Text("--", "bold 36px Arial", "red"); 
		wrongText.text = "incorrectly recycled: " + incorrectCount;
		wrongText.x = w * .5;
		wrongText.y = h * (.43 + (.03 * this.level.levelBins.length));

		container.addChild(wrongText);

		var button = new createjs.Shape();
		button.graphics.beginFill('#ffffff').drawRoundRect(w*.6, h*.6,w*.4,h*.1,10);
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
			    search = "?" + self.args[0] + "&" + self.args[1].split("=")[0] + "=" + (parseInt(this.levelVersion) + 1) + "&" + self.args[2] + "&" + self.args[3]; 
				window.location = "garbagesorter.html" + search;
			}

		});

		var buttonText = new createjs.Text("Continue", "bold 42px Arial", "#000000");
		buttonText.x = w*.75;
		buttonText.y = h*.61;
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

		var buildingOverlay = "";
		var buildingOverlayWidth = "";
		switch(this.levelName) {
			case "uSouth":
				buildingOverlay = new createjs.Bitmap(this.GGContentManger.goodUnion.src);
				buildingOverlayWidth = this.GGContentManger.goodUnion.width;
				break;
			case "Dejope":
				buildingOverlay = new createjs.Bitmap(this.GGContentManger.goodDejope.src);
				buildingOverlayWidth = this.GGContentManger.goodDejope.width;
				break;
			case "Chemistry":
				buildingOverlay = new createjs.Bitmap(this.GGContentManger.goodChemistry.src);
				buildingOverlayWidth = this.GGContentManger.goodChemistry.width;
				break;
			case "Grainger":
				buildingOverlay = new createjs.Bitmap(this.GGContentManger.goodGrainger.src);
				buildingOverlayWidth = this.GGContentManger.goodGrainger.width;
				break;
			case "Gordon":
				buildingOverlay = new createjs.Bitmap(this.GGContentManger.goodGordon.src);
				buildingOverlayWidth = this.GGContentManger.goodGordon.width;
				break;
		}

		// pan the image background
		buildingOverlay.scaleX = 1.55;
		buildingOverlay.scaleY = 2.5;
		this.GarbageGameStage.addChild(buildingOverlay);

		// math for panning the background
		//

		var stopDistance = (buildingOverlayWidth* 1.55 )- w;
		buildingOverlay.addEventListener("tick", function(evt){
			if(!(buildingOverlay.x < -(stopDistance - 10))){
				buildingOverlay.x -= 3;
			}
		})

		var winOverlayHeight = this.GGContentManger.winOverlay.height;
		var winOverlay = new createjs.Bitmap(this.GGContentManger.winOverlay.src);
		winOverlay.scaleX = 1.55;
		winOverlay.scaleY = 1.55;
		winOverlay.y = h - (1.55 * winOverlayHeight);
		this.GarbageGameStage.addChild(winOverlay);

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
			var playerId = self.args[3].split("=")[1];
			//console.log('playerId: ' + playerId);

			var x = new XMLHttpRequest();	
			x.open("GET", self.level.stageLevelWebHook + playerId, true);
			x.send();

			// gives +1
			//ARIS.giveItemCount(60048,1);

			// uses ARIS object
			ARIS.closeMe();

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