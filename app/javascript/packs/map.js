// STEP ONE: Find start and end point from the inputs
//get lat and long of start point:
const aInput = document.querySelector('#mapbox-directions-origin-input .mapboxgl-ctrl-geocoder input');
const bInput = document.querySelector('#mapbox-directions-destination-input .mapboxgl-ctrl-geocoder input');

// STEP TWO
// if either of those inputs is not a float AKA not coordinates
// geocode that string into coordinates using mapbox geocoding endpoint
// Example:
if (mapAddressString === NaN ) {
  geocodeStringToCoordinates(mapAddressString);
}

// STEP THREE
// geocode argument via ajax using mapbox geocoding
// Example:
const geocodeStringToCoordinates = (addressString) => {
  fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/${addressString}")
    .then(response => response.json)
    .then(data => {
      console.log(data);
    })
}

// STEP FOUR
// send start and end coordinates back to trips controller
// convert string to float and post to DB
const message = { name: "George", body: "Hello from Kitt" };
const url = "/trips";

fetch(url, {
  method: 'POST',
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(message)
})
.then(response => response.json())
.then((data) => {
  console.log(data);
});
