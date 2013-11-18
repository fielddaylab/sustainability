var buildings = {};
var name;


// buildings.Building = function(){
// 	this.name = name;
// };


//Hard coding buildings for now..
buildings.building1 = {
	name: "School of Human Ecology",
	unlocked: false,
	upgrades: [],
	effectMultiplier: 1
};

buildings.building2 = {
	name: "Education Building",
	unlocked: false,
	upgrades: [],
	effectMultiplier: 1
};

buildings.building3 = {
	name: "Science Hall",
	unlocked: false,
	upgrades: [],
	effectMultiplier: 1
};

buildings.building4 = {
	name: "Wisconsin Institutes for Discovery",
	unlocked: false,
	upgrades: [],
	effectMultiplier: 1
};

buildings.building5 = {
	name: "UW Hospital",
	unlocked: false,
	upgrades: [],
	effectMultiplier: 1 
};


buildings.addUpgrade = function(Building, Upgrade){
	if(Upgrade["name"] != undefined && Building["name"] != undefined)
		Building.upgrades.push(Upgrade);
}

buildings.unlock = function(Building){
	Building.unlocked = true;
}


// Upgrades should be checked for validity as soon as possible
// buildings.validateUpgrade = function(Upgrade){
// 	for(var i = 0; i < upgrades.length; i++){
// 		if(Upgrade.name == upgrades[i].name){
// 			return true; //found the upgrade requested
// 		}
// 	}

// 	return false; //didn't find the upgrade requested
// }

buildings.unlockAllBuildings = function(){
	console.log("Unlocking all buildings");
	buildings.building1.unlocked = true;
	buildings.building2.unlocked = true;
	buildings.building3.unlocked = true;
	buildings.building4.unlocked = true;
	buildings.building5.unlocked = true;
	refresh();
}

buildings.getAvailableUpgrades = function(Building){

	if(Building.unlocked){
		for(var i = 0; i < Building.upgrades.length; i++){

		}
	}
}

buildings.getOwnedUpgrades = function(Building){
	var temp = " ";
	for(var i = 0; i < Building.upgrades.length; i++){
		temp += Building.upgrades[i].name + "<br/> ";
	}

	if(temp !== " ") //Make sure we actually have upgrades,
		return temp;
	else //otherwise return "None"
		return " None ";
}
