// This class will be responsible for the layers

(function (window){
	function Level(stage, contentManager, gameWidth, gameHeight, stageName){

		this.levelStage = stage;
		this.levelContentManager = contentManager;

		this.levelWidth = gameWidth;
		this.levelHeight = gameHeight;

		this.stageName = stageName; 

		// keeps track of level stats
		this.levelSpeed = 1;
		this.levelScore = 0;
		this.levelDefaultTime = 45000;
		this.warningtime = convertMStoS(this.levelDefaultTime * .2);
		this.longestCorrect = 0;

		// 
		this.levelStart = false;
		this.levelEnd = false;

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
			this.levelSpeed = 1;
		}

		if(stageLevel === "uSouth"){
			this.levelBins = ['landfill', 'recycle', 'compost'];
			this.levelSpeed = 3;
		}

		if(stageLevel === "Chemistry"){
			this.levelBins = ['landfill', 'recycle', 'reuse','chemical'];
			this.levelSpeed = 3;
		}

		if(stageLevel === "Grainger"){
			this.levelBins = ['landfill', 'recycle', 'compost', 'reuse', 'electronics'];
			this.levelSpeed = 3;
		}

		if(stageLevel === "Gordon"){
			this.levelBins = ['landfill', 'recycle', 'compost', 'reuse'];
			this.levelSpeed = 3;
		}

		// initialize the contents and places them on the stage
		this.loadLandfillBar();
		this.loadConveyor();
		this.loadGarbage();
		this.loadBins();
		this.setBackgroundText();
		
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

		var xPos;								// x location of the object
		var yPos = 0;								// y location of the object
		var yOff; 								// y offset
		var binCount = this.levelBins.length;

		// position bins vertical 3 x 2
		binCount > 3 ? yOff = this.levelHeight / 4 : yOff = this.levelHeight / (binCount + 1);
		binCount > 3 ? xPos = 330 : xPos = 450;

		var j = 0;
		for(var i = 0; i < this.levelBins.length ; i++){

			// happens once
			if(i === 3){
				xPos = 530;
				j = 0;
			}

			var tmpBin = contentManager.GetBin(this.levelBins[i]);

			console.log(tmpBin.height);
			yPos += 100 + tmpBin.height;
			console.log("xpos: " + xPos);
			console.log("ypos: " + yPos);
			this.garbageBin.push(new GarbageBin(this.levelBins[i], tmpBin, xPos, yPos));

			// adds the child to the stage
			this.levelStage.addChild(this.garbageBin[i]);

			j++;
		}
	};

	// Loads the garbage and places it on the screen. 
	Level.prototype.loadGarbage = function() {

		var garbageCount = 105;

		var yPos = 0;			// y location for object
		var xPos = 50;		// x location for object
		//var yOff = this.levelHeight / garbageCount;	// the y offset for the item
		var yOff = 20;

		var randomGarbage = {};

		yPos = this.levelHeight;

		// places the garbage bin based on the number of bins 
		for(var i = 0; i < garbageCount; i++)
		{	
			// calculates the y position, grabs a random object
			//yPos = yOff + 40 + (yOff * .7 * i);
			
			randomGarbage = this.levelContentManager.GetGarbage(this.levelBins);	
			
			yPos -= randomGarbage.img.height + yOff;
			//

			this.garbage.push(new Garbage(randomGarbage.bin, randomGarbage.img, xPos + (Math.random() * 50), yPos, this.levelHeight,this.levelWidth));

			// adds the child to the stage
			this.levelStage.addChild(this.garbage[i]);
		}
	};

	Level.prototype.loadConveyor = function(){

		var tmp;
		var yPos = this.levelHeight * .8;
		var yOff = 10;
		var tileHeight = 150;
		for(var i = 0; i < 10; i++){

			tmp = new createjs.Shape();
			tmp.graphics.beginFill('#666699').drawRoundRect(5,0, 200, tileHeight, 10);

			yPos -= tileHeight + yOff;
			tmp.y = yPos;
			tmp.yBottom = yPos + tileHeight;
			this.conveyorBelt.push(tmp);

			this.levelStage.addChild(this.conveyorBelt[i]);
		}

		this.lastBeltTileY = yPos;

		// var tmp = new createjs.Shape();
		// tmp.graphics.beginFill('#666699').drawRoundRect(5,200, 200, tileHeight, 10);
		// this.levelStage.addChild(tmp);
	};


	Level.prototype.loadLandfillBar = function(){

		var initY = this.levelHeight * .85;
		var line = new createjs.Shape();
		line.graphics.setStrokeStyle(3).beginStroke("red").moveTo(-10, initY);

		var xpos = 0;
		for(var i = 0; i < this.levelWidth; i+=100){
			line.graphics.lineTo(i, (initY + (Math.random() * 15)));
		}

		line.graphics.lineTo(this.levelWidth, initY);

		this.landfillsQ = new createjs.Shape();
		this.landfillsQ.graphics.beginFill('red').drawRoundRect(0, this.levelHeight, this.levelWidth, this.levelHeight*.15, 1);
		this.levelStage.addChild(this.landfillsQ);

		var lineBelt = new createjs.Shape();
		lineBelt.graphics.setStrokeStyle(3).beginStroke("black").moveTo(0, this.levelHeight * .73);
		lineBelt.graphics.lineTo(this.levelWidth, this.levelHeight * .73);

		var lineBelt2 = new createjs.Shape();
		lineBelt2.graphics.setStrokeStyle(3).beginStroke("black").moveTo(0, this.levelHeight * .8);
		lineBelt2.graphics.lineTo(this.levelWidth, this.levelHeight * .8);

		this.levelStage.addChild(line);
		this.levelStage.addChild(lineBelt);
		this.levelStage.addChild(lineBelt2);

	}

	//update
	Level.prototype.updateLandfillBar = function(){
		this.landfillsQ.y -= 10;
	}

	Level.prototype.setBackgroundText = function(level) {
		
		var stageLayer = new createjs.Shape();
		stageLayer.graphics.beginFill('#737373').drawRoundRect(0, 0, this.levelWidth, 90, 10);
		this.levelStage.addChild(stageLayer);

		this.txtTitle = new createjs.Text(this.stageName, "bold 42px Arial", "#ffffff");
    	this.txtTitle.x = this.txtTitle.y = 10;

    	this.txtTimerTitle = new createjs.Text("Time: ", "bold 28px Arial", "#ffffff");
    	this.txtTimerTitle.x = 15;
    	this.txtTimerTitle.y = 55;

		this.txtTimeRemain = new createjs.Text( convertMStoS(this.levelDefaultTime) + " s", "bold 28px Arial", "#ffffff");
		this.txtTimeRemain.x = 90;
		this.txtTimeRemain.y = 55;
		
		
		this.txtScoreTitle = new createjs.Text("SCORE:", "bold 28px Arial", "#ffffff");
		this.txtScoreTitle.x = screen_width - 210;
		this.txtScoreTitle.y = 55;
		
		this.txtScore = new createjs.Text(this.levelScore, "bold 28px Arial", "#ffffff");
		this.txtScore.x = screen_width - 100;
		this.txtScore.y = 55;

		// put these objects into the level text container
		this.levelText.push(this.txtTitle);
		this.levelText.push(this.txtTimerTitle);
		this.levelText.push(this.txtTimeRemain);
		this.levelText.push(this.txtScoreTitle);
		this.levelText.push(this.txtScore);

		for(var i = 0; i < this.levelText.length; i++){
			this.levelStage.addChild(this.levelText[i]);
		}

	};

	Level.prototype.setBackground = function() {
		// NOT implemented at the moment
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

		getSound();

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
			}

			objA.remove = true;
		}
	};

	var RATE = 1.5;
	var tile_min_dist = Number.MAX_VALUE;
	// Updates 
	Level.prototype.Update = function() {

		if(this.levelStart){
			var point = 0;
			var tmpObj = null;
			var hit = false;
			var collision = {};
			var min_dist = Number.MAX_VALUE;

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

			for(var i = 0; i < this.garbage.length; i++)
			{
				this.garbage[i].tick(RATE);
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
				for(var i = 0; i < this.garbageBin.length; i++){
					this.levelStage.removeChild(this.garbageBin[i]);
				}

				this.loadGarbage();

				for(var i = 0; i < this.garbageBin.length; i++){
					this.levelStage.addChild(this.garbageBin[i]);
				}
			}

			// check the time
			this.txtTimeRemain.text = convertMStoS(this.timeRemain()) + " seconds";  
			if(convertMStoS(this.timeRemain()) < 0 || convertMStoS(this.timeRemain()) == 0){
				this.txtTimeRemain.text = "0.0 seconds";
				this.levelEnd = true;
				console.log("time is out");
			}

			if(convertMStoS(this.timeRemain()) < convertMStoS(this.warningtime)){
				this.txtTimeRemain.color = "red";
			}
			this.txtScore.text = this.levelScore;

		}
		else{
			this.waitStart();
		}

	};

	window.Level = Level;
}(window))
