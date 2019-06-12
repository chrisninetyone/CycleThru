import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

// const fitMapToMarkers = (map, markers) => {
//   const bounds = new mapboxgl.LngLatBounds();
//   markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
//   map.fitBounds(bounds, { padding: 70, maxZoom: 15 });
// };


const createMarkersForMap = (mapElement, map) => {
  console.log(mapElement.dataset.markers)
  const markers = JSON.parse(mapElement.dataset.markers);
  markers.forEach((marker) => {
    const element = document.createElement('div');
    element.className = 'marker';
    element.style.backgroundImage = `url('${marker.image_url}')`;
    element.style.backgroundSize = 'contain';

    element.style.width = '25px';
    element.style.height = '25px';
    element.style.cursor = "pointer"

    const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);

    new mapboxgl.Marker(element)
    .setLngLat([ marker.lng, marker.lat ])
    .addTo(map)
    .setPopup(popup);
  });
  // fitMapToMarkers(map, markers);
}

window.addMarker = function(marker) {
  const element = document.createElement('div');
    element.className = 'marker';
    element.style.backgroundImage = `url('${marker.image_url}')`;
    element.style.backgroundSize = 'contain';

    element.style.width = '25px';
    element.style.height = '25px';
    element.style.cursor = "pointer"

    const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);
    console.log(marker.lng)
    new mapboxgl.Marker(element)
    .setLngLat([ marker.lng, marker.lat ])
    .addTo(map)
    .setPopup(popup);
}


const initMapbox = (currentLocation) => {
  const mapElement = document.getElementById('map');
  if (mapElement) {
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;


    const mapParams = {
      container: 'map',
      style: 'mapbox://styles/swolfson/cjwpspnit8u8v1cpbotrhatm3',
      zoom: 15
    }


    mapParams.center = currentLocation

    window.map = new mapboxgl.Map(mapParams);

    //add current position marker

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });

    map.addControl(geolocate);


    createMarkersForMap(mapElement, map);



    const mapboxDirections = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/cycling',
      interactive: false
    })

    window.condition = true

    const pinButton = document.querySelector('#pin-drop');
    let interactiveStatus = true;


    pinButton.addEventListener('click', (e) => {
      interactiveStatus = !interactiveStatus

      let allWaypoints = mapboxDirections.getWaypoints()
      console.log(allWaypoints);
      mapboxDirections.interactive(interactiveStatus)
      mapboxDirections.addWaypoint(allWaypoints.length - 1, currentLocation)

      if (document.querySelector('.mapboxgl-marker svg')) {
        document.querySelector('.mapboxgl-marker svg').remove()
      } else {

        let condition = true;

        if (condition){
        const popup = new mapboxgl.Popup().setHTML(
          `<button type="button" class="point-button" data-toggle="modal" data-target="#pointModal">Create Point</button>
          `);

        const draggable = new mapboxgl.Marker({
          draggable: true
        })
        .setLngLat(currentLocation)
        .setPopup(popup)
        .addTo(map);
        const lat = document.querySelector("#point_lat");
        const long = document.querySelector("#point_long");
        long.value = currentLocation[0];
        lat.value = currentLocation[1];



        const onDragEnd = () => {
          const lngLat = draggable.getLngLat();
          const lat = document.querySelector("#point_lat");
          const long = document.querySelector("#point_long");
          lat.value = lngLat.lat;
          long.value = lngLat.lng;
          console.log(lngLat)
        }
        draggable.on('dragend', onDragEnd);
        condition = false
        }
      }

      const addTripButton = document.querySelector('#add-stop');
      addTripButton.addEventListener('click', () => {
        console.log('ya clicked me')
        mapboxDirections.addWaypoint(allWaypoints.length - 1, currentLocation)
      })

      const interactiveToggle = document.querySelector('#choose-on-map');
        interactiveToggle.addEventListener('click', () => {
          console.log('boom')
        })

    });



    map.addControl(mapboxDirections, 'top-left');

    //hide the options for driving and walking
    const option = document.querySelector('.mapbox-directions-profile');
    option.hidden = true;

    //define the directions and directionsHeader to be able to toggle them
    const directions = document.querySelector('.directions-control-instructions');

    //insert button after the to and from form on map

    document.querySelector('.directions-control-inputs').insertAdjacentHTML('afterend', `<button id="toggler" class="btn btn-sm btn-dark m-2"><i class="fas fa-directions"></i> Show/Hide</button>`);
    document.querySelector('.directions-control-inputs').insertAdjacentHTML('afterend', `<button id="choose-on-map" class="btn btn-sm btn-dark m-2"><i class="fas fa-map-pin"></i> Set on Map</button>`);


    //Hide directions and add an event listener on the button to toggle "hidden" class in _map.scss
    // directions.hidden = true;
    document.querySelector('#toggler').addEventListener('click', () => {
      if (directions.hidden === false) {
        directions.hidden = true
      } else {
        directions.hidden = false
      }
    })




  }
};


export { initMapbox };
