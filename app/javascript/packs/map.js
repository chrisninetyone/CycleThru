
//identify the button to set a trip
const createTripButton = document.querySelector("#set-route")

// STEP ONE: Find start and end point from the inputs
//get lat and long of start point:
const startInput = document.querySelector('#mapbox-directions-origin-input .mapboxgl-ctrl-geocoder input').value;
const endInput = document.querySelector('#mapbox-directions-destination-input .mapboxgl-ctrl-geocoder input').value;

// STEP TWO
// if either of those inputs is not a float AKA not coordinates
// geocode that string into coordinates using mapbox geocoding endpoint
// Example:
if (isNaN(parseInt(mapAddressString))) {
  geocodeStringToCoordinates(mapAddressString);
} else {
  const coordinatesArr = mapAddressString.split(",");
  const long = coordinatesArr[0];
  const lat  = coordinatesArr[1];
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
// Add event listener to Create Trip button to trigger trips#create action
// send start and end coordinates back to trips controller
// convert string to float and post to DB
const message = { name: "George", body: "Hello from Kitt" };
const url = "/trips";
createTripButton.addEventListener('click', () => {
  fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message)
  })
  .then(response => response.json())
  .then((data) => {
    console.log(data);
  });
})


