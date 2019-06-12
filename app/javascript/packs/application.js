import "bootstrap";
import 'mapbox-gl/dist/mapbox-gl.css'; // <-- you need to uncomment the stylesheet_pack_tag in the layout!
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

import { initMapbox } from '../plugins/init_mapbox';
// import { init_scroll } from '../plugins/init_scroll';

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
//     console.log('load from current location');
//     initMapbox([longitude, latitude]);
//   });
// } else {
//   console.log('load from hardcoded location');
//   initMapbox([115.1304015, -8.6539913]);
// }
initMapbox([115.1304015, -8.6539913]);
// initScroll();

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js', { scope: './' })
    .then(function(reg) {
      console.log('[Companion]', 'Service worker registered!');
      console.log(reg);
    });
}
