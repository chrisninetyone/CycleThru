import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 15 });
};
const createMarkersForMap = (mapElement, map) => {
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
const initMapbox = (currentLocation) => {
  const mapElement = document.getElementById('map');
  if (mapElement) {
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    console.log(mapElement.dataset.currentLocation);
    const mapParams = {
      container: 'map',
      style: 'mapbox://styles/swolfson/cjwpspnit8u8v1cpbotrhatm3',
      zoom: 15
    }
    mapParams.center = currentLocation
    // console.log("later", mapParams.center)
    const map = new mapboxgl.Map(mapParams);
    //add current position marker
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });
    map.addControl(geolocate);
    geolocate.on('geolocate', (e) => {
      const long = e.coords.longitude;
      const lat = e.coords.latitude
      const position = [long, lat];
      console.log('test', position);
    });
    createMarkersForMap(mapElement, map);
    const userLocation = new mapboxgl.Marker();
    let condition = true
    map.on('dblclick', (e) => {
      console.log(e)
      if (condition){
      const popup = new mapboxgl.Popup().setHTML(
        `<button type="button" data-toggle="modal" data-target="#pointModal">Create Point</button>
        `);
      const draggable = new mapboxgl.Marker({
        draggable: true
      })
      .setLngLat([e.lngLat.lng, e.lngLat.lat ])
      .setPopup(popup)
      .addTo(map);
      const lat = document.querySelector("#point_lat");
      const long = document.querySelector("#point_long");
      lat.value = e.lngLat.lat;
      long.value = e.lngLat.lng;
      const onDragEnd = () => {

        const lngLat = draggable.getLngLat();
      const lat = document.querySelector("#point_lat");
      const long = document.querySelector("#point_long");
      lat.value = lngLat.lat;
      long.value = lngLat.lng;
    }
   draggable.on('dragend', onDragEnd);
    condition = false
      }
    });
    const mapboxDirections = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/cycling',
      interactive: false
    })
    map.addControl(mapboxDirections, 'top-left');
    //   console.log('alakazam')
    //   mapboxDirections.interactive(true)
    // }, 5000)
    //hide the options for driving and walking
    const option = document.querySelector('.mapbox-directions-profile');
    option.hidden = true;
    //define the directions and directionsHeader to be able to toggle them
    const directions = document.querySelector('.directions-control-instructions');
    const directionsHeader = document.querySelector(".mapbox-directions-route-summary");
    //insert button after the to and from form on map
    document.querySelector('.directions-control-inputs').insertAdjacentHTML('afterend', `<button id="toggler" class="btn btn-sm btn-dark m-2">Toggle Directions</button>`);
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
