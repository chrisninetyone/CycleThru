import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 15 });
};

// need an event listener for the click on map
// on click, 1) drop a pin, 2) render the button
// TRICK: need to pass the coordinates from client to the next view through params

// const renderCreatePoint = () => {
//   // query selector on button

//     const button = document.querySelector(".create-new-point")
//     button.style.display = "show"
// }



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
    map.on('click', (e) => {
      console.log(e)
      if (condition){
      const element = document.createElement('div');

      const draggable = new mapboxgl.Marker({
        draggable: true
      })
      .setLngLat([e.lngLat.lng, e.lngLat.lat ])
      .addTo(map);


      const onDragEnd = () => {
        const lngLat = draggable.getLngLat();
        console.log(lngLat)
        document.querySelector("#coordinates").value
    }


   draggable.on('dragend', onDragEnd);
    condition = false
      }





    });



    // map.addControl(new MapboxDirections({
    //   accessToken: mapboxgl.accessToken,
    //   unit: 'metric',
    //   profile: 'mapbox/cycling'
    // }), 'top-left');


    const option = document.querySelector('.mapbox-directions-profile');
    option.hidden = true;


    // const directions = document.querySelector('.directions-control-instructions');


  }



  map.on('click', (e) => {
    const marker = new mapboxgl.Marker()
    .setLngLat([e.lngLat])
    .addTo(map);
  })

};


export { initMapbox };
