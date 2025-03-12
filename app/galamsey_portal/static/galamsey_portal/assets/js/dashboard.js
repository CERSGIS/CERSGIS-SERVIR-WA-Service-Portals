(function loadingSkeletons() {
  $('#mineral-concession-table-loader').addClass('d-flex');
  // TODO: 
  // Self Invoke mining-status-stats
  const miningStatsData = [
    {
      name : 'Active Site',
      count: '1212'
  },
    {
      name : 'Inactive Site',
      count: '1212'
  },
    {
      name : 'Polluted River',
      count: '1212'
  }
  ]
  loadMiningStatusStats(miningStatsData)
})();

function laodMiningConcessionTable(data) {
  const mineral_concession_stats = data.features.map((feature) => ({
    // id: feature.id || 'N/A',
    code: feature.properties?.code || "N/A",
    // name: feature.properties?.name || 'N/A',
    owner: feature.properties?.owner || "N/A",
    status: feature.properties?.status || "N/A",
    assets: feature.properties?.assets || "N/A",
    type: feature.properties.type || "N/A",
  }));

  // Reinitialize DataTable
  if ($.fn.DataTable.isDataTable("#mineral_concession_table")) {
    $("#mineral_concession_table").DataTable().clear().destroy();
  }

  $("#mineral_concession_table").DataTable({
    data: mineral_concession_stats, // Pass the data array to the DataTable
    columns: [
      // { data: 'id', title: 'ID' },
      // { data: 'code', title: 'Code' },
      // { data: 'name', title: 'Name' },
      { data: "owner", title: "Owner" },
      { data: "status", title: "Status" },
      { data: "assets", title: "Assets" },
      { data: "type", title: "Type" },
    ],
    scrollCollapse: true,
    scrollY: '500px'
  });
  $('#mineral-concession-table-loader').removeClass('d-flex');
  $('#mineral-concession-table-loader').addClass('d-none');
  $('#tblborder').addClass('tblborder-active');

  // loadTotalMiniralConcessions(mineral_concession_stats)
}

// Load the protected area Summary Table
function loadProtectedAreaSummaryTable(data) {

  const year1Title = data.length > 0 ? data[0].year_1 : "Year 1";
  const year2Title = data.length > 0 ? data[0].year_2 : "Year 2";
  const year3Title = data.length > 0 ? data[0].year_3 : "Year 3";

  // Reinitialize DataTable
  if ($.fn.DataTable.isDataTable("#protected_area_summary_table")) {
    $("#protected_area_summary_table").DataTable().clear().destroy();
  }

  $("#protected_area_summary_table").DataTable({
    data: data, // Pass the data array to the DataTable
    columns: [
      { data: "name", title: "Name" },
      { data: "total_size", title: "Total Area (Sqkm)" },
      { data: "value_1", title: year1Title },
      { data: "value_2", title: year2Title },
      { data: "value_3", title: year3Title },
    ],
    scrollCollapse: true,
    scrollY: '500px'
  });

  $('#protected-area-summary-table-loader').removeClass('d-flex');
  $('#protected-area-summary-table-loader').addClass('d-none');
  $('#tblborder').addClass('tblborder-active');

  loadTotalProtectedArea(data)
}

// Load the District Summary Table
function loadDistrictSummaryTable(data) {

  const year1Title = data.length > 0 ? data[0].year_1 : "Year 1";
  const year2Title = data.length > 0 ? data[0].year_2 : "Year 2";
  const year3Title = data.length > 0 ? data[0].year_3 : "Year 3";

  // Reinitialize DataTable
  if ($.fn.DataTable.isDataTable("#district_summary_table")) {
    $("#district_summary_table").DataTable().clear().destroy();
  }

  $("#district_summary_table").DataTable({
    data: data, // Pass the data array to the DataTable
    columns: [
      { data: "region", title: "Region" },
      { data: "name", title: "District" },
      { data: "total_size", title: "Total District Area (Sqkm)" },
      { data: "value_1", title: year1Title },
      { data: "value_2", title: year2Title },
      { data: "value_3", title: year3Title },
    ],
    scrollCollapse: true,
    scrollY: '500px'
  });

  $('#district-summary-table-loader').removeClass('d-flex');
  $('#district-summary-table-loader').addClass('d-none');
  $('#tblborder').addClass('tblborder-active');
}


// Calculate the total counts of active, under review and suspended statuses
function loadTotalMiniralConcessions(data) {
const statusCounts = data.reduce(
  (counts, item) => {
    if (item.status === "Active License") {
      counts.active += 1;
    } else if (item.status === "Under Review") {
      counts.under_review += 1;
    } else if (item.status === "Suspended") {
      counts.suspended += 1;
    }
    return counts;
  },
  { active: 0, under_review: 0, suspended: 0}
);

  $('#total_active_license_value').text(statusCounts['active']).removeClass('skeleton-loader-text'); 
  $('#total_under_review_license_value').text(statusCounts['under_review']).removeClass('skeleton-loader-text'); 
  $('#total_suspended_license_value').text(statusCounts['suspended']).removeClass('skeleton-loader-text'); 
}

// Calculate the total counts of all protected area
function loadTotalProtectedArea(data) {
  
// Calculate total for each year
const areaCountPerYear = data.reduce((count, item) => {
  for (let i = 1; item[`year_${i}`]; i++) {
      const year = item[`year_${i}`];
      const value = item[`value_${i}`];
      
      count[year] = (count[year] || 0) + value;
  }
  return count;
}, {});

  $('#total_active_license_value').text(areaCountPerYear['2015'].toFixed(2)).removeClass('skeleton-loader-text'); 
  $('#total_under_review_license_value').text(areaCountPerYear['2020'].toFixed(2)).removeClass('skeleton-loader-text'); 
  $('#total_suspended_license_value').text(areaCountPerYear['2024'].toFixed(2)).removeClass('skeleton-loader-text'); 
}


function loadTotalArea(data) {
  $('#total_area_inital_value').text(parseFloat(data['initial_value']).toFixed(1)).removeClass('skeleton-loader-text'); 
  $('#total_area_inital_year').text(data['initial_year'])
  $('#total_area_latest_value').text(parseFloat(data['latest_value']).toFixed(1)).removeClass('skeleton-loader-text');
  $('#total_area_latest_year').text(data['latest_year'])
}


  // Create the Mining Status barchart
function loadMiningStatusStats(mining_stats_data) {
  $('#loader-mining-status-container').addClass('d-flex');

setTimeout(()=> {
  let options = {
    chart: {
      renderTo: 'mining-status-bar-chart',
      type: 'column',
      backgroundColor: '#ffffff59' // Transparent background
    },
    title: {
      useHTML: true,
      // text: '<span style="font-style: italic;"><i class="fa-solid fa-map"></i> Mining Status</span>',
      text: '<span class="item-title" style="display: flex;align-items: center; gap: 7px;"><i class="game-icons--mining-helmet"></i> Mining Status</span>',
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
        text: 'Total Percent',
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      useHTML: true,
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
    },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        groupPadding: 0,
      },
    ],
    // exporting: {
    //   csv: {
    //     columnHeaderFormatter: function(item, key) {
    //       if (!item || item instanceof Highcharts.Axis) {
    //         return 'Year'
    //       } else if (!item || item instanceof Highcharts.Series) {
    //         return 'Area (sqkm)'
    //       } 
    //     } 
    //   }
    // }
  };

  options.series[0].data = mining_stats_data['computed_stats'];
  
  $('#loader-mining-status-container').removeClass('d-flex');
  $('#loader-mining-status-container').addClass('d-none');

  return new Highcharts.Chart(options);
},3000) 
}
