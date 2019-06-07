//identify the button to set a trip
const createTripButton = document.querySelector("#set-route");
const mapElement = document.getElementById('map');


  // STEP ONE: Find start and end point from the inputs
  //get lat and long of start point:
  const startInput = document.querySelector('#mapbox-directions-origin-input .mapboxgl-ctrl-geocoder input').value;
  const endInput = document.querySelector('#mapbox-directions-destination-input .mapboxgl-ctrl-geocoder input').value;

  // STEP THREE
  // geocode argument via ajax using mapbox geocoding
  // Example:
  const geocodeStringToCoordinates = (addressString) => {
    const accessToken = mapElement.dataset.mapboxApiKey
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${addressString}.json?access_token=${accessToken}`)
      .then(response => response.json())
      .then((data) => {
        const coordinates = data["features"][0]["geometry"]["coordinates"]
        const lng = coordinates[0]
        const lat = coordinates[1]
        console.log(coordinates)
      })
  }
  // STEP TWO
  // if either of those inputs is not a float AKA not coordinates
  // geocode that string into coordinates using mapbox geocoding endpoint
  // Example:
  if (isNaN(parseInt(startInput))) {
    const coordinates = geocodeStringToCoordinates(startInput);
    // console.log(coordinates)
    const startLong = coordinates[0]
    const startLat = coordinates[1]
    console.log(startLong, startLat)
  } else {
    const coordinatesArr = startInput.split(",");
    const startLong = coordinatesArr[0];
    const startLat  = coordinatesArr[1];
    console.log(startLong, startLat)
  }

  if (isNaN(parseInt(endInput))) {
    const coordinates = geocodeStringToCoordinates(endInput);
    const endLong = coordinates[0]
    const endLat = coordinates[1]
    console.log(endLong, endLat)
  } else {
    const coordinatesArr = endInput.split(",");
    const endLong = coordinatesArr[0];
    const endLat  = coordinatesArr[1];
    console.log(endLong, endLat)
  }
// const form = `<form method="post" action="/trips">
//           <input name="authenticity_token" value="<%= form_authenticity_token %>" type="hidden">
//           <input type="hidden" id="coordinates" name="trip[start_long]" value="${startLong}" >
//           <input type="hidden" id="coordinates" name="trip[start_lat]" value="${startLat}" >
//           <input type="hidden" id="coordinates" name="trip[end_long]" value="${endLong}" >
//           <input type="hidden" id="coordinates" name="trip[end_lat]" value="${endLat}" >
//           <button type="submit">Create Trip</button>
//         </form>
//         `;
// document.querySelector('.directions-control-inputs').insertAdjacentHTML('afterend', form);









  // STEP FOUR
  // Add event listener to Create Trip button to trigger trips#create action
  // send start and end coordinates back to trips controller
  // convert string to float and post to DB
  // })





// form.submit();
// const params = { "authenticity_token": "<%= form_authenticity_token %>", "trip": { "start_long": "1.5", "start_lat": "1.6", "end_long": "5.7", "end_lat": "8.4" } };
// const url = "/trips";

// // createTripButton.addEventListener('click', () => {
//   fetch(url, {
//     method: 'POST',
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(params)
//   })
//     .then(response => response.json())
//     .then((data) => {
//       console.log(data);
//     });

//simple_token gem
//get all the variables to link up



