/**
 * Created by xaoyang on 12/13/13.
 */
 
function ContentManager(){

    var onDownloadCompleted;
    var numImagesLoaded = 0;

    var NUM_ELMENTS_TO_DOWNLOAD = 41;

	// garbage items, need to rename
    this.banana = new Image();
	this.batteries = new Image();
	this.bottle = new Image(); 
	this.can = new Image();
	this.cellphone = new Image();
	this.chipBag = new Image();
    this.cleaner = new Image();
    this.cup = new Image();
    this.fruit = new Image();
    this.glasses = new Image();
    this.burger = new Image();
    this.pizza = new Image();
    this.inkCart = new Image();
    this.medication = new Image();
    this.newspaper = new Image();
    this.noodle = new Image();
    this.cleanPlate = new Image();
    this.greasyPlate = new Image();
    this.salad = new Image();
    this.syringes = new Image();
	
	// waste bins
	this.compostBin = new Image();
	this.trashBin = new Image();
	this.recycleBin = new Image();
    this.techBin = new Image();
    this.chemBin = new Image();

    this.imgBelt = new Image();
    this.introOverlay = new Image();
    this.loseOverlay = new Image();
    this.winOverlay = new Image();
    this.levelCompleteOverlay = new Image();
    this.backgroundImg = new Image();

    // building overlays
    this.badDejope = new Image();
    this.badChemistry = new Image();
    this.badGordon    = new Image();
    this.badGrainger  = new Image();
    this.badUnion     = new Image();

    this.goodDejope = new Image();
    this.goodChemistry= new Image();
    this.goodGordon   = new Image();
    this.goodGrainger = new Image();
    this.goodUnion    = new Image();


    // returns image
    this.GetGarbage = function (binType){
        binType = typeof binType !== 'undefined' ? binType : false;

        // if user does not define bintypes thus allowing all types of garbage
        if(!binType){
            // FIGURE OUT A BETTER IMPLEMENTATION..... 
            /*var num = Math.floor(Math.random() * 6); 
            var no_to_img_map =  [
                {   bin : "compost",
                    img  : this.imgA  },  
                {   bin : "landfill",
                    img  : this.imgB  },
                {   bin : "electronics",
                    img  : this.imgC  },
                {   bin : "recycle",
                    img  : this.imgE  },
                {   bin : "recycle",
                    img  : this.imgF  }
            ];*/

            // outdated
        }
        else{

            // goes through the list of useable types
            // need to introduce an object that holds the types and images
            // CURRENT IMPLEMENTATION SUCKS!!!!!!
            var no_to_img_map = [];
            for(var i = 0; i < binType.length; i++){
                switch (binType[i]) {
                    case "recycle":
                        no_to_img_map.push({bin : binType[i], img: this.bottle});
                        no_to_img_map.push({bin : binType[i], img: this.can});
                        no_to_img_map.push({bin : binType[i], img: this.cup});
                        no_to_img_map.push({bin : binType[i], img: this.newspaper});
                        no_to_img_map.push({bin : binType[i], img: this.glasses});
                        break;
                    case "landfill":
                        no_to_img_map.push({bin : binType[i], img: this.pizza});
                        no_to_img_map.push({bin : binType[i], img: this.burger});
                        no_to_img_map.push({bin : binType[i], img: this.noodle});
                        no_to_img_map.push({bin : binType[i], img: this.greasyPlate});
                        no_to_img_map.push({bin : binType[i], img: this.chipBag});
                        break;
                    case "compost":
                        no_to_img_map.push({bin : binType[i], img: this.banana});
                        no_to_img_map.push({bin : binType[i], img: this.fruit});
                        no_to_img_map.push({bin : binType[i], img: this.cleanPlate});
                        no_to_img_map.push({bin : binType[i], img: this.salad});
                        break;
                    case "tech":
                        no_to_img_map.push({bin : binType[i], img: this.batteries});
                        no_to_img_map.push({bin : binType[i], img: this.inkCart});
                        no_to_img_map.push({bin : binType[i], img: this.cellphone});
                        break;
                    case "chemical":
                        no_to_img_map.push({bin : binType[i], img: this.cleaner});
                        no_to_img_map.push({bin : binType[i], img: this.syringes});
                        no_to_img_map.push({bin : binType[i], img: this.medication});
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
            'compost' : this.compostBin,
            'landfill': this.trashBin,
            'recycle' : this.recycleBin,
            'tech' : this.techBin,
            'chemical': this.chemBin
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
        SetDownload(this.banana, "src/img/asset_banana01.png", handleImageLoad, handleImageError)	;
        SetDownload(this.batteries, "src/img/asset_batteries01.png", handleImageLoad, handleImageError);
        SetDownload(this.bottle, "src/img/asset_bottle01.png", handleImageLoad, handleImageError);
        SetDownload(this.can, "src/img/asset_can01.png", handleImageLoad, handleImageError);
        SetDownload(this.cellphone, "src/img/asset_cell_phone01.png", handleImageLoad, handleImageError);
        SetDownload(this.chipBag, "src/img/asset_chip_bag01.png", handleImageLoad, handleImageError);
        SetDownload(this.cleaner, "src/img/asset_cleaner01.png", handleImageLoad, handleImageError);
        SetDownload(this.cup, "src/img/asset_cup01.png", handleImageLoad, handleImageError);
        SetDownload(this.fruit, "src/img/asset_fruit01.png", handleImageLoad, handleImageError);
        SetDownload(this.glasses, "src/img/asset_glasses01.png", handleImageLoad, handleImageError);
        SetDownload(this.burger, "src/img/asset_half_burger01.png", handleImageLoad, handleImageError);
        SetDownload(this.pizza, "src/img/asset_half_pizza01.png", handleImageLoad, handleImageError);
        SetDownload(this.inkCart, "src/img/asset_ink_cart01.png", handleImageLoad, handleImageError);
        SetDownload(this.medication, "src/img/asset_medication01.png", handleImageLoad, handleImageError);
        SetDownload(this.newspaper, "src/img/asset_newspaper01.png", handleImageLoad, handleImageError);
        SetDownload(this.noodle, "src/img/asset_noodle01.png", handleImageLoad, handleImageError);
        SetDownload(this.cleanPlate, "src/img/asset_paper_plate_clean01.png", handleImageLoad, handleImageError);
        SetDownload(this.greasyPlate, "src/img/asset_paper_plate_greasy01.png", handleImageLoad, handleImageError);
        SetDownload(this.salad, "src/img/asset_salad01.png", handleImageLoad, handleImageError);
        SetDownload(this.syringes, "src/img/asset_syringes01.png", handleImageLoad, handleImageError);

        // get garbage bin images
        SetDownload(this.trashBin, "src/img/asset_bin_trash01.png", handleImageLoad, handleImageError);
        SetDownload(this.compostBin, "src/img/asset_bin_compost01.png", handleImageLoad, handleImageError);
        SetDownload(this.recycleBin, "src/img/asset_bin_recycle01.png", handleImageLoad, handleImageError);
        SetDownload(this.techBin, "src/img/asset_bin_tech01.png", handleImageLoad, handleImageError);
        SetDownload(this.chemBin, "src/img/asset_bin_hazmat01.png", handleImageLoad, handleImageError);

        // get conveyorbelt 
        SetDownload(this.imgBelt, "src/img/asset_conveyor_frame01.png", handleImageLoad, handleImageError);
        SetDownload(this.backgroundImg, "src/img/main_play_background.jpg", handleImageLoad, handleImageError);

        // get overlay
        SetDownload(this.introOverlay, "src/img/waste_intro_overlay.gif", handleImageLoad, handleImageError);
        SetDownload(this.loseOverlay, "src/img/waste_loose_lower_overlay.gif", handleImageLoad, handleImageError);
        SetDownload(this.winOverlay, "src/img/waste_win_lower_overlay.gif", handleImageLoad, handleImageError);
        SetDownload(this.levelCompleteOverlay, "src/img/waste_level_complete_overlay.gif", handleImageLoad, handleImageError);
    
        // get building overlay
        SetDownload(this.badUnion, "src/img/building_union_south_bad_compressed.jpg", handleImageLoad, handleImageError);
        SetDownload(this.badChemistry, "src/img/building_chemistry_bad_compressed.jpg", handleImageLoad, handleImageError);
        SetDownload(this.badGrainger, "src/img/building_grainger_bad_compressed.jpg", handleImageLoad, handleImageError);
        SetDownload(this.badGordon, "src/img/building_gordon_bad_compressed.jpg", handleImageLoad, handleImageError);
        SetDownload(this.badDejope, "src/img/building_education_bad_compressed.jpg", handleImageLoad, handleImageError);
        
        SetDownload(this.goodUnion, "src/img/building_union_south_good_compressed.jpg", handleImageLoad, handleImageError);
        SetDownload(this.goodChemistry, "src/img/building_chemistry_good_compressed.jpg", handleImageLoad, handleImageError);
        SetDownload(this.goodGrainger, "src/img/building_grainger_good_compressed.jpg", handleImageLoad, handleImageError);
        SetDownload(this.goodGordon, "src/img/building_gordon_good_compressed.jpg", handleImageLoad, handleImageError);
        SetDownload(this.goodDejope, "src/img/building_education_good_compressed.jpg", handleImageLoad, handleImageError);

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