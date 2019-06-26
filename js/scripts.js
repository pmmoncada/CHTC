// sets up my mapbox access token so they can track my usage of their basemap services
mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A';


// instantiate the map
var map = new mapboxgl.Map({
  container: 'mapContainer',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-87.197843,14.096704],
  zoom: 15,
});

// // disable map zoom when using scroll
// map.scrollZoom.disable();

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());


//Finish loading base style
map.on('style.load', function() {
// set up the geojson as a source in the map
  map.addSource('test', {
     type: 'geojson',
     data: './Data/testiii.geojson',
   });

// add a custom-styled layer for each Depar
   map.addLayer({
     id: 'city-fill',
     type: 'fill',
     source: 'test',
     layout: {},
     paint: {
         'fill-color': '#088',
         'fill-opacity': 0.8
         }
     }, 'waterway-label');
});
