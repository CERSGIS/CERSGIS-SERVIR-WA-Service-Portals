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

function loadFootprint(url, year, target_layer) {

  return $.get(url,
    data={ 
      year: year,
    },
    success = handleresponse
  );
  
  function handleresponse(data) {
    footprints_group[target_layer] = L.tileLayer(data['mapid'], {});
  }
}

// Loading Wafford Reference Data
function loadDeforestation(url, year, target_layer) {

  return $.get(url,
    data={ 
      year: year,
    },
    success = handleresponse
  );
  
  function handleresponse(data) {
    deforestation_group[target_layer] = L.tileLayer(data['mapid'], {});
  }
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


// Loading Planet Reference Data
function loadPlanetImage(url, year, target_layer) {

  return $.get(url,
    data={ 
      year: year,
    },
    success = handleresponse
  );
  
  function handleresponse(data) {
    planet_group[target_layer] = L.tileLayer(data['mapid'], {attribution: 'planet_layer'});
  }
}

function loadGeneralStats(stats_data) {
  $('#loader-stats-container').addClass('d-flex');

  let options = {
    chart: {
      height: 100 + '%',
      renderTo: 'stat-bar-chart',
      type: 'column',
      backgroundColor: '#ffffff59' // Transparent background
      // backgroundColor: 'rgba(0, 0, 0, 0)' // Transparent background
    },
    title: {
      useHTML: true,
      // text: 'Area per Year',
      text: '<span class="item-title" style="display: flex;align-items: center; gap: 7px;"><i class="emojione-monotone--footprints"></i> Annual Footprint Area Cover</span>',
      align: 'left',
    },
    xAxis: {
      type: 'category',
      labels: {
        autoRotation: [-45, -90],
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif',
        },
      },
    },
    yAxis: {
      min: 0,
      gridLineColor: '#302f2faf',
      title: {
        text: 'Area (sqkm)',
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      useHTML: true,
      headerFormat: '<table class="table"><tr><th>{point.key} Area</th></tr>',
      pointFormat: '<tr><td>{point.y:.1f} sqkm</td></tr>',
      footerFormat: '</table>'
    },
    series: [
      {
        name: 'Population',
        colors: [
          '#ae8157',
          // '#9c744e',
          // '#8b6745',
          // '#795a3c',
          // '#684d34',
          // '#57402b',
          // '#453322',
          // '#34261a',
          // '#221911',
        ],
        colorByPoint: true,
        groupPadding: 0,
        data: 
        [
          // ['2015', 211.28043],
          // ['2016', 289.06169],
          // ['2017', 278.807],
          // ['2018', 304.9212],
          // ['2019', 314.33184],
          // ['2020', 353.92],
          // ['2021', 361.725],
          // ['2022', 340.9445],
          // ['2023', 635.530772716955],
        ],
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          inside: true,
          verticalAlign: 'top',
          format: '{point.y:.1f}', // one decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif',
          },
        },
      },
    ],
    exporting: {
      csv: {
        columnHeaderFormatter: function(item, key) {
          if (!item || item instanceof Highcharts.Axis) {
            return 'Year'
          } else if (!item || item instanceof Highcharts.Series) {
            return 'Area (sqkm)'
          } 
        } 
      }
    }
  };


  options.series[0].data = stats_data['computed_stats'];
  

  $('#loader-stats-container').removeClass('d-flex');
  $('#loader-stats-container').addClass('d-none');

  return new Highcharts.Chart(options);
  

}

function toggleLegend(legend_name, checkboxes_array) {
  temp = 0
  for (i=0; i < checkboxes_array.length; i++) {  
    for (index in checkboxes_array[i]) {
      if ($(`#${index}`).prop('checked')) {
        temp++
      }
    }
  }

  if (temp > 0) {
    $(legend_name).addClass('d-block')
  } else {
    $(legend_name).removeClass('d-block')
  }
}


// Create a hidden checkbox for the water shed boundary layer
const $boundaryCheckbox = $('<input type="checkbox" id="watershed_boundary_layer_checkbox" hidden>').appendTo('body');

function checkWatershedLayers() {
  const isWatershedActive = $('#watershed_2019').prop('checked') || $('#watershed_2024').prop('checked');

  // Set the hidden checkbox state
  $boundaryCheckbox.prop('checked', isWatershedActive);

  // Toggle on/off
  toggleLayer(map, layers_group['watershed_boundary_layer'], $boundaryCheckbox);
 }