let geoServerUrl = 'https://geoserver-dev.cersgis.org/geoserver/galamsey/wfs';

var map = L.map('map').setView([6.155785, -1.936499], 9);


// initialbasemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//  maxZoom: 19,
//  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

initialbasemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
  }).addTo(map);


map.invalidateSize();


$(".lgndthumb").click(function(e) {
    map.removeLayer(initialbasemap);
    $(".lgndthumb > img").css("border-color", "#3e5766");
    var toolname = $(this).attr("id");

    if (toolname == "no_basemap") {
        initialbasemap = L.tileLayer("").addTo(map);
    } else if (toolname == "basemap1") {
        initialbasemap = L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
            }
        ).addTo(map);
    } else if (toolname == "basemap2") {
        initialbasemap = L.tileLayer(
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            }
        ).addTo(map);
    } else if (toolname == "basemap3") {
        initialbasemap = L.tileLayer(
            "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
            }
        ).addTo(map);
    } else if (toolname == "basemap4") {
        initialbasemap = L.tileLayer(
            "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
                maxZoom: 17,
                attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
            }
        ).addTo(map);
    } else if (toolname == "basemap5") {
        initialbasemap = L.tileLayer(
            "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
                maxZoom: 17,
                attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
            }
        ).addTo(map);
    } else if (toolname == "basemap6") {
        initialbasemap = L.tileLayer(
            "http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
                attribution: "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012",
            }
        ).addTo(map);
    } else if (toolname == "basemap7") {
        initialbasemap = L.tileLayer(
            "https://{s}.tile.openstreetmap.se/hydda/roads_and_labels/{z}/{x}/{y}.png", {
                maxZoom: 18,
                attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }
        ).addTo(map);
    } else if (toolname == "basemap8") {
        initialbasemap = L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }
        ).addTo(map);
    } else if (toolname == "basemap9") {
        initialbasemap = L.tileLayer(
            "http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}", {
                attribution: "Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri",
            }
        ).addTo(map);
    } else if (toolname == "basemap10") {
        initialbasemap = L.tileLayer(
            "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}", {
                attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                subdomains: "abcd",
                minZoom: 0,
                maxZoom: 20,
                ext: "png",
            }
        ).addTo(map);
    }
    initialbasemap.bringToBack();
});




function loadtilelayer(url, layer) {
    $("#overlay").css("display", "block");
    if (layer) {
        map.removeLayer(layer);
    }

    $.get(url, function(res) {
        layer = L.tileLayer(res["mapid"]);
        map.addLayer(layer);
        $("#overlay").css("display", "none");
    });
    return layer;
}

var lulc,landuse


// loadtilelayer("/loadgee", lulc)



$(".tileDiv").click(function(e) {
    map.removeLayer(initialbasemap);
    $(".lgndthumb > img").css("border-color", "#3e5766");
    var toolname = $(this).attr("id");

    if (toolname == "no_basemap") {
        initialbasemap = L.tileLayer("").addTo(map);
    } else if (toolname == "osm") {
        initialbasemap = L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
            }
        ).addTo(map);
    } else if (toolname == "sate") {
        initialbasemap = L.tileLayer(
            'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
                maxZoom: 20,
                subdomains:['mt0','mt1','mt2','mt3']
            }
        ).addTo(map);
    } else if (toolname == "topo") {
        initialbasemap = L.tileLayer(
            "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
                maxZoom: 17,
                attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
            }
        ).addTo(map);
    } else if (toolname == "basemap7") {
        initialbasemap = L.tileLayer(
            "https://{s}.tile.openstreetmap.se/hydda/roads_and_labels/{z}/{x}/{y}.png", {
                maxZoom: 18,
                attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }
        ).addTo(map);
    } else if (toolname == "basemap8") {
        initialbasemap = L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
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
  position: 'bottomleft' ,
  primaryAreaUnit: 'hectares',
  secondaryAreaUnit: 'sqmeters',
  primaryLengthUnit: 'meters',
  secondaryLengthUnit: 'kilometers',

}

var measureControl = new L.Control.Measure(optionmeasure);




let coords;
var drawnItems = new L.geoJson().addTo(map);
drawnItems.bringToFront();
var layer;

 map.on(L.Draw.Event.CREATED, function(event) {
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
     position: 'bottomleft',
 });



var browserPrintControl = L.control.browserPrint({ position: 'bottomleft' });







var regionboundary, districtboundary, protectedareas, aoi, mineral_concession, footprint, footprint_bound,
    footprint1, footprint2, footprint_compare_bound, year_15, year_16, year_17, year_18, year_19, year_20, year_21, year_22;

// ################################  Load region boundary  ####################################
function regionstlye() {
    return {
        fillColor: "transparent",
        weight: 5,
        opacity: 1,
        color: "#ff7f7f",
        dashArray: "3",
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


$.get("region",function(res) {

    // regionboundary = L.geoJSON(res, {style: regionstlye, onEachFeature: regiononEachFeature});
    regionboundary = L.Geoserver.wfs(geoServerUrl, 
        {
            layers: "galamsey:region",
            style: regionstlye, 
            onEachFeature: regiononEachFeature
        });
      

        regionboundary.on('mouseover', function(e){
          e.layer.bindTooltip(e.layer.feature.properties["region"] + ' REGION').openTooltip();
        })
      
      // if (check) {mymap.addLayer(regionboundary)}
        // $("#loadregion").addClass("hidden")
        let region_checkbox = $('#region_boundary').prop('checked',true);
        toggleLayer(map,regionboundary,region_checkbox);
        toggleLegend(region_checkbox,'#legend-region');
    }

);


// ################################  Load district boundary  ####################################
function districtstyle() {
    return {
        fillColor: "transparent",
        weight: 2,
        opacity: 1,
        color: "#ffbebe",
        dashArray: "3",
        fillOpacity: 0.7,
    }
}

function districtresetHighlight(e) {
    districtboundary.resetStyle(e.target);
}

function districtonEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: districtresetHighlight,
        click: zoomToFeature

    });
}

// $.get('district', function(res) {
//     districtboundary = L.geoJSON(res, {style: districtstyle, onEachFeature: districtonEachFeature});
    
//     districtboundary.on('mouseover', function(e) {
//         e.layer.bindTooltip(e.layer.feature.properties['district']).openTooltip();
//     });
// });


function protectedstyle() {
    return {
        fillColor: "transparent",
        weight: 2,
        opacity: 1,
        color: "Green",
        dashArray: "3",
        fillOpacity: 0.7,
    }
}

function protectedresetHighlight(e) {
    protectedareas.resetStyle(e.target);
}

function protectedonEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: protectedresetHighlight,
        click: zoomToFeature

    });
}


$.get('protected-area', function (res) {
    protectedareas = L.geoJSON(res, {style: protectedstyle, onEachFeature: protectedonEachFeature});

    protectedareas.on('mouseover', function (e) {
        e.layer.bindTooltip(e.layer.feature.properties['reserve_na']).openTooltip();
    });
});

function mineralstyle() {
    return {
        fillColor: "transparent",
        weight: 2,
        opacity: 1,
        color: "#ffb502",
        dashArray: "3",
        fillOpacity: 0.7,
    }
}

function mineralresetHighlight(e) {
    mineral_concession.resetStyle(e.target);
}

function mineralOnEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: mineralresetHighlight,
        click:zoomToFeature
    });
}

$.get('mineral-concession', function (res) {
    mineral_concession = L.geoJSON(res, {style: mineralstyle, onEachFeature: mineralOnEachFeature});

    mineral_concession.on('mouseover', function (e) {
        e.layer.bindTooltip(


           `<div class="container table-responsive"> <table class="table table-bordered table-hover"> <thead class="thead-dark"> <tr> <th scope="col" colspan="2" class="text-center"> Information on the Concession </th></tr> </thead> <tbody> <tr><th scope="row">Owner</th><td>`+ e.layer.feature.properties['owner']+`</td> </tr><tr> <th scope="row">Type</th> <td>`+ e.layer.feature.properties['type'] +`</td></tr><tr> <th scope="row">Status</th> <td>`+ e.layer.feature.properties['status'] +`</td> </tr> <tr> <th scope="row">Code</th> <td>`+e.layer.feature.properties['code']+`</td> </tr> <tr> <th scope="row">Assets</th> <td>`+e.layer.feature.properties['assets']+`</td> </tr> </tbody> </table> </div>`
).openTooltip();
    });
});

function miningConcessionStyle() {
    return {
        fillColor: "transparent",
        weight: 3,
        opacity: 1,
        color: "#4139b0",
        dashArray: "3",
        fillOpacity: 0.7,
    }
  }

$.get('mining-concession', function (res) {
    miningConcession = L.geoJson(res, { style: miningConcessionStyle })
  });

// ################## AREA OF INTEREST STYLING ####################
function aoiStyle() {
    return {
      color: '#000',
      fillColor: '#00000087',
      weight: 2,
      fillOpacity: 0.7,
    };
}

// $.get('loadaoi', function(res) {
//     // aoi = L.tileLayer(res['mapid'])
//     aoi = L.geoJSON(res, {style: aoiStyle})

//     aoi.on('click', function (e) {
//         e.layer.bindTooltip(e.layer.feature.properties['areasq_km']).openTooltip();
//     });
// });

function doiStyle() {
    return {
      fillColor: 'transparent',
      weight: 2,
      opacity: 1,
      color: '#000000',
      dashArray: '3',
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
    doi.resetStyle(e.target);
  }

$.get('loaddoi', function (res) {
    doi = L.geoJson(res, { style: aoiStyle, onEachFeature: onEachDoiFeature })

    doi.on('mouseover', function(e) {
        e.layer.bindTooltip(`<div style="padding: 0;" class="">`+ e.layer.feature.properties['district']+`
</div>`).openTooltip();
    })
    
  });


// ############### FOOTPRINTS FOR YEARS #####################
function footprintStyle1() {
    return {
        color: '#fcfa00',
        fillColor: '#fcfa00',
        weight: 2,
        fillOpacity: 0.7
    }
}
function footprintStyle2() {
    return {
        color: '#ec0cdf',
        fillColor: '#ec0cdf',
        weight: 2,
        fillOpacity: 0.7
    }
}
function footprintStyle3() {
    return {
        color: '#0097fc',
        fillColor: '#0097fc',
        weight: 2,
        fillOpacity: 0.7
    }
}
function footprintStyle4() {
    return {
        color: '#bc0a0a',
        fillColor: '#bc0a0a',
        weight: 2,
        fillOpacity: 0.7
    }
}
function footprintStyle5() {
    return {
        color: '#7f4695',
        fillColor: '#7f4695',
        weight: 2,
        fillOpacity: 0.7
    }
}
function footprintStyle6() {
    return {
        color: '#4139b0',
        fillColor: '#4139b0',
        weight: 2,
        fillOpacity: 0.7
    }
}

// Footprints for old Years
$.get('footprint?national=national&layer=true&year=2015', function(res) {
    year_15 = L.tileLayer(res['mapid'], {
        minZoom: 7
    });
});
$.get('footprint?national=national&layer=true&year=2016', function(res) {
    year_16 = L.tileLayer(res['mapid'], {
        minZoom: 7
    });
});
$.get('footprint?national=national&layer=true&year=2017', function(res) {
    year_17 = L.tileLayer(res['mapid'], {
        minZoom: 7
    });
});
$.get('footprint?national=national&layer=true&year=2018', function(res) {
    year_18 = L.tileLayer(res['mapid'], {
        minZoom: 7
    });
});
$.get('footprint?national=national&layer=true&year=2019', function(res) {
    year_19 = L.tileLayer(res['mapid'], {
        minZoom: 7
    });
    // aoi = L.geoJSON(res, {style: aoiStyle})


    // aoi.on('click', function (e) {
    //     e.layer.bindTooltip(e.layer.feature.properties['areasq_km']).openTooltip();
    // });
});
$.get('footprint?national=national&layer=true&year=2020', function(res) {
    year_20 = L.tileLayer(res['mapid'], {
        minZoom: 7
    });
});
$.get('footprint?national=national&layer=true&year=2021', function(res) {
    year_21 = L.tileLayer(res['mapid'], {
        minZoom: 7
    });
    // aoi = L.geoJSON(res, {style: aoiStyle})


    // aoi.on('click', function (e) {
    //     e.layer.bindTooltip(e.layer.feature.properties['areasq_km']).openTooltip();
    // });
});
$.get('footprint?national=national&layer=true&year=2022', function(res) {
    year_22 = L.tileLayer(res['mapid'], {
        minZoom: 7
    });
    // aoi = L.geoJSON(res, {style: aoiStyle})


    // aoi.on('click', function (e) {
    //     e.layer.bindTooltip(e.layer.feature.properties['areasq_km']).openTooltip();
    // });
});







// year_16 = loadYearFootprint(geoServerUrl,footprintStyle1)

// $.get(`http://3.120.135.85:8080/geoserver/cite/wfs?service=WFS&version=1.0.0&request=GetFeature&typename=cite:footprints&cql_filter=year=2016 AND status='active site'&outputFormat=application/json`, function (res) {
//     // year_16 = loadVectorLayerFunction(geoServerUrl, 'footprints', 'galamsey_footprint');
//     year_16 = L.geoJSON(res, {style: footprintStyle1}) 
// });
// $.get(`http://3.120.135.85:8080/geoserver/cite/wfs?service=WFS&version=1.0.0&request=GetFeature&typename=cite:footprints&cql_filter=year=2017 AND status='active site'&outputFormat=application/json`, function (res) {
//     // year_16 = loadVectorLayerFunction(geoServerUrl, 'footprints', 'galamsey_footprint');
//     year_17 = L.geoJSON(res, {style: footprintStyle2}) 
// });
// $.get(`http://3.120.135.85:8080/geoserver/cite/wfs?service=WFS&version=1.0.0&request=GetFeature&typename=cite:footprints&cql_filter=year=2018 AND status='active site'&outputFormat=application/json`, function (res) {
//     year_18 = L.geoJSON(res, {style: footprintStyle3}) 
// });
// $.get(`http://3.120.135.85:8080/geoserver/cite/wfs?service=WFS&version=1.0.0&request=GetFeature&typename=cite:footprints&cql_filter=year=2019 AND status='active site'&outputFormat=application/json`, function (res) {
//     year_19 = L.geoJSON(res, {style: footprintStyle4}) 
// });
// $.get(`http://3.120.135.85:8080/geoserver/cite/wfs?service=WFS&version=1.0.0&request=GetFeature&typename=cite:footprints&cql_filter=year=2020 AND status='active site'&outputFormat=application/json`, function (res) {
//     year_20 = L.geoJSON(res, {style: footprintStyle5}) 
// });
// $.get(`http://3.120.135.85:8080/geoserver/cite/wfs?service=WFS&version=1.0.0&request=GetFeature&typename=cite:footprints&cql_filter=year=2022 AND status='active site'&outputFormat=application/json`, function (res) {
//     year_22 = L.geoJSON(res, {style: footprintStyle6}) 
// });
// $.get('loadfootprint?year=2017', function (res) {
//     year_17 = L.geoJSON(res, {style: footprintStyle2}) 
// });
// $.get('loadfootprint?year=2018', function (res) {
//     year_18 = L.geoJSON(res, {style: footprintStyle3}) 
// });

$('#2015').change(function () {
    toggleLayer(map, year_15,$(this))
    toggleLegend($(this),'#legend-footprint-2015')
});
$('#2016').change(function () {
    toggleLayer(map, year_16,$(this))
    toggleLegend($(this),'#legend-footprint-2016')
});
$('#2017').change(function () {
    toggleLayer(map, year_17,$(this))
    toggleLegend($(this),'#legend-footprint-2017')
});
$('#2018').change(function () {
    toggleLayer(map, year_18,$(this))
    toggleLegend($(this),'#legend-footprint-2018')
});
$('#2019').change(function () {
    toggleLayer(map, year_19,$(this))
    toggleLegend($(this),'#legend-footprint-2019')
});
$('#2020').change(function () {
    toggleLayer(map, year_20,$(this))
    toggleLegend($(this),'#legend-footprint-2020')
});
$('#2021').change(function () {
    toggleLayer(map, year_21,$(this))
    toggleLegend($(this),'#legend-footprint-2021')
});
$('#2022').change(function () {
    toggleLayer(map, year_22,$(this))
    toggleLegend($(this),'#legend-footprint-2022')
});

// AOI check button
$('#aoi').change(function () {
    toggleLayer(map, aoi, $(this))
    toggleLegend($(this),'#legend-aoi');
});

$('#doi').change(function () {
    toggleLayer(map, doi, $(this));
  });

$('#region_boundary').change(function () {
    toggleLayer(map, regionboundary, $(this));
    toggleLegend($(this),'#legend-region');
});

$('#district_boundary').change(function () {
    toggleLayer(map, districtboundary, $(this));
    toggleLegend($(this),'#legend-district');
});

$('#protected_area_boundary').change(function () {
    toggleLayer(map, protectedareas, $(this))
    toggleLegend($(this),'#legend-protected-areas');
});

$('#mineral_concession_boundary').change(function () {
    toggleLayer(map, mineral_concession, $(this))
    toggleLegend($(this),'#legend-mineral-concession');
});

$('#mining_concession_boundary').change(function () {
    toggleLayer(map, miningConcession, $(this));
    toogleLegend($(this), '#legend-mining-concession');
  });

// Get district on region change
$('#region').change(function () {
    let region = $(this).val();
    $.get('/get-districts?region=' + region,
    function (data) {
        $('#district').html(data)
    })
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

    switch(level) {
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
    $.get('/get-districts?region=' + region,
    function (data) {
        $('#district_compare').html(data)
    })
});

// RESET FOOTPRINT
$('#reset').on('click', function() {
    if (map.hasLayer(footprint)) {
        map.removeLayer(footprint);
        map.removeLayer(footprint_bound);
    }    
});

// EXECUTE BUTTON TO LOAD FOOTPRINT OR COMPARE FOOTPRINTS
$('#execute').on('click', function () {
    let boundary = $('#boundary').val()

    if (boundary == 'admin_boundaries') {
        let level = $('#level').val();
        switch(level) {
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
                ''
        }
    }  else if (boundary == 'protected_area') {
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
    let url = 'protected-area-footprint?protected_area=' + protected_area + '&year=' + year;

    $.get(url, function (res) {
        footprint = L.tileLayer(res['mapid'], {
            minZoom: 7,
        });
        
        let bound_style = {
            fillColor: "transparent",
            weight: 5,
            opacity: 1,
            color: "#fff",
            dashArray: "",
            fillOpacity: 0.7,
        };
        
        footprint_bound = L.geoJSON(res['polygon'], {style: bound_style});
        
        $('#loading-bar-spinner').css('display', 'none');
            
        $('#legend-selected-district').css('display','block')
        $('#legend-footprint-'+year).css('display','block')
        
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
    let url = 'protected-area-footprint?protected_area='+ protected_area + '&year1=' + year1 + '&year2=' + year2;

    $.get(url, function (res) {
        footprint1 = L.tileLayer(res['mapid_1'],{
            minZoom: 7,
        });

        footprint2 = L.tileLayer(res['mapid_2'], {
            minZoom: 7,
        });

        let bound_style = {
            fillColor: "transparent",
            weight: 5,
            opacity: 1,
            color: "#fff",
            dashArray: "",
            fillOpacity: 0.7,
        };

        footprint_compare_bound = L.geoJSON(res['polygon'], {style: bound_style});

        $('#loading-bar-spinner').css('display', 'none');

        $('#legend-selected-district').css('display','block')
        $('#legend-year-one').css('display','block')
        $('#legend-year-two').css('display','block')
        
        map.addLayer(footprint1)
        map.addLayer(footprint2)
        map.addLayer(footprint_compare_bound)
        map.fitBounds(footprint_compare_bound.getBounds())
        
        sbs = L.control.sideBySide(footprint1, footprint2);
        sbs.addTo(map) 
    });
}

// LOAD NATIONAL FOOTPRINT
function loadnationalfootprint() {
    $('#loading-bar-spinner').css('display','block');
    
    let year = $('#year').val();
    let url = 'footprint?national=national&year=' + year;


    $.get(url, function (res) {
        footprint = L.tileLayer(res['mapid'], {
            minZoom: 7,
        });

        let bound_style = {
            fillColor: "transparent",
            weight: 5,
            opacity: 1,
            color: "#fff",
            dashArray: "",
            fillOpacity: 0.7,
        };

        footprint_bound = L.geoJSON(res['polygon'], {style: bound_style});

        footprint_bound.on('mouseover',  function (e) {
            e.layer.bindTooltip('The Area is ' + res['size'] + ' square meters').openTooltip();
        });

        $('#loading-bar-spinner').css('display', 'none');
    
        $('#legend-selected-district').css('display','block')
        $('#legend-footprint-'+year).css('display','block')
        
        map.addLayer(footprint);
        map.addLayer(footprint_bound);
        map.fitBounds(footprint_bound.getBounds());
        
    });
}

// COMPARE NATIONAL FOOTPRINT
function comparenationalfootprint() {
    $('#loading-bar-spinner').css('display','block');
    
    let year1 = $('#year1').val();
    let year2 = $("#year2").val();
    let url = 'footprint?national&year1=' + year1 + '&year2=' + year2;

    $.get(url, function (res) {
        // Footprint responses
        footprint1 = L.tileLayer(res['mapid_1'],{
            minZoom: 7,
        });
        footprint2 = L.tileLayer(res['mapid_2'],{
            minZoom: 7,
        });

        let bound_style = {
            fillColor: "transparent",
            weight: 5,
            opacity: 1,
            color: "#fff",
            dashArray: "",
            fillOpacity: 0.7,
        };

        footprint_compare_bound = L.geoJSON(res['polygon'], {style: bound_style});

        footprint_compare_bound.on('mouseover',  function (e) {
            e.layer.bindTooltip('The Area is ' + res['size'] + ' square meters').openTooltip();
        });

        $('#loading-bar-spinner').css('display', 'none');

        $('#legend-selected-district').css('display','block')
        $('#legend-year-one').css('display','block')
        $('#legend-year-two').css('display','block')
        
        map.addLayer(footprint1)
        map.addLayer(footprint2)
        map.addLayer(footprint_compare_bound)
        map.fitBounds(footprint_compare_bound.getBounds())
        
        sbs = L.control.sideBySide(footprint1, footprint2);
        sbs.addTo(map)
    });

}

// LOAD REGION FOOTPRINT
function loadregionfootprint() {
    $('#loading-bar-spinner').css('display','block');

    let year = $('#year').val();
    let region = $('#region').val();
    let url = 'footprint?region=' + region + '&year=' + year;


    $.get(url, function (res) {
        footprint = L.tileLayer(res['mapid'], {
            minZoom: 7,
        });

        let bound_style = {
            fillColor: "transparent",
            weight: 5,
            opacity: 1,
            color: "#fff",
            dashArray: "",
            fillOpacity: 0.7,
        };

        footprint_bound = L.geoJSON(res['polygon'], {style: bound_style});

        footprint_bound.on('mouseover',  function (e) {
            e.layer.bindTooltip('The Area is ' + res['size'] + ' square meters').openTooltip();
        });

        $('#loading-bar-spinner').css('display', 'none');
    
        $('#legend-selected-district').css('display','block')
        $('#legend-footprint-'+year).css('display','block')

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
    let url = 'footprint?region=' + region + '&year1=' + year1 + '&year2=' + year2;

    $.get(url, function (res) {
        // Footprint responses
        footprint1 = L.tileLayer(res['mapid_1'],{
            minZoom: 7,
        });
        footprint2 = L.tileLayer(res['mapid_2'],{
            minZoom: 7,
        });

        let bound_style = {
            fillColor: "transparent",
            weight: 5,
            opacity: 1,
            color: "#fff",
            dashArray: "",
            fillOpacity: 0.7,
        };

        footprint_compare_bound = L.geoJSON(res['polygon'], {style: bound_style});

        footprint_compare_bound.on('mouseover',  function (e) {
            e.layer.bindTooltip('The Area is ' + res['size'] + ' square meters').openTooltip();
        });

        $('#loading-bar-spinner').css('display', 'none');

        $('#legend-selected-district').css('display','block')
        $('#legend-year-one').css('display','block')
        $('#legend-year-two').css('display','block')
        
        map.addLayer(footprint1)
        map.addLayer(footprint2)
        map.addLayer(footprint_compare_bound)
        map.fitBounds(footprint_compare_bound.getBounds())
        
        sbs = L.control.sideBySide(footprint1, footprint2);
        sbs.addTo(map)  
    });

}

// LOAD DISTRICT FOOTPRINT
function loaddistrictfootprint() {
    $('#loading-bar-spinner').css('display', 'block');

   let year = $('#year').val()
   let district = $('#district').val()
   let url = 'footprint?year=' + year + '&district=' + district;

   $.get(url, function(res) {
    footprint = L.tileLayer(res['mapid'], {
        minZoom: 7,
    });

    let bound_style = {
        fillColor: "transparent",
        weight: 5,
        opacity: 1,
        color: "#fff",
        dashArray: "",
        fillOpacity: 0.7,
    };

    let table_data = res['data'];

    // Table for the Tooltip
    let tooltip_table = `
<div class="container table-responsive py-5"> 
<table class="table table-bordered table-hover">
  <thead class="thead-dark">
    <tr>
      <th scope="col" colspan="2" class="text-center">Galamsey Information for `+ table_data.district +` in the `+ table_data.year +`</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Region</th>
      <td>`+ table_data.region +`</td>
    </tr>
    <tr>
      <th scope="row">District</th>
      <td>`+ table_data.district +`</td>
    </tr>
    <tr>
      <th scope="row">Footprint Size in the Region(Hectares)</th>
      <td>`+ table_data.region_area +`</td>
    </tr>
     <tr>
      <th scope="row">Footprint Size in the District(Hectares)</th>
      <td>`+ table_data.district_area +`</td>
    </tr>
  </tbody>
</table>
</div>
`

    footprint_bound = L.geoJSON(res['polygon'], {style: bound_style});
    footprint_bound.on('click', function (e) {
        e.layer.bindTooltip(tooltip_table).openTooltip()
    });

    footprint_bound.on('mouseover',  function (e) {
        e.layer.bindTooltip('The Area is ' + res['size'] + ' square meters').openTooltip();
    });

    $('#loading-bar-spinner').css('display', 'none');
    
    $('#legend-selected-district').css('display','block')
    $('#legend-footprint-'+year).css('display','block')

    map.addLayer(footprint);
    map.addLayer(footprint_bound);
    map.fitBounds(footprint_bound.getBounds());

   });
};

// COMPARE DISTRICT FOOTPRINT
function comparedistrictfootprint() {
    $('#loading-bar-spinner').css('display','block');

    let year1 = $('#year1').val();
    let year2 = $('#year2').val();
    let district = $('#district').val();

    let url = 'footprint?year1=' + year1 + '&year2=' + year2 + '&district=' + district;

    $.get(url, function (res) {
        // Footprint responses
        footprint1 = L.tileLayer(res['mapid_1'],{
            minZoom: 7,
        });
        footprint2 = L.tileLayer(res['mapid_2'],{
            minZoom: 7,
        });

        let bound_style = {
            fillColor: "transparent",
            weight: 5,
            opacity: 1,
            color: "#fff",
            dashArray: "",
            fillOpacity: 0.7,
        };

        footprint_compare_bound = L.geoJSON(res['polygon'], {style: bound_style});

        footprint_compare_bound.on('mouseover',  function (e) {
            e.layer.bindTooltip('The Area is' + res['size'] + 'square meters').openTooltip();
        });

        $('#loading-bar-spinner').css('display', 'none');

        $('#legend-selected-district').css('display','block')
        $('#legend-year-one').css('display','block')
        $('#legend-year-two').css('display','block')
        
        map.addLayer(footprint1)
        map.addLayer(footprint2)
        map.addLayer(footprint_compare_bound)
        map.fitBounds(footprint_compare_bound.getBounds())
        
        sbs = L.control.sideBySide(footprint1, footprint2);
        sbs.addTo(map)  
    });
    


};

// Reset All Footprint Layers
function resetFootprintLayers() {
    if (map.hasLayer(regionboundary)) {
        map.removeLayer(regionboundary)
        $('#region_boundary').prop('checked',false)
        toggleLegend($('#region_boundary'), '#legend-region');
        resetLegend();
    }
    
    if (map.hasLayer(districtboundary)) {
        map.removeLayer(districtboundary)
        $('#district_boundary').prop('checked',false)
        toggleLegend($('#district_boundary'), '#legend-district');
        resetLegend();
    }
    
    if (map.hasLayer(protectedareas)) {
        map.removeLayer(protectedareas)
        $('#protected_area_boundary').prop('checked',false)
        toggleLegend($('#protected_area_boundary'), '#legend-protected-areas');
        resetLegend();
    }
    
    if (map.hasLayer(aoi)) {
        map.removeLayer(aoi)
        $('#aoi').prop('checked',false)
        toggleLegend($('#aoi'), '#legend-aoi');
        resetLegend();
    }

    if (map.hasLayer(year_15)) {
        map.removeLayer(year_15)
        $('#2015').prop('checked',false)
        toggleLegend($('#2015'), '#legend-footprint-2015');
        resetLegend();
    }

    if (map.hasLayer(year_18)) {
        map.removeLayer(year_18)
        $('#2018').prop('checked',false)
        toggleLegend($('#2018'), '#legend-footprint-2018');
        resetLegend();
    }

    if (map.hasLayer(year_22)) {
        map.removeLayer(year_22)
        $('#2022').prop('checked',false)
        toggleLegend($('#2022'), '#legend-footprint-2022');
        resetLegend();
    }
    
    
    if (map.hasLayer(mineral_concession)) {
        map.removeLayer(mineral_concession)
        $('#mineral_concession_boundary').prop('checked',false)
        toggleLegend($('#mineral_concession_boundary'), '#legend-mineral-concession');
        resetLegend();
    }

    if (map.hasLayer(footprint)) {
        resetLegend();
        map.removeLayer(footprint);
        map.removeLayer(footprint_bound);
    }
 
    if (map.hasLayer(footprint1)) {
        resetLegend()
        map.removeLayer(footprint1);
        map.removeLayer(footprint2);
        map.removeLayer(footprint_compare_bound);
        map.removeControl(sbs)
    }


    console.log($('#region_boundary'))

}

// Handler for Toggle
function toggleLayer(map, layer, checkbox) {
    if (layer) {
        map.removeLayer(layer)
        if (checkbox.prop('checked')) {
            map.removeLayer(layer)
            map.addLayer(layer)
        } else {
            map.removeLayer(layer)
        }
    } else {
        alert('Preparing layer for visualisation. Please check in a few seconds');
        checkbox.prop('checked', false)
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
    $('#legend-selected-district').css('display','none')
    $('#legend-footprint-2015').css('display','none')
    $('#legend-footprint-2018').css('display','none')
    $('#legend-footprint-2022').css('display','none')
    $('#legend-year-one').css('display','none')
    $('#legend-year-two').css('display','none')
}


// POLYGON TOOL ANALYSIS FEATURE
$("#buttonchange").on("click", function() {
    if (coords) {
        console.log(coords)
        // $(".overlay1").removeClass("hidden");

        // $("#changedetection").dialog("open");

        // $.get(
        //     "/map/areacomputation/?from=" +
        //     $("#from").val() +
        //     "&to=" +
        //     $("#to").val() +
        //     "&from1=" +
        //     $("#from1").val() +
        //     "&to1=" +
        //     $("#to1").val() +
        //     "&coords=" +
        //     coords,
        //     function(data) {
        //         $("#analysis_cont").html(data);
        //         $(".overlay1").addClass("hidden");
        //     }
        // );
    } else {
        swal(
            "Sorry !!!!! ",
            "Please select your area of interest using the rectangle or polygon tool",
            "info"
        );
    }
});

// Adding Controls
browserPrintControl.addTo(map)
drawtool.addTo(map)
measureControl.addTo(map)

map.zoomControl.setPosition('bottomleft'); 