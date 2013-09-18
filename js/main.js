console.log("Beginning");
var budgetDiv = document.getElementById("budget");
var timeRemainingDiv = document.getElementById("timeRemaining");
var satisfactionDiv = document.getElementById("satisfaction");
var waterWasteRateDiv = document.getElementById("waterWasteRate");
var waterPlantCapacityDiv = document.getElementById("waterPlantCapacity");
var waterPlantNetCapacityDiv = document.getElementById("waterPlantNetCapacity"); 

var irrigateAtNightDiv = document.getElementById("irrigateNight");
var irrigateLessDiv = document.getElementById("irrigateLess");
var dualFlushToiletDiv = document.getElementById("dualFlushToilet");
var faucetSensorsDiv = document.getElementById("faucetSensors");
var greenRoofDiv = document.getElementById("greenRoof");

var waterNetCapacity = waterPlantCapacity - waterWasteRate; //the current capacity, after waste

updateAll(); //Initialize all of our divs with their respective values

function updateAll(){
	
	waterNetCapacity = waterPlantCapacity - waterWasteRate;
	
	budgetDiv.innerHTML = "Budget: " + budget;
	
	timeRemainingDiv.innerHTML = "Time Remaining: " + timeRemaining + " Months";
	
	satisfactionDiv.innerHTML = "Satisfaction: " + satisfaction + "%";
	
	waterWasteRateDiv.innerHTML = "Water Waste Rate: " + waterWasteRate + " gallons per month";
	
	waterPlantCapacityDiv.innerHTML = "Water Plant Initial Capacity: " + waterPlantCapacity + " gallons";
	waterPlantNetCapacityDiv.innerHTML = "Water Plant Net Capacity: " + waterNetCapacity + " gallons";
	
	irrigateAtNightDiv.innerHTML = "Irrigate at night: " + (25 * irrigateAtNight.count) + "% of campus currently";
	irrigateLessDiv.innerHTML = "Irrigate less: " + (25 * irrigateLess.count) + "% of campus currently";
	dualFlushToiletDiv.innerHTML = "Dual Flush Toilet: " + (25 * dualFlushToilet.count) + "% of campus currently";
	faucetSensorsDiv.innerHTML = "Faucet Sensors: " + (25 * faucetSensors.count) + "% of campus currently";
	greenRoofDiv.innerHTML = "Green Roofs: " + (25 * greenRoof.count) + "% of campus currently";
}



//This function deals with and checks the conditions for adding 25% nightIrrigation.
function addNightIrrigation(){
	var allGood = true;
	
	if(canPlay() && irrigateAtNight.count < 4){
		
		//Check to make sure we can actually add a irrigateAtNight, before we go ahead and do it.
		if(modifyBudget( (irrigateAtNight.cost + irrigateAtNight.costMaintain), 0) && 
		 modifyWaterWasteRate(irrigateAtNight.waterSaved, 0) && modifySatisfaction(irrigateAtNight.satisfaction, 0)){								
			console.log("irrigateAtNight can be added.");
		}
		
		else{
			allGood = false;
			console.log("Cannot add a irrigateAtNight, cancelling.");
		}
		
		
		//If everything passed so far... actually make the changes. (2nd argument "flag" determines this)
		if(allGood){
			console.log("All good! Making changes...");
			modifyBudget( (irrigateAtNight.cost + irrigateAtNight.costMaintain), 1);
			modifyWaterWasteRate(irrigateAtNight.waterSaved, 1);
			modifySatisfaction(irrigateAtNight.satisfaction, 1);
				
			irrigateAtNight.count++;
			irrigateAtNight.innerHTML = " Irrigate at night: " + (25 * irrigateAtNight.count) + 
											"% of campus currently";
			updateAll();
		}
		
			
	}
}

//This function deals with and checks the conditions for adding 25% lessIrrigation.
function addLessIrrigation(){
	
	var allGood = true;
	
	if(canPlay() && irrigateLess.count < 4){
		
		//Check to make sure we can actually add a irrigateLess, before we go ahead and do it.
		if(modifyBudget( (irrigateLess.cost + irrigateLess.costMaintain), 0) && 
		 modifyWaterWasteRate(irrigateLess.waterSaved, 0) && modifySatisfaction(irrigateLess.satisfaction, 0)){								
			console.log("irrigateLess can be added.");
		}
		
		else{
			allGood = false;
			console.log("Cannot add a irrigateLess, cancelling.");
		}
		
		
		//If everything passed so far... actually make the changes. (2nd argument "flag" determines this)
		if(allGood){
			console.log("All good! Making changes...");
			modifyBudget( (irrigateLess.cost + irrigateLess.costMaintain), 1);
			modifyWaterWasteRate(irrigateLess.waterSaved, 1);
			modifySatisfaction(irrigateLess.satisfaction, 1);
				
			irrigateLess.count++;
			irrigateLess.innerHTML = "Less Irrigation: " + (25 * irrigateLess.count) + 
											"% of campus currently";
			updateAll();
		}
		
			
	}

}


//This function deals with and checks the conditions for adding 25% dualFlushToilet.
function addDualFlushToilet(){
	var allGood = true;
	
	if(canPlay() && dualFlushToilet.count < 4){
		
		//Check to make sure we can actually add a dualFlushToilet, before we go ahead and do it.
		if(modifyBudget( (dualFlushToilet.cost + dualFlushToilet.costMaintain), 0) && 
		 modifyWaterWasteRate(dualFlushToilet.waterSaved, 0) && modifySatisfaction(dualFlushToilet.satisfaction, 0)){								
			console.log("dualFlushToilet can be added.");
		}
		
		else{
			allGood = false;
			console.log("Cannot add a dualFlushToilet, cancelling.");
		}
		
		
		//If everything passed so far... actually make the changes. (2nd argument "flag" determines this)
		if(allGood){
			console.log("All good! Making changes...");
			modifyBudget( (dualFlushToilet.cost + dualFlushToilet.costMaintain), 1);
			modifyWaterWasteRate(dualFlushToilet.waterSaved, 1);
			modifySatisfaction(dualFlushToilet.satisfaction, 1);
				
			dualFlushToilet.count++;
			dualFlushToilet.innerHTML = "Dual Flush Toilet: " + (25 * dualFlushToilet.count) + 
											"% of campus currently";
			updateAll();
		}
		
			
	}
}

//This function deals with and checks the conditions for adding 25% faucetSensors.
function addFaucetSensors(){
	
	var allGood = true;
	
	if(canPlay() && faucetSensors.count < 4){
		
		//Check to make sure we can actually add a faucetSensor, before we go ahead and do it.
		if(modifyBudget( (faucetSensors.cost + faucetSensors.costMaintain), 0) && 
		 modifyWaterWasteRate(faucetSensors.waterSaved, 0) && modifySatisfaction(faucetSensors.satisfaction, 0)){								
			console.log("faucetSensors can be added.");
		}
		
		else{
			allGood = false;
			console.log("Cannot add a faucetSensors, cancelling.");
		}
		
		
		//If everything passed so far... actually make the changes. (2nd argument "flag" determines this)
		if(allGood){
			console.log("All good! Making changes...");
			modifyBudget( (faucetSensors.cost + faucetSensors.costMaintain), 1);
			modifyWaterWasteRate(faucetSensors.waterSaved, 1);
			modifySatisfaction(faucetSensors.satisfaction, 1);
				
			faucetSensors.count++;
			faucetSensors.innerHTML = "Faucet Sensors: " + (25 * faucetSensors.count) + 
											"% of campus currently";
			updateAll();
		}
		
			
	}

}

//This function deals with and checks the conditions for adding 25% greenRoof.
function addGreenRoofs(){
	var allGood = true;
	
	if(canPlay() && greenRoof.count < 4){
		
		//Check to make sure we can actually add a greenRoof, before we go ahead and do it.
		if(modifyBudget( (greenRoof.cost + greenRoof.costMaintain), 0) && 
		 modifyWaterWasteRate(greenRoof.waterSaved, 0) && modifySatisfaction(greenRoof.satisfaction, 0)){								
			console.log("greenRoof can be added.");
		}
		
		else{
			allGood = false;
			console.log("Cannot add a greenRoof, cancelling.");
		}
		
		
		//If everything passed so far... actually make the changes. (2nd argument "flag" determines this)
		if(allGood){
			console.log("All good! Making changes...");
			modifyBudget( (greenRoof.cost + greenRoof.costMaintain), 1);
			modifyWaterWasteRate(greenRoof.waterSaved, 1);
			modifySatisfaction(greenRoof.satisfaction, 1);
				
			greenRoof.count++;
			greenRoof.innerHTML = "Green Roofs: " + (25 * greenRoof.count) + 
											"% of campus currently";
			updateAll();
		}
		
			
	}
}



//Send the amount of money you are spending/saving by adding a technology, ie. irrigateLess
function modifyBudget(amount, flag){
	
	//A flag of 0 indicates that we are just querying if we CAN change the budget, without doing so.
	if(flag == 0){
	     if(budget >= amount)
		 	return true; //Simply query whether we can make the change, don't actually make it.
		 else{
			 console.log("Problem with Budget.");
		 	return false;
		}
	}
	
	else{
		if(budget >= amount){
			budget -= amount;
			return true;
		}
		else{
			alert("Budget is at 0!");
			return false;
		}
	}
}


//Send the amount of water you are saving by adding a technology, ie. irrigateLess
function modifyWaterWasteRate(amount, flag){
	//A flag of 0 indicates that we are just querying if we CAN change the budget, without doing so.
	if(flag == 0){
	     if(waterWasteRate >= amount)
		 	return true; //Simply query whether we can make the change, don't actually make it.
		 else{
			 console.log("Problem with Water Waste Rate.");
		 	return false;
		}
	}
	
	else{
		if(waterWasteRate >= amount){
			waterWasteRate -= amount;
			return true;
		}
		else{
			alert("Water Waste Rate is at 0!");
			return false;
		}
	}

}

//Send the amount of satisfaction you are gaining by adding a technology, ie. irrigateLess
function modifySatisfaction(amount, flag){
	
	if(flag == 0){
		if(satisfaction-amount >= 0){
			return true;
		}
		
		else{
			console.log("Problem with Satisfaction.");
			return false;
		}
	}
	
	if(satisfaction + amount >= 0 && satisfaction < 100){
		satisfaction += amount;
		return true;
	}
	else if(satisfaction == 0){
		alert("Satisfaction rate at 0!");
		return false;
	}
	else{
		alert("Satisfaction rate is at 100!");
		return false;
	}
}







function resetGame(){
	//Reset the entire game
}






//Checks to see if you're still able to "play", ie if you haven't lost yet
function canPlay(){
	if(budget >= 0){
		if(satisfaction >= 0){
			if(waterWasteRate < waterPlantCapacity){
				console.log("Still have not lost.");
				return true;
			}
			else{
				alert("Water waste rate is greater than your plant capacity! You have lost.");
				resetGame();
				return false;
			}
		}
		else{
			alert("Satisfaction is 0, you have lost.");
			resetGame();
			return false;
		}
	}
	else{
		alert("Budget is negative, you have lost.");
		resetGame();
		return false;
	}
}
