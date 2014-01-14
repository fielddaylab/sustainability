// This class will be responsible for the layers

(function (window){


	function Level(stage, contentManager, gameWidth, gameHeight){

		this.levelStage = stage;
		this.levelContentManager = contentManager;

		this.levelWidth = gameWidth;
		this.levelHeight = gameHeight;

		this.levelSpeed = 1;
		this.longestCorrect = 0;

		// objects
		this.garbage = [];
		this.garbageBin = [];

		this.levelBins = [];
		this.levelText = [];
		this.feedBackText = [];
	}

	// Selects the level and generates the garbage, bins, and text
	Level.prototype.StartLevel = function(stageLevel) {

		// assigns level if one has not been chosen already
		stageLevel = typeof stageLevel !== 'undefined' ? stageLevel : 'easy';

		this.stageLevel = stageLevel;

		if(stageLevel === "easy"){
			this.levelBins = ['landfill', 'recycle'];
			this.levelSpeed = 1;
		}

		if(stageLevel === "normal"){
			this.levelBins = ['landfill', 'recycle', 'compost'];
			this.levelSpeed = 3;
		}

		if(stageLevel === "hard"){
			this.levelBins = ['landfill', 'recycle', 'compost', 'reuse', 'electronics', 'chemical'];
			this.levelSpeed = 6;
		}


		this.LoadGarbage();
		this.LoadBins();
		this.setText();
	};


	//	Loads the garbage bins onto the screen based on the level
	Level.prototype.LoadBins = function() {

		var xPos;								// x location of the object
		var yPos;								// y location of the object
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

			yPos = yOff + ( yOff * j );
			this.garbageBin.push(new GarbageBin(this.levelBins[i], contentManager.GetBin(this.levelBins[i]), xPos, yPos));

			// adds the child to the stage
			this.levelStage.addChild(this.garbageBin[i]);

			j++;
		}
	};

	// Loads the garbage and places it on the screen. 
	Level.prototype.LoadGarbage = function() {

		var garbageCount = 5;

		var yPos;			// y location for object
		var xPos = 50;		// x location for object
		var yOff = this.levelHeight / garbageCount;	// the y offset for the item

		var randomGarbage = {};

		// places the garbage bin based on the number of bins 
		for(var i = 0; i < garbageCount; i++)
		{	
			// calculates the y position, grabs a random object
			yPos = yOff + 40 + (yOff * .7 * i);
			randomGarbage = this.levelContentManager.GetGarbage(this.levelBins);	
			this.garbage.push(new Garbage(randomGarbage.bin, randomGarbage.img, xPos, yPos));

			// adds the child to the stage
			this.levelStage.addChild(this.garbage[i]);
		}
	};

	Level.prototype.setText = function(level) {
		
		this.titleText = new createjs.Text("Garbage Sorter", "bold 36px Arial", "#ffffff");
    	this.titleText.x = 10;
    	this.titleText.y = 10;

    	//this.correctText = new createjs.Text("+100", "bold 36px Arial", "green");
    	//this.correctText.visible = false;
    	//this.correctText.x = 100;
    	//this.correctText.y = 100;

    	//this.wrongText = new createjs.Text("-50", "bold 36px Arial", "red");
    	//this.wrongText.visible = false;
    	//this.wrongText.x = 200;
    	//this.wrongText.y = 200;

    	/*
	    this.timerText = new createjs.Text("Time Remaining: ", "bold 20px Arial", "#ffffff");
	    this.timerText.x = 15;
	    this.timerText.y = 45;
		
		this.timeText = new createjs.Text( convertMStoS(START_TIME) + " s", "bold 20px Arial", "#ffffff");
		this.timeText.x = 180;
		this.timeText.y = 45;
			
		this.scoreText = new createjs.Text("SCORE:", "bold 20px Arial", "#ffffff");
		this.scoreText.x = screen_width - 200;
		this.scoreText.y = 15;
		
		this.pointText = new createjs.Text(pointInt, "bold 20px Arial", "#ffffff");
		this.pointText.x = screen_width - 105;
		this.pointText.y = 15;
		*/

		// put these objects into the level text container
		this.levelText.push(this.titleText);
		this.levelText.push(this.wrongText);
		//this.levelText.push(this.timerText);
		//this.levelText.push(this.timeText);
		//this.levelText.push(this.scoreText);
		//this.levelText.push(this.pointText);

		for(var i = 0; i < this.levelText.length; i++){
			this.levelStage.addChild(this.levelText[i]);
		}

	}

	Level.prototype.setBackground = function() {
		// NOT implemented at the moment
	};

	// Returns a score
	//
	Level.prototype.updateScore = function(sameType, objB) {
		
		var pt = 0;
		var txt = null;
		var cmtTxt = null;
		if(sameType){
			this.longestCorrect++;
			txt = new createjs.Text("+100", "bold 36px Arial", "green");
    		pt = 100;

    		if(this.longestCorrect % 5 == 0 && (this.longestCorrect > 0)){
    			txt.text = "+200"
    			pt = 200;

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
			pt = -50;
		}


		txt.visible = true;
		txt.x = objB.x - 50;
    	txt.y = objB.y - (Math.random() * objB.radius);
    	
    	this.levelStage.addChild(txt);
    	this.feedBackText.push(txt);

    	return pt;
	};

	Level.prototype.checkCollision = function(objA, objB){
		var xD = objA.x - objB.x;
		var yD = objA.y - objB.y;

		var dist = Math.sqrt(xD * xD + yD * yD);

		return {hit: dist < objA.radius + objB.radius, dist: dist};
	}


	// Given two objects that have collided, checks to see
	// if objA has been released and the type of objA and objB.
	Level.prototype.handleCollision = function(objA, objB){

		var point = 0;
		if(!objA.pressed)
		{
			if(objA.type === objB.type){
				point += this.updateScore(true, objB);
				objB.contentCountCorrect++;
			}
			else{
				point += this.updateScore(false, objB);
				objB.contentCountWrong++;
			}

			objA.remove = true;
		}

		return point;
	};

	// Updates 
	Level.prototype.Update = function() {

		var point = 0;
		var tmpObj = null;
		var hit = false;
		var collision = {};
		var min_dist = Number.MAX_VALUE;
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
				point += this.handleCollision(this.garbage[i], tmpObj);
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

			this.LoadGarbage();

			for(var i = 0; i < this.garbageBin.length; i++){
				this.levelStage.addChild(this.garbageBin[i]);
			}
		}

		// calls update to the stage
		this.levelStage.update();
		return point;
	};

	window.Level = Level;
}(window));
