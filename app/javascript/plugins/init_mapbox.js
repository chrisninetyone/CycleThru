import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 15 });
};


const initMapbox = () => {
  const mapElement = document.getElementById('map');
  if (mapElement) {

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


    let condition = true

    map.on('dblclick', (e) => {
      console.log(e)
      if (condition){
      // const element = document.createElement('div');

      const popup = new mapboxgl.Popup().setHTML(`<form method="get" action="/trips/new">
      <button type="submit">Create Point</button>
      </form>
      `);

      const draggable = new mapboxgl.Marker({
        draggable: true
      })
      .setLngLat([e.lngLat.lng, e.lngLat.lat ])
      .setPopup(popup)
      .addTo(map);

      document.querySelector("#coordinates").hidden = true;

      const onDragEnd = () => {
        const lngLat = draggable.getLngLat();
        console.log(lngLat)
        document.querySelector("#coordinates").value = lngLat;

    }


    draggable.on('dragend', onDragEnd);

    condition = false
      }
    });



    map.addControl(new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/cycling'
    }), 'top-left');


    const option = document.querySelector('.mapbox-directions-profile');
    option.hidden = true;


    // const directions = document.querySelector('.directions-control-instructions');


  }


};


export { initMapbox };
