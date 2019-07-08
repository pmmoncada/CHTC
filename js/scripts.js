// sets up my mapbox access token so they can track my usage of their basemap services
mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A';


// instantiate the map
var map = new mapboxgl.Map({
  container: 'mapContainer',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-87.210467,14.107138],
  zoom: 15,
});

// // disable map zoom when using scroll
// map.scrollZoom.disable();

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());



//Finish loading base style
map.on('style.load', function() {
// set up the geojson as a source in the map
  map.addSource('tgu', {
     type: 'geojson',
     data: './Data/tgu2.geojson',
   });

// add a custom-styled layer for each Depar
   map.addLayer({
     id: 'lot-fill',
     type: 'fill',
     source: 'tgu',
     paint: {
         'fill-color': '#088',
         'fill-opacity': 0.8
         }
     }, 'waterway-label')


   // add an empty data source, which we will use to highlight the lot the user is hovering over
   map.addSource('highlight-feature-lot', {
     type: 'geojson',
     data: {
       type: 'FeatureCollection',
       features: []
     }
   });

   // when the mouse moves, do stuff!
   map.on('mousemove', function (e) {
     // query for the features under the mouse, but only in the lots layer
     var features = map.queryRenderedFeatures(e.point, {
         layers: ['lot-fill'],
     });

     // get the first feature from the array of returned features.
     var lot = features[0]

     if (lot) {  // if there's a lot under the mouse, do stuff
       map.getCanvas().style.cursor = 'pointer';  // make the cursor a pointer

     // lookup the corresponding description for the each section
     $('#nombre').text(lot.properties.nombre);
     $('#barrio').text(lot.properties.barrio);
     $('#lotUse').text(lot.properties.ZoneCodigo);
     $('#lotArea').text(lot.properties.zone);
     $('#city').text(lot.properties.ciudad);
     $('#perLot').text(lot.properties.usos_base);

       // set this lot's polygon feature as the data for the highlight source
       map.getSource('highlight-feature-lot').setData(lot.geometry);
     } else {
      map.getCanvas().style.cursor = 'default'; // make the cursor default

       // reset the highlight source to an empty featurecollection
       map.getSource('highlight-feature-lot').setData({
         type: 'FeatureCollection',
         features: []
       });
      }
     })

      map.addLayer({
        id: 'genUse',
        type: 'fill',
        source: 'tgu',
        paint: {
          'fill-color': {
              property: 'ZoneCodigo',
                type: 'categorical',
                stops: [
                    ['T1', '#F2F12D'],
                    ['T2', '#7A4900'],
                    ['T3', '#63FFAC'],
                    ["T4", "#4FC601"],
                    ["T5", "#BE5418"],
                    ["T6", "#D64091"],
                    ["T7", "#9932CC"],
                    ["T8", "#E0D01E"],
                    ["T9", "#3B5DFF"],
                    ["T10", "#E9B3A1"],
                ]
            },
            'fill-opacity': 0.8,
        }
      });
      map.setLayoutProperty('genUse', 'visibility', 'none');

      $('.genUse').on('click', function() {
        map.setLayoutProperty('genUse', 'visibility', 'visible');
        map.setLayoutProperty('baseUse', 'visibility', 'none');
      });

      map.addLayer({
        id: 'baseUse',
        type: 'fill',
        source: 'tgu',
        paint: {
          'fill-color': {
              property: 'usos_base',
                type: 'categorical',
                stops: [
                    ['comercial', '#F2F12D'],
                    ['residencial', '#7A4900'],
                    ['mixto', '#63FFAC'],
                    ["baldio", "#4FC601"],
                    ["desocupado", "#BE5418"],
                    ["equipamientos", "#D64091"],
                    ["patrimonio", "#9932CC"],
                    ["industrial", "#E0D01E"],
                    ["institucional y empleo", "#3B5DFF"],
                    ["N/A", "#E9B3A1"],
                ]
            },
            'fill-opacity': 0.8,
        }
      });
      map.setLayoutProperty('baseUse', 'visibility', 'none');

      $('.baseUse').on('click', function() {
        map.setLayoutProperty('baseUse', 'visibility', 'visible');
        map.setLayoutProperty('genUse', 'visibility', 'none');
      });
  });
