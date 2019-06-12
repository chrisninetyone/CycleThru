import "bootstrap";
import 'mapbox-gl/dist/mapbox-gl.css'; // <-- you need to uncomment the stylesheet_pack_tag in the layout!
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'


import { initMapbox } from '../plugins/init_mapbox';
import { otherInitMap } from '../plugins/map'
// import { initScroll } from '../plugins/init_scroll';

HTMLElement.prototype.on = function(event, selector, handler) {
    this.addEventListener(event, function(e) {
        let target = e.target;
        if (typeof(selector) === 'string') {
            while (!target.matches(selector) && target !== this) {
                target = target.parentElement;
            }

            if (target.matches(selector))
                handler.call(target, e);
        } else {
                selector.call(this, e);
        }
    });
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
    console.log('load from current location');
    initMapbox([longitude, latitude]);
    otherInitMap();
  });
} else {
  console.log('load from hardcoded location');
  initMapbox([115.1304015, -8.6539913]);
  otherInitMap();
}


// initScroll();

