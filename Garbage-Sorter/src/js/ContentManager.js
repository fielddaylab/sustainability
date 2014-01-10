/**
 * Created by xaoyang on 12/13/13.
 */
 
function ContentManager(){

    var onDownloadCompleted;
    var numImagesLoaded = 0;

    var NUM_ELMENTS_TO_DOWNLOAD = 13;

	// garbage items, need to rename
    this.imgA = new Image();
	this.imgB = new Image();
	this.imgC = new Image(); 
	this.imgD = new Image();
	this.imgE = new Image();
	this.imgF = new Image();
    this.imgCL = new Image();
	
	// bin items, need to rename
	this.imgG = new Image();
	this.imgH = new Image();
	this.imgI = new Image();
	this.imgJ = new Image();
    this.imgK = new Image();
    this.imgL = new Image();

    // returns image
    this.GetGarbage = function (binType){
        binType = typeof binType !== 'undefined' ? binType : false;

        // if user does not define bintypes thus allowing all types of garbage
        if(!binType){
            // FIGURE OUT A BETTER IMPLEMENTATION..... 
            var num = Math.floor(Math.random() * 6); 
            var no_to_img_map =  [
                {   bin : "compost",
                    img  : this.imgA  },  
                {   bin : "landfill",
                    img  : this.imgB  },
                {   bin : "electronics",
                    img  : this.imgC  },
                {   bin : "reuse",
                    img  : this.imgD  },
                {   bin : "recycle",
                    img  : this.imgE  },
                {   bin : "recycle",
                    img  : this.imgF  }
            ];
        }
        else{

            // goes through the list of useable types
            // need to introduce an object that holds the types and images
            // CURRENT IMPLEMENTATION SUCKS!!!!!!
            var no_to_img_map = [];
            for(var i = 0; i < binType.length; i++){
                switch (binType[i]) {
                    case "recycle":
                        no_to_img_map.push({bin : binType[i], img: this.imgE});
                        no_to_img_map.push({bin : binType[i], img: this.imgF});
                        break;
                    case "landfill":
                        no_to_img_map.push({bin : binType[i], img: this.imgB});
                        break;
                    case "reuse":
                        no_to_img_map.push({bin : binType[i], img: this.imgD});
                        break;
                    case "compost":
                        no_to_img_map.push({bin : binType[i], img: this.imgA});
                        break;
                    case "electronics":
                        no_to_img_map.push({bin : binType[i], img: this.imgC});
                        break;
                    case "chemical":
                        no_to_img_map.push({bin : binType[i], img: this.imgCL});
                        break;
                }
            }

            var num = Math.floor(Math.random() * no_to_img_map.length);
        }

        return no_to_img_map[num];
    }

    // returns image
    this.GetBin = function (binType) {
        var type_to_img = {
            'compost' : this.imgG,
            'landfill': this.imgH,
            'recycle' : this.imgI,
            'reuse'   : this.imgJ,
            'electronics' : this.imgK,
            'chemical': this.imgL
        };
        
        return type_to_img[binType];
    }

    // setting the callback method
    this.SetDownloadCompleted = function(callbackMethod){
      onDownloadCompleted = callbackMethod;
    };

    // public method to launch the download process
    this.StartDownload = function () {
        // get garbage images
        SetDownload(this.imgA, "src/img/banana.png", handleImageLoad, handleImageError)	;
        SetDownload(this.imgB, "src/img/chips.png", handleImageLoad, handleImageError);
        SetDownload(this.imgC, "src/img/cellphone.png", handleImageLoad, handleImageError);
        SetDownload(this.imgD, "src/img/shirt.png", handleImageLoad, handleImageError);
        SetDownload(this.imgE, "src/img/waterbottle.png", handleImageLoad, handleImageError);
        SetDownload(this.imgF, "src/img/plasticbag.png", handleImageLoad, handleImageError);
        SetDownload(this.imgCL, "src/img/flask.png", handleImageLoad, handleImageError);
        
        // get garbage bin images
        SetDownload(this.imgH, "src/img/landfill.png", handleImageLoad, handleImageError);
        SetDownload(this.imgG, "src/img/compost.png", handleImageLoad, handleImageError);
        SetDownload(this.imgI, "src/img/recycle.png", handleImageLoad, handleImageError);
        SetDownload(this.imgJ, "src/img/reuse.png", handleImageLoad, handleImageError);
        SetDownload(this.imgK, "src/img/electronics.png", handleImageLoad, handleImageError);
        SetDownload(this.imgL, "src/img/chemical.png", handleImageLoad, handleImageError);
    }

    // hands the images
    function SetDownload(imgElement, url,loadedHandler, errorHandler){
        
        imgElement.src = url;
        console.log("img source: " + imgElement.src);
        
        imgElement.onload = loadedHandler;
        imgElement.onerror = errorHandler;
    }

    // global handler
    function handleImageLoad(e){
        numImagesLoaded++;

        console.log("images load: " + numImagesLoaded);

        // If all elements have been downloaded
        if(numImagesLoaded === NUM_ELMENTS_TO_DOWNLOAD){
            console.log("all elements have been loaded");
			numImagesLoaded = 0;
			
            onDownloadCompleted();
        }
    }

    function handleImageError(e){
        console.log("Error Loading Image :" + e.target.src);
    }
    
}