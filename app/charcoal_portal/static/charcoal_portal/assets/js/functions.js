// Function to Load Vector Tiles for Footprints
function loadVectorLayerFunction(url, layername, storename) {
  let loaddata;
  loaddata = L.tileLayer.wms(url, {
    layers: storename + ':' + layername,
    format: 'image/png',
    transparent: true,
  });
  return loaddata;
}

function pointOnEachFeature(feature, layer) {
  if (feature.properties.year) {
    layer.bindPopup(
      '<div class="row"><h5 class="text-center"><strong>DETAILS</strong></h5></div><table class="table table-bordered table-striped pop-up-table"><tbody><tr><th>Region</th><td>' +
        feature.properties.region +
        '</td></tr><tr><th>District</th><td>' +
        feature.properties.district +
        '</td></tr><tr><th>Community</th><td>' +
        feature.properties.community +
        '</td></tr><tr><th>Longitude</th><td>' +
        feature.properties.longitude +
        '</td></tr><tr><th>Latitude</th><td>' +
        feature.properties.latitude +
        '</td></tr><tr><th>Year</th><td>' +
        feature.properties.year +
        '</td></tr><tr><th>Diameter</th><td>' +
        feature.properties.dimension +
        '</td></tr><tr><th>Type</th><td>' +
        feature.properties.type +
        '</td></tr></tbody></table>'
    );
  }
}

let myRenderer = L.canvas({ padding: 0.5 });

const fireHotspotIcon = L.icon({
  // html: '<i class="fa-sharp-duotone fa-solid fa-fire-flame-curved" style="--fa-primary-color: #ff3300; --fa-secondary-color: #ff3300;"></i>',
  // html: '<i class="fa-solid fa-fire-flame-curved" style="color: #FFD43B;"></i>',
  iconUrl: '/static/charcoal_portal/assets/icons/fire-hotspot.png',
  iconSize: [20, 20],
  className: 'fire-hotspot-icon'
});
// const fireHotspotIcon = L.divIcon({
//   // html: '<i class="fa-sharp-duotone fa-solid fa-fire-flame-curved" style="--fa-primary-color: #ff3300; --fa-secondary-color: #ff3300;"></i>',
//   // html: '<i class="fa-solid fa-fire-flame-curved" style="color: #FFD43B;"></i>',
//   html: '<i class="fa-solid fa-fire-flame-curved"></i>',
//   iconSize: [20, 20],
//   className: 'fire-hotspot-icon'
// });



// Geoserver WFS Points
async function GeoserverWFS(geoserver_wfs_url, options, target_layer) {
  return $.ajax(geoserver_wfs_url, {
    type: 'GET',
    dataType: 'json',
    data: {
      servrice: 'WFS',
      version: '2.0.0',
      request: 'GetFeature',
      typename: options.layers,
      CQL_FILTER: options.CQL_FILTER,
      srsname: options.srsname,
      outputFormat: 'application/json',
    },

    success: await handlejson,
  });

  function handlejson(data) {
    
      // Load 
      if (target_layer === 'all_points') {
        loadDistrictSummaryTable(data)
      }

    geojson_data_response = L.geoJSON(data, {
      style: options.style,
      onEachFeature: pointOnEachFeature,
      attribution: target_layer,
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, options.style);
      },
    });

    charcoalpoints_group[target_layer] = geojson_data_response;
  }
}

// Geoserver WFS Cluster
async function GeoserverWFSCluster(geoserver_wfs_url, options, target_layer) {
  return $.ajax(geoserver_wfs_url, {
    type: 'GET',
    dataType: 'json',
    data: {
      servrice: 'WFS',
      version: '2.0.0',
      request: 'GetFeature',
      typename: options.layers,
      CQL_FILTER: options.CQL_FILTER,
      srsname: options.srsname,
      outputFormat: 'application/json',
    },

    success: await handlejson,
  });

  function handlejson(data) {
    let markers = new L.MarkerClusterGroup({
      spiderfyOnMaxZoom: false,
      iconCreateFunction: function(cluster) {
        var childCount = cluster.getChildCount();

        return new L.DivIcon({html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster ' + options.class_name, iconSize: new L.Point(40, 40) });
      }
    });

    geojson_data_response = L.geoJSON(data, {
      style: options.style,
      onEachFeature: pointOnEachFeature,
      attribution: target_layer,
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, options.style);
      },
    });

    markers.addLayer(geojson_data_response);

    charcoalpoints_cluster[target_layer] = markers;
  }
}


// Geoserver WFS Fire Hotspot
async function GeoserverWFSHotspots(geoserver_wfs_url, options, target_layer) {
  return $.ajax(geoserver_wfs_url, {
    type: 'GET',
    dataType: 'json',
    data: {
      servrice: 'WFS',
      version: '2.0.0',
      request: 'GetFeature',
      typename: options.layers,
      CQL_FILTER: options.CQL_FILTER,
      srsname: options.srsname,
      outputFormat: 'application/json',
    },

    success: await handlejson,
  });

  function handlejson(data) {
    geojson_data_response = L.geoJSON(data, {
      style: options.style,
      // onEachFeature: pointOnEachFeature,
      attribution: target_layer,
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: fireHotspotIcon, renderer: myRenderer});
      },
    });

    fire_hotspots[target_layer] = geojson_data_response;
  }
}

// Zoom to Feature
function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

// HighlightFeature
function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7,
    fillColor: 'transparent',
  });

  // if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
  //   layer.bringToFront();
  // }
}

// Reset Layers
function resetLayerHighlight(e) {
  layers_group[e.target.options.attribution].resetStyle(e.target);
}

watershedOnEachFeature = function (feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetLayerHighlight,
    click: zoomToFeature,
  })

  layer.bindTooltip('Watershed Name: ' + layer.feature.properties['water_basi'])
}

async function GeoserverWFSLayers(geoserver_wfs_url, options, target_layer) {
  return $.ajax(geoserver_wfs_url, {
    type: 'GET',
    dataType: 'json',
    data: {
      servrice: 'WFS',
      version: '2.0.0',
      request: 'GetFeature',
      typename: options.layers,
      CQL_FILTER: options.CQL_FILTER,
      srsname: options.srsname,
      outputFormat: 'application/json',
    },

    // dataType: "jsonp",
    // jsonpCallback: "getJson",
    success: await handlejson,
  });

  function handlejson(data) {
    layers_group[target_layer] = L.geoJSON(data, {
      style: options.style,
      onEachFeature: options.onEachFeature,
      attribution: target_layer,
    });
  }
}

// Geoserver WMS
async function GeoserverWMS(geoserver_wms_url, options, target_layer) {
  return (charcoalpoints_group[target_layer] = await L.tileLayer.betterWms(
    geoserver_wms_url,
    {
      layers: options.layers,
      style: options.style,
      transparent: true,
      format: 'image/png',
    }
  ));
}

// Handler for Toggle
function toggleLayer(map, layer, checkbox) {
  if (layer) {
    map.removeLayer(layer);
    if (checkbox.prop('checked')) {
      if ($('#deselect_all_points').prop('checked', false)) {
        $('#deselect_all_points').prop('checked', true);
      }
      map.removeLayer(layer);
      map.addLayer(layer);
    } else {
      map.removeLayer(layer);
    }
  } else {
    alert('Preparing layer for visualisation. Please check in a few seconds');
    checkbox.prop('checked', false);
  }

  checkAllPointsBox(charcoalpoints_group, charcoalpoints_cluster)
}

function toggleCluster(map, layer, cluster_layer, checkbox) {
  if (cluster_layer && layer) {
    if (checkbox.prop('checked')) {
      if ($('#deselect_all_points').prop('checked', false)) {
        $('#deselect_all_points').prop('checked', true);
      }
      map.removeLayer(layer)
      map.removeLayer(cluster_layer)
      map.addLayer(cluster_layer)
    } else {
      map.removeLayer(cluster_layer)
      map.addLayer(layer)
    }
  } else {
    alert('Cannot activate cluster')
  }

  checkAllPointsBox(charcoalpoints_group, charcoalpoints_cluster)
}

function deselectAll(map, layer_array, cluster_array) {
  for (key in layer_array) {
    $(`#${key}`).prop('checked', false);
    map.removeLayer(layer_array[key])
  }

  for (key in cluster_array) {
    $(`#${key}`).prop('checked', false);
    map.removeLayer(cluster_array[key])
  }

  checkAllPointsBox(layer_array, cluster_array)
}

function checkAllPointsBox(...checkboxes) {
  temp = 0
  for (i=0; i < checkboxes.length; i++) {  
    for (index in checkboxes[i]) {
      if ($(`#${index}`).prop('checked')) {
        temp++
      }
    }
  }
  if (temp > 0) {
    $('#deselect_all_points').removeClass('d-none')
  } else {
    $('#deselect_all_points').addClass('d-none')
  }
}

function loadGeneralStats(data, title_text, yAxis_text, yAxis_type, type, render, chart_type) {
  $('#loader-stats-container').addClass('d-flex');

  let options = {
    chart: {
      renderTo: render,
      type: chart_type,
      backgroundColor: '#ffffff59', // Transparent background
    },
    title: {
      text: title_text,
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      title: {
        text: yAxis_text,
      },
      type: yAxis_type,
      startOnTick: false,
    },
    plotOptions: {
      line: {
        color: '#0000ff',
        dataLabels: {
          enabled: true,
        },
        enableMouseTracking: false,
      },
    },
    series: [],
  };

  if (type == 'growth_rate') {
    data_array = data['series'][0]['data'];

    let growth_values = [];
    data['categories'].shift();

    for (i = 0; i < data_array.length - 1; i++) {
      let present = data_array[i + 1], past = data_array[i];
      value = (((Math.log(present) - Math.log(past)) / Math.abs(Math.log(past))) * 100)
      // cbrt_rate = Math.cbrt(value)
      // growth_values.push(parseFloat(cbrt_rate.toFixed(3)))
      growth_values.push(parseFloat(value.toFixed(2)))
    }
    
    data['series'][0]['data'] = growth_values;
    
    options.series = data['series'];
    options.yAxis.max = Math.max(...growth_values);
    options.yAxis.min = Math.min(...growth_values) - 50;
    options.xAxis.categories = data['categories'].slice();

  } else if (type == 'total_points') {
    options.series = data['series'];
    options.xAxis.categories = data['categories'].slice(); 
  }
  

  $('#loader-stats-container').removeClass('d-flex');
  $('#loader-stats-container').addClass('d-none');

  return new Highcharts.Chart(options);


}

// Load LULC WaterShed
function loadwaterShed(url, year, target_layer) {

  return $.get(url,
    data={ 
      year: year,
    },
    success = handleresponse
  );
  
  function handleresponse(data) {
    watershed_group[target_layer] = L.tileLayer(data['mapid'], {});
  }
}

function toggleLegend(legend_name, checkboxes_array) {
  console.log(legend_name)
  temp = 0
  for (i=0; i < checkboxes_array.length; i++) { 
    temp++
  }

  if (temp > 0) {
    $(legend_name).addClass('d-block')
  } else {
    $(legend_name).removeClass('d-block')
  }
}



