import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 15 });
};


const initMapbox = () => {
  const mapElement = document.getElementById('map');

  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10'
    });

    const markers = JSON.parse(mapElement.dataset.markers);
    markers.forEach((marker) => {
      const element = document.createElement('div');
      element.className = 'marker';
      element.style.backgroundImage = `url('${marker.image_url}')`;
      element.style.backgroundSize = 'contain';
      element.style.width = '25px';
      element.style.height = '25px';

      new mapboxgl.Marker(element)
      .setLngLat([ marker.lng, marker.lat ])
      .addTo(map);
    });
    fitMapToMarkers(map, markers);

    map.addControl(new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/cycling'
    }), 'top-left');
  }
};


// const getDirections = (startPoint, endPoint) => {
//   //document.querySelector -- get input values from
//   //make an api call here
//   //get returned


//   //Be able to click save on a route to make a POST request to our DB
// }

//1. making api call

//2. show that route on the map

//3. if i like the route, save it to the DB and navigate

export { initMapbox };
