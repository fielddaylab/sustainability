console.log("Test environment.");

var divs = {};

divs.building1 = document.getElementById("building1");
divs.building2 = document.getElementById("building2");
divs.building3 = document.getElementById("building3");
divs.building4 = document.getElementById("building4");
divs.building5 = document.getElementById("building5");

divs.budget = document.getElementById("budget");
divs.timeSurvived = document.getElementById("timeSurvived");
divs.satisfaction = document.getElementById("satisfaction");
divs.waterPlantCapacity = document.getElementById("waterPlantCapacity");
divs.waterWasteRate = document.getElementById("waterWasteRate");
divs.waterPlantNetCapacity = document.getElementById("waterPlantNetCapacity");
divs.rainAmount = document.getElementById("rainAmount");


buildings.addUpgrade(buildings.building1, upgrades.irrigateAtNight);
buildings.addUpgrade(buildings.building1, upgrades.irrigateLess);

refresh();


function refresh(){
divs.building1.innerHTML = "<br/><b>Building 1: </b>" + buildings.building1.name + 
							"<b><br/>Unlocked? </b>" + buildings.building1.unlocked +
							"<b><br/> Upgrades: </b>" +  
							buildings.getOwnedUpgrades(buildings.building1);

divs.building2.innerHTML = "<b><br/>Building 2: </b>" + buildings.building2.name + 
							"<b><br/>Unlocked? </b>" + buildings.building2.unlocked +
							"<b><br/> Upgrades: </b>" +  
							buildings.getOwnedUpgrades(buildings.building2);

divs.building3.innerHTML = "<b><br/>Building 3: </b>" + buildings.building3.name + 
							"<b><br/>Unlocked? </b>" + buildings.building3.unlocked+
							"<b><br/> Upgrades: </b>" +  
							buildings.getOwnedUpgrades(buildings.building3);

divs.building4.innerHTML = "<b><br/>Building 4: </b>" + buildings.building4.name + 
							"<b><br/>Unlocked? </b>" + buildings.building4.unlocked+
							"<b><br/> Upgrades: </b>" +  
							buildings.getOwnedUpgrades(buildings.building4);

divs.building5.innerHTML = "<b><br/>Building 5: </b>" + buildings.building5.name + 
							"<b><br/>Unlocked? </b>" + buildings.building5.unlocked+
							"<b><br/> Upgrades: </b>" +  
							buildings.getOwnedUpgrades(buildings.building5);
}