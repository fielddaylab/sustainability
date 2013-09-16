console.log("Beginning");
var budgetDiv = document.getElementById("budget");
var timeRemainingDiv = document.getElementById("timeRemaining");
var satisfactionDiv = document.getElementById("satisfaction");
var waterWasteRateDiv = document.getElementById("waterWasteRate");
var waterPlantCapacityDiv = document.getElementById("waterPlantCapacity");
var waterPlantNetCapacityDiv = document.getElementById("waterPlantNetCapacity"); 
var irrigateAtNightDiv = document.getElementById("irrigateNight");
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
	irrigateAtNightDiv.innerHTML = "Irrigate at night: " + (25 * irrigateAtNight.count) + "% of campus 		currently";
	
}



function addNightIrrigation(){
	if(readyToAdd() && irrigateAtNight.count < 4){
		//Check to make sure that we aren't already at 100%
		irrigateAtNight.count++;
		irrigateAtNightDiv.innerHTML = "Irrigate at night: " + (25 * irrigateAtNight.count) + 									"% of campus currently";
		budget += (irrigateAtNight.cost + irrigateAtNight.costMaintain); 
		waterWasteRate -= irrigateAtNight.waterSaved;
		satisfaction += irrigateAtNight.satisfaction;
		updateAll();
	}
}


function readyToAdd(){
	//Check to make sure that we're able to currently add things
	if(budget > 0){
		if(satisfaction > 0){
			if(waterNetCapacity > 0)
				return true;
		}
	}
	
	return false;
	
}