
/**
 * Created by xaoyang on 12/12/13.
 */
 
(function (window){
    function Garbage(garbageType, imgGarbage, x, y){
        this.initialize(garbageType, imgGarbage, x, y);
    }
    
    Garbage.prototype = new createjs.Sprite();
    
    //public properties [not really sure what they do]
    Garbage.prototype.bounds = 0;   // visual radius size
    Garbage.prototype.hit = 0;  // average radial disparity

	Garbage.width;
	Garbage.height;
	Garbage.radius;
	Garbage.boundingBox;
    Garbage.pressed = false;
	
    // constructor:
    Garbage.prototype.Sprite_intialize = Garbage.prototype.initialize;

    // initialization
    Garbage.prototype.initialize = function (garbageType, imgGarbage, x, y){

       	this.width = imgGarbage.width;
       	this.height = imgGarbage.height;
       	
       	var halfX = Math.floor(imgGarbage.width / 2);
       	var halfY = Math.floor(imgGarbage.height / 2);
       	
        // becareful: if width exceeds the image, will not display the image
        var localSpriteSheet = new createjs.SpriteSheet({
            images: [imgGarbage], // image to use
            frames: {width: imgGarbage.width, height: imgGarbage.height, regX: halfX, regY: halfY},
            animations: {
                move: [0,0, "move", 4]
            }
        });

        this.Sprite_intialize(localSpriteSheet);
        // start playing the first sequence:
        this.gotoAndPlay("move");    // animate

		// garbage type
        this.type = garbageType;
        this.direction = 1;
		
		// default starting position
        this.initX = x; 
        this.initY = y;

		this.x = x;
		this.y = y;

        this.remove = false;
        this.collision = false;

        // can scale image
        this.scaleX = .9;
        this.scaleY = .9;

        //velocity
        this.vX = 1;
        this.vY = 0;
        
        // starting directly at the first frame of the walk_h sequence
        this.currentFrame = 0;
       
       	// create the bounding box for the object
       	this.boundingBox = new createjs.Shape();
        this.radius = Math.sqrt((this.width/2 * this.width/2) + (this.height/2 * this.height/2));
       	this.boundingBox.graphics.beginStroke("purple").ss(5,0,1).drawCircle(0, 0, this.radius);
       	this.boundingBox.visible = false;
        stage.addChild(this.boundingBox);
       	       
    }

    Garbage.prototype.tick = function() {

        this.boundingBox.x = this.x;
        this.boundingBox.y = this.y;
    }
	
	Garbage.prototype.on("pressmove", function(evt) {

		evt.target.x = evt.stageX;
		evt.target.y = evt.stageY;
        evt.target.pressed = true;

        /* Not sure if tick or pressmove better?
        evt.target.boundingBox.x =  evt.target.x;
        evt.target.boundingBox.y =  evt.target.y;
        */

        if(isMobile){
            evt.target.boundingBox.visible = true;
        }
	});

    Garbage.prototype.on("pressup", function(evt) {

        evt.target.pressed = false;
        evt.target.boundingBox.visible = true;

        // snaps back if not being removed
        if(!evt.target.collision){
            evt.target.x = evt.target.initX;
            evt.target.y = evt.target.initY;
        }

        if(isMobile){
             evt.target.boundingBox.visible = false;
        }
    });


	// rollover and rollout does not work for touch
	Garbage.prototype.on("rollover", function(evt) {
		evt.target.alpha = .5;
        evt.target.boundingBox.visible = true;
	});
	
	
	Garbage.prototype.on("rollout", function(evt) {
		evt.target.alpha = 1;
        evt.target.boundingBox.visible = false;
	});

    window.Garbage = Garbage;
}(window))