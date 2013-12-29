console.log("Beginning");
var budgetDiv = document.getElementById("budget");
var timeSurvivedDiv = document.getElementById("timeSurvived");
var satisfactionDiv = document.getElementById("satisfaction");
var waterWasteRateDiv = document.getElementById("waterWasteRate");
var waterPlantCapacityDiv = document.getElementById("waterPlantCapacity");
var waterPlantNetCapacityDiv = document.getElementById("waterPlantNetCapacity"); 
var rainAmountDiv = document.getElementById("rainAmount");

var irrigateAtNightDiv = document.getElementById("irrigateNight");
var irrigateLessDiv = document.getElementById("irrigateLess");
var dualFlushToiletDiv = document.getElementById("dualFlushToilet");
var faucetSensorsDiv = document.getElementById("faucetSensors");
var greenRoofDiv = document.getElementById("greenRoof");
var cisternDiv = document.getElementById("cistern");


//progress bars
var irrigateNightBarDiv = document.getElementById("irrigateNightBar");
var irrigateLessBarDiv = document.getElementById("irrigateLessBar");
var toiletBarDiv = document.getElementById("toiletBar");
var faucetBarDiv = document.getElementById("faucetBar");
var roofBarDiv = document.getElementById("roofBar");
var cisternBarDiv = document.getElementById("cisternBar");

var waterNetCapacity = waterPlantCapacity - waterWasteRate; //the current capacity, after waste


initializeTables();
updateAll(); //Initialize all of our divs with their respective values

function initializeTables(){
    var refreshBuildings;
    var header1 = $("#header1")[0]; //Building1 div
    var header2 = $("#header2")[0]; //Building2 div
    var header3 = $("#header3")[0]; //Building3 div
    var header4 = $("#header4")[0]; //Building4 div
    var header5 = $("#header5")[0]; //Building5 div

    var cells = $("td"); //Save the entire table

    var upgradeIndex = 0;

    //Unlocking building1
    console.log("Debug: Unlocking Building 1.");
    buildings.unlock(buildings.building1);


    //Giving building1 a few upgrades
    console.log("Debug: Giving Building 1 two upgrades: Porous Pavement and Cisterns");
    buildings.addUpgrade(buildings.building1, upgrades.porousPavement);
    buildings.addUpgrade(buildings.building1, upgrades.cistern);

    refreshBuildings = function () {
        //Loop through all the upgrades:
        upgradeIndex = 0;
        console.log("Cells.length: " + cells.length);
        console.log(cells[0]);
        console.log(cells[1]);


        for (var i = 0; i < cells.length; i++) {
            //If we're working with a Building 1 cell:
            if (cells[i].id == "building1") {

                //If Building 1 is actually unlocked:
                if (buildings.building1.unlocked) {

                    //If we actually have the upgrade.. (This should be changed)
                    if (upgradeIndex + 1 <= buildings.building1.upgrades.length) {
                        cells[i].innerHTML = buildings.building1.upgrades[upgradeIndex].name;
                    }

                    //If we do not have the upgrade:
                    else
                        cells[i].innerHTML = "Upgrade not yet unlocked.";
                }

                else
                    cells[i].innerHTML = "Building not yet unlocked.";
            }


            //If we're working with a Building 2 cell:
            if (cells[i].id == "building2") {

                //If Building 2 is actually unlocked:
                if (buildings.building2.unlocked) {

                    //If we actually have the upgrade.. (This should be changed)
                    if (upgradeIndex + 1 <= buildings.building2.upgrades.length) {
                        cells[i].innerHTML = buildings.building2.upgrades[upgradeIndex].name;
                    }

                    //If we do not have the upgrade:
                    else
                        cells[i].innerHTML = "Upgrade not yet unlocked.";
                }

                else
                    cells[i].innerHTML = "Building not yet unlocked.";
            }

            //If we're working with a Building 3 cell:
            if (cells[i].id == "building3") {

                //If Building 3 is actually unlocked:
                if (buildings.building3.unlocked) {

                    //If we actually have the upgrade.. (This should be changed)
                    if (upgradeIndex + 1 <= buildings.building3.upgrades.length) {
                        cells[i].innerHTML = buildings.building3.upgrades[upgradeIndex].name;
                    }

                    //If we do not have the upgrade:
                    else
                        cells[i].innerHTML = "Upgrade not yet unlocked.";
                }

                else
                    cells[i].innerHTML = "Building not yet unlocked.";
            }

            //If we're working with a Building 4 cell:
            if (cells[i].id == "building4") {

                //If Building 1 is actually unlocked:
                if (buildings.building4.unlocked) {

                    //If we actually have the upgrade.. (This should be changed)
                    if (upgradeIndex + 1 <= buildings.building4.upgrades.length) {
                        cells[i].innerHTML = buildings.building4.upgrades[upgradeIndex].name;
                    }

                    //If we do not have the upgrade:
                    else
                        cells[i].innerHTML = "Upgrade not yet unlocked.";
                }

                else
                    cells[i].innerHTML = "Building not yet unlocked.";
            }

            //If we're working with a Building 5 cell:
            if (cells[i].id == "building5") {

                //If Building 5 is actually unlocked:
                if (buildings.building5.unlocked) {

                    //If we actually have the upgrade.. (This should be changed)
                    if (upgradeIndex + 1 <= buildings.building5.upgrades.length) {
                        cells[i].innerHTML = buildings.building5.upgrades[upgradeIndex].name;
                    }

                    //If we do not have the upgrade:
                    else
                        cells[i].innerHTML = "Upgrade not yet unlocked.";
                }

                else
                    cells[i].innerHTML = "Building not yet unlocked.";
            }

            if (i >= 4 && i % 4 == 0)
                upgradeIndex++;
        }

    }


    refreshBuildings(); //initially load the buildings

    //Debug output; just to make sure our first cell is getting set correctly
    console.log(cells.get(0).id);


    //Set all of the building names into the proper cells
    header1.innerHTML = buildings.building1.name;
    header2.innerHTML = buildings.building2.name;
    header3.innerHTML = buildings.building3.name;
    header4.innerHTML = buildings.building4.name;
    header5.innerHTML = buildings.building5.name;

}

function updateAll(){
	
	waterNetCapacity = waterPlantCapacity - waterWasteRate;
	
	budgetDiv.innerHTML = "Budget: " + budget;
	
	timeSurvivedDiv.innerHTML = "Time Survived: " + timeSurvived + " Months";
	
	satisfactionDiv.innerHTML = "Satisfaction: " + satisfaction + "%";
	
	waterWasteRateDiv.innerHTML = "Water Waste Rate: " + waterWasteRate + " gallons per month";
	
	waterPlantCapacityDiv.innerHTML = "Water Plant Initial Capacity: " + waterPlantCapacity + " gallons";
	waterPlantNetCapacityDiv.innerHTML = "Water Plant Net Capacity: " + waterNetCapacity + " gallons";
	
//	irrigateAtNightDiv.innerHTML = upgrades.irrigateAtNight.name + (25 * upgrades.irrigateAtNight.count) + "% of campus currently";
//	irrigateLessDiv.innerHTML = upgrades.irrigateLess.name + (25 * upgrades.irrigateLess.count) + "% of campus currently";
	dualFlushToiletDiv.innerHTML = upgrades.dualFlushToilet.name + (25 * upgrades.dualFlushToilet.count) + "% of campus currently";
	faucetSensorsDiv.innerHTML = upgrades.faucetSensors.name + (25 * upgrades.faucetSensors.count) + "% of campus currently";
	greenRoofDiv.innerHTML = upgrades.greenRoof.name + (25 * upgrades.greenRoof.count) + "% of campus currently";
	cisternDiv.innerHTML = upgrades.cistern.name + (25 * upgrades.cistern.count) + "% of campus currently";
	
	rainAmount.innerHTML = rainfall() + " inches of rain fell today ";
	
	//Reset everything back to "black" color, and selected as 0.
//	irrigateAtNightDiv.style.color = "black";
//	upgrades.irrigateAtNight.selected = 0;
//
//	irrigateLessDiv.style.color = "black";
//	upgrades.irrigateLess.selected = 0;
	
	dualFlushToiletDiv.style.color = "black";
	upgrades.dualFlushToilet.selected = 0;
	
	faucetSensorsDiv.style.color = "black";
	upgrades.faucetSensors.selected = 0;
	
	greenRoofDiv.style.color = "black";
	upgrades.greenRoof.selected = 0;
	
	cisternDiv.style.color = "black";
	upgrades.cistern.selected = 0;
	
}



////This function deals with and checks the conditions for adding 25% upgrades.irrigateAtNight.
//function addNightIrrigation(){
//
//	if(canPlay() && upgrades.irrigateAtNight.count < 4){
//
//		modifyBudget( (upgrades.irrigateAtNight.cost + upgrades.irrigateAtNight.costMaintain));
//		modifyWaterWasteRate(upgrades.irrigateAtNight.waterSaved);
//		modifySatisfaction(upgrades.irrigateAtNight.satisfaction);
//
//		upgrades.irrigateAtNight.count++;
//		irrigateAtNightDiv.innerHTML = upgrades.irrigateAtNight.name + (25 * upgrades.irrigateAtNight.count) +
//											"% of campus currently";
//
//		upgrades.irrigateAtNight.percentage += 5;
//		irrigateNightBarDiv.style.width = "" + upgrades.irrigateAtNight.percentage + "%";
//	}
//
//}
//
////This function deals with and checks the conditions for adding 25% lessIrrigation.
//function addLessIrrigation(){
//
//	if(canPlay() && upgrades.irrigateLess.count < 4){
//
//		modifyBudget( (upgrades.irrigateLess.cost + upgrades.irrigateLess.costMaintain));
//		modifyWaterWasteRate(upgrades.irrigateLess.waterSaved);
//		modifySatisfaction(upgrades.irrigateLess.satisfaction);
//
//		upgrades.irrigateLess.count++;
//		irrigateLessDiv.innerHTML = upgrades.irrigateLess.name + (25 * upgrades.irrigateLess.count) +
//											"% of campus currently";
//
//		upgrades.irrigateLess.percentage += 5;
//		irrigateLessBarDiv.style.width = "" + upgrades.irrigateLess.percentage + "%";
//	}
//
//}


//This function deals with and checks the conditions for adding 25% upgrades.dualFlushToilet.
function addDualFlushToilet(){
	
	if(canPlay() && upgrades.dualFlushToilet.count < 4){
		
		modifyBudget( (upgrades.dualFlushToilet.cost + upgrades.dualFlushToilet.costMaintain));
		modifyWaterWasteRate(upgrades.dualFlushToilet.waterSaved);
		modifySatisfaction(upgrades.dualFlushToilet.satisfaction);
				
		upgrades.dualFlushToilet.count++;
		dualFlushToiletDiv.innerHTML = upgrades.dualFlushToilet.name + (25 * upgrades.dualFlushToilet.count) + 
											"% of campus currently";

		upgrades.dualFlushToilet.percentage += 5;	
		toiletBarDiv.style.width = "" + upgrades.dualFlushToilet.percentage + "%";
	}

}

//This function deals with and checks the conditions for adding 25% upgrades.faucetSensors.
function addFaucetSensors(){
	
	if(canPlay() && upgrades.faucetSensors.count < 4){
		
		modifyBudget( (upgrades.faucetSensors.cost + upgrades.faucetSensors.costMaintain));
		modifyWaterWasteRate(upgrades.faucetSensors.waterSaved);
		modifySatisfaction(upgrades.faucetSensors.satisfaction);
				
		upgrades.faucetSensors.count++;
		faucetSensorsDiv.innerHTML = upgrades.faucetSensors.name + (25 * upgrades.faucetSensors.count) + 
											"% of campus currently";

		upgrades.faucetSensors.percentage += 5;	
		faucetBarDiv.style.width = "" + upgrades.faucetSensors.percentage + "%";
	}

}

//This function deals with and checks the conditions for adding 25% upgrades.greenRoof.
function addGreenRoof(){
	
	if(canPlay() && upgrades.greenRoof.count < 4){
		
		modifyBudget( (upgrades.greenRoof.cost + upgrades.greenRoof.costMaintain));
		modifyWaterWasteRate(upgrades.greenRoof.waterSaved);
		modifySatisfaction(upgrades.greenRoof.satisfaction);
				
		upgrades.greenRoof.count++;
		greenRoofDiv.innerHTML = upgrades.greenRoof.name + (25 * upgrades.greenRoof.count) + 
											"% of campus currently";

		upgrades.greenRoof.percentage += 5;	
		roofBarDiv.style.width = "" + upgrades.greenRoof.percentage + "%";
	}
}

//This function deals with and checks the conditions for adding 25% upgrades.cistern.
function addCistern(){
	
	if(canPlay() && upgrades.cistern.count < 4){
		
		modifyBudget( (upgrades.cistern.cost + upgrades.cistern.costMaintain));
		modifyWaterWasteRate(upgrades.cistern.waterSaved);
		modifySatisfaction(upgrades.cistern.satisfaction);
				
		upgrades.cistern.count++;
		cisternDiv.innerHTML = upgrades.cistern.name + (25 * upgrades.cistern.count) + 
											"% of campus currently";
		upgrades.cistern.percentage += 5;
		cisternBarDiv.style.width = "" + upgrades.cistern.percentage + "%";											
	}
}



//Send the amount of money you are spending/saving by adding a technology, ie. upgrades.irrigateLess
function modifyBudget(amount){
		budget -= amount;
		return true;
}


//Send the amount of water you are saving by adding a technology, ie. upgrades.irrigateLess
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

//Send the amount of satisfaction you are gaining by adding a technology, ie. upgrades.irrigateLess
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

////Toggles whether or not upgrades.irrigateAtNight gets added in the next turn.
//function toggleIrrigateAtNight(){
//	if(upgrades.irrigateAtNight.selected == 1){
//		upgrades.irrigateAtNight.selected = 0;
//		irrigateAtNightDiv.style.color = "black";
//		console.log("Unselected upgrades.irrigateAtNight.");
//	}
//
//	else{
//		upgrades.irrigateAtNight.selected = 1;
//		irrigateAtNightDiv.style.color = "green";
//		console.log("Selected upgrades.irrigateAtNight.");
//	}
//}
//
////Toggles whether or not upgrades.irrigateLess gets added in the next turn.
//function toggleIrrigateLess(){
//	if(upgrades.irrigateLess.selected == 1){
//		upgrades.irrigateLess.selected = 0;
//		irrigateLessDiv.style.color = "black";
//		console.log("Unselected upgrades.irrigateLess.");
//	}
//
//	else{
//		upgrades.irrigateLess.selected = 1;
//		irrigateLessDiv.style.color = "green";
//		console.log("Selected upgrades.irrigateLess.");
//	}
//}

//Toggles whether or not upgrades.dualFlushToilet gets added in the next turn.
function toggleDualFlushToilet(){
	if(upgrades.dualFlushToilet.selected == 1){
		upgrades.dualFlushToilet.selected = 0;
		dualFlushToiletDiv.style.color = "black";
		console.log("Unselected upgrades.dualFlushToilet.");
	}
	
	else{
		upgrades.dualFlushToilet.selected = 1;
		dualFlushToiletDiv.style.color = "green";
		console.log("Selected upgrades.dualFlushToilet.");
	}
}

//Toggles whether or not upgrades.faucetSensors gets added in the next turn.
function toggleFaucetSensors(){
	if(upgrades.faucetSensors.selected == 1){
		upgrades.faucetSensors.selected = 0;
		faucetSensorsDiv.style.color = "black";
		console.log("Unselected upgrades.faucetSensors.");
	}
	
	else{
		upgrades.faucetSensors.selected = 1;
		faucetSensorsDiv.style.color = "green";
		console.log("Selected upgrades.faucetSensors.");
	}
}

//Toggles whether or not upgrades.greenRoof gets added in the next turn.
function toggleGreenRoof(){
	if(upgrades.greenRoof.selected == 1){
		upgrades.greenRoof.selected = 0;
		greenRoofDiv.style.color = "black";
		console.log("Unselected upgrades.greenRoof.");
	}
	
	else{
		upgrades.greenRoof.selected = 1;
		greenRoofDiv.style.color = "green";
		console.log("Selected upgrades.greenRoof.");
	}
}

//Toggles whether or not upgrades.greenRoof gets added in the next turn.
function toggleCistern(){
	if(upgrades.cistern.selected == 1){
		upgrades.cistern.selected = 0;
		cisternDiv.style.color = "black";
		console.log("Unselected upgrades.cistern.");
	}
	
	else{
		upgrades.cistern.selected = 1;
		cisternDiv.style.color = "green";
		console.log("Selected upgrades.cistern.");
	}
}





function turnPass(){
	//This is the stuff that will happen when a turn passes:
	
	//addNightIrrigation();
	 
	//Make any changes that the user has toggled based on the buttons pressed
//
//	if(irrigateAtNightDiv.style.color == "green"){
//		if(addNightIrrigation() ) //attempt to add upgrades.irrigateAtNight
//			console.log("Added upgrades.irrigateAtNight 25%.");
//		else
//			irrigateAtNightDiv.style.color == "black";
//	}
//
//	if(irrigateLessDiv.style.color == "green"){
//		if(addLessIrrigation() ) //attempt to add upgrades.irrigateLess
//			console.log("Added upgrades.irrigateLess 25%.");
//		else
//			irrigateLessDiv.style.color == "black";
//	}
	
	if(dualFlushToiletDiv.style.color == "green"){
		if(addDualFlushToilet() ) //attempt to add dualFlushToilets
			console.log("Added dualFlushToilets 25%.");
		else
			dualFlushToiletDiv.style.color == "black";
	}
	
	if(faucetSensorsDiv.style.color == "green"){
		if(addFaucetSensors() ) //attempt to add upgrades.faucetSensors
			console.log("Added upgrades.faucetSensors 25%.");
		else
			faucetSensorsDiv.style.color == "black";
	}
	
	if(greenRoofDiv.style.color == "green"){
		if(addGreenRoof() ) //attempt to add upgrades.greenRoof
			console.log("Added upgrades.greenRoof 25%.");
		else
			greenRoofDiv.style.color == "black";
	}
	
	if(cisternDiv.style.color == "green"){
		if(addCistern() ) //attempt to add upgrades.cistern
			console.log("Added upgrades.cistern 25%.");
		else
			cisternDiv.style.color == "black";
	}
	
	
	
	//Re-"Bill" for maintenance costs of each type of device
//	if(irrigateAtNightDiv.style.color == "black"){
//		modifyBudget(upgrades.irrigateAtNight.costMaintain * upgrades.irrigateAtNight.count);
//	}
//	if(irrigateLessDiv.style.color == "black"){
//		modifyBudget(upgrades.irrigateLess.costMaintain * upgrades.irrigateLess.count);
//	}
	if(dualFlushToiletDiv.style.color == "black"){
		modifyBudget(upgrades.dualFlushToilet.costMaintain * upgrades.dualFlushToilet.count);
	}
	if(faucetSensorsDiv.style.color == "black"){
		modifyBudget(upgrades.faucetSensors.costMaintain * upgrades.faucetSensors.count);
	}
	if(greenRoofDiv.style.color == "black"){
		modifyBudget(upgrades.greenRoof.costMaintain * upgrades.greenRoof.count);
	}
	if(cisternDiv.style.color == "black"){
		modifyBudget(upgrades.cistern.costMaintain * upgrades.cistern.count);
	}
	
	
	//Check to make sure you have not lost, and if you have, then too bad! 
	//Increment the "time" unit
	timeSurvived += 1;

	//Add another "month's" worth of budget to your balance.
	budget += initialBudget;
	
	//Reset all buttons back to "unpressed" state	
	updateAll();
	
	//Check once again to see if you have lost or not
	canPlay();

	if(timeSurvived % 3 == 0 && timeSurvived != 0){
		throwRandomEvent();
	}
}


function resetGame(){
	//Reset the entire game
	alert("You survived " + timeSurvived + " months. Your score is: " + 
		calculateScore());

	budget = initialBudget; 
	timeSurvived = 0;
	satisfaction = initialSatisfaction;
	waterWasteRate = initialWaterWasteRate;
	waterPlantCapacity = initialWaterPlantCapacity;
//	upgrades.irrigateAtNight.count = 0;
//	upgrades.irrigateLess.count = 0;
	upgrades.dualFlushToilet.count = 0;
	upgrades.faucetSensors.count = 0;
	upgrades.greenRoof.count = 0;
	upgrades.cistern.count = 0;
	updateAll(); //refresh the rendering for the user

}


//This is completely arbitrary right now, just to see some numbers at the end. 
function calculateScore(){
	return (timeSurvived + (satisfaction * 10) + (upgrades.dualFlushToilet.count * 2) + (upgrades.faucetSensors.count * 2) +
			(upgrades.greenRoof.count * 2) + (upgrades.cistern.count * 2));
}


function throwRandomEvent(){
	alert("Random event has occurred! Something will be here at a later time");
}

function rainfall(){
	return Math.round(Math.random() * 10);
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

