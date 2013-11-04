var buildings = {};
var name;


// buildings.Building = function(){
// 	this.name = name;
// };


//Hard coding buildings for now..
buildings.HumanEcology = {
	name: "School of Human Ecology",
	unlocked: false,
	upgrades: []
};

buildings.Education = {
	name: "Education Building",
	unlocked: false,
	upgrades: []
};

buildings.Science = {
	name: "Science Hall",
	unlocked: false,
	upgrades: []
};

buildings.WID = {
	name: "Wisconsin Institutes for Discovery",
	unlocked: false,
	upgrades: []
};

buildings.Hospital = {
	name: "UW Hospital",
	unlocked: false,
	upgrades: []
};


buildings.addUpgrade = function(Building, Upgrade){
	Building.upgrades.push(Upgrade);
}

buildings.unlock = function(Building){
	Buildings.unlocked = true;
}
