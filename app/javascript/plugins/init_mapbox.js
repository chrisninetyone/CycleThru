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
      console.log(e.lngLat.lng)
      const popup = new mapboxgl.Popup().setHTML(
        `<form method="get" action="/points/new" >
          <input type="hidden" id="coordinates" name="long" value="${e.lngLat.lng}" >
          <input type="hidden" id="coordinates" name="lat" value="${e.lngLat.lat}" >
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

    //hide the options for driving and walking
    const option = document.querySelector('.mapbox-directions-profile');
    option.hidden = true;

    //define the directions and directionsHeader to be able to toggle them
    const directions = document.querySelector('.directions-control-instructions');
    const directionsHeader = document.querySelector(".mapbox-directions-route-summary");

    //insert button after the to and from form on map
    document.querySelector('.directions-control-inputs').insertAdjacentHTML('afterend', `<button id="toggler">Toggle Directions</button>`);

    //Add an event listener on the button to toggle "hidden" class in _map.scss
    document.querySelector('#toggler').addEventListener('click', () => {
      directions.classList.toggle(".hidden");
    })

  }


};


export { initMapbox };
