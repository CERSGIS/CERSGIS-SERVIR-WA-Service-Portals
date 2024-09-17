// Variables
let footprint_analysis = L.tileLayer(), footprint_analysis_left = L.tileLayer(), footprint_analysis_right = L.tileLayer(), footprint_bound, side_by_side;
var drawnFeatures = new L.FeatureGroup();
analysis_map.addLayer(drawnFeatures)

$('#boundary').change(function () {
  let boundary_val = $(this).val();

  switch (boundary_val) {
    case 'admin_boundaries':
      adminBoundarySelect();
      break;
    case 'protected_area':
      protectedAreaSelect();
      getRegions();
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

$('#admin_level').change(function () {
  let admin_level_val = $(this).val();

  switch (admin_level_val) {
    case 'region':
      getRegions();
      regionSelect();
      break;
    case 'district':
      getRegions();
      districtSelect();
      break;
    default:
      break;
  }
});

$('#region').change(function () {
  let admin_level_val = $('#admin_level').val();
  let admin_boundaries = $('#boundary').val();
  let reg_code = $(this).val();
  
  if (admin_level_val == 'district') {
    getDistricts(reg_code);
  }

  if (admin_boundaries == 'protected_area') {
    getProtectedAreas(reg_code);
  }
});

$('#draw_aoi_tool').change(function () {
  let tool_shape = $('#draw_aoi_tool').val();

  switch (tool_shape) {
    case 'polygon':
      measureArea();
      break;
  
    default:
      break;
  }
});


/*
    EXECUTE QUERY BUTTON
*/
$('#execute').click(function () {
  let boundary_val = $('#boundary').val();
  let compare_val = $('#switchyear').prop('checked');
  
  toggleLoader(true)
  resetAllAnalysis()

  switch (true) {
    // Admin Bouundarry and Single Year
    case (boundary_val == 'admin_boundaries' && compare_val == false):
      executeAdminSwitch();
      break;
    case (boundary_val == 'admin_boundaries' && compare_val == true):
      executeAdminCompare();
      break;
    case (boundary_val == 'protected_area' && compare_val == false):
      computeAnalysis('protected');
      break;
    case (boundary_val == 'protected_area' && compare_val == true):
      computeCompareAnalysis('protected');
      break;
    default:
      break;
  }
});

function executeAdminSwitch() {
  let admin_level = $('#admin_level').val();
  switch (admin_level) {
    case 'region':
      computeAnalysis('region');
      break;
    case 'district':
      computeAnalysis('district');
      break;
    default:
      break;
  }
}

function executeAdminCompare() {
  let admin_level = $('#admin_level').val();
  switch (admin_level) {
    case 'region':
      computeCompareAnalysis('region');
      break;
    case 'district':
      computeCompareAnalysis('district');
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
function computeAnalysis(level) {
  let region_val = $('#region').val();
  let district_val = $('#district').val();
  let protected_val = $('#protected_areas').val();
  let year_val = $('#year').val();
  let url;

  if (level == 'region') {
    url = `compute-analysis?layer_name=galamsey:region&region=${region_val}&year=${year_val}`;
  } else if (level == 'district') {
    url = `compute-analysis?layer_name=galamsey:area_of_interest&district=${district_val}&year=${year_val}`;
  } else if (level == 'protected') {
    url = `compute-analysis?layer_name=galamsey:protected_area&protected_id=${protected_val}&year=${year_val}`;
  }

  $.get(url, function (res) {
    // Footprint on map
    footprint_analysis = L.tileLayer(res['mapid'], {
      minZoom: 7,
    });

    // Geojson on map
    let bound_style = {
      fillColor: 'transparent',
      weight: 5,
      opacity: 1,
      color: '#757575',
      dashArray: '',
      fillOpacity: 0.7,
    };

    footprint_bound = L.geoJSON(res['geometry'], { style: bound_style });

    $('#pending-profile-tab').removeClass('d-none')
    loadAnalysisStats(res['stats'], false, 'bar-c', 'column');
    loadAnalysisStats(res['stats'], false, 'pie-chart', 'pie');
    analysis_map.addLayer(footprint_analysis);
    analysis_map.addLayer(footprint_bound);
    analysis_map.fitBounds(footprint_bound.getBounds());
    toggleLoader(false);
  });
}

function computeCompareAnalysis(level) {
  let region_val = $('#region').val();
  let district_val = $('#district').val();
  let protected_val = $('#protected_areas').val();
  let year1_val = $('#year1').val();
  let year2_val = $('#year2').val();
  let url;


  if (level == 'region') {
    url = `compute-analysis?layer_name=galamsey:region&compare=compare&region=${region_val}&year1=${year1_val}&year2=${year2_val}`;
  } else if (level == 'district') {
    url = `compute-analysis?layer_name=galamsey:area_of_interest&compare=compare&district=${district_val}&year1=${year1_val}&year2=${year2_val}`;
  } else if (level == 'protected') {
    url = `compute-analysis?layer_name=galamsey:protected_area&compare=compare&protected_id=${protected_val}&year1=${year1_val}&year2=${year2_val}`;
  }
  

  $.get(url, function (res) {
    // Footprint on map
    footprint_analysis_left = L.tileLayer(res['mapid_left'], {
      minZoom: 7,
    });

    footprint_analysis_right = L.tileLayer(res['mapid_right'], {
      minZoom: 7,
    });

    // Geojson on map
    let bound_style = {
      fillColor: 'transparent',
      weight: 5,
      opacity: 1,
      color: '#757575',
      dashArray: '',
      fillOpacity: 0.7,
    };

    footprint_bound = L.geoJSON(res['geometry'], { style: bound_style });

    $('#pending-profile-tab').addClass('d-none')
    loadAnalysisStats(res['stats'], true, 'bar-c', 'column');
    analysis_map.addLayer(footprint_analysis_left);
    analysis_map.addLayer(footprint_analysis_right);
    analysis_map.addLayer(footprint_bound);
    analysis_map.fitBounds(footprint_bound.getBounds());

    side_by_side = L.control.sideBySide(footprint_analysis_left,footprint_analysis_right);
    side_by_side.addTo(analysis_map);

    toggleLoader(false);
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
      text: 'Area for ' + title_text,
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
    tooltip: {
      useHTML: true,
      headerFormat: '<table class="table"><tr><th>{point.key}</th></tr>',
      pointFormat: '<tr><td>{point.y:.3f} sqkm</td></tr>',
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
          format: '{point.y:.3f}', // three decimal
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
            return 'Class'
          } else if (!item || item instanceof Highcharts.Series) {
            return 'Area (sqkm)'
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

function getProtectedAreas(reg_code) {
  $.get('protected-area?reg_code='+reg_code, function (data) {
    $('#protected_areas').html(data);
  });
}

function toggleLoader(state) {
  if (state === true) {
    $('#loader-analysis-container').removeClass('d-none');
    $('#loader-analysis-container').addClass('d-flex');
  } else {
    $('#loader-analysis-container').removeClass('d-flex');
    $('#loader-analysis-container').addClass('d-none');
  }
}

function resetAllAnalysis() {
  if (analysis_map.hasLayer(footprint_analysis)) {
    analysis_map.removeLayer(footprint_analysis)
    analysis_map.removeLayer(footprint_bound)
    loadAnalysisStats(['',],false,'bar-c','column')
    loadAnalysisStats(['',],false,'pie-chart','pie')
  } else if (analysis_map.hasLayer(footprint_analysis_left)) {
    analysis_map.removeLayer(footprint_analysis_left)
    analysis_map.removeLayer(footprint_analysis_right)
    analysis_map.removeLayer(footprint_bound)
    analysis_map.removeControl(side_by_side)
    loadAnalysisStats(['',],false,'bar-c','column')
    loadAnalysisStats(['',],false,'pie-chart','pie')
  }
}

// INPUT MANIPULATION
// function toogleExecuteButton() {
//     state = $('#execute').attr('disabled');
//     switch (state) {
//         case typeof attr !== 'undefined' && attr !== false:
//             console.log('enabled')
//             break;

//         default:
//             break;
//     }
// }

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

function measureArea(){

  var stopclick = false; //to prevent more than one click listener

  var polygon = new L.Draw.Polygon(analysis_map, {
    showArea: true,
    metric: false,
    // // precision: {km: 2},
    // allowIntersection: false,
    shapeOptions: {
      color: '#000',
    },
  });

  // polygon.initialize();
  polygon.enable();


  //user affordance
  // $("button[name=measureArea] span").html(messages.beginmeasure);
	
  //listeners active during drawing
  function measuremove(){
    $("button[name=measureArea] span").html(messages.area + polygon._getMeasurementString());
  };

  function measurestart(){
    if (stopclick == false){
      stopclick = true;
      $("button[name=measureArea] span").html(messages.area);
      analysis_map.on("mousemove", measuremove);
    };
  };

  function measurestop(){
    //reset button
    // $("button[name=measureArea] span").html(messages.measureArea);
    //remove listeners
    analysis_map.off("click", measurestart);
    analysis_map.off("mousemove", measuremove);
    analysis_map.off("draw:drawstop", measurestop);
    
  };

  
  analysis_map.on("click", measurestart);
  // analysis_map.on("draw:drawstop", measurestop);
  // analysis_map.on(L.Draw.Event.DRAWSTART, function (event) {
    // var layer = event.layer;
    // layer = e.layer;
    
    // if (type === 'marker') {
      //   layer.bindPopup('A popup!');
      // }
      
      // console.log(layer);
      // console.log(drawnFeatures);
      // drawnFeatures.addLayer(layer);
      
      // });
      
}
    
    
analysis_map.on(L.Draw.Event.DRAWSTART, function (e) {
  console.log(e)
});
analysis_map.on(L.Draw.Event.CREATED, function (e) {

  console.log('Draw Created', e )

  analysis_map.addLayer(e.layer)
});