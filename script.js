//isLetter will return true only in case of letter
//special characters and numbers are filtered out
function isLetter(name) {
    let result = false;
    for (let i = 0; i < name.length; i++) {
        if (name[i].toUpperCase() != name[i].toLowerCase()) { //only letters are case sensitive characters 
            result = true;
        } else {
            result = false;
        }
    }
    return result;
}

//Validating user intput 
function formValidation() {
    let pilotName = document.querySelector("input[name=pilotName]");
    let copilotName = document.querySelector("input[name=copilotName]");
    let fuelLevel = document.querySelector("input[name=fuelLevel]");
    let cargoMass = document.querySelector("input[name=cargoMass]");

    if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
        alert("All fields are required!");
        return false;
    } else {
        //using isLetter function define above to see if the entry contains only letters
        if (!isLetter(pilotName.value) || !isLetter(copilotName.value)) {
            alert("Error:Please use only letters for name fields!");
            return false;
        }
        //isNaN: Not a Number, returns true if the value is not a number
        else if (isNaN(fuelLevel.value) || isNaN(cargoMass.value)) {
            alert("Error: Please use only numbers for Fuel Level and Cargo Mass fields!");
            return false;
        }
        //isNaN: Not a Number, returns true if the value is not a number
        else if (fuelLevel.value < 0 || cargoMass.value < 0) {
            alert("Error: Please use positive numbers for Fuel Level and Cargo Mass fields!");
            return false;
        }
    }
    return true;
}

//Updating Shuttle Requirements
function UpdateShuttle() {
    let pilotName = document.querySelector("input[name=pilotName]");
    let copilotName = document.querySelector("input[name=copilotName]");
    let fuelLevel = document.querySelector("input[name=fuelLevel]");
    let cargoMass = document.querySelector("input[name=cargoMass]");

    let faultyItems = document.querySelector("div[id=faultyItems]");
    let launchStatus = document.querySelector("h2[id=launchStatus]");
    let pilotStatus = document.querySelector("li[id=pilotStatus]");
    let copilotStatus = document.querySelector("li[id=copilotStatus]");
    let fuelStatus = document.querySelector("li[id=fuelStatus]");
    let cargoStatus = document.querySelector("li[id=cargoStatus]");

    pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready for launch`;
    fuelStatus.innerHTML = "Fuel level high enough for launch";
    cargoStatus.innerHTML = "Cargo mass low enough for launch";
    faultyItems.style.visibility = "visible";

    if (fuelLevel.value < 10000 || cargoMass.value > 10000) {
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
        if (fuelLevel.value < 10000) {
            fuelStatus.innerHTML = "Fuel level too low for launch";
        }
        if (cargoMass.value > 10000) {
            cargoStatus.innerHTML = "Cargo mass too much for launch";
        }
    } else {
        launchStatus.innerHTML = "Shuttle is ready for launch";
        launchStatus.style.color = "green";
    }
}

//Fetch Jason Data about destination planets
function fetchData() {
    let misionTarget = document.querySelector("div[id=missionTarget]");
    fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
        response.json().then(function(json) {

            // generate random index number between 0 and length of json array
            let index = Math.floor(Math.random() * json.length);
            misionTarget.innerHTML = ""; //make sure to clear out left over html data 
            misionTarget.innerHTML = `<h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[index].name}</li>
               <li>Diameter: ${json[index].diameter}</li>
               <li>Star: ${json[index].star}</li>
               <li>Distance from Earth: ${json[index].distance}</li>
               <li>Number of Moons: ${json[index].moons}</li>
            </ol>
            <img src="${json[index].image}">`;
        });
    });
}

window.addEventListener("load", function() {
    fetchData();
    let form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        if (formValidation()) {
            UpdateShuttle();
        }
    });
});