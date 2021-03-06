/**
 * Created by xaoyang on 12/12/13.
 */
(function (window){
    function GarbageBin(GarbageBinType, imgGarbageBin, x, y, SCALE){
        this.initialize(GarbageBinType, imgGarbageBin, x, y, SCALE);
    }
    
    GarbageBin.prototype = new createjs.Sprite();

    // constructor:
    GarbageBin.prototype.Sprite_intialize = GarbageBin.prototype.initialize;

	GarbageBin.width;
	GarbageBin.height;
	GarbageBin.radius;
	GarbageBin.boundingBox; 

    // initialization
    GarbageBin.prototype.initialize = function (GarbageBinType, imgGarbageBin, x, y, SCALE){
        
        /*
        console.log("GarbageBin object initialized");
        console.log("GarbageBin type: " +  GarbageBinType);
        console.log("GarbageBin img src: " + imgGarbageBin.src);
        */

       	var halfX = Math.floor(imgGarbageBin.width / 2);
       	var halfY = Math.floor(imgGarbageBin.height / 2);
       	
        // if width exceeds the image, will not display the image
        var localSpriteSheet = new createjs.SpriteSheet({
            images: [imgGarbageBin], // image to use
            frames: {width: imgGarbageBin.width, height: imgGarbageBin.height, regX: halfX, regY: halfY},
            animations: {
                move: [0,0, "move", 4]
            }
        });

        this.Sprite_intialize(localSpriteSheet);
        // start playing the first sequence:
        this.gotoAndPlay("move");    // animate
		
		// GarbageBin type
        this.type = GarbageBinType;
        this.direction = 1;
		
		// default starting position
		this.x = x;
		this.y = y;
		
        this.scaleX = SCALE;
        this.scaleY = SCALE;

		// get image size
		this.width = imgGarbageBin.width;
		this.height = imgGarbageBin.height;
		
        // keep track of content
        this.contentCountCorrect = 0;
        this.contentCountWrong = 0;

        //velocity
        this.vX = 1;
        this.vY = 0;
        // starting directly at the first frame of the walk_h sequence
        this.currentFrame = 0;
        
    	// create the bounding box for the object
    	this.boundingBox = new createjs.Shape();

        // caclulate radius
        var width = this.width * SCALE;
        var height = this.height * SCALE;

    	this.radius = Math.sqrt((width/2 * width/2) + (height/2 * height/2));
    	this.radius = this.radius * .9;
    	this.boundingBox.graphics.beginStroke("blue").ss(5,0,1).drawCircle(this.x, this.y, this.radius);
    	stage.addChild(this.boundingBox);
        this.boundingBox.visible = false;
        
    }

    GarbageBin.prototype.tick = function() {
        // not doing anything right now
    }
	
    /*
	GarbageBin.prototype.on("rollover", function(evt) {
		evt.target.alpha = .5;
        evt.target.scaleX = 1.2;
        evt.target.scaleY = 1.2;
        evt.target.boundingBox.visible = true;
	});
	
	
	GarbageBin.prototype.on("rollout", function(evt) {
		evt.target.alpha = 1;
        evt.target.scaleX = 1;
        evt.target.scaleY = 1;
        evt.target.boundingBox.visible = false;
	});
    */
    
    window.GarbageBin = GarbageBin;
}(window));