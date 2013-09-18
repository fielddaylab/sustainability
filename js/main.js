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
var cisternDiv = document.getElementById("cistern");

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
	
	irrigateAtNightDiv.innerHTML = irrigateAtNight.name + (25 * irrigateAtNight.count) + "% of campus currently";
	irrigateLessDiv.innerHTML = irrigateLess.name + (25 * irrigateLess.count) + "% of campus currently";
	dualFlushToiletDiv.innerHTML = dualFlushToilet.name + (25 * dualFlushToilet.count) + "% of campus currently";
	faucetSensorsDiv.innerHTML = faucetSensors.name + (25 * faucetSensors.count) + "% of campus currently";
	greenRoofDiv.innerHTML = greenRoof.name + (25 * greenRoof.count) + "% of campus currently";
	cisternDiv.innerHTML = cistern.name + (25 * cistern.count) + "% of campus currently";
	
	
	//Reset everything back to "black" color, and selected as 0.
	irrigateAtNightDiv.style.color = "black";
	irrigateAtNight.selected = 0;
	
	irrigateLessDiv.style.color = "black";
	irrigateLess.selected = 0;
	
	dualFlushToiletDiv.style.color = "black";
	dualFlushToilet.selected = 0;
	
	faucetSensorsDiv.style.color = "black";
	faucetSensors.selected = 0;
	
	greenRoofDiv.style.color = "black";
	greenRoof.selected = 0;
	
	cisternDiv.style.color = "black";
	cistern.selected = 0;
	
}



//This function deals with and checks the conditions for adding 25% irrigateAtNight.
function addNightIrrigation(){
	
	if(canPlay() && irrigateAtNight.count < 4){
		
		modifyBudget( (irrigateAtNight.cost + irrigateAtNight.costMaintain));
		modifyWaterWasteRate(irrigateAtNight.waterSaved);
		modifySatisfaction(irrigateAtNight.satisfaction);
				
		irrigateAtNight.count++;
		irrigateAtNight.innerHTML = irrigateAtNight.name + (25 * irrigateAtNight.count) + 
											"% of campus currently";
	}

}

//This function deals with and checks the conditions for adding 25% lessIrrigation.
function addLessIrrigation(){
	
	if(canPlay() && irrigateLess.count < 4){
		
		modifyBudget( (irrigateLess.cost + irrigateLess.costMaintain));
		modifyWaterWasteRate(irrigateLess.waterSaved);
		modifySatisfaction(irrigateLess.satisfaction);
				
		irrigateLess.count++;
		irrigateLess.innerHTML = irrigateLess.name + (25 * irrigateLess.count) + 
											"% of campus currently";
	}

}


//This function deals with and checks the conditions for adding 25% dualFlushToilet.
function addDualFlushToilet(){
	
	if(canPlay() && dualFlushToilet.count < 4){
		
		modifyBudget( (dualFlushToilet.cost + dualFlushToilet.costMaintain));
		modifyWaterWasteRate(dualFlushToilet.waterSaved);
		modifySatisfaction(dualFlushToilet.satisfaction);
				
		dualFlushToilet.count++;
		dualFlushToilet.innerHTML = dualFlushToilet.name + (25 * dualFlushToilet.count) + 
											"% of campus currently";
	}

}

//This function deals with and checks the conditions for adding 25% faucetSensors.
function addFaucetSensors(){
	
	if(canPlay() && faucetSensors.count < 4){
		
		modifyBudget( (faucetSensors.cost + faucetSensors.costMaintain));
		modifyWaterWasteRate(faucetSensors.waterSaved);
		modifySatisfaction(faucetSensors.satisfaction);
				
		faucetSensors.count++;
		faucetSensors.innerHTML = faucetSensors.name + (25 * faucetSensors.count) + 
											"% of campus currently";
	}

}

//This function deals with and checks the conditions for adding 25% greenRoof.
function addGreenRoof(){
	
	if(canPlay() && greenRoof.count < 4){
		
		modifyBudget( (greenRoof.cost + greenRoof.costMaintain));
		modifyWaterWasteRate(greenRoof.waterSaved);
		modifySatisfaction(greenRoof.satisfaction);
				
		greenRoof.count++;
		greenRoof.innerHTML = greenRoof.name + (25 * greenRoof.count) + 
											"% of campus currently";
	}
}

//This function deals with and checks the conditions for adding 25% cistern.
function addCistern(){
	
	if(canPlay() && cistern.count < 4){
		
		modifyBudget( (cistern.cost + cistern.costMaintain));
		modifyWaterWasteRate(cistern.waterSaved);
		modifySatisfaction(cistern.satisfaction);
				
		cistern.count++;
		cistern.innerHTML = cistern.name + (25 * cistern.count) + 
											"% of campus currently";
	}
}



//Send the amount of money you are spending/saving by adding a technology, ie. irrigateLess
function modifyBudget(amount){
		budget -= amount;
		return true;
}


//Send the amount of water you are saving by adding a technology, ie. irrigateLess
function modifyWaterWasteRate(amount){
		if(waterWasteRate >= amount){
			waterWasteRate -= amount;
			return true;
		}
		else{
			console.log("Water Waste Rate is at 0!");
			return false;
		}
}

//Send the amount of satisfaction you are gaining by adding a technology, ie. irrigateLess
function modifySatisfaction(amount){
		if(satisfaction + amount >= 100){
			console.log("Satisfaction rate is at 100!");
			satisfaction = 100; //reduce to 100% in case we go over somehow ie. 125%
			return false; //not sure if we should return true or false here
		}
	
		else{
			satisfaction += amount;
			return true;
		}

}

//Toggles whether or not irrigateAtNight gets added in the next turn.
function toggleIrrigateAtNight(){
	if(irrigateAtNight.selected == 1){
		irrigateAtNight.selected = 0;
		irrigateAtNightDiv.style.color = "black";
		console.log("Unselected irrigateAtNight.");
	}
	
	else{
		irrigateAtNight.selected = 1;
		irrigateAtNightDiv.style.color = "green";
		console.log("Selected irrigateAtNight.");
	}
}

//Toggles whether or not irrigateLess gets added in the next turn.
function toggleIrrigateLess(){
	if(irrigateLess.selected == 1){
		irrigateLess.selected = 0;
		irrigateLessDiv.style.color = "black";
		console.log("Unselected irrigateLess.");
	}
	
	else{
		irrigateLess.selected = 1;
		irrigateLessDiv.style.color = "green";
		console.log("Selected irrigateLess.");
	}
}

//Toggles whether or not dualFlushToilet gets added in the next turn.
function toggleDualFlushToilet(){
	if(dualFlushToilet.selected == 1){
		dualFlushToilet.selected = 0;
		dualFlushToiletDiv.style.color = "black";
		console.log("Unselected dualFlushToilet.");
	}
	
	else{
		dualFlushToilet.selected = 1;
		dualFlushToiletDiv.style.color = "green";
		console.log("Selected dualFlushToilet.");
	}
}

//Toggles whether or not faucetSensors gets added in the next turn.
function toggleFaucetSensors(){
	if(faucetSensors.selected == 1){
		faucetSensors.selected = 0;
		faucetSensorsDiv.style.color = "black";
		console.log("Unselected faucetSensors.");
	}
	
	else{
		faucetSensors.selected = 1;
		faucetSensorsDiv.style.color = "green";
		console.log("Selected faucetSensors.");
	}
}

//Toggles whether or not greenRoof gets added in the next turn.
function toggleGreenRoof(){
	if(greenRoof.selected == 1){
		greenRoof.selected = 0;
		greenRoofDiv.style.color = "black";
		console.log("Unselected greenRoof.");
	}
	
	else{
		greenRoof.selected = 1;
		greenRoofDiv.style.color = "green";
		console.log("Selected greenRoof.");
	}
}

//Toggles whether or not greenRoof gets added in the next turn.
function toggleCistern(){
	if(cistern.selected == 1){
		cistern.selected = 0;
		cisternDiv.style.color = "black";
		console.log("Unselected cistern.");
	}
	
	else{
		cistern.selected = 1;
		cisternDiv.style.color = "green";
		console.log("Selected cistern.");
	}
}





function turnPass(){
	//This is the stuff that will happen when a turn passes:
	
	//addNightIrrigation();
	 
	//Make any changes that the user has toggled based on the buttons pressed
	
	if(irrigateAtNightDiv.style.color == "green"){
		if(addNightIrrigation() ) //attempt to add irrigateAtNight
			console.log("Added irrigateAtNight 25%.");
		else
			irrigateAtNightDiv.style.color == "black";
	}
	
	if(irrigateLessDiv.style.color == "green"){
		if(addLessIrrigation() ) //attempt to add irrigateLess
			console.log("Added irrigateLess 25%.");
		else
			irrigateLessDiv.style.color == "black";
	}
	
	if(dualFlushToiletDiv.style.color == "green"){
		if(addDualFlushToilet() ) //attempt to add dualFlushToilets
			console.log("Added dualFlushToilets 25%.");
		else
			dualFlushToiletDiv.style.color == "black";
	}
	
	if(faucetSensorsDiv.style.color == "green"){
		if(addFaucetSensors() ) //attempt to add faucetSensors
			console.log("Added faucetSensors 25%.");
		else
			faucetSensorsDiv.style.color == "black";
	}
	
	if(greenRoofDiv.style.color == "green"){
		if(addGreenRoof() ) //attempt to add faucetSensors
			console.log("Added greenRoof 25%.");
		else
			greenRoofDiv.style.color == "black";
	}
	
	if(cisternDiv.style.color == "green"){
		if(addCistern() ) //attempt to add cistern
			console.log("Added cistern 25%.");
		else
			cisternDiv.style.color == "black";
	}
	
	
	
	//Re-"Bill" for maintenance costs of each type of device
	if(irrigateAtNightDiv.style.color == "black"){
		modifyBudget(irrigateAtNight.costMaintain * irrigateAtNight.count);
	}
	if(irrigateLessDiv.style.color == "black"){
		modifyBudget(irrigateLess.costMaintain * irrigateLess.count);
	}
	if(dualFlushToiletDiv.style.color == "black"){
		modifyBudget(dualFlushToilet.costMaintain * dualFlushToilet.count);
	}
	if(faucetSensorsDiv.style.color == "black"){
		modifyBudget(faucetSensors.costMaintain * faucetSensors.count);
	}
	if(greenRoofDiv.style.color == "black"){
		modifyBudget(greenRoof.costMaintain * greenRoof.count);
	}
	if(cisternDiv.style.color == "black"){
		modifyBudget(cistern.costMaintain * cistern.count);
	}
	
	
	//Check to make sure you have not lost, and if you have, then too bad! 
	//Decrement the "Months" unit, and also make sure that it is not 0 when we advance a turn.
	timeRemaining -= 1;
	
	//Reset all buttons back to "unpressed" state	
	updateAll();
	
	//Check once again to see if you have lost or not
	canPlay();
}


function resetGame(){
	//Reset the entire game
	budget = initialBudget; 
	timeRemaining = initialTimeRemaining;
	satisfaction = initialSatisfaction;
	waterWasteRate = initialWaterWasteRate;
	waterPlantCapacity = initialWaterPlantCapacity;
	irrigateAtNight.count = 0;
	irrigateLess.count = 0;
	dualFlushToilet.count = 0;
	faucetSensors.count = 0;
	greenRoof.count = 0;
	cistern.count = 0;
	updateAll(); //refresh the rendering for the user
}






//Checks to see if you're still able to "play", ie if you haven't lost yet
function canPlay(){
	if(timeRemaining > 0){
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
	else{
		alert("Time is up, you win!");
		resetGame();
		return false;
	}
}
