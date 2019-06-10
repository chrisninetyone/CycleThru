const mapElement = document.getElementById('map');


const accessToken = mapElement.dataset.mapboxApiKey

const inputs = document.querySelector('.mapbox-directions-component-keyline');

inputs.addEventListener('change', () => {
  const startInput = document.querySelector('#mapbox-directions-origin-input .mapboxgl-ctrl-geocoder input').value;
  const endInput = document.querySelector('#mapbox-directions-destination-input .mapboxgl-ctrl-geocoder input').value;

  const startLong = document.querySelector('#start_long')
  const startLat = document.querySelector('#start_lat')
  const endLong = document.querySelector('#end_long')
  const endLat = document.querySelector('#end_lat')

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
    const coordinatesArr = document.querySelector('#mapbox-directions-origin-input .mapboxgl-ctrl-geocoder input').value.split(",");
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
    const coordinatesArr = document.querySelector('#mapbox-directions-destination-input .mapboxgl-ctrl-geocoder input').value.split(",");
    endLong.value = coordinatesArr[0];
    endLat.value  = coordinatesArr[1];
    console.log(endLong, endLat)
  }
})


const createTripSubmit = document.querySelector("#set-route-submit");

createTripSubmit.addEventListener('click', () => {
  const duration = document.querySelector('#duration')
  const distance = document.querySelector('#distance')

  if (document.querySelector('.mapbox-directions-route-summary h1')) {
    distance.value = document.querySelector('.mapbox-directions-route-summary h1').textContent
  }

  if (document.querySelector('.mapbox-directions-route-summary span')) {
    duration.value = document.querySelector('.mapbox-directions-route-summary span').textContent
  }
})







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



