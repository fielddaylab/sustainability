// This class will be responsible for the layers

(function (window){
	function Level(stage, contentManager, gameWidth, gameHeight, stageName, levelVersion){

		this.levelStage = stage;
		this.levelContentManager = contentManager;

		this.levelWidth = gameWidth;
		this.levelHeight = gameHeight;

		this.stageName = stageName; 
		this.levelVersion = levelVersion;
		this.levelWave = 0;

		// keeps track of level stats
		this.levelScore = 0;
		this.levelDefaultTime = 300000;
		this.warningtime = convertMStoS(this.levelDefaultTime * .2);
		this.longestCorrect = 0;
		this.garbageCount = 0;

		//  
		this.levelStart = false;
		this.levelWin = false;
		this.levelEnd = false;
		this.landfillHeight = this.levelHeight * .85;

		this.landfillsQ = null;

		// objects
		this.garbage = [];
		this.garbageBin = [];
		this.conveyorBelt = [];

		this.levelBins = [];
		this.levelText = [];
		this.feedBackText = [];
	}

	// Selects the level and generates the garbage, bins, and text
	Level.prototype.startLevel = function(stageLevel) {

		// assigns level if one has not been chosen already
		stageLevel = typeof stageLevel !== 'undefined' ? stageLevel : 'easy';

		this.stageLevel = stageLevel;

		if(stageLevel === "Dejope"){
			this.levelBins = ['landfill', 'recycle'];
			this.stageLevelWebHook = "http://arisgames.org/server/json.php/v1.webhooks.setWebHookReq/13080/913/0/";
		} 

		if(stageLevel === "uSouth"){
			this.levelBins = ['landfill', 'recycle', 'compost'];
			this.stageLevelWebHook = "http://arisgames.org/server/json.php/v1.webhooks.setWebHookReq/13080/911/0/";
		}

		if(stageLevel === "Chemistry"){
			this.levelBins = ['landfill', 'recycle', 'chemical'];
			this.stageLevelWebHook = "http://arisgames.org/server/json.php/v1.webhooks.setWebHookReq/13080/916/0/";
		}

		if(stageLevel === "Grainger"){
			this.levelBins = ['landfill', 'recycle', 'compost', 'tech', 'chemical'];
			this.stageLevelWebHook = "http://arisgames.org/server/json.php/v1.webhooks.setWebHookReq/13080/918/0/";
		}

		if(stageLevel === "Gordon"){
			this.levelBins = ['landfill', 'recycle', 'tech'];
			this.stageLevelWebHook = "http://arisgames.org/server/json.php/v1.webhooks.setWebHookReq/13080/915/0/";
		}

		// initialize the contents and places them on the stage
		this.setBackground();
		this.loadLandfillBar();
		this.loadConveyor();
		this.loadBins();
		this.reloadGarbage();		
	};

	Level.prototype.startWait = function(){
		this.waitTime = createCountDown(4000);
		this.startWait = new createjs.Text("---", "bold 72px Arial", "#000000");
    	this.startWait.x = this.levelWidth / 2 - 10;
    	this.startWait.y = this.levelHeight / 2 - 70;
    	this.startWait.text = convertMStoS(this.waitTime());

    	// add an overlay
    	this.startOverlay = new createjs.Shape();
    	this.startOverlay.graphics.beginFill('#AAAAAA').drawRoundRect(0,0, this.levelWidth, this.levelHeight ,1);
    	this.startOverlay.alpha = .5;

    	this.levelStage.addChild(this.startOverlay);
    	this.levelStage.addChild(this.startWait);
	}

	Level.prototype.waitStart = function(){

		// include a timer that counts down
		// when timer is zero, it'll set the level to on
		var time = convertMStoS(this.waitTime());
		time = parseFloat(time);

		if(time > 1)
		{
    		this.startWait.text = time.toFixed(0);
	    }
    	else if(time === 1 || (time < 1 && time > 0))
    	{
    		this.startWait.text = "START";
    		this.startWait.x = this.levelWidth / 2 - 100;
    	}
    	else{
    		this.levelStage.removeChild(this.startWait);
    		this.levelStage.removeChild(this.startOverlay);
    		this.levelStart = true;

    		// start the game timer
    		this.timeRemain = createCountDown(this.levelDefaultTime); 
    	}

	}

	//	Loads the garbage bins onto the screen based on the level
	Level.prototype.loadBins = function() {

		//
		console.log("Load Bins");

		var xPos;								// x location of the object
		var yPos = 0;							// y location of the object
		var yOff; 								// y offset
		var binCount = this.levelBins.length;

		yOff = this.levelHeight / (binCount + 1);
		xPos = this.levelWidth * .6;
		var tmpBin;
		var SCALE = 1;

		for(var i = 0; i < binCount ; i++){

			if(binCount  == 2){
				tmpBin = contentManager.GetBin(this.levelBins[i]);
				yPos += yOff;
			}

			if(binCount == 3){
				tmpBin = contentManager.GetBin(this.levelBins[i]);
				yPos += yOff;
			}

			if(binCount == 5){
				tmpBin = contentManager.GetBin(this.levelBins[i]);
				yPos += (yOff - 10);
				SCALE = .7;
			}

			this.garbageBin.push(new GarbageBin(this.levelBins[i], tmpBin, xPos, yPos, SCALE));

			// adds the child to the stage
			this.levelStage.addChild(this.garbageBin[i]);

		}
	};

	Level.prototype.reloadGarbage = function(){
		var c, r, d;
		
		if(this.levelVersion == 1){
			switch (this.levelWave){
				case 0:
					c = 1;
					r = 6;
					break;
				case 1:
					c = 2;
					r = 6.5;
					break;
				case 2:
					c = 3;
					r = 6;
					break;
				case 3:
					c = 5;
					r = 6;
					break;
				case 4:
					c = 6;
					r = 5;
					d = .4;
					break;
				case 5:
					c = 8;
					r = 7;
					d = .5;
					break;
			}
		}
		else if(this.levelVersion == 2){
			switch (this.levelWave){
				case 0:
					c = 2;
					r = 8;
					break;
				case 1:
					c = 5;
					r = 6.5;
					break;
				case 2:
					c = 4;
					r = 6;
					d = .5;
					break;
				case 3:
					c = 5;
					r = 6;
					d = .7;
					break;
				case 4:
					c = 8;
					r = 7;
					d = .4;
					break;
				case 5:
					c = 10;
					r = 7;
					d = .6;
					break;
			}
		}
		else if(this.levelVersion == 3){
			switch (this.levelWave){
				case 0:
					c = 5;
					r = 8;
					d = .9;
					break;
				case 1:
					c = 7;
					r = 6.5;
					d = .8;
					break;
				case 2:
					c = 7;
					r = 8;
					d = .5;
					break;
				case 3:
					c = 6;
					r = 6;
					d = .7;
					break;
				case 4:
					c = 10;
					r = 7;
					d = .6;
					break;
				case 5:
					c = 15;
					r = 7;
					d = .7;
					break;
			}
		}

		this.loadGarbage(c, r, d);
		this.setBackgroundText();
	}

	// Loads the garbage and places it on the screen. 
	// Takes a garbageCount - how many in the batch
	// Takes a garbage density - how clumped up are the garbage
	// Takes a rate - how fast garbage comes down
	Level.prototype.loadGarbage = function(garbageCount, gRate, garbageDensity) {

		garbageCount = typeof garbageCount !== 'undefined' ? garbageCount : 5;
		garbageDensity = typeof garbageDensity !== 'undefined' ? garbageDensity : .6;
		gRate = typeof gRate !== 'undefined' ? gRate : 5;

		var yPos = 100;		// y location for object
		var xPos = 100;		// x location for object
		var yOff = 20;

		var randomGarbage = {};

		// places the garbage bin based on the number of bins 
		for(var i = 0; i < garbageCount; i++)
		{	
			// get the random garbage
			randomGarbage = this.levelContentManager.GetGarbage(this.levelBins);	
			yPos -= (randomGarbage.img.height + yOff) * (1.4 - garbageDensity);	 // determines the placing of the garbage

			this.garbage.push(new Garbage(randomGarbage.bin, randomGarbage.img, xPos + (Math.random() * 100), yPos, this.levelHeight,this.levelWidth, gRate));

			// adds the child to the stage
			this.levelStage.addChild(this.garbage[i]);
		}

		this.garbageCount += garbageCount;
	};

	Level.prototype.loadConveyor = function(){

		var conveyorBitmap = new createjs.Bitmap("src/img/asset_conveyor_frame01.png");
		
		conveyorBitmap.y = 90;
		conveyorBitmap.scaleY = 1.1;
		conveyorBitmap.cache(0, 0, 284, (1007 * 1.1));
		this.levelStage.addChild(conveyorBitmap);
		
	};


	Level.prototype.loadLandfillBar = function(){

		var initY = this.landfillHeight;
		var line = new createjs.Shape();
		line.graphics.setStrokeStyle(3).beginStroke("red").moveTo(-10, initY);

		var xpos = 0;
		for(var i = 0; i < this.levelWidth; i+=100){
			line.graphics.lineTo(i, (initY + (Math.random() * 15)));
		}

		line.graphics.lineTo(this.levelWidth, initY);

		this.landfillsQ = new createjs.Shape();
		this.landfillsQ.graphics.beginFill('red').drawRoundRect(0, this.levelHeight, this.levelWidth, this.levelHeight*.2, 1);
		this.levelStage.addChild(this.landfillsQ);
		this.levelStage.addChild(line);

	}

	//update
	Level.prototype.updateLandfillBar = function(){
		this.landfillsQ.y -= 60;

		var diff = this.levelHeight - this.landfillHeight;

		if(this.landfillsQ.y + diff < 0){
			this.levelEnd = true;
		}
	}

	Level.prototype.setBackgroundText = function(refresh) {
		refresh = typeof refresh !== 'undefined' ? refresh : false;

		if(typeof this.stageHeader == 'undefined'){
			this.stageHeader = new createjs.Shape();
		}
		
		this.stageHeader.graphics.beginFill('#737373').drawRoundRect(0, 0, this.levelWidth, 90, 10);
		this.levelStage.addChild(this.stageHeader);

		if(typeof this.txtTitle == 'undefined'){
			this.txtTitle = new createjs.Text(this.stageName + " " + this.levelVersion + " of 3", "bold 42px Arial", "#ffffff");
		}
    	
    	this.txtTitle.x = this.txtTitle.y = 10;
		
		if(typeof this.txtScoreTitle == 'undefined'){
			this.txtScoreTitle = new createjs.Text("SCORE:", "bold 28px Arial", "#ffffff");
		}
		
		this.txtScoreTitle.x = screen_width - 210;
		this.txtScoreTitle.y = 55;
		
		if(typeof this.txtScore == 'undefined'){
			this.txtScore = new createjs.Text(this.levelScore, "bold 28px Arial", "#ffffff");
		}
		
		this.txtScore.x = screen_width - 100;
		this.txtScore.y = 55;

		// put these objects into the level text container
		this.levelText.push(this.txtTitle);
		this.levelText.push(this.txtScoreTitle);
		this.levelText.push(this.txtScore);

		if(refresh){
			for(var i = 0; i < this.levelText.length; i++){
				this.levelStage.removeChild(this.levelText[i]);
			}
		}

		for(var i = 0; i < this.levelText.length; i++){
			this.levelStage.addChild(this.levelText[i]);
		}

	};

	Level.prototype.setBackground = function() {
		// NOT implemented at the moment
		var backgroundBitmap = new createjs.Bitmap("src/img/main_play_background.jpg");
		backgroundBitmap.scaleX = 2.5;
		backgroundBitmap.scaleY = 2.7;

		backgroundBitmap.y = 80;
		backgroundBitmap.cache(0,0, this.levelWidth, this.levelHeight);
		this.levelStage.addChild(backgroundBitmap);
	};

	// Returns a score
	//
	Level.prototype.updateScore = function(sameType, objB) {
		
		var txt = null;
		var cmtTxt = null;
		if(sameType){
			this.longestCorrect++;
			txt = new createjs.Text("+100", "bold 36px Arial", "green");
    		this.levelScore += 100;

    		if(this.longestCorrect % 5 == 0 && (this.longestCorrect > 0)){
    			txt.text = "+200"
    			this.levelScore += 200;

    			cmtTxt = new createjs.Text("Great job!", "bold 36px Arial", "green");
    			cmtTxt.x = objB.x - 50;
    			cmtTxt.y = objB.y - (Math.random() * objB.radius) - 100;

    			this.levelStage.addChild(cmtTxt);
    			this.feedBackText.push(cmtTxt);
    		}
		}
		else{
			this.longestCorrect = 0;
			txt = new createjs.Text("-50", "bold 36px Arial", "red");
			this.levelScore += -50;
		}

		playCorrect();

		txt.visible = true;
		txt.x = objB.x - 50;
    	txt.y = objB.y - (Math.random() * objB.radius);
    	
    	this.levelStage.addChild(txt);
    	this.feedBackText.push(txt);
	};


	// returns true if objA, and objB are hitting one another
	Level.prototype.checkCollision = function(objA, objB){
		var xD = objA.x - objB.x;
		var yD = objA.y - objB.y;

		var dist = Math.sqrt(xD * xD + yD * yD);

		return {hit: dist < objA.radius + objB.radius, dist: dist};
	};


	// Given two objects that have collided, checks to see
	// if objA has been released and the type of objA and objB.
	Level.prototype.handleCollision = function(objA, objB){

		var point = 0;
		if(!objA.pressed)
		{
			if(objA.type === objB.type){
				this.updateScore(true, objB);
				objB.contentCountCorrect++;
			}
			else{
				this.updateScore(false, objB);
				objB.contentCountWrong++;
				this.updateLandfillBar();
			}

			objA.remove = true;
		}
	};

	var RATE = 6;
	var tile_min_dist = Number.MAX_VALUE;
	// Updates 
	Level.prototype.Update = function() {
		//RATE += this.levelVersion * .5;

		if(this.levelStart){
			var point = 0;
			var tmpObj = null;
			var hit = false;
			var collision = {};
			var min_dist = Number.MAX_VALUE;

			/*
			// pushes the conveyor belt down the screen
			for(var i = 0; i < this.conveyorBelt.length; i++){
				this.conveyorBelt[i].y += RATE;
				this.conveyorBelt[i].yBottom += RATE;

				// gets the smallest y position of all the tiles
				if(this.conveyorBelt[i].y < tile_min_dist){
					tile_min_dist = this.conveyorBelt[i].y;
				}

				// check top
				if(this.conveyorBelt[i].y > this.levelHeight * .8){
					// make tile slowly disappear
					//this.conveyorBelt[i].alpha -= .02;
					// if tile disappears then make it appear and reposition it
					//if(this.conveyorBelt[i].alpha < .1){

						this.conveyorBelt[i].alpha = 1;
						//this.conveyorBelt[i].y = tile_min_dist;
						this.conveyorBelt[i].y = this.lastBeltTileY;
					//}
				}

				// check bottom
				if(this.conveyorBelt[i].yBottom > this.levelHeight * .8){
					//console.log("here");
					
				}

			}
			*/

			for(var i = 0; i < this.garbage.length; i++)
			{
				this.garbage[i].tick();
				for(var j = 0; j < this.garbageBin.length; j++){

					collision = this.checkCollision(this.garbage[i], this.garbageBin[j]);
					if(collision.hit && (min_dist > collision.dist)){
						min_dist = collision.dist;
						tmpObj = this.garbageBin[j];
						this.garbage[i].collision = hit = true;	// the item has hit something
					}
				}

				// an object has both a hit and a remove property
				// if hit is true, that means that the object
				// is in collision with a bin.
				// A remove means that the object has collision and the user
				// has released the object via pressup. 

				// if an object was in collision with a bin but no longer
				if(!hit){
					this.garbage[i].collision = false;
				}
				else{
					// there has been a collision
					//if(min_dist !== Number.MAX_VALUE){
					this.handleCollision(this.garbage[i], tmpObj);
				}

				if(this.garbage[i].dumped){
					this.updateLandfillBar();
				}

				if(this.garbage[i].remove){
					this.levelStage.removeChild(this.garbage[i].boundingBox);
					this.levelStage.removeChild(this.garbage[i]);
					this.garbage.splice(i, 1);
					this.garbageCount--;
				}

				hit = false;
				min_dist = Number.MAX_VALUE;
			}

			// IN the future, should make relative
			for( var i = 0; i < this.feedBackText.length ; i++){
				this.feedBackText[i].y -= 1;
				this.feedBackText[i].alpha -= .015;

				// if no longer visible, remove the text
				if(this.feedBackText[i].alpha < .1){
					this.levelStage.removeChild(this.feedBackText[i]);
					this.feedBackText.splice(i, 1);
				}
			}

			// checks to see if there are any garbage left
			// clears the bins, reloads the garbage, then reloads the bins
			if(this.garbage.length === 0){

				if(this.levelWave == 5){
					console.log("END OF WAVES");
					
					this.levelWin = true;
					this.levelEnd = true;
				}
				else{
					this.levelWave++;
					this.reloadGarbage();
				}
			}

			// check the time
			//this.txtTimeRemain.text = convertMStoS(this.timeRemain()) + " seconds";  
			if(convertMStoS(this.timeRemain()) < 0 || convertMStoS(this.timeRemain()) == 0){
				//this.txtTimeRemain.text = "0.0 seconds";
				this.levelWin = true;
				this.levelEnd = true;
			}

			/*
			if(convertMStoS(this.timeRemain()) < convertMStoS(this.warningtime)){
				this.txtTimeRemain.color = "red";
			}*/
			this.txtScore.text = this.levelScore;

		}
		else{
			this.waitStart();
		}

	};

	window.Level = Level;
}(window))
