// Variables
let charcoal_bound, charcoal_points, charcoal_points_left, charcoal_points_right, side_by_side;

$('#boundary').change(function () {
  let boundary_val = $(this).val();

  switch (boundary_val) {
    case 'admin_boundaries':
      getRegions();
      districtSelect();
      break;
    case 'upload_aoi':
      break;
    case 'draw_aoi':
      drawAoiSelect();
      break;
    default:
      resetQueryInput();
      break;
  }
});

// $('#admin_level').change(function () {
//   let admin_level_val = $(this).val();

//   switch (admin_level_val) {
//     case 'region':
//       getRegions();
//       regionSelect();
//       break;
//     case 'district':
//       getRegions();
//       districtSelect();
//       break;
//     default:
//       break;
//   }
// });

$('#region').change(function () {
  let admin_boundaries = $('#boundary').val();
  let reg_code = $(this).val();
  
  getDistricts(reg_code);

  if (admin_boundaries == 'protected_area') {
    getProtectedAreas(reg_code);
  }
});

/* 
  EXECUTE QUERY BUTTON
*/
$('#execute').click(() => {
  let boundary_val = $('#boundary').val();
  let compare_val = $('#switchyear').prop('checked');

  toggleLoader(true)
  resetAllAnalysis()

  switch (true) {
    case (boundary_val == 'admin_boundaries' && compare_val == false):
      executeAdminSwitch();
      break;
    
    default:
      break;
  }
});


const executeAdminSwitch = () => {
  let region_val = $('#region').val();
  let district_val = $('#district').val();
  switch (true) {
    case (region_val != null && district_val == null):
      computeAnalysis('region');
      break;
    case (region_val != null && district_val != null):
      computeAnalysis('district');
      break;
    default:
      break;
  }
}

/* 
  EXECUTE QUERY END
*/

/* 
  ANALYSIS HELPERS
*/

const computeAnalysis = (level) => {
  let url;
  let year_val = $('#year').val();
  let region_val = $('#region').val();
  let district_val = $('#district').val();


  if (level == 'region') {
    url = `compute-analysis?layer_name=charcoal:region&region=${region_val}&year=${year_val}`;
  } else if (level == 'district') {
    url = `compute-analysis?layer_name=charcoal:area_of_interest&district=${district_val}&year=${year_val}`;
  }

  $.get(url, (res) => {
    // Get points
    let points_style = res['points_style']

    charcoal_points = L.geoJSON(res['points'], {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, points_style);
      },
      onEachFeature: pointOnEachFeature,
      })
    
    // bound on map
    let bound_style = {
      fillColor: 'transparent',
      weight: 5,
      opacity: 1,
      color: '#757575',
      dashArray: '',
      fillOpacity: 0.7,
    };

    charcoal_bound = L.geoJSON(res['geometry'], { style: bound_style})

    // put stuffs on map and stats
    loadAnalysisStats(res['stats'], false, 'bar-c', 'column');
    loadAnalysisStats(res['stats'], false, 'pie-chart', 'pie');
    analysis_map.addLayer(charcoal_bound)
    analysis_map.addLayer(charcoal_points)
    analysis_map.fitBounds(charcoal_bound.getBounds());

    // toggle loader
    toggleLoader(false)
  });
}

function loadAnalysisStats(data, compare, render, chart_type) {
  let options, title_text = ''
  
  if (compare) {
    title_text =  data[0].name + ' and ' + data[1].name
  } else {
    title_text = data[0]
  }

  options = {
    chart: {
      renderTo: render,
      type: chart_type,
      backgroundColor: '#ffffff59', // Transparent background
    },
    title: {
      text: title_text,
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
        text: 'Points',
      },
    },
    tooltip: {
      useHTML: true,
      headerFormat: '<table class="table"><tr><th>{point.key}</th></tr>',
      pointFormat: '<tr><td>{point.y}</td></tr>',
      footerFormat: '</table>'
    },
    series: [
      {
        name: 'Area',
        colors: [
        ],
        colorByPoint: true,
        groupPadding: 0,
        data: [],
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          inside: true,
          verticalAlign: 'top',
          format: '{point.y}', // three decimal
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
            return data[0]
          } else if (!item || item instanceof Highcharts.Series) {
            return 'Points'
          } 
        } 
      }
    }
  };
  
  if (compare) {
    options.series = data
  } else {
    options.series[0].data = data[2];
    options.series[0].colors = data[1];
    options.series[0].name = data[0];
  }

  return new Highcharts.Chart(options);
}

function getRegions() {
  $.get('regions', function (data) {
    $('#region').html(data);
  });
}

function getDistricts(reg_code) {
  $.get('districts?reg_code='+reg_code, function (data) {
    $('#district').html(data);
  });
}

const toggleLoader = (state) => {
  if (state === true) {
    $('#loader-analysis-container').removeClass('d-none');
    $('#loader-analysis-container').addClass('d-flex');
  } else {
    $('#loader-analysis-container').removeClass('d-flex');
    $('#loader-analysis-container').addClass('d-none');
  }
}

function resetAllAnalysis() {
  if (analysis_map.hasLayer(charcoal_points)) {
    analysis_map.removeLayer(charcoal_points)
    analysis_map.removeLayer(charcoal_bound)
    // loadAnalysisStats(['',],false,'bar-c','column')
    // loadAnalysisStats(['',],false,'pie-chart','pie')
  } else if (analysis_map.hasLayer(charcoal_points_left)) {
    analysis_map.removeLayer(charcoal_points_left)
    analysis_map.removeLayer(charcoal_points_right)
    analysis_map.removeLayer(charcoal_bound)
    analysis_map.removeControl(side_by_side)
    // loadAnalysisStats(['',],false,'bar-c','column')
    // loadAnalysisStats(['',],false,'pie-chart','pie')
  }
}

// INPUT MANIPULATION
function resetQueryInput() {
  $('.admin_level').css('display', 'none');
  $('.region').css('display', 'none');
  $('.district').css('display', 'none');
  $('.protected_areas').css('display', 'none');
  $('.upload_aoi_input').css('display', 'none');
  $('.draw_aoi_tool').css('display', 'none');
}

function adminBoundarySelect() {
  $('.admin_level').css('display', 'block');
  $('.region').css('display', 'none');
  $('.district').css('display', 'none');
  $('.protected_areas').css('display', 'none');
  $('.upload_aoi_input').css('display', 'none');
  $('.draw_aoi_tool').css('display', 'none');
}

function protectedAreaSelect() {
  $('.admin_level').css('display', 'none');
  $('.region').css('display', 'block');
  $('.district').css('display', 'none');
  $('.protected_areas').css('display', 'block');
  $('.upload_aoi_input').css('display', 'none');
  $('.draw_aoi_tool').css('display', 'none');
}

function regionSelect() {
  $('.admin_level').css('display', 'block');
  $('.region').css('display', 'block');
  $('.district').css('display', 'none');
  $('.protected_areas').css('display', 'none');
  $('.upload_aoi_input').css('display', 'none');
  $('.draw_aoi_tool').css('display', 'none');
}

function districtSelect() {
  $('.admin_level').css('display', 'block');
  $('.region').css('display', 'block');
  $('.district').css('display', 'block');
  $('.protected_areas').css('display', 'none');
  $('.upload_aoi_input').css('display', 'none');
  $('.draw_aoi_tool').css('display', 'none');
}

function drawAoiSelect() {
  $('.admin_level').css('display', 'none');
  $('.region').css('display', 'none');
  $('.district').css('display', 'none');
  $('.protected_areas').css('display', 'none');
  $('.upload_aoi_input').css('display', 'none');
  $('.draw_aoi_tool').css('display', 'block');
}