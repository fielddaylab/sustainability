console.log = function(string, level){
	var bgColor;
	if(level !== undefined && level === 'warn'){
		bgColor = "#FFAAAA";
	} else {
		bgColor = "#EEEEEE";
	}
	var newElement = $("<div style='display:none; border-bottom: 1px dotted #333333; background-color: " + bgColor + ";'>" + string + "</div>");
	Game.dom.$messageCenter.prepend(newElement);
	newElement.slideDown();
}
var settings = {
	initial: {
		budget: 100000, //This is the budget amount in $, default 1000000
		timeSurvived: 0, //This is the starting time remaining in Months, default 12
		satisfaction: 50, //This is the starting satisfaction (in %), default 100
		waterWasteRate: 800, //The starting water waste rate in gal/mo, default 0
		waterPlantCapacity: 1000 // The capacity of the water filtration plant in gallons, default 1000.
	}
};

function Upgrade(obj){
	this.name = 				obj.name;
	this.cost = 				obj.cost;
	this.moneyDelta = 			obj.moneyDelta;
	this.waterDelta = 			obj.waterDelta;
	this.satisfactionDelta = 	obj.satisfactionDelta;
	this.count = 				obj.count;
}

function Building(obj){
	this.name = 			obj.name;
	this.imagePath = 		obj.imagePath;
	this.unlocked = 		obj.unlocked;
	this.upgrades = 		obj.upgrades;
	this.effectMultiplier = obj.effectMultiplier;
	this.dom = {
		$container: 		null,	// everything contained in this.dom will be a cached jQuery reference
		$name: 				null,
		$image: 			null,
		$stats: 			null,
		$purchasedUpgrades: null,
		$availableUpgrades: null
	}
}
Building.prototype = {
	BuyUpgrade: function(newUpgrade){
		if( ! this.unlocked ){
			// present warning saying we cannot act on a locked building
			console.log("This building is locked, you cannot purchase this.", 'warn');
			return false;
		}
		if(this.HasUpgrade(newUpgrade)){
			// present some warning saying we already have it?
			console.log("You already own '" + newUpgrade.name + "' for this building.", 'warn');
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
			Game.metrics.budget -= newUpgrade.cost;
			Game.metrics.satisfaction += newUpgrade.satisfactionDelta * this.effectMultiplier;
			Game.metrics.waterWasteRate += newUpgrade.waterDelta * this.effectMultiplier;
			this.upgrades.push(newUpgrade);	 	// add upgrade to building's list of upgrades
			console.log("Purchased '" + newUpgrade.name + "' for $" + newUpgrade.cost + ".");
			Game.Draw();
			return true;
		}
	},
	HasUpgrade: function(upgradeToCheck){
		for(var i = 0; i < this.upgrades.length; i++){
			if(this.upgrades[i].name === upgradeToCheck.name){
				return true;
			}
		}
		return false;
	},
	Unlock: function(){
		this.unlocked = true;
		this.Draw();
		console.log("Unlocked '" + this.name + ".'")
	},
	CombinedStats: function(){
		var stats = {
			waterDelta: 		0,
			moneyDelta: 		0,
			satisfactionDelta: 	0,
		}
		for(var i = 0; i < this.upgrades.length; i++){
			var currentUpgrade = this.upgrades[i];
			stats.waterDelta += currentUpgrade.waterDelta * this.effectMultiplier;
			stats.moneyDelta += currentUpgrade.moneyDelta * this.effectMultiplier;
			stats.satisfactionDelta += currentUpgrade.satisfactionDelta * this.effectMultiplier;
		}
		return stats;
	},
	StyleContainerDiv: function(){
		if( this.unlocked ){
			this.dom.$container.addClass('unlocked');
			this.dom.$container.removeClass('locked');
		} else {
			this.dom.$container.removeClass('unlocked');
			this.dom.$container.addClass('locked');
		}
		this.dom.$container.addClass
	},
	SetNameDiv: function(){
		var nameString = this.name;
		var buildingIndex = Game.buildings.indexOf(this);
		if( ! this.unlocked ){
			nameString += "<button onclick='Game.buildings[" + buildingIndex + "].Unlock()'>Unlock</button>";
		}
		this.dom.$name.html(nameString);
	},
	SetImageDiv: function(){
		this.dom.$image.html("<img src='" + this.imagePath + "' />");
	},
	SetStatsDiv: function(){
		var stats = this.CombinedStats();
		this.dom.$stats.html(
			"Building Statistics-----" + "<br />" +
			"Water Usage: " + stats.waterDelta + "<br />" +
			"Maintenance: $" + stats.moneyDelta + "<br />" +
			"Satisfaction: " + stats.satisfactionDelta + "<br />" +
			"Multiplier: " + this.effectMultiplier
		);
	},
	SetPurchasedUpgradesDiv: function(){
		var purchased = [];
		var heading = "Purchased Upgrades -----" + "<br />";
		for(var i = 0; i < this.upgrades.length; i++){
			purchased.push(this.upgrades[i].name);
		}
		this.dom.$purchasedUpgrades.html(heading + purchased.join("<br />"));
	},
	SetAvailableUpgradesDiv: function(){
		var available = [];
		var heading = "Available Upgrades -----" + "<br />";
		for(var i = 0; i < Game.possibleUpgrades.length; i++){
			var currentUpgrade = Game.possibleUpgrades[i];
			if( ! this.HasUpgrade(currentUpgrade) ){
				var buildingIndex = Game.buildings.indexOf(this);
				var upgradeIndex = Game.possibleUpgrades.indexOf(currentUpgrade);
				var clickToPurchase = "<span class='" + ( (Game.metrics.budget >= currentUpgrade.cost) ? 'canPurchase' : 'tooExpensive') + "' onclick='Game.buildings[" + buildingIndex + "].BuyUpgrade(Game.possibleUpgrades[" + upgradeIndex + "]);'>" + currentUpgrade.name + ((Game.metrics.budget >= currentUpgrade.cost) ? "<button style='float:right;'>Buy</button>" : "") + "</span>";
				available.push(clickToPurchase);
			}
		}
		this.dom.$availableUpgrades.html(heading + available.join("<br />"));
	},
	Draw: function(){
		this.StyleContainerDiv();
		this.SetNameDiv();
		this.SetImageDiv();
		this.SetStatsDiv();
		this.SetPurchasedUpgradesDiv();
		this.SetAvailableUpgradesDiv();
	},
	Update: function(){ // essentially performs a 'next turn'
		var stats = this.CombinedStats();
		Game.metrics.budget += stats.moneyDelta;
	}
}

// array of possible upgrades
var upgradeArray = [
	new Upgrade({
		name: "Porous Pavement",
		cost: 10000,
		moneyDelta: -100,
		waterDelta: -200,
		satisfactionDelta: 0,
		count: 0
	}),

	// Dual flush toilet
	new Upgrade({ 
		name: "Dual Flush Toilet",
		cost: 10000,
		moneyDelta: 0,
		waterDelta: -200,
		satisfactionDelta: 3,	// dual-flush toilets make me very satisfied
		count: 0
	}),

	// Faucet sensors
	new Upgrade({ 
		name: "Faucet Sensors",
		cost: 10000,
		moneyDelta: -1500,
		waterDelta: -100,
		satisfactionDelta: 0,
		count: 0
	}),

	// Green roof
	new Upgrade({ 
		name: "Green Roof",
		cost: 20000,
		moneyDelta: -2500,
		waterDelta: 0,
		satisfactionDelta: 50,
		count: 0
	}),

	// 
	new Upgrade({ 
		name: "Cistern",
		cost: 10000,
		moneyDelta: -2500,
		waterDelta: -200,
		satisfactionDelta: 0,
		count: 0
	})
];

var buildingArray = [
	new Building({
		name: "School of Human Ecology",
		unlocked: true,
		upgrades: [],
		effectMultiplier: 1,
		imagePath: "http://media-cache-ec0.pinimg.com/avatars/uwmadison_1332811284_30.jpg"
	}),
	new Building({
		name: "Education Building",
		unlocked: false,
		upgrades: [],
		effectMultiplier: 1,
		imagePath: "http://media-cache-ec0.pinimg.com/avatars/uwmadison_1332811284_30.jpg"
	}),
	new Building({
		name: "Science Hall",
		unlocked: false,
		upgrades: [],
		effectMultiplier: 1,
		imagePath: "http://media-cache-ec0.pinimg.com/avatars/uwmadison_1332811284_30.jpg"
	}),
	new Building({
		name: "WID",
		unlocked: false,
		upgrades: [],
		effectMultiplier: 1,
		imagePath: "http://media-cache-ec0.pinimg.com/avatars/uwmadison_1332811284_30.jpg"
	}),
	new Building({
		name: "UW Hospital",
		unlocked: false,
		upgrades: [],
		effectMultiplier: 1 ,
		imagePath: "http://media-cache-ec0.pinimg.com/avatars/uwmadison_1332811284_30.jpg"
	})
];

var Game = {
    // public variables
    possibleUpgrades: upgradeArray,
    buildings: buildingArray,
    metrics: settings.initial, // gives us variables budget, timeSurvived, satisfaction, waterWasteRate, waterPlantCapacity
    dom: {
    	$metrics: $('#metrics'),
    	$messageCenter: $('#messageCenter')
    },

    // public functions
    Initialize:     function(){
    	// create the DOM elements necessary

    	// create building DOM elements
    	for(var i = 0; i < Game.buildings.length; i++){

    		var currentBuilding = Game.buildings[i];
    		$newBuilding = $('#buildingTemplate').clone();
    		$newBuilding.attr('id', currentBuilding.name);
    		$('#sustainable').append($newBuilding);

    		currentBuilding.dom = {
    			$container:  		$newBuilding,
    			$name: 				$newBuilding.children('.name'),
    			$image: 			$newBuilding.children('.image'),
    			$stats: 			$newBuilding.children('.stats'),
    			$purchasedUpgrades: $newBuilding.children('.purchasedUpgrades'),
    			$availableUpgrades: $newBuilding.children('.availableUpgrades')
    		}

    		currentBuilding.Draw();
    		this.MetricsDiv();
    	}
    },

    Draw:   function(){
    	for(var i = 0; i < this.buildings.length; i++){
    		this.buildings[i].Draw();
    	}
    	this.MetricsDiv();
    },

    MetricsDiv: function(){
    	/*
    	budget: 100000, //This is the budget amount in $, default 1000000
		timeSurvived: 0, //This is the starting time remaining in Months, default 12
		satisfaction: 50, //This is the starting satisfaction (in %), default 100
		waterWasteRate: 800, //The starting water waste rate in gal/mo, default 0
		waterPlantCapacity: 1000 // The capacity of the water filtration plant in gallons, default 1000.
		*/
		Game.dom.$metrics.html(
			"Money: " + Game.metrics.budget + "<br />" + 
			"Satisfaction: " + Game.metrics.satisfaction + "<br />" + 
			"Water Treatment Capacity: " + Game.metrics.waterPlantCapacity + "<br />" + 
			"Current Water Waste Rate: " + Game.metrics.waterWasteRate + "<br />" +
			"Seasons Survived: " + Game.metrics.timeSurvived
		);
    },

    Update:    function(){
        for(var i = 0; i < this.buildings.length; i++){
        	if( this.buildings[i].unlocked ){
        		this.buildings[i].Update(); // begin the updating process
        	}
        }
        Game.metrics.timeSurvived++; // somehow handle time survived, come back to this
        Game.MetricsDiv();
        Game.Draw();
    }
};

Game.Initialize(); 

