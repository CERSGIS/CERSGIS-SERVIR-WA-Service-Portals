let geoServerUrl = 'http://3.120.135.85:8080/geoserver/cite/wfs';

var map = L.map('map').setView([8.967388, -0.971667], 8.2);

// initialbasemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//  maxZoom: 19,
//  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

initialbasemap = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
  }
).addTo(map);

map.invalidateSize();

$('.lgndthumb').click(function (e) {
  map.removeLayer(initialbasemap);
  $('.lgndthumb > img').css('border-color', '#3e5766');
  var toolname = $(this).attr('id');

  if (toolname == 'no_basemap') {
    initialbasemap = L.tileLayer('').addTo(map);
  } else if (toolname == 'basemap1') {
    initialbasemap = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
      }
    ).addTo(map);
  } else if (toolname == 'basemap2') {
    initialbasemap = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution:
          'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      }
    ).addTo(map);
  } else if (toolname == 'basemap3') {
    initialbasemap = L.tileLayer(
      'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
      }
    ).addTo(map);
  } else if (toolname == 'basemap4') {
    initialbasemap = L.tileLayer(
      'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 17,
        attribution:
          'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
      }
    ).addTo(map);
  } else if (toolname == 'basemap5') {
    initialbasemap = L.tileLayer(
      'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 17,
        attribution:
          'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
      }
    ).addTo(map);
  } else if (toolname == 'basemap6') {
    initialbasemap = L.tileLayer(
      'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
      {
        attribution:
          'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
      }
    ).addTo(map);
  } else if (toolname == 'basemap7') {
    initialbasemap = L.tileLayer(
      'https://{s}.tile.openstreetmap.se/hydda/roads_and_labels/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        attribution:
          'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(map);
  } else if (toolname == 'basemap8') {
    initialbasemap = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    ).addTo(map);
  } else if (toolname == 'basemap9') {
    initialbasemap = L.tileLayer(
      'http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}',
      {
        attribution:
          'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
      }
    ).addTo(map);
  } else if (toolname == 'basemap10') {
    initialbasemap = L.tileLayer(
      'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}',
      {
        attribution:
          'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png',
      }
    ).addTo(map);
  }
  initialbasemap.bringToBack();
});

function loadtilelayer(url, layer) {
  $('#overlay').css('display', 'block');
  if (layer) {
    map.removeLayer(layer);
  }

  $.get(url, function (res) {
    layer = L.tileLayer(res['mapid']);
    map.addLayer(layer);
    $('#overlay').css('display', 'none');
  });
  return layer;
}

var lulc, landuse;

// loadtilelayer("/loadgee", lulc)

$('.tileDiv').click(function (e) {
  map.removeLayer(initialbasemap);
  $('.lgndthumb > img').css('border-color', '#3e5766');
  var toolname = $(this).attr('id');

  if (toolname == 'no_basemap') {
    initialbasemap = L.tileLayer('').addTo(map);
  } else if (toolname == 'osm') {
    initialbasemap = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
      }
    ).addTo(map);
  } else if (toolname == 'sate') {
    initialbasemap = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    ).addTo(map);
  } else if (toolname == 'topo') {
    initialbasemap = L.tileLayer(
      'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 17,
        attribution:
          'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
      }
    ).addTo(map);
  } else if (toolname == 'basemap7') {
    initialbasemap = L.tileLayer(
      'https://{s}.tile.openstreetmap.se/hydda/roads_and_labels/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        attribution:
          'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(map);
  } else if (toolname == 'basemap8') {
    initialbasemap = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    ).addTo(map);
  }
  initialbasemap.bringToBack();
});

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7,
    fillColor: 'transparent',
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}

var optionmeasure = {
  position: 'bottomright',
  primaryAreaUnit: 'hectares',
  secondaryAreaUnit: 'sqmeters',
  primaryLengthUnit: 'meters',
  secondaryLengthUnit: 'kilometers',
};

var measureControl = new L.Control.Measure(optionmeasure);

let coords;
var drawnItems = new L.geoJson().addTo(map);
drawnItems.bringToFront();
var layer;

map.on(L.Draw.Event.CREATED, function (event) {
  drawnItems.removeLayer(layer);
  layer = event.layer;

  // $("#dialog").dialog("open");
  drawnItems.addLayer(layer);

  let type = event.layerType;
  coords = layer.getLatLngs();
});

L.EditToolbar.Delete.include({
  removeAllLayers: false,
});

var drawtool = new L.Control.Draw({
  edit: {
    featureGroup: drawnItems,
  },
  draw: {
    polygon: true,
    rectangle: true,
    circlemarker: false,
    marker: false,
    polyline: false,
    circle: false,
  },
  position: 'bottomright',
});

var browserPrintControl = L.control.browserPrint({ position: 'bottomright' });

let regionboundary,
  districtboundary,
  protectedareas,
  aoi,
  mineral_concession,
  footprint,
  footprint_bound,
  footprint1,
  footprint2,
  footprint_compare_bound,
  year_08,
  year_10,
  year_11,
  year_12,
  year_13,
  year_14,
  year_15,
  year_16,
  year_17,
  year_18,
  year_19,
  year_20,
  year_21,
  year_22,
  year_23;

// // ################################  Load region boundary  ####################################
// function regionstlye() {
//   return {
//     fillColor: 'transparent',
//     weight: 5,
//     opacity: 1,
//     color: '#ff7f7f',
//     dashArray: '3',
//     fillOpacity: 0.7,
//   };
// }

// function regionresetHighlight(e) {
//   regionboundary.resetStyle(e.target);
// }

// function regiononEachFeature(feature, layer) {
//   layer.on({
//     mouseover: highlightFeature,
//     mouseout: regionresetHighlight,
//     click: zoomToFeature,
//   });
// }

// $.get('region', function (res) {
//   regionboundary = L.geoJSON(res, {
//     style: regionstlye,
//     onEachFeature: regiononEachFeature,
//   });

//   regionboundary.on('mouseover', function (e) {
//     e.layer
//       .bindTooltip(e.layer.feature.properties['region'] + ' REGION')
//       .openTooltip();
//   });

//   // if (check) {mymap.addLayer(regionboundary)}
//   // $("#loadregion").addClass("hidden")
//   let region_checkbox = $('#region_boundary').prop('checked', true);
//   toggleLayer(map, regionboundary, region_checkbox);
//   toggleLegend(region_checkbox, '#legend-region');
// });

// ################################  Load district boundary  ####################################
function districtstyle() {
  return {
    fillColor: 'transparent',
    weight: 2,
    opacity: 1,
    color: '#ffbebe',
    dashArray: '3',
    fillOpacity: 0.7,
  };
}

function districtresetHighlight(e) {
  districtboundary.resetStyle(e.target);
}

function districtonEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: districtresetHighlight,
    click: zoomToFeature,
  });
}

// $.get('district', function (res) {
//   districtboundary = L.geoJSON(res, {
//     style: districtstyle,
//     onEachFeature: districtonEachFeature,
//   });

//   districtboundary.on('mouseover', function (e) {
//     e.layer.bindTooltip(e.layer.feature.properties['district']).openTooltip();
//   });
// });

function protectedstyle() {
  return {
    fillColor: 'transparent',
    weight: 2,
    opacity: 1,
    color: 'Green',
    dashArray: '3',
    fillOpacity: 0.7,
  };
}

function protectedresetHighlight(e) {
  protectedareas.resetStyle(e.target);
}

function protectedonEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: protectedresetHighlight,
    click: zoomToFeature,
  });
}

// $.get('protected-area', function (res) {
//   protectedareas = L.geoJSON(res, {
//     style: protectedstyle,
//     onEachFeature: protectedonEachFeature,
//   });

//   protectedareas.on('mouseover', function (e) {
//     e.layer.bindTooltip(e.layer.feature.properties['reserve_na']).openTooltip();
//   });
// });

function mineralstyle() {
  return {
    fillColor: 'transparent',
    weight: 2,
    opacity: 1,
    color: '#ffb502',
    dashArray: '3',
    fillOpacity: 0.7,
  };
}

function mineralresetHighlight(e) {
  mineral_concession.resetStyle(e.target);
}

function mineralOnEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: mineralresetHighlight,
    click: zoomToFeature,
  });
}

// $.get('mineral-concession', function (res) {
//   mineral_concession = L.geoJSON(res, {
//     style: mineralstyle,
//     onEachFeature: mineralOnEachFeature,
//   });

//   // mineral_concession.on('mouseover', function (e) {
//   //     e.layer.bindTooltip(e.layer.feature.properties['company_na']).openTooltip();
//   // });
// });

// ################## AREA OF INTEREST STYLING ####################
function aoiStyle() {
  return {
    color: '#000',
    fillColor: '#00000087',
    weight: 2,
    fillOpacity: 0.7,
  };
}

function onEachDoiFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetDoi,
  });
}



function resetDoi(e) {
  aoi.resetStyle(e.target);
}

$.get('load-aoi', function (res) {
  // aoi = L.tileLayer(res['mapid'])
  aoi = L.geoJSON(res, { style: aoiStyle,  onEachFeature: onEachDoiFeature});

  aoi.on('mouseover', function(e) {
    e.layer.bindTooltip(`<div style="padding: 0;" class="">`+ e.layer.feature.properties['district']+`
  </div>`).openTooltip();})
});

// ############### FOOTPRINTS FOR YEARS #####################
function footprintStyle1() {
  return {
    maxZoom: 16,
    // tolerance: 3,
    debug: 0,
    style: {
      color: '#fcfa00',
      fillColor: '#fcfa00',
      weight: 2,
      fillOpacity: 0.7,
    },
  };
}
function footprintStyle2() {
  return {
    color: '#ec0cdf',
    fillColor: '#ec0cdf',
    weight: 2,
    fillOpacity: 0.7,
  };
}
function footprintStyle3() {
  return {
    color: '#0097fc',
    fillColor: '#0097fc',
    weight: 2,
    fillOpacity: 0.7,
  };
}

// ############################ LOADING POINTS ########################

function pointOnEachFeature(feature, layer) {
  if (feature.properties.year) {
    layer.bindPopup(
      '<div class="row"><h5 class="text-center"><strong>Details of Charcoal Scar</strong></h5></div><table class="table table-bordered table-striped pop-up-table"><tbody><tr><th>Region</th><td>' +
        feature.properties.region +
        '</td></tr><tr><th>District</th><td>' +
        feature.properties.district +
        '</td></tr><tr><th>Longitude</th><td>' +
        feature.properties.longitude +
        '</td></tr><tr><th>Latitude</th><td>' +
        feature.properties.latitude +
        '</td></tr><tr><th>Year</th><td>' +
        feature.properties.year +
        '</td></tr><tr><th>Dimension</th><td>' +
        feature.properties.dimension +
        '</td></tr><tr><th>Type</th><td>' +
        feature.properties.type +
        '</td></tr></tbody></table>'
    );
  }
}

// Function to load point
var pointIcon;
function loadPointFunction(url, onEachFeature, layer, checkboxId, color) {
  var geojsonMarkerOptions = {
    radius: 6,
    fillColor: color,
    color: 'white',
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
  };

  $.get(url, function (res) {
    layer = new L.GeoJSON(res, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
      },
      onEachFeature: onEachFeature,
    });
  });

  $(checkboxId).change(function () {
    // toggleLayer(map, layer, checkboxId);
    toggleLayer(map, layer, $(this));
  });
}





// Charcoal Points
loadPointFunction(
  'load-points?year=2008',
  pointOnEachFeature,
  year_08,
  '#2008',
  '#b00023'
);

loadPointFunction(
  'load-points?year=2010',
  pointOnEachFeature,
  year_10,
  '#2010',
  '#fd5b78'
);

loadPointFunction(
  'load-points?year=2011',
  pointOnEachFeature,
  year_11,
  '#2011',
  '#ff6037'
);

loadPointFunction(
  'load-points?year=2012',
  pointOnEachFeature,
  year_12,
  '#2012',
  '#ffc9ae'
);

loadPointFunction(
  'load-points?year=2013',
  pointOnEachFeature,
  year_13,
  '#2013',
  '#ff9933'
);

loadPointFunction(
  'load-points?year=2014',
  pointOnEachFeature,
  year_14,
  '#2014',
  '#ffcc33'
);

loadPointFunction(
  'load-points?year=2015',
  pointOnEachFeature,
  year_15,
  '#2015',
  '#acac43'
);

loadPointFunction(
  'load-points?year=2016',
  pointOnEachFeature,
  year_16,
  '#2016',
  '#ccff00'
);

loadPointFunction(
  'load-points?year=2017',
  pointOnEachFeature,
  year_17,
  '#2017',
  '#66ff66'
);

loadPointFunction(
  'load-points?year=2018',
  pointOnEachFeature,
  year_18,
  '#2018',
  '#b1f8d8'
);

loadPointFunction(
  'load-points?year=2019',
  pointOnEachFeature,
  year_19,
  '#2019',
  '#16d0cb'
);

loadPointFunction(
  'load-points?year=2020',
  pointOnEachFeature,
  year_20,
  '#2020',
  '#50bfe6'
);

loadPointFunction(
  'load-points?year=2021',
  pointOnEachFeature,
  year_21,
  '#2021',
  '#9a64a4'
);

loadPointFunction(
  'load-points?year=2022',
  pointOnEachFeature,
  year_22,
  '#2022',
  '#8d1e7c'
);

loadPointFunction(
  'load-points?year=2023',
  pointOnEachFeature,
  year_23,
  '#2023',
  '#ff00cc'
);

// $('#2016').change(function () {
//   toggleLayer(map, year_16, $(this));
//   toggleLegend($(this), '#legend-footprint-2016');
// });

// ################################  Load region boundary  ####################################
function regionstlye() {
  return {
    fillColor: 'transparent',
    weight: 5,
    opacity: 1,
    color: '#ff7f7f',
    dashArray: '3',
    fillOpacity: 0.7,
  };
}

function regionresetHighlight(e) {
  regionboundary.resetStyle(e.target);
}

function regiononEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: regionresetHighlight,
    click: zoomToFeature,
  });
}

$.get('region', function (res) {
  regionboundary = L.geoJSON(res, {
    style: regionstlye,
    onEachFeature: regiononEachFeature,
  });

  regionboundary.on('mouseover', function (e) {
    e.layer
      .bindTooltip(e.layer.feature.properties['region'] + ' REGION')
      .openTooltip();
  });

  // if (check) {mymap.addLayer(regionboundary)}
  // $("#loadregion").addClass("hidden")
  let region_checkbox = $('#region_boundary').prop('checked', true);
  toggleLayer(map, regionboundary, region_checkbox);
  toggleLegend(region_checkbox, '#legend-region');
});

// AOI check button
$('#aoi').change(function () {
  toggleLayer(map, aoi, $(this));
  toggleLegend($(this), '#legend-aoi');
});

$('#region_boundary').change(function () {
  toggleLayer(map, regionboundary, $(this));
  toggleLegend($(this), '#legend-region');
});

$('#district_boundary').change(function () {
  toggleLayer(map, districtboundary, $(this));
  toggleLegend($(this), '#legend-district');
});

$('#protected_area_boundary').change(function () {
  toggleLayer(map, protectedareas, $(this));
  toggleLegend($(this), '#legend-protected-areas');
});

$('#mineral_concession_boundary').change(function () {
  toggleLayer(map, mineral_concession, $(this));
  toggleLegend($(this), '#legend-mineral-concession');
});

// Get district on region change
$('#region').change(function () {
  let region = $(this).val();
  $.get('/get-districts?region=' + region, function (data) {
    $('#district').html(data);
  });
});

// When Change of Boundary Detected
$('#boundary').change(function () {
  let boundary = $(this).val();
  if (boundary == 'admin_boundaries') {
    adminboundaryselect();
  } else if (boundary == 'protected_area') {
    protectedareaselect();
    $.get('/get-protected-area', function (data) {
      $('#protected_areas').html(data);
    });
  } else {
    resetfootprint();
  }
});

// Change detected on level select
$('#level').change(function () {
  let level = $(this).val();

  switch (level) {
    case 'national':
      nationalselect();
      break;
    case 'regional':
      regionalselect();
      break;
    case 'district':
      districtselect();
      break;
    default:
      nationalselect();
  }
});

$('#region_compare').change(function () {
  let region = $(this).val();
  $.get('/get-districts?region=' + region, function (data) {
    $('#district_compare').html(data);
  });
});

// RESET FOOTPRINT
$('#reset').on('click', function () {
  if (map.hasLayer(footprint)) {
    map.removeLayer(footprint);
    map.removeLayer(footprint_bound);
  }
});

// EXECUTE BUTTON TO LOAD FOOTPRINT OR COMPARE FOOTPRINTS
$('#execute').on('click', function () {
  let boundary = $('#boundary').val();

  if (boundary == 'admin_boundaries') {
    let level = $('#level').val();
    switch (level) {
      case 'national':
        if (!$('#switchyear').prop('checked')) {
          resetFootprintLayers();
          loadnationalfootprint();
        } else {
          resetFootprintLayers();
          comparenationalfootprint();
        }
        break;
      case 'regional':
        if (!$('#switchyear').prop('checked')) {
          resetFootprintLayers();
          loadregionfootprint();
        } else {
          resetFootprintLayers();
          compareregionfootprint();
        }
        break;
      case 'district':
        if (!$('#switchyear').prop('checked')) {
          resetFootprintLayers();
          loaddistrictfootprint();
        } else {
          resetFootprintLayers();
          comparedistrictfootprint();
        }
        break;
      default:
        '';
    }
  } else if (boundary == 'protected_area') {
    if (!$('#switchyear').prop('checked')) {
      resetFootprintLayers();
      loadprotectedareafootprint();
    } else {
      resetFootprintLayers();
      compareprotectedareafootprint();
    }
  }
});

function loadprotectedareafootprint() {
  $('#loading-bar-spinner').css('display', 'block');

  let protected_area = $('#protected_areas').val();
  let year = $('#year').val();
  let url =
    'protected-area-footprint?protected_area=' +
    protected_area +
    '&year=' +
    year;

  $.get(url, function (res) {
    footprint = L.tileLayer(res['mapid'], {
      minZoom: 7,
    });

    let bound_style = {
      fillColor: 'transparent',
      weight: 5,
      opacity: 1,
      color: '#fff',
      dashArray: '',
      fillOpacity: 0.7,
    };

    footprint_bound = L.geoJSON(res['polygon'], { style: bound_style });

    $('#loading-bar-spinner').css('display', 'none');

    $('#legend-selected-district').css('display', 'block');
    $('#legend-footprint-' + year).css('display', 'block');

    map.addLayer(footprint);
    map.addLayer(footprint_bound);
    map.fitBounds(footprint_bound.getBounds());
  });
}

function compareprotectedareafootprint() {
  $('#loading-bar-spinner').css('display', 'block');

  let protected_area = $('#protected_areas').val();
  let year1 = $('#year1').val();
  let year2 = $('#year2').val();
  let url =
    'protected-area-footprint?protected_area=' +
    protected_area +
    '&year1=' +
    year1 +
    '&year2=' +
    year2;

  $.get(url, function (res) {
    footprint1 = L.tileLayer(res['mapid_1'], {
      minZoom: 7,
    });

    footprint2 = L.tileLayer(res['mapid_2'], {
      minZoom: 7,
    });

    let bound_style = {
      fillColor: 'transparent',
      weight: 5,
      opacity: 1,
      color: '#fff',
      dashArray: '',
      fillOpacity: 0.7,
    };

    footprint_compare_bound = L.geoJSON(res['polygon'], { style: bound_style });

    $('#loading-bar-spinner').css('display', 'none');

    $('#legend-selected-district').css('display', 'block');
    $('#legend-year-one').css('display', 'block');
    $('#legend-year-two').css('display', 'block');

    map.addLayer(footprint1);
    map.addLayer(footprint2);
    map.addLayer(footprint_compare_bound);
    map.fitBounds(footprint_compare_bound.getBounds());

    sbs = L.control.sideBySide(footprint1, footprint2);
    sbs.addTo(map);
  });
}

// LOAD NATIONAL FOOTPRINT
function loadnationalfootprint() {
  $('#loading-bar-spinner').css('display', 'block');

  let year = $('#year').val();
  let url = 'footprint?national=national&year=' + year;

  $.get(url, function (res) {
    footprint = L.tileLayer(res['mapid'], {
      minZoom: 7,
    });

    let bound_style = {
      fillColor: 'transparent',
      weight: 5,
      opacity: 1,
      color: '#fff',
      dashArray: '',
      fillOpacity: 0.7,
    };

    footprint_bound = L.geoJSON(res['polygon'], { style: bound_style });

    footprint_bound.on('mouseover', function (e) {
      e.layer
        .bindTooltip('The Area is ' + res['size'] + ' square meters')
        .openTooltip();
    });

    $('#loading-bar-spinner').css('display', 'none');

    $('#legend-selected-district').css('display', 'block');
    $('#legend-footprint-' + year).css('display', 'block');

    map.addLayer(footprint);
    map.addLayer(footprint_bound);
    map.fitBounds(footprint_bound.getBounds());
  });
}

// COMPARE NATIONAL FOOTPRINT
function comparenationalfootprint() {
  $('#loading-bar-spinner').css('display', 'block');

  let year1 = $('#year1').val();
  let year2 = $('#year2').val();
  let url = 'footprint?national&year1=' + year1 + '&year2=' + year2;

  $.get(url, function (res) {
    // Footprint responses
    footprint1 = L.tileLayer(res['mapid_1'], {
      minZoom: 7,
    });
    footprint2 = L.tileLayer(res['mapid_2'], {
      minZoom: 7,
    });

    let bound_style = {
      fillColor: 'transparent',
      weight: 5,
      opacity: 1,
      color: '#fff',
      dashArray: '',
      fillOpacity: 0.7,
    };

    footprint_compare_bound = L.geoJSON(res['polygon'], { style: bound_style });

    footprint_compare_bound.on('mouseover', function (e) {
      e.layer
        .bindTooltip('The Area is ' + res['size'] + ' square meters')
        .openTooltip();
    });

    $('#loading-bar-spinner').css('display', 'none');

    $('#legend-selected-district').css('display', 'block');
    $('#legend-year-one').css('display', 'block');
    $('#legend-year-two').css('display', 'block');

    map.addLayer(footprint1);
    map.addLayer(footprint2);
    map.addLayer(footprint_compare_bound);
    map.fitBounds(footprint_compare_bound.getBounds());

    sbs = L.control.sideBySide(footprint1, footprint2);
    sbs.addTo(map);
  });
}

// LOAD REGION FOOTPRINT
function loadregionfootprint() {
  $('#loading-bar-spinner').css('display', 'block');

  let year = $('#year').val();
  let region = $('#region').val();
  let url = 'footprint?region=' + region + '&year=' + year;

  $.get(url, function (res) {
    footprint = L.tileLayer(res['mapid'], {
      minZoom: 7,
    });

    let bound_style = {
      fillColor: 'transparent',
      weight: 5,
      opacity: 1,
      color: '#fff',
      dashArray: '',
      fillOpacity: 0.7,
    };

    footprint_bound = L.geoJSON(res['polygon'], { style: bound_style });

    footprint_bound.on('mouseover', function (e) {
      e.layer
        .bindTooltip('The Area is ' + res['size'] + ' square meters')
        .openTooltip();
    });

    $('#loading-bar-spinner').css('display', 'none');

    $('#legend-selected-district').css('display', 'block');
    $('#legend-footprint-' + year).css('display', 'block');

    map.addLayer(footprint);
    map.addLayer(footprint_bound);
    map.fitBounds(footprint_bound.getBounds());
  });
}

// COMPARE REGION FOOTPRINT
function compareregionfootprint() {
  $('#loading-bar-spinner').css('display', 'block');

  let year1 = $('#year1').val();
  let year2 = $('#year2').val();
  let region = $('#region').val();
  let url =
    'footprint?region=' + region + '&year1=' + year1 + '&year2=' + year2;

  $.get(url, function (res) {
    // Footprint responses
    footprint1 = L.tileLayer(res['mapid_1'], {
      minZoom: 7,
    });
    footprint2 = L.tileLayer(res['mapid_2'], {
      minZoom: 7,
    });

    let bound_style = {
      fillColor: 'transparent',
      weight: 5,
      opacity: 1,
      color: '#fff',
      dashArray: '',
      fillOpacity: 0.7,
    };

    footprint_compare_bound = L.geoJSON(res['polygon'], { style: bound_style });

    footprint_compare_bound.on('mouseover', function (e) {
      e.layer
        .bindTooltip('The Area is ' + res['size'] + ' square meters')
        .openTooltip();
    });

    $('#loading-bar-spinner').css('display', 'none');

    $('#legend-selected-district').css('display', 'block');
    $('#legend-year-one').css('display', 'block');
    $('#legend-year-two').css('display', 'block');

    map.addLayer(footprint1);
    map.addLayer(footprint2);
    map.addLayer(footprint_compare_bound);
    map.fitBounds(footprint_compare_bound.getBounds());

    sbs = L.control.sideBySide(footprint1, footprint2);
    sbs.addTo(map);
  });
}

// LOAD DISTRICT FOOTPRINT
function loaddistrictfootprint() {
  $('#loading-bar-spinner').css('display', 'block');

  let year = $('#year').val();
  let district = $('#district').val();
  let url = 'footprint?year=' + year + '&district=' + district;

  $.get(url, function (res) {
    footprint = L.tileLayer(res['mapid'], {
      minZoom: 7,
    });

    let bound_style = {
      fillColor: 'transparent',
      weight: 5,
      opacity: 1,
      color: '#fff',
      dashArray: '',
      fillOpacity: 0.7,
    };

    let table_data = res['data'];

    // Table for the Tooltip
    let tooltip_table =
      `
<div class="container table-responsive py-5"> 
<table class="table table-bordered table-hover">
  <thead class="thead-dark">
    <tr>
      <th scope="col" colspan="2" class="text-center">Galamsey Information for ` +
      table_data.district +
      ` in the ` +
      table_data.year +
      `</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Region</th>
      <td>` +
      table_data.region +
      `</td>
    </tr>
    <tr>
      <th scope="row">District</th>
      <td>` +
      table_data.district +
      `</td>
    </tr>
    <tr>
      <th scope="row">Footprint Size in the Region(Hectares)</th>
      <td>` +
      table_data.region_area +
      `</td>
    </tr>
     <tr>
      <th scope="row">Footprint Size in the District(Hectares)</th>
      <td>` +
      table_data.district_area +
      `</td>
    </tr>
  </tbody>
</table>
</div>
`;

    footprint_bound = L.geoJSON(res['polygon'], { style: bound_style });
    footprint_bound.on('click', function (e) {
      e.layer.bindTooltip(tooltip_table).openTooltip();
    });

    footprint_bound.on('mouseover', function (e) {
      e.layer
        .bindTooltip('The Area is ' + res['size'] + ' square meters')
        .openTooltip();
    });

    $('#loading-bar-spinner').css('display', 'none');

    $('#legend-selected-district').css('display', 'block');
    $('#legend-footprint-' + year).css('display', 'block');

    map.addLayer(footprint);
    map.addLayer(footprint_bound);
    map.fitBounds(footprint_bound.getBounds());
  });
}

// COMPARE DISTRICT FOOTPRINT
function comparedistrictfootprint() {
  $('#loading-bar-spinner').css('display', 'block');

  let year1 = $('#year1').val();
  let year2 = $('#year2').val();
  let district = $('#district').val();

  let url =
    'footprint?year1=' + year1 + '&year2=' + year2 + '&district=' + district;

  $.get(url, function (res) {
    // Footprint responses
    footprint1 = L.tileLayer(res['mapid_1'], {
      minZoom: 7,
    });
    footprint2 = L.tileLayer(res['mapid_2'], {
      minZoom: 7,
    });

    let bound_style = {
      fillColor: 'transparent',
      weight: 5,
      opacity: 1,
      color: '#fff',
      dashArray: '',
      fillOpacity: 0.7,
    };

    footprint_compare_bound = L.geoJSON(res['polygon'], { style: bound_style });

    footprint_compare_bound.on('mouseover', function (e) {
      e.layer
        .bindTooltip('The Area is' + res['size'] + 'square meters')
        .openTooltip();
    });

    $('#loading-bar-spinner').css('display', 'none');

    $('#legend-selected-district').css('display', 'block');
    $('#legend-year-one').css('display', 'block');
    $('#legend-year-two').css('display', 'block');

    map.addLayer(footprint1);
    map.addLayer(footprint2);
    map.addLayer(footprint_compare_bound);
    map.fitBounds(footprint_compare_bound.getBounds());

    sbs = L.control.sideBySide(footprint1, footprint2);
    sbs.addTo(map);
  });
}

// Reset All Footprint Layers
function resetFootprintLayers() {
  if (map.hasLayer(regionboundary)) {
    map.removeLayer(regionboundary);
    $('#region_boundary').prop('checked', false);
    toggleLegend($('#region_boundary'), '#legend-region');
    resetLegend();
  }

  if (map.hasLayer(districtboundary)) {
    map.removeLayer(districtboundary);
    $('#district_boundary').prop('checked', false);
    toggleLegend($('#district_boundary'), '#legend-district');
    resetLegend();
  }

  if (map.hasLayer(protectedareas)) {
    map.removeLayer(protectedareas);
    $('#protected_area_boundary').prop('checked', false);
    toggleLegend($('#protected_area_boundary'), '#legend-protected-areas');
    resetLegend();
  }

  if (map.hasLayer(aoi)) {
    map.removeLayer(aoi);
    $('#aoi').prop('checked', false);
    toggleLegend($('#aoi'), '#legend-aoi');
    resetLegend();
  }

  if (map.hasLayer(mineral_concession)) {
    map.removeLayer(mineral_concession);
    $('#mineral_concession_boundary').prop('checked', false);
    toggleLegend(
      $('#mineral_concession_boundary'),
      '#legend-mineral-concession'
    );
    resetLegend();
  }

  if (map.hasLayer(footprint)) {
    resetLegend();
    map.removeLayer(footprint);
    map.removeLayer(footprint_bound);
  }

  if (map.hasLayer(footprint1)) {
    resetLegend();
    map.removeLayer(footprint1);
    map.removeLayer(footprint2);
    map.removeLayer(footprint_compare_bound);
    map.removeControl(sbs);
  }

  console.log($('#region_boundary'));
}

// Handler for Toggle
function toggleLayer(map, layer, checkbox) {
  if (layer) {
    map.removeLayer(layer);
    if (checkbox.prop('checked')) {
      map.removeLayer(layer);
      map.addLayer(layer);
    } else {
      map.removeLayer(layer);
    }
  } else {
    alert('Layer not is ready for visualisation.');
    checkbox.prop('checked', false);
  }
}

// Handler for Legend toggle
function toggleLegend(element, id) {
  if (element.prop('checked')) {
    $(id).css('display', 'block');
  } else {
    $(id).css('display', 'none');
  }
}

function resetLegend() {
  $('#legend-selected-district').css('display', 'none');
  $('#legend-footprint-2015').css('display', 'none');
  $('#legend-footprint-2018').css('display', 'none');
  $('#legend-footprint-2022').css('display', 'none');
  $('#legend-year-one').css('display', 'none');
  $('#legend-year-two').css('display', 'none');
}

// Adding Controls
browserPrintControl.addTo(map)
drawtool.addTo(map)
measureControl.addTo(map)

map.zoomControl.setPosition('bottomright');