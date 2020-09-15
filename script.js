// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/


//isLetter will return true only in case of letter
function isLetter(name) {
    let result = false;
    for (let i = 0; i < name.length; i++) {
        if (name[i].toUpperCase() != name[i].toLowerCase()) {
            result = true;
        } else {
            result = false;
        }
    }
    return result;
}


window.addEventListener("load", function() {
    let form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        let pilotName = document.querySelector("input[name=pilotName]");
        let copilotName = document.querySelector("input[name=copilotName]");
        let fuelLevel = document.querySelector("input[name=fuelLevel]");
        let cargoMass = document.querySelector("input[name=cargoMass]");


        if (pilotName.value === "" ||
            copilotName.value === "" ||
            fuelLevel === "" ||
            cargoMass === "") {
            alert("All fields are required!");
            // stop the form submission
            event.preventDefault();
        } else {

            if (!isLetter(pilotName.value) || !isLetter(copilotName.value)) {
                alert("Error:Please use only letters for name fields!");
                event.preventDefault();

                //isNaN: Not a Number, returns true if the value is not a number
            } else if (isNaN(fuelLevel.value) || isNaN(cargoMass.value)) {
                alert("Error: Please use only numbers for Fuel Level and Cargo Mass fields!");
                event.preventDefault();
            }
        }
    });
});