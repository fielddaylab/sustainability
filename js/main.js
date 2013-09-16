var budgetDiv = document.getElementById("budget");
budgetDiv.innerHTML = "Budget: " + budget;

var timeRemainingDiv = document.getElementById("timeRemaining");
timeRemainingDiv.innerHTML = "Time Remaining: " + timeRemaining + " Months";

var satisfactionDiv = document.getElementById("satisfaction");
satisfactionDiv.innerHTML = "Satisfaction: " + satisfaction + "%";

var waterWasteRateDiv = document.getElementById("waterWasteRate");
waterWasteRateDiv.innerHTML = "Water Waste Rate: " + waterWasteRate + " gallons per month";

var waterPlantCapacityDiv = document.getElementById("waterPlantCapacity");
waterPlantCapacityDiv.innerHTML = "Water Plant Initial Capacity: " + waterPlantCapacity + " gallons";

var waterPlantNetCapacityDiv = document.getElementById("waterPlantNetCapacity"); //the current capacity, after waste

var waterNetCapacity = waterPlantCapacity - waterWasteRate;
waterPlantNetCapacityDiv.innerHTML = "Water Plant Net Capacity: " + waterNetCapacity + " gallons";