//identify the button to set a trip
const createTripButton = document.querySelector("#set-route-button");
const mapElement = document.getElementById('map');

const createTripSubmit = document.querySelector("#set-route-submit");

  // STEP ONE: Find start and end point from the inputs
  //get lat and long of start point:

  // STEP THREE
  // geocode argument via ajax using mapbox geocoding
  // Example:


  // const geocodeStringToCoordinates = (addressString) => {
  //   const accessToken = mapElement.dataset.mapboxApiKey

  //   fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${addressString}.json?access_token=${accessToken}`)
  //     .then(response => response.json())
  //     .then((data) => {
  //       data = data["features"][0]["geometry"]["coordinates"]
  //     })
  // }


  // STEP TWO
  // if either of those inputs is not a float AKA not coordinates
  // geocode that string into coordinates using mapbox geocoding endpoint
  // Example:
const accessToken = mapElement.dataset.mapboxApiKey
// document.querySelector('.directions-control-inputs').insertAdjacentHTML('afterend', `<button type="submit" id="set-route" form="set-route" class="btn btn-sm btn-dark m-2">Set Route</button>`);

const inputs = document.querySelector('.mapbox-directions-component-keyline');

inputs.addEventListener('change', (event) => {

  const startInput = document.querySelector('#mapbox-directions-origin-input .mapboxgl-ctrl-geocoder input').value;
  const endInput = document.querySelector('#mapbox-directions-destination-input .mapboxgl-ctrl-geocoder input').value;

  // select form inputs to create trip
  const startLong = document.querySelector('#start_long')
  const startLat = document.querySelector('#start_lat')
  const endLong = document.querySelector('#end_long')
  const endLat = document.querySelector('#end_lat')
  const authToken = document.querySelector('#auth')

  document.querySelector('.directions-control-inputs').insertAdjacentHTML('afterend', `<form id="set-route" method="post" action="/trips">`)
  const start_coords = document.querySelector('#start_coordinates')
  if (isNaN(parseInt(startInput))) {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${startInput}.json?access_token=${accessToken}`)
      .then(response => response.json())
      .then((data) => {
        const coordinates = data["features"][0]["geometry"]["coordinates"]
        startLong.value = coordinates[0]
        startLat.value = coordinates[1]
        console.log(startLong, startLat)
        })
  } else {
    const coordinatesArr = startInput.split(",");
    startLong.value = coordinatesArr[0];
    startLat.value  = coordinatesArr[1];
    console.log(startLong, startLat)
  }

  if (isNaN(parseInt(endInput))) {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${endInput}.json?access_token=${accessToken}`)
      .then(response => response.json())
      .then((data) => {
        const coordinates = data["features"][0]["geometry"]["coordinates"]
        endLong.value = coordinates[0]
        endLat.value = coordinates[1]
        console.log(endLong, endLat)
        })
  } else {
    const coordinatesArr = endInput.split(",");
    endLong.value = coordinatesArr[0];
    endLat.value  = coordinatesArr[1];
    console.log(endLong, endLat)
  }

  // auth.value = "<%= form_authenticity_token %>"
    // document.querySelector('#set-route').submit()

})



// const form = `<form id="set-route" method="post" action="/trips">
//           <input name="authenticity_token" value="<%= form_authenticity_token %>" type="hidden">
//           <input type="hidden" id="start_coordinates" name="trip[start_long]" value="${startLong}" >
//           <input type="hidden" id="coordinates" name="trip[start_lat]" value="${startLat}" >
//           <input type="hidden" id="coordinates" name="trip[end_long]" value="${endLong}" >
//           <input type="hidden" id="coordinates" name="trip[end_lat]" value="${endLat}" >
//               <button type="submit">Create Trip</button>
//         </form>`
// document.insertAdjacentHTML('afterend', form);




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



