// redefine console.log to work for our message center
console.log = function(string, level){
	var bgColor;
	if(level !== undefined && level === 'warn'){
		bgColor = "#FFAAAA";	// red-ish color - warning
	} else {
		bgColor = "#EEEEEE";	// default normal background
	}
	var newElement = $("<div style='display:none; border-bottom: 1px dotted #333333; background-color: " + bgColor + ";'>" + string + "</div>");
	Game.dom.$messageCenter.prepend(newElement);
	newElement.slideDown();
}
var settings = {
	initial: {
		budget: 100000, 			// This is the budget amount in $, default 1000000
		timeSurvived: 0, 			// This is the starting time in Seasons, default 0
		satisfaction: 50, 			// This is the starting satisfaction (in %), default 50
		waterWasteRate: 800, 		// The starting water waste rate in gal/season, default 800
        waterRunoffRate: 800,       // The starting water runoff rate in gal/season, default 800
		waterPlantCapacity: 1000 	// The capacity of the water filtration plant in gallons, default 1000.
	},

    targetGoals: { //This will be our target goals per level, not sure how this will be impacted per level quite yet
        budget: 100001,
        satisfaction: 30,
        waterWasteRate: 500,
        waterRunoffRate: 500
    }
};

function Upgrade(obj){
	this.name = 				obj.name;				// name of the upgrade
	this.cost = 				obj.cost;				// initial cost
	this.moneyDelta = 			obj.moneyDelta;			// cost per turn
	this.waterDelta = 			obj.waterDelta;			// how it effects runoff
	this.satisfactionDelta = 	obj.satisfactionDelta;	// satisfaction effect
	this.count = 				obj.count;
	this.unlocked = 			obj.unlocked;			// is it currently locked?
	this.image = 				obj.image;
    this.icon =                 obj.icon; //experimental; icon
	this.dom = {
		$name: 				null,
		$image: 			null,
		$stats: 			null,
		$buttons: 			null
	}

}
Upgrade.prototype = {
	UpgradeIndex: function(){
		return Game.possibleUpgrades.indexOf(this);
	},
	SetNameDiv: function(){		// resets the Name Div
		var nameString = '<b>' + this.name + '<b />';
		this.dom.$name.html(nameString);
	},
	SetImageDiv: function(){	// resets the Image Div
		this.dom.$image.html("<img src='" + this.image + "'width='285', height='250' />");
	},
	SetStatsDiv: function(){	// resets the Stats Div
		this.dom.$stats.html(
			"<b>Building Statistics:</b>" + "<br />" +
			"Water Usage: " + this.waterDelta + "<br />" +
//			"Maintenance: $" + this.moneyDelta + "<br />" +
			"Satisfaction: " + this.satisfactionDelta
		);
	},
	SetButtonsDiv: function(currBuilding){
		var clickToPurchase = "<span class='" 
			+ ( (Game.metrics.budget >= this.cost) ? 'canPurchase' : 'tooExpensive') 
			+ "' onclick='Game.buildings[" + currBuilding.BuildingIndex() + "].BuyUpgrade(Game.possibleUpgrades[" + this.UpgradeIndex() + "]);$(this).parents(\".modal\").remove();'>" 
			+ this.name + ((Game.metrics.budget >= this.cost) ? "<button style='float:right;'>Buy</button>" : "") 
			+ "</span>";
		this.dom.$buttons.html(clickToPurchase);
	},
	UpgradeDiv: function(currBuilding){	// redraws a building's container and all of its contents appropriately;
		this.SetNameDiv();
		this.SetImageDiv();
		this.SetStatsDiv();
		this.SetButtonsDiv(currBuilding);
		return this.dom.$container;
	},
}

function Building(obj){
	this.name = 			obj.name;					// name of building
	this.imagePath = 		obj.imagePath;				// image path, used for building display
	this.upgrades = 		obj.upgrades;				// array containing upgrades
	this.effectMultiplier = obj.effectMultiplier;		// multiplier all effects are multi'd by
	this.dom = {
		$container: 		null,	// everything contained in this.dom will be a cached jQuery reference
		$name: 				null,
		$image: 			null,
		$stats: 			null,
		$purchasedUpgrades: null,
		$availableUpgrades: null,
		$buttons: 			null,
        $upgradeIcons:      null
	}
}
Building.prototype = {
	BuildingIndex: function(){
		return Game.buildings.indexOf(this);
	},
	BuyUpgrade: function(newUpgrade){
		if(this.HasUpgrade(newUpgrade)){
			// present some warning saying we already have it?
			console.log("You already own '" + newUpgrade.name + "' for this building.", 'warn');
			return false;
		}
		if( ! newUpgrade.unlocked ){
			console.log("The upgrade '" + newUpgrade.name + "' is still locked.");
			return false;
		}
		// time to perform the buying action
		if(Game.metrics.budget < newUpgrade.cost){
			// inform user they don't have enough money to buy this
			console.log("Buying '" + newUpgrade.name + "' would put you in debt by $" + (Game.metrics.budget - newUpgrade.cost * -1), 'warn');
			return false;
		} else {
			// REALLY BUY IT THIS TIME
			// perform one-time metric changes
			Game.metrics.budget -= newUpgrade.cost;		// subtract initial cost of item from budget
			Game.metrics.satisfaction += newUpgrade.satisfactionDelta * this.effectMultiplier;	// satisfaction effect
			Game.metrics.waterWasteRate += newUpgrade.waterDelta * this.effectMultiplier;		// runoff effect
			this.upgrades.push(newUpgrade);	 			// add upgrade to building's list of upgrades
			console.log("Purchased '" + newUpgrade.name + "' for $" + newUpgrade.cost + ".");
			Game.Draw();
			return true;
		}
	},
	HasUpgrade: function(upgradeToCheck){	// checks to see if the building has a given upgrade by name
		for(var i = 0; i < this.upgrades.length; i++){
			if(this.upgrades[i].name === upgradeToCheck.name){
				return true;
			}
		}
		return false;
	},
	CombinedStats: function(){	// combines all stats effects from all upgrades a building has
		var stats = {
			waterDelta: 		0,
			moneyDelta: 		0,
			satisfactionDelta: 	0,
		}
		for(var i = 0; i < this.upgrades.length; i++){
			var currentUpgrade = this.upgrades[i];
			stats.waterDelta += currentUpgrade.waterDelta * this.effectMultiplier;
//			stats.moneyDelta += currentUpgrade.moneyDelta * this.effectMultiplier;
			stats.satisfactionDelta += currentUpgrade.satisfactionDelta * this.effectMultiplier;
		}
		return stats;
	},
	StyleContainerDiv: function(){ 	// styles the building container accordingly w/ classes
		// blank for now
	},
	SetNameDiv: function(){		// resets the Name Div
		var nameString = '<b>' + this.name + '<b />';
		this.dom.$name.html(nameString);
	},
	SetImageDiv: function(){	// resets the Image Div
		this.dom.$image.html("<img src='" + this.imagePath + "' />");
	},
	SetStatsDiv: function(){	// resets the Stats Div
		var stats = this.CombinedStats();
		this.dom.$stats.html(
			"<b>Building Statistics:</b>" + "<br />" +
			"Water Usage: " + stats.waterDelta + "<br />" +
//			"Maintenance: $" + stats.moneyDelta + "<br />" +
			"Satisfaction: " + stats.satisfactionDelta + "<br />" +
			"Multiplier: " + this.effectMultiplier
		);
	},
	SetPurchasedUpgradesDiv: function(){	// resets the Purchased Upgrades Div
		var purchased = [];
		var heading = "Purchased Upgrades:" + "<br />";
		for(var i = 0; i < this.upgrades.length; i++){
			purchased.push(this.upgrades[i].name);
		}
		this.dom.$purchasedUpgrades.html(heading + purchased.join("<br />"));
	},
	SetAvailableUpgradesDiv: function(){	// resets the Available Upgrades Div
		var available = [];
		var heading = "Available Upgrades:" + "<br />";
		for(var i = 0; i < Game.possibleUpgrades.length; i++){
			var currentUpgrade = Game.possibleUpgrades[i];
			if( ! this.HasUpgrade(currentUpgrade) && currentUpgrade.unlocked ){
				var buildingIndex = this.BuildingIndex();
				var upgradeIndex = Game.possibleUpgrades.indexOf(currentUpgrade);
				var clickToPurchase = "<span class='" 
					+ ( (Game.metrics.budget >= currentUpgrade.cost) ? 'canPurchase' : 'tooExpensive') 
					+ "' onclick='Game.Modal(Game.possibleUpgrades[" + upgradeIndex + "].UpgradeDiv(Game.buildings[" + buildingIndex + "]));'>" 
					+ currentUpgrade.name 
					+ "</span>";
				available.push(clickToPurchase);
			}
		}
		this.dom.$availableUpgrades.html(heading + available.join("<br />"));
	},
	SetButtonsDiv: function(){
        var $that = this; //current building

        var $button = $('<button>').text('Buy More Upgrades');
        $button.bind('click', function(){
            Game.Modal($that.dom.$availableUpgrades)
        });
		this.dom.$buttons.html($button);
	},

    SetUpgradeIconsDiv: function(){
        var heading = "Purchased Upgrades: ";
        for(var i = 0; i < this.upgrades.length; i++){
            console.log(this.upgrades[i]);
            console.log(this.upgrades[i].icon);
            heading += "<img src='" + this.upgrades[i].icon + "' width ='25px' height='25px'> </img>";
        }
        this.dom.$upgradeIcons.html(heading + " ");
    },

	Draw: function(){	// redraws a building's container and all of its contents appropriately
		this.StyleContainerDiv();
		this.SetNameDiv();
		this.SetImageDiv();
		this.SetStatsDiv();
		this.SetPurchasedUpgradesDiv();
		this.SetAvailableUpgradesDiv();
		this.SetButtonsDiv();
        this.SetUpgradeIconsDiv(); //experimental
	},
	Update: function(){ // essentially performs a 'next turn,' applies all stats as needed
		var stats = this.CombinedStats();
		Game.metrics.budget += stats.moneyDelta;
	}
}

// array of possible upgrades
var upgradeArray = [
	new Upgrade({
		unlocked: true,
		name: "Porous Pavement",
		cost: 10000,
		moneyDelta: -100,
		waterDelta: -200,
		satisfactionDelta: 0,
		count: 0,
		image: "http://upload.wikimedia.org/wikipedia/commons/8/8f/Permeable_paver_demonstration.jpg",
        icon: "img/porousAsphaltIcon.jpg"
	}),

	// Dual flush toilet
	new Upgrade({ 
		unlocked: true,
		name: "Dual Flush Toilet",
		cost: 10000,
		moneyDelta: 0,
		waterDelta: -200,
		satisfactionDelta: 3,	// dual-flush toilets make me very satisfied
		count: 0,
		image: "http://www.leaveitbetter.com/files/8112/7896/1078/HydroRight.gif",
        icon: "img/dualFlushIcon.jpg"
	}),

	// Faucet sensors
	new Upgrade({ 
		unlocked: false,
		name: "Faucet Sensors",
		cost: 10000,
		moneyDelta: -1500,
		waterDelta: -100,
		satisfactionDelta: 0,
		count: 0,
		image: "",
        icon: ""
	}),

	// Green roof
	new Upgrade({ 
		unlocked: false,
		name: "Green Roof",
		cost: 20000,
		moneyDelta: -2500,
		waterDelta: 0,
		satisfactionDelta: 50,
		count: 0,
		image: "",
        icon: ""
	}),

	// 
	new Upgrade({ 
		unlocked: false,
		name: "Cistern",
		cost: 10000,
		moneyDelta: -2500,
		waterDelta: -200,
		satisfactionDelta: 0,
		count: 0,
		image: "",
        icon: ""
	})
];

var buildingArray = [
	new Building({
		name: "Nancy Nicholas Hall",
		upgrades: [],
		effectMultiplier: 1,
		imagePath: "img/sohi.jpg"
	}),
	new Building({
		name: "Education Building",
		upgrades: [],
		effectMultiplier: 1,
		imagePath: "img/education.jpg"
	}),
	new Building({
		name: "Microbial Sciences",
		upgrades: [],
		effectMultiplier: 1,
		imagePath: "img/microbialSciences.jpg"
	}),
	new Building({
		name: "WID",
		upgrades: [],
		effectMultiplier: 1,
		imagePath: "img/wid.jpg"
	}),
	new Building({
		name: "Student Activity Center",
		upgrades: [],
		effectMultiplier: 1 ,
		imagePath: "img/sac.jpg"
	})
];

var Game = {
    // public variables
    modals: [],
    possibleUpgrades: upgradeArray,
    buildings: buildingArray,
//  metrics: settings.initial, // gives us variables budget, timeSurvived, satisfaction, waterWasteRate, waterPlantCapacity
    metrics: jQuery.extend({}, settings.initial), //This will shallow-copy the settings.initial object without passing by reference.
    targetGoals: jQuery.extend({}, settings.targetGoals), //shallow-copy of the initial target goals, so we can change them w/o modfiying original

    dom: {
    	$metrics: $('#metrics'),
    	$messageCenter: $('#messageCenter'),
    	$modalTemplate: $('#modalTemplate'),
    	$gameContainer: $('#sustainable'),
    	$upgradeTemplate: $('#upgradeTemplate')
    },

    // public functions
    CheckLoss:       function(){
        var lossMessage = " You have lost the game due to:<br/>";
        var failed = false;

        if(Game.metrics.budget < Game.targetGoals.budget ){
            console.log("Lost due to money going below threshold.");
            lossMessage += "-not meeting the budget goal of " + Game.targetGoals.budget + "<br/>";
            failed = true;
        }

        if(Game.metrics.satisfaction < Game.targetGoals.satisfaction){
            console.log("Lost due to satisfaction going below threshold.");
            lossMessage += "-not meeting the satisfaction goal of " + Game.targetGoals.satisfaction + "<br>";
            failed = true;
        }

        if(Game.metrics.waterWasteRate > Game.targetGoals.waterWasteRate){
            console.log("Lost due to water waste rate being above maximum threshold.");
            lossMessage += "-not being below the water waste rate goal of " + Game.targetGoals.waterWasteRate + "<br>";
            failed = true;
        }

        if(Game.metrics.waterRunoffRate > Game.targetGoals.waterRunoffRate){
            console.log("Lost due to water runoff rate being above maximum threshold.");
            lossMessage += "-not being below the water runoff rate goal of " + Game.targetGoals.waterRunoffRate + "<br>";
            failed = true;
        }

        if(failed){
            lossMessage += "You survived for " + Game.metrics.timeSurvived + " quarters!";
            //alert(lossMessage); //Should become a Modal eventually.
            Game.Modal(lossMessage);
            Game.Reset();
        }

        else{
            Game.metrics.timeSurvived++;
            return; //Did not fail! Should be a success modal here as well eventually.
        }


    },

    Reset:          function(){
      Game.metrics = jQuery.extend(true, {}, settings.initial); //DEEP COPY OF INITIAL SETTINGS WITHOUT OVERWRITING THEM
      Game.Initialize();
      Game.Draw();
    },

    Initialize:     function(){
    	// create the DOM elements necessary

    	// create building DOM elements
    	for(var i = 0; i < Game.buildings.length; i++){

    		// copy the building template DOM, store it away
    		var currentBuilding = Game.buildings[i];
    		var $newBuilding = $('#buildingTemplate').clone();
    		$newBuilding.attr('id', currentBuilding.name);

    		// create jQuery objects from appropriate building dom pieces, store references
    		currentBuilding.dom = {
    			$container:  		$newBuilding,
    			$name: 				$newBuilding.children('.name'),
    			$image: 			$newBuilding.children('.image'),
    			$stats: 			$newBuilding.children('.stats'),
    			$purchasedUpgrades: $newBuilding.children('.purchasedUpgrades'),
    			$availableUpgrades: $newBuilding.children('.availableUpgrades'),
    			$buttons: 			$newBuilding.children('.buttons'),
                $upgradeIcons:      $newBuilding.children('.upgradeIcons') //experimental
    		}

    		// draw the current building
    		currentBuilding.Draw();
    		// update the Metrics div
    		////////this.MetricsDiv();
    	}

    	// create Upgrade dom elements
    	for(var i = 0; i < Game.possibleUpgrades.length; i++){

    		// copy the upgrade template DOM, store it away
    		var currentUpgrade = Game.possibleUpgrades[i];
    		var $newUpgrade = $('#upgradeTemplate').clone();
    		$newUpgrade.attr('id', currentUpgrade.name);

    		// create jQuery objects from appropriate building dom pieces, store references
    		currentUpgrade.dom = {
    			$container: 		$newUpgrade,
    			$name: 				$newUpgrade.children('.name'),
    			$image: 			$newUpgrade.children('.image'),
    			$stats: 			$newUpgrade.children('.stats'),
    			$buttons: 			$newUpgrade.children('.buttons')
    		}
    	}
    },

    Modal: 	function(content){
    	$newModal = Game.dom.$modalTemplate.clone();
    	$newModal.attr('id', 'figure-it-out-later');
    	$newModal.append(content);
    	Game.dom.$gameContainer.append($newModal);
    },

    Draw:   function(){
    	// Draw each building
    	for(var i = 0; i < this.buildings.length; i++){
    		this.buildings[i].Draw();
    	}
    	// Draw the metrics div
    	this.MetricsDiv();
    },

    MetricsDiv: function(){
    	// Draw the metrics div, it informs the user how well they are doing / current statistics
		Game.dom.$metrics.html(
			"Money: " + Game.metrics.budget + " (Goal: >" + Game.targetGoals.budget + ")<br />" +
			"Satisfaction: " + Game.metrics.satisfaction + " (Goal: >" + Game.targetGoals.satisfaction + ")<br />" +
			"Water Treatment Capacity: " + Game.metrics.waterPlantCapacity + "<br />" +
			"Current Water Waste Rate: " + Game.metrics.waterWasteRate + " (Goal: <" + Game.targetGoals.waterWasteRate + ")<br />" +
            "Current Water Runoff Rate: " + Game.metrics.waterRunoffRate + " (Goal: <" + Game.targetGoals.waterRunoffRate + ")<br />" +
			"Quarters Survived: " + Game.metrics.timeSurvived
		);
    },

    Update:    function(){
    	// Perform a turn transition
        for(var i = 0; i < this.buildings.length; i++){
        	this.buildings[i].Update(); // begin the updating process
        }
        Game.MetricsDiv();
        Game.Draw();
        Game.CheckLoss(); //See if you lose or not (will increment timeSurvived as well if you survived)
        console.log("Next turn...");
    }
};

Game.Initialize(); 

