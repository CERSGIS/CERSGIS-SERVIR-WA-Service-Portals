function loadDistrictSummaryTable(data) {
    console.log("data", data);

    // Extract and accumulate points for unique districts
    let uniqueDistricts = {};
    data.features.forEach((feature) => {
        const districtKey = feature.properties?.district_code || "NA";
        const region = feature.properties?.region || "NA";
        const points = parseInt(feature.properties?.point) || 0

        console.log(points)
        if (uniqueDistricts[districtKey]) {
            // Accumulate points for the district
            uniqueDistricts[districtKey].points += points;
        } else {
            // Create a new entry for the district
            uniqueDistricts[districtKey] = {
                region: region,
                district: districtKey,
                points: points,
            };
        }
    });

    console.log(uniqueDistricts);
    // Convert the object back to an array for the DataTable
    const charcoal_table = Object.values(uniqueDistricts);

    // Reinitialize DataTable
    if ($.fn.DataTable.isDataTable("#district_summary_table")) {
        $("#district_summary_table").DataTable().clear().destroy();
    }

    $("#district_summary_table").DataTable({
        data: charcoal_table, // Pass the aggregated data array to the DataTable
        columns: [
            { data: "region", title: "Region" },
            { data: "district", title: "District" },
            { data: "points", title: "Accumulated Points" },
        ],
        scrollCollapse: true,
        scrollY: '500px',
    });

    // Update UI elements
    $('#district-summary-table-loader').removeClass('d-flex');
    $('#district-summary-table-loader').addClass('d-none');
    $('#tblborder').addClass('tblborder-active');
}
