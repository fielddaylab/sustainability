// This class will be responsible for the layers

(function (window){


	function Level(stage, contentManager, gameWidth, gameHeight){

		this.levelStage = stage;
		this.levelContentManager = contentManager;

		this.levelWidth = gameWidth;
		this.levelHeight = gameHeight;

		this.levelSpeed = 1;

		// objects
		this.garbage = [];
		this.garbageBin = [];
		this.levelText = [];
		this.scoreText = [];
		this.binTypes = [];

		//settings
		this.garbageInstances = 500;

	}

	// uses date.now() to set up timer
	Level.prototype.createCountDown = function (timeRemaining) {
    	var startTime = Date.now();
    	return function() 
    	{
       		return timeRemaining - ( Date.now() - startTime );
    	}
	}

	// takes millseconds and converts to seconds with one digit following the period
	Level.prototype.convertMStoS = function(num, p){
		p = typeof p !== 'undefined' ? p : 1;
		return (num/ 1000).toFixed(p);
	}	

	Level.prototype.StartLevel = function(stageLevel) {
	// depending on the level, populate accordingly
	// need to figure out a better way of implementing this.... 
		stageLevel = typeof stageLevel !== 'undefined' ? stageLevel : 'easy';

		//alert(stageLevel);

		if(stageLevel === "one"){
			this.binTypes = ['landfill'];
			this.levelSpeed = 1;
		}

		if(stageLevel === "four"){
			this.binTypes = ['landfill', 'recycle', 'compost', 'reuse'];
			this.levelSpeed = 1;
		}

		if(stageLevel === "easy"){
			this.binTypes = ['landfill', 'recycle'];
			this.levelSpeed = 1;
		}

		if(stageLevel === "normal"){
			this.binTypes = ['landfill', 'recycle', 'compost'];
			this.levelSpeed = 3;
		}

		if(stageLevel === "hard"){
			this.binTypes = ['landfill', 'recycle', 'compost', 'reuse', 'electronics', 'chemical'];
			this.levelSpeed = 6;
		}


		// start 
		this.LoadGarbage();
		this.LoadBins();
		this.setText();
	};

	Level.prototype.LoadBins = function() {

		var xp = this.levelWidth / (this.binTypes.length + 1);
		var yp = this.levelHeight;

		var xPos;
		var yPos;

		var binCount = this.binTypes.length;

		// position bins vertical 3 x 2
		binCount > 3 ? yPos = yp/ 4 : yPos = yp / (binCount + 1);
		binCount > 3 ? xPos = 330 : xPos = 450;

		var j = 0;
		for(var i = 0; i < this.binTypes.length ; i++){

			// happens once
			if(i === 3){
				xPos = 530;
				j = 0;
			}

			this.garbageBin.push(new GarbageBin(this.binTypes[i], contentManager.GetBin(this.binTypes[i]), xPos, yPos + (yPos * j) ));
			j++;
		}

		for(var i = 0; i < this.garbageBin.length; i++){
			this.levelStage.addChild(this.garbageBin[i]);
		}

	};

	Level.prototype.LoadGarbage = function() {
		// start positions

		var garbageCount = 5;
		var xp = this.levelWidth / (this.binTypes.length + 1);
		var yp = this.levelHeight;

		var xPos = 50;
		var yPos = yp / garbageCount;
		var y;
		var randomGarbage = {};

		for(var i = 0; i < garbageCount; i++){
			y = yPos + 40 + ((yPos * .7) * i);
			randomGarbage = this.levelContentManager.GetGarbage(this.binTypes);	
			this.garbage.push(new Garbage(randomGarbage.bin, randomGarbage.img, screen_width, screen_height, xPos, y));
		}


		for(var i = 0; i < this.garbage.length; i++){
			this.levelStage.addChild(this.garbage[i]);
		}
	};

	Level.prototype.setText = function(level) {
		
		this.titleText = new createjs.Text("Garbage Sorter", "bold 36px Arial", "#ffffff");
    	this.titleText.x = 10;
    	this.titleText.y = 10;

    	this.correctText = new createjs.Text("+100", "bold 36px Arial", "green");
    	this.correctText.visible = false;
    	//this.correctText.x = 100;
    	//this.correctText.y = 100;

    	this.wrongText = new createjs.Text("-50", "bold 36px Arial", "red");
    	this.wrongText.visible = false;
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

	
	Level.prototype.setTextPoints = function(objB) {
		this.correctText = new createjs.Text("+100", "bold 36px Arial", "green");
    	this.correctText.visible = true;
    	this.correctText.x = objB.x - 50;
    	this.correctText.y = objB.y - (Math.random() * objB.radius);

    	this.levelStage.addChild(this.correctText);
    	this.scoreText.push(this.correctText);
	};

	Level.prototype.handleCollision = function(objA, objB, i) {
		var xD = objA.x - objB.x;
		var yD = objA.y - objB.y;

		var dist = Math.sqrt(xD * xD + yD * yD);

		var point = 0;

		// if collision
		if(dist < objA.radius + objB.radius){
			if(!objA.pressed){
				if(objA.type === objB.type){
					point = 100;
					this.setTextPoints(objB);
				}
				else{
					point = -50;
				}

				objA.remove = true;
			}
		}
		
		return point;
	};

	// update later on... GET RID OF POINT INT AND POINT TEXT
	Level.prototype.Update = function() {

		var point = 0;
		for(var i = 0; i < this.garbage.length; i++)
		{
			this.garbage[i].tick(this.levelSpeed);
			for(var j = 0; j < this.garbageBin.length; j++){
				point += this.handleCollision(this.garbage[i], this.garbageBin[j]);
			}

			if(this.garbage[i].remove){
				this.levelStage.removeChild(this.garbage[i].boundingBox);
				this.levelStage.removeChild(this.garbage[i]);
				this.garbage.splice(i, 1);
			}
		}

		if(this.garbage.length === 0){
			for(var i = 0; i < this.garbageBin.length; i++){
				this.levelStage.removeChild(this.garbageBin[i]);
			}

			this.LoadGarbage();

			for(var i = 0; i < this.garbageBin.length; i++){
				this.levelStage.addChild(this.garbageBin[i]);
			}
		}

		this.levelStage.update();
		return point;
	};

	window.Level = Level;
}(window));
