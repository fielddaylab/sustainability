var refreshBuildings;

$(document).ready(function() { 
	var header1 = $("#header1")[0]; //Building1 div
	var header2 = $("#header2")[0]; //Building2 div
	var header3 = $("#header3")[0]; //Building3 div
	var header4 = $("#header4")[0]; //Building4 div
	var header5 = $("#header5")[0]; //Building5 div

	var cells = $("td"); //Save the entire table

	var upgradeIndex = 0;

	//Giving building1 a few upgrades
	console.log("Debug: Giving Building 1 two upgrades: Porous Pavement and Cisterns");
	buildings.addUpgrade(buildings.building1, upgrades.porousPavement);
	buildings.addUpgrade(buildings.building1, upgrades.cistern);

	//Unlocking building1
	console.log("Debug: Unlocking Building 1.");
	buildings.unlock(buildings.building1);

	refreshBuildings = function(){
	//Loop through all the upgrades:
	upgradeIndex = 0;
	console.log("Cells.length: " + cells.length);
	console.log(cells[0]);
	console.log(cells[1]);


	for(var i = 0; i < cells.length; i++){
		//If we're working with a Building 1 cell:
		if(cells[i].id == "building1"){

			//If Building 1 is actually unlocked:
			if(buildings.building1.unlocked){

				//If we actually have the upgrade.. (This should be changed)
				if(upgradeIndex+1 <= buildings.building1.upgrades.length){
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
		if(cells[i].id == "building2"){

			//If Building 2 is actually unlocked:
			if(buildings.building2.unlocked){

				//If we actually have the upgrade.. (This should be changed)
				if(upgradeIndex+1 <= buildings.building2.upgrades.length){
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
		if(cells[i].id == "building3"){

			//If Building 3 is actually unlocked:
			if(buildings.building3.unlocked){

				//If we actually have the upgrade.. (This should be changed)
				if(upgradeIndex+1 <= buildings.building3.upgrades.length){
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
		if(cells[i].id == "building4"){

			//If Building 1 is actually unlocked:
			if(buildings.building4.unlocked){

				//If we actually have the upgrade.. (This should be changed)
				if(upgradeIndex+1 <= buildings.building4.upgrades.length){
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
		if(cells[i].id == "building5"){

			//If Building 5 is actually unlocked:
			if(buildings.building5.unlocked){

				//If we actually have the upgrade.. (This should be changed)
				if(upgradeIndex+1 <= buildings.building5.upgrades.length){
					cells[i].innerHTML = buildings.building5.upgrades[upgradeIndex].name;
				}

				//If we do not have the upgrade:
				else
					cells[i].innerHTML = "Upgrade not yet unlocked.";
			}

			else
				cells[i].innerHTML = "Building not yet unlocked.";
		}

		if(i >= 4 && i % 4 == 0)
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

});