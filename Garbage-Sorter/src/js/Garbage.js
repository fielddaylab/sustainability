
/**
 * Created by xaoyang on 12/12/13.
 */
 
(function (window){
    function Garbage(garbageType, imgGarbage, x, y, gh, gw, r){
        this.initialize(garbageType, imgGarbage, x, y, gh, gw, r);
    }
    
    Garbage.prototype = new createjs.Sprite();

	Garbage.width;
	Garbage.height;
	Garbage.radius;
	Garbage.boundingBox;
	
    // constructor:
    Garbage.prototype.Sprite_intialize = Garbage.prototype.initialize;

    // initialization
    Garbage.prototype.initialize = function (garbageType, imgGarbage, x, y, gh, gw, r){

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

        this.gh = gh;
        this.gw = gw;

		this.x = x;
		this.y = y;

        this.remove = false;
        this.collision = false;
        this.dumped = false;
        this.pressed = false;

        //velocity
        this.vX = 1;
        this.vY = r;
        
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

        if(this.y < 0){
            this.visible = false;
        }
        else{
            this.visible = true;
        }

        this.boundingBox.x = this.x;
        this.boundingBox.y = this.y;

        if(!this.pressed){
            this.y += this.vY;
        }
        
        this.initY = this.y;
        
        if(this.y > (this.gh * .8))
        {
            this.alpha -= .015;
            this.scaleX -= .01;
            this.scaleY -= .01;
        }

        if(this.alpha < .10){
            playThud();

            this.dumped = true;
            this.remove = true;
        }
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
		//evt.target.alpha = .5;
        evt.target.boundingBox.visible = true;
        evt.target.boundingBox.alpha = .5;
	});
	
	
	Garbage.prototype.on("rollout", function(evt) {
		//evt.target.alpha = 1;
        evt.target.boundingBox.visible = false;
	});

    window.Garbage = Garbage;
}(window))