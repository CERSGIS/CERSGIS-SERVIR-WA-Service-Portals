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

// Geoserver WFS request
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
      // format_options: "callback: getJson",
    },

    // dataType: "jsonp",
    // jsonpCallback: "getJson",
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

    charcoalpoints_group[target_layer] = markers;
  }
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
      // format_options: "callback: getJson",
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
      map.removeLayer(layer);
      map.addLayer(layer);
    } else {
      map.removeLayer(layer);
    }
  } else {
    alert('Preparing layer for visualisation. Please check in a few seconds');
    checkbox.prop('checked', false);
  }
}

function loadGeneralStats(url) {
  $('#loader-stats-container').addClass('d-flex');

  let options = {
    chart: {
      renderTo: 'stat-line-chart',
      type: 'line',
      backgroundColor: '#ffffff59', // Transparent background
      // backgroundColor: 'rgba(0, 0, 0, 0)' // Transparent background
    },
    title: {
      text: 'Charcoal Points per Years',
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      title: {
        text: 'Number of Points',
      },
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

  $.get(url, function (data) {
    options.series = data['computed_stats']['series'];
    options.xAxis.categories = data['computed_stats']['categories'];
    

    $('#loader-stats-container').removeClass('d-flex');
    $('#loader-stats-container').addClass('d-none');

    return new Highcharts.Chart(options);
  });


}