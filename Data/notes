// sets up my mapbox access token so they can track my usage of their basemap services
mapboxgl.accessToken = 'pk.eyJ1IjoiY3dob25nIiwiYSI6IjAyYzIwYTJjYTVhMzUxZTVkMzdmYTQ2YzBmMTM0ZDAyIn0.owNd_Qa7Sw2neNJbK6zc1A';


// instantiate the map
var map = new mapboxgl.Map({
  container: 'mapContainer',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-87.967529,14.711135],
  zoom: 6.5,
});

// disable map zoom when using scroll
map.scrollZoom.disable();

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());


//the following section comes from my hw and my failed attempt at the chloropleth map using the helper function
// a helper function for looking up colors and numbers for Population for each Department
//Lookup Department namess
var DeptLookup = (code) => {
  console.log(code);
  switch (code) {
    case 1:
      return {
        color: '#A9A9A9',
        name: "Atlantida",
        migrants: 1607,
        pop: 449822,
        unemp: 76206
      };
    case 2:
      return {
        color: '#EE82EE',
        name: 'Colon',
        migrantes: 1788,
        pop: 319786,
        unemp: 71251,
      };
    case 3:
      return {
        color: '#5CA2D1',
        name: 'Comayagua',
        migrantes: 1163,
        pop: 511943,
        unemp: 99510,
      };
    case 4:
      return {
        color: '#9932CC',
        name: 'Copan',
        migrantes: 1187,
        pop: 382722,
        unemp: 78691,
      };
    case 5:
      return {
        color: '#ea6661',
        name: 'Cortez',
        migrantes: 3611,
        pop: 1621762,
        unemp: 391560,
      };
    case 6:
      return {
        color: '#FFFACD',
        name: 'Choluteca',
        migrantes: 946,
        pop: 447852,
        unemp: 119563,
      };
    case 7:
      return {
        color: '#778899',
        name: 'El Paraiso',
        migrantes: 424,
        pop: 458472,
        unemp: 121359,
      };
    case 8:
      return {
        color: '#6BE01E',
        name: 'Francisco Morazan',
        migrantes: 2262,
        pop: 1553379,
        unemp: 392996,
      };
    case 9:
      return {
        color: '#8ece7c',
        name: 'Gracias a Dios',
        migrantes: 31,
        pop: 94450,
        unemp: 0
      };
    case 10:
      return {
        color: '#87DDDB',
        name: 'Intibuca',
        migrantes: 612,
        pop: 241568,
        unemp: 47138
      };
    case 11:
      return {
        color: '#FF0400',
        name: 'Islas de la Bahia',
        migrantes: 162,
        pop: 65932,
        unemp: 0
      };
    case 12:
      return {
        color: '#E9B3A1',
        name: 'La Paz',
        migrantes: 208,
        pop: 206065,
        unemp: 52679
      };
    case 13:
      return {
        color: '#D64091',
        name: 'Lempira',
        migrantes: 704,
        pop: 333125,
        unemp: 63226
      };
    case 14:
      return {
        color: '#BEB118',
        name: 'Ocotepeque',
        migrantes: 494,
        pop: 151516,
        unemp: 33322
      };
    case 15:
      return {
        color: '#BE5418',
        name: 'Olancho',
        migrantes: 2450,
        pop: 537306,
        unemp: 123223,
      };
    case 16:
      return {
        color: '#F5A533',
        name: 'Santa Barbara',
        migrantes: 817,
        pop: 434896,
        unemp: 117948
      };
    case 17:
      return {
        color: '#E0D01E',
        name: 'Valle',
        migrantes: 661,
        pop: 178561,
        unemp: 43540

      };
    case 18:
      return {
          color: '#11A9A8',
          name: "Yoro",
          migrants: 1931,
          pop: 587375,
          unemp: 140598,
        };
    default:
      return {
        color: '#A9A9A9',
        name: 'Other',
        migrants: 0,
        pop: 0,
        unemp: 0,
      };
  }
};

//Finish loading base style
map.on('style.load', function() {
// set up the geojson as a source in the map
  map.addSource('departmentsHN', {
     type: 'geojson',
     data: './Data/departmentsHN.geojson',
   });

// add a custom-styled layer for each Depar
   map.addLayer({
     id: 'departments-fill',
     type: 'fill',
     source: 'departmentsHN',
     paint: {
       'fill-opacity': 0,
       'fill-color': {
         type: 'categorical',
         property: "OBJECTID",
         stops: [
             [
               1,
               DeptLookup(1).color,
             ],
             [
               2,
               DeptLookup(2).color,
             ],
             [
               3,
               DeptLookup(3).color,
             ],
             [
               4,
               DeptLookup(4).color,
             ],
             [
               5,
                DeptLookup(5).color,
             ],
             [
               6,
                DeptLookup(6).color,
             ],
             [
               7,
                DeptLookup(7).color,
             ],
             [
               8,
                DeptLookup(8).color,
             ],
             [
               9,
                DeptLookup(9).color,
             ],
             [
               10,
                DeptLookup(10).color,
             ],
             [
               11,
                DeptLookup(11).color,
             ],
             [
               12,
                DeptLookup(12).color,
             ],
             [
               13,
                DeptLookup(13).color,
             ],
             [
               14,
                DeptLookup(14).color,
             ],
             [
               15,
                DeptLookup(15).color,
             ],
             [
               16,
                DeptLookup(16).color,
             ],
             [
               17,
                DeptLookup(17).color,
             ],
             [
               18,
                DeptLookup(18).color,
             ],
           ]
         }
     }
   }, 'waterway-label')


    // add an empty data source, which we will use to highlight the lot the user is hovering over
    map.addSource('highlight-feature-depto', {
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
          layers: ['departments-fill'],
      });

      // get the first feature from the array of returned features.
      var lot = features[0]

      if (lot) {  // if there's a lot under the mouse, do stuff
        map.getCanvas().style.cursor = 'pointer';  // make the cursor a pointer

        // lookup the corresponding description for the each section
        $('#namedepto').text(lot.properties.DEPTO);
        $('#2015pop').text(lot.properties.pop);
        $('#2015migrantestotal').text(lot.properties.migrantes);
        $('#2014unemplyment').text(lot.properties.unemp);

        // set this lot's polygon feature as the data for the highlight source
        map.getSource('highlight-feature-depto').setData(lot.geometry);
      } else {
       map.getCanvas().style.cursor = 'default'; // make the cursor default

        // reset the highlight source to an empty featurecollection
        map.getSource('highlight-feature-depto').setData({
          type: 'FeatureCollection',
          features: []
        });
       }
      })
    });


var zoomThreshold = 4;

// load the colors on the map
map.on ('load', function() {

    $.getJSON('Data/departmentsHN.geojson', function(data) {
      data.features.map(function(feature) {
        feature.properties.pop = parseInt(feature.properties.pop),
        feature.properties.unemp = parseInt(feature.properties.unemp),
        feature.properties.migrantes = parseInt(feature.properties.migrantes);
      });

      data.features.forEach(function(feature) {
        console.log(feature.properties.pop)
        console.log(feature.properties.unemp)
        console.log(feature.properties.migrantes)
      })

      map.addSource('HNdeptos', {
        'type': 'geojson',
        'data': './Data/departmentsHN.geojson',
      });

      map.addLayer({
        id: 'po',
        type: 'fill',
        source: 'HNdeptos',
        paint: {
         'fill-opacity': 0.7,
         'fill-color': [
             'interpolate',
             ['linear'],
             ['get', 'pop'],
             0, '#f1eef6',
             250000, '#bdc9e1',
             500000, '#74a9cf',
             1000000, '#2b8cbe',
             2000000, '#2b8cbe'
         ],
        }
      });
      map.setLayoutProperty('po', 'visibility', 'none');

      map.addLayer({
        id: 'ue',
        type: 'fill',
        source: 'HNdeptos',
        paint: {
          'fill-opacity': 0.7,
          'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'unemp'],
              0, '#f7f6f7',
              50000, '#cccccc',
              100000, '#969696',
              200000, '#525252',
              400000, '#252525'
          ],
        }
      });
      map.setLayoutProperty('ue', 'visibility', 'none');

      map.addLayer({
        id: 'im',
        type: 'fill',
        source: 'HNdeptos',
        paint: {
          'fill-opacity': 0.7,
          'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'migrantes'],
              0, '#f2f0f7',
              500, '#cbc9e2',
              1200, '#9e9ac8',
              2500, '#756bb1',
              4000, '#54278f'
          ],
        }
      });
      map.setLayoutProperty('im', 'visibility', 'none');

      $('.Population2015').on('click', function() {
        map.setLayoutProperty('po', 'visibility', 'visible');
        map.setLayoutProperty('ue', 'visibility', 'none');
        map.setLayoutProperty('im', 'visibility', 'none');
      });

      $('.Umemployment2014').on('click', function() {
        map.setLayoutProperty('po', 'visibility', 'none');
        map.setLayoutProperty('ue', 'visibility', 'visible');
        map.setLayoutProperty('im', 'visibility', 'none');
      });

      $('.Immigrants2015').on('click', function() {
        map.setLayoutProperty('po', 'visibility', 'none');
        map.setLayoutProperty('ue', 'visibility', 'none');
        map.setLayoutProperty('im', 'visibility', 'visible');
      });
    });
  });








  //
  // // when the mouse moves, do stuff!
  // map.on('mousemove', function (e) {
  //   // query for the features under the mouse, but only in the lots layer
  //   var features = map.queryRenderedFeatures(e.point, {
  //       layers: ['HNdeptos'],
  //   });
  //
  //   // get the first feature from the array of returned features.
  //   var lot = features[0]
  //
  //   if (depto) {  // if there's a lot under the mouse, do stuff
  //     map.getCanvas().style.cursor = 'pointer';  // make the cursor a pointer
  //
  //     // lookup the corresponding name for the land use code
  //     var landusename = LandUseLookup(parseInt(lot.properties.LandUse)).name;
  //
  //     // use jquery to display the address and land use name to the sidebar
  //     $('#depto').text(lot.properties.DEPTO);
  //     $('#landuse').text(landusename);
  //     $('#yearBuilt').text(lot.properties.YearBuilt);
  //     $('#resiUnits').text(lot.properties.UnitsRes);
  //
  //     <span class="labels">Name of Department: </span><span class="labels" id="depto"></span><br/>
  //     <span class="labels">Total population in 2015: </span><span class="labels" id="2015pop"></span><br/>
  //     <span class="labels">Total Unemployed in 2014: </span><span class="labels" id="2015migrantestotal"></span><br/>
  //     <span class="labels">Total Deported Immigrants: </span><span class="labels" id="2014unemplyment"></span><br/>



// // use jquery to programmatically create a Legend
// // for numbers 1 - 11, get the land use color and description
// for (var i=1; i<18; i++) {
//   // lookup the location info for the current iteration
//   const locationInfo = DeptLookup(i);
