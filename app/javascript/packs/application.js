import "bootstrap";
import 'mapbox-gl/dist/mapbox-gl.css'; // <-- you need to uncomment the stylesheet_pack_tag in the layout!
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

import { initMapbox } from '../plugins/init_mapbox';
// import { init_scroll } from '../plugins/init_scroll';

initMapbox();
// initScroll();
