// This class will be responsible for the layers

(function (window){


	function Level(stage, contentManager, textLevel, gameWidth, gameHeight){

		this.levelStage = stage;
		this.levelContentManager = contentManager;

		this.textLevel = textLevel;
		this.levelWidth = gameWidth;
		this.levelHeight = gameHeight;

		this.levelText = null;
		this.levelSpeed = 1;

		// objects
		this.garbage = [];
		this.garbageBin = [];
		this.binTypes = [];

		//settings
		this.garbageInstances = 100;

	}

	Level.prototype.StartLevel = function() {
	// depending on the level, populate accordingly
	// need to figure out a better way of implementing this.... 

		if(this.textLevel === "basic"){
			this.binTypes = ['landfill', 'recycle'];
			this.levelSpeed = 1;
		}

		if(this.textLevel === "medium"){
			this.binTypes = ['landfill', 'recycle', 'compost'];
			this.levelSpeed = 3;
		}

		if(this.textLevel === "complex"){
			this.binTypes = ['landfill', 'recycle', 'compost', 'reuse', 'electronics', 'chemical'];
			this.levelSpeed = 6;
		}


		// start 
		this.LoadBins();
		this.LoadGarbage();

		for(var i = 0; i < this.garbageBin.length; i++){
			this.levelStage.addChild(this.garbageBin[i]);
		}

		for(var i = 0; i < this.garbage.length; i++){
			this.levelStage.addChild(this.garbage[i]);
		}

	};

	Level.prototype.SpeedUp = function() {
		this.levelSpeed++;
	}

	Level.prototype.SpeedDown = function() {
		if(this.levelSpeed > 1)
			this.levelSpeed--;
	}

	Level.prototype.LoadBins = function() {

		for(var i = 0; i < this.binTypes.length ; i++){
			this.garbageBin.push(new GarbageBin(this.binTypes[i], contentManager.GetBin(this.binTypes[i]), this.levelWidth, this.levelHeight, (100 + (250 * i)), 220));
		}

	};

	Level.prototype.LoadGarbage = function() {
		// start positions

		var pos_x = 0;
		var pos_y = this.levelHeight * .80;
	
		var randomGarbage = {};
	
		// generate garbage and assign start locations
		for(var i = 0; i < this.garbageInstances ; i++){
			// gets a random garbage based on available bin types for the level
			randomGarbage = this.levelContentManager.GetGarbage(this.binTypes);
			
			if(i != 0){
				pos_x -= (Math.floor(randomGarbage.img.width / 2));
			}
			
			// need to fix this line
			this.garbage.push(new Garbage(randomGarbage.bin, randomGarbage.img, screen_width, screen_height, pos_x, pos_y));
			pos_x -= (Math.floor(randomGarbage.img.width / 2)) + 10;
		}
	};

	Level.prototype.setText = function() {
		
		// not implemented yet

	}

	Level.prototype.setBackground = function() {
		// NOT implemented at the moment
	};


	Level.prototype.handleCollision = function(objA, objB, i) {
		var xD = objA.x - objB.x;
		var yD = objA.y - objB.y;

		var dist = Math.sqrt(xD * xD + yD * yD);

		var point = 0;
		// collision
		if(dist < objA.radius + objB.radius){
			if(!objA.pressed){
				if(objA.type === objB.type){
					point = 100;
				}
				else{
					point = -50;
				}

				this.levelStage.removeChild(objA.boundingBox);
				this.levelStage.removeChild(objA);
				this.garbage.splice(i, 1);
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
				point += this.handleCollision(this.garbage[i], this.garbageBin[j], i);
			}
		}

		this.levelStage.update();
		return point;
	};

	window.Level = Level;
}(window));
