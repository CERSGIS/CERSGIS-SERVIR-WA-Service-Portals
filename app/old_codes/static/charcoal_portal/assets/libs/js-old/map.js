var map = L.map('map').setView([6.155785, -1.936499], 9);


initialbasemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
            "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}", {
                maxZoom: 20,
                subdomains: ["mt0", "mt1", "mt2", "mt3"],
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
    mymap.fitBounds(e.target.getBounds());
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
  position: 'topleft' ,
  primaryAreaUnit: 'hectares',
}

var measureControl = new L.Control.Measure(optionmeasure);
measureControl.addTo(map);




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
     position: 'topleft',
 }).addTo(map);



L.control.browserPrint({ position: 'topleft' }).addTo(map);







let regionboundary, districtboundary, protectedareas, aoi, footprint, footprint_bound,
    footprint1, footprint2, footprint_compare_bound;

// ################################  Load region boundary  ####################################
function regionstlye() {
    return {
        fillColor: "transparent",
        weight: 2,
        opacity: 1,
        color: "red",
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

    regionboundary = L.geoJSON(res, {style: regionstlye, onEachFeature: regiononEachFeature});
      

        regionboundary.on('mouseover', function(e){
          e.layer.bindTooltip('<b>Region Name</b> :' +e.layer.feature.properties["region"] + ' REGION').openTooltip();
        })
      
      // if (check) {mymap.addLayer(regionboundary)}
        $("#loadregion").addClass("hidden")
    }
);


// ################################  Load district boundary  ####################################
function districtstyle() {
    return {
        fillColor: "transparent",
        weight: 2,
        opacity: 1,
        color: "MediumOrchid",
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

$.get('district', function(res) {
    districtboundary = L.geoJSON(res, {style: districtstyle, onEachFeature: districtonEachFeature});
    
    districtboundary.on('mouseover', function(e) {
        e.layer.bindTooltip(e.layer.feature.properties['district']).openTooltip();
    });
});


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


$.get('loadaoi', function(res) {
    aoi = L.tileLayer(res['mapid'])
});

// AOI check button
$('#aoi').change(function () {
    toggleLayer(map, aoi, $(this))
});

$('#region_boundary').change(function () {
    toggleLayer(map, regionboundary, $(this))
});

$('#district_boundary').change(function () {
    toggleLayer(map, districtboundary, $(this))
});

$('#protected_area_boundary').change(function () {
    toggleLayer(map, protectedareas, $(this))
});

// Get district on region change
$('#region').change(function () {
    let region = $(this).val();
    $.get('/get-districts?region=' + region,
    function (data) {
        $('#district').html(data)
    })
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


// EXECUTE BUTTON TO LOAD FOOTPRINT
$('#execute').on('click', function() {
    $('#loading-bar-spinner').css('display', 'block');

   let year = $('#year').val()
   let district = $('#district').val()
   let url = 'footprint?year=' + year + '&district=' + district;
   
   if (map.hasLayer(footprint)) {
    map.removeLayer(footprint);
    map.removeLayer(footprint_bound);
    }

    if (map.hasLayer(footprint1)) {
        map.removeLayer(footprint1);
        map.removeLayer(footprint2);
        map.removeLayer(footprint_compare_bound);
        map.removeControl(sbs)
    }

   $.get(url, function(res) {
    footprint = L.tileLayer(res['mapid'], {
        minZoom: 7,
    });

    let bound_style = {
        fillColor: "transparent",
        weight: 2,
        opacity: 1,
        color: "Black",
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

    footprint_bound = L.geoJSON(res['poly'], {style: bound_style});
    footprint_bound.on('mouseover', function (e) {
        e.layer.bindTooltip(tooltip_table).openTooltip()
    });

    $('#loading-bar-spinner').css('display', 'none');

    map.addLayer(footprint);
    map.addLayer(footprint_bound);
    map.fitBounds(footprint_bound.getBounds());

   });
});

// COMPARE GALAMASEY FOOTPRINT
$('#compare').on('click', function () {
    $('#loading-bar-spinner').css('display','block');

    let year1 = $('#year1').val();
    let year2 = $('#year2').val();
    let district = $('#district_compare').val();

    let url = 'compare-footprint?year1=' + year1 + '&year2=' + year2 + '&district=' + district;

    if (map.hasLayer(footprint1)) {
        map.removeLayer(footprint1);
        map.removeLayer(footprint2);
        map.removeLayer(footprint_compare_bound);
        map.removeControl(sbs)
    }

    if (map.hasLayer(footprint)) {
        map.removeLayer(footprint);
        map.removeLayer(footprint_bound);
    }

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
            weight: 2,
            opacity: 1,
            color: "Black",
            dashArray: "",
            fillOpacity: 0.7,
        };

        footprint_compare_bound = L.geoJSON(res['polygon'], {style: bound_style});

        $('#loading-bar-spinner').css('display', 'none');
        
        map.addLayer(footprint1)
        map.addLayer(footprint2)
        map.addLayer(footprint_compare_bound)
        map.fitBounds(footprint_compare_bound.getBounds())
        
        sbs = L.control.sideBySide(footprint1, footprint2);
        sbs.addTo(map)  
    });
    


});


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
        alert('Layer not is ready for visualisation.');
        checkbox.prop('checked', false)
    }
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

