// sets up my mapbox access token so they can track my usage of their basemap services
mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A';


// instantiate the map
var map = new mapboxgl.Map({
  container: 'mapContainer',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-87.210467,14.107138],
  zoom: 14.95,
});


// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

var genUseColors = [
  ['Predominantemente Residencial', '#FA9318'],
  ['Centro Histórico-Institucional', '#3B5DFF'],
  ['Sector Penintenciaría', '#9B0808'],
  ["Avenida Mixta", "#BE5418"],
  ["Centro de Tegucigalpa Cultural", "#D64091"],
  ["Centro de Tegucigalpa Mixto", "#9932CC"],
  ["Centro de Tegucigalpa Comercial", "#F2F12D"],
  ["Sector Mixto", "#AC3F88" ],
];
var genUseLegend = `<h3>Legend</h3>`;
jQuery.each(genUseColors, function(i, val) {
  genUseLegend += `
    <div>
      <div class="legend-color-box" style="background-color:${val[1]};"></div>
      ${val[0]}
    </div>
  `;
})

var baseUseColors = [
  ['comercial', '#F2F12D'],
  ['residencial', '#FA9318'],
  ['mixto', '#9932CC'],
  ["parque", "#4FC601"],
  ["plaza", "#A4C189"],
  ["desocupado", "#8E8D8D"],
  ["equipamientos", "#2AC0BF"],
  ["industrial", "#BE5418"],
  ["institucional y empleo", "#3B5DFF"],
  ["baldío", "#9B0808"],
  ["parqueo", '#F5CDFF'],
];
var baseUseLegend = `<h3>Legend</h3>`;
jQuery.each(baseUseColors, function(i, val) {
  baseUseLegend += `
    <div>
      <div class="legend-color-box" style="background-color:${val[1]};"></div>
      ${val[0]}
    </div>
  `;
})

var patrimonioInfoBox = `
    <span class="labels-2">Información Sobre Los Patrimonios</span><br/>
    <span class="labels"> Categoría: </span><span class="labels" id="category"></span><br/>
    <span class="labels"> Estado Actual: </span><span class="labels" id="currentState"></span><br/>
    <br/>
    <span class="labels-2">Los patrimonios son de color morado</span><br/>
  `;

//Finish loading base style
map.on('style.load', function() {
// set up the geojson as a source in the map
  map.addSource('tgu', {
     type: 'geojson',
     data: './Data/tgu5.geojson',
   });

// add a custom-styled layer for each lot
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
     $('#catastral').text(lot.properties.claveCatas);
     $('#barrio').text(lot.properties.barrio);
     $('#lotUse').text(lot.properties.ZoneCodigo);
     $('#lotArea').text(lot.properties.generalUso);
     $('#perLot').text(lot.properties.usos_base);
     $('#category').text(lot.properties.class_patr);
     $('#currentState').text(lot.properties.estado_pat);


       // set this lot's polygon feature as the data for the highlight source
       map.getSource('highlight-feature-lot').setData(lot.geometry);
     } else {
      map.getCanvas().style.cursor = 'default'; // make the cursor default when hoverover

       // reset the highlight source to an empty featurecollection
       map.getSource('highlight-feature-lot').setData({
         type: 'FeatureCollection',
         features: []
       });
      }
     })
      // add the layer for the general usage of each lot
      map.addLayer({
        id: 'genUse',
        type: 'fill',
        source: 'tgu',
        paint: {
          'fill-color': {
              property: 'generalUso',
                type: 'categorical',
                stops: genUseColors
            },
            'fill-opacity': 0.8,
        }
      });
      map.setLayoutProperty('genUse', 'visibility', 'none');// for now make this invisible

// when click make the General Usage visible
      $('.genUse').on('click', function() {
        map.setLayoutProperty('genUse', 'visibility', 'visible');
        map.setLayoutProperty('baseUse', 'visibility', 'none');
        map.setLayoutProperty('patrimonio', 'visibility', 'none');
        $('.legend').html(genUseLegend);
      });

      // add the layer for specific lot usage
      map.addLayer({
        id: 'baseUse',
        type: 'fill',
        source: 'tgu',
        paint: {
          'fill-color': {
              property: 'usos_base',
                type: 'categorical',
                stops: baseUseColors
            },
            'fill-opacity': 0.8,
        }
      });
      map.setLayoutProperty('baseUse', 'visibility', 'none');// for now make this invisible

      // when click make per lot usage visible
      $('.baseUse').on('click', function() {
        map.setLayoutProperty('baseUse', 'visibility', 'visible');
        map.setLayoutProperty('genUse', 'visibility', 'none');
        map.setLayoutProperty('patrimonio', 'visibility', 'none');
        $('.legend').html(baseUseLegend);
        $('.interactive-box2').css('visibility', 'hidden');
      });


      // add the layer for specific lot usage
      map.addLayer({
        id: 'patrimonio',
        type: 'fill',
        source: 'tgu',
        paint: {
          'fill-color': {
              property: 'Loc_Patrim',
                type: 'categorical',
                stops: [
                    ['patrimonio', '#9932CC'],
                ]
            },
            'fill-opacity': 0.8,
        }
      });
      map.setLayoutProperty('patrimonio', 'visibility', 'none');// for now make this invisible

      // when click make per lot usage visible
      $('.patrimonio').on('click', function() {
        map.setLayoutProperty('patrimonio', 'visibility', 'visible');
        map.setLayoutProperty('baseUse', 'visibility', 'none');
        map.setLayoutProperty('genUse', 'visibility', 'none');
        $('.legend').html(patrimonioInfoBox);
      });

      // add a layer for the highlighted lot
          map.addLayer({
            id: 'highlight-line',
            type: 'fill',
            source: 'highlight-feature-lot',
            // paint: {
            //   'line-width': 3,
            //   'line-opacity': 0.9,
            //   'line-color': 'black',
            // }
            paint: {
              'fill-color': 'gray',
              'fill-opacity': 0.5
              }
          });

  });
