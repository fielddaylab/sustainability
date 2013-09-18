var initialBudget = 1000000; //This is the budget amount in $, default 1000000
var initialTimeRemaining = 12; //This is the starting time remaining in Months, default 12
var initialSatisfaction = 50; //This is the starting satisfaction (in %), default 100
var initialWaterWasteRate = 800; //The starting water waste rate in gal/mo, default 0
var initialWaterPlantCapacity = 1000; // The capacity of the water filtration plant in gallons, default 1000.

var budget = initialBudget; //This is the budget amount in $, default 1000000
var timeRemaining = initialTimeRemaining; //This is the starting time remaining in Months, default 12
var satisfaction = initialSatisfaction; //This is the starting satisfaction (in %), default 100
var waterWasteRate = initialWaterWasteRate; //The starting water waste rate in gal/mo, default 0
var waterPlantCapacity = initialWaterPlantCapacity; // The capacity of the water filtration plant in gallons, default 1000.

// Irrigate at night
var irrigateAtNight = { 
	cost: 0,
	costMaintain: 0,
	waterSaved: 200,
	satisfaction: 0,
	count: 0
};

// Irrigate less
var irrigateLess = { 
	cost: -100000,
	costMaintain: 0,
	waterSaved: 400,
	satisfaction: -25,
	count: 0
};

// Dual flush toilet
var dualFlushToilet = { 
	cost: 100000,
	costMaintain: 0,
	waterSaved: 200,
	satisfaction: 0,
	count: 0
};

// Faucet sensors
var faucetSensors = { 
	cost: 100000,
	costMaintain: 15000,
	waterSaved: 100,
	satisfaction: 0,
	count: 0
};

// Green roof
var greenRoof = { 
	cost: 200000,
	costMaintain: 25000,
	waterSaved: 0,
	satisfaction: 50,
	count: 0
};

// 
var cistern = { 
	cost: 100000,
	costMaintain: 25000,
	waterSaved: 200,
	satisfaction: 0,
	count: 0
};