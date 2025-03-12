   var map = L.map('mapid', {
       maxBounds:L.latLngBounds([3.7388,-4.262],[12.1748,2.200]),
       zoomControl: false,



   }).setView([7.099, -1.000],7);

   // setView([9.099, -1.000], 7);


   // googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
   //     maxZoom: 20,
   //     subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
   // }).addTo(map);

initialbasemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


$('#basemap' ).click(function(e){
  map.removeLayer(initialbasemap)
  initialbasemap =L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
  initialbasemap.addTo(map);
});



$('#basemap_osm' ).click(function(e){
  map.removeLayer(initialbasemap)
  initialbasemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
  initialbasemap.addTo(map);
});




// var optionmeasure = {
//   position: 'topleft' ,
//   primaryAreaUnit: 'hectares',
// }


// var measureControl = new L.Control.Measure(optionmeasure);
// measureControl.addTo(map);


//  L.control.browserPrint({
//     title: 'Just print me!',
//     documentTitle: 'Map printed using leaflet.browser.print plugin',

// }).addTo(map);





// $("#printmapbtn").click(function(){

// var modeToUse = L.control.browserPrint.mode.auto();
//  map.printControl.print(modeToUse)k;



// })



   L.control.browserPrint({
//         printLayer:L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   maxZoom: 19,
//   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }),
    // printModes: [ "Landscape" ],
    // manualMode: true // use true if it's debug and/or default button is okay for you, otherwise false.
    }).addTo(map);

  document.querySelector("#printmapbtn").addEventListener("click", function(){
    var modeToUse = L.control.browserPrint.mode.auto();
    map.printControl.print(modeToUse);
  });


 // function loadprojectmap(url, mnh, oneach,layer) {
 //        // removela(map, regmap)
 //        loaderbar('#loadbar', true)
 //        $.get(url, function(data) {
 //            layer = new L.GeoJSON(data, {
 //                style: mnh,
 //                onEachFeature: oneach
 //            })
 //            // .addTo(map);
 //            // removelaturn(regmap, true)
 //        }).done(function() {
 //            $('#districtcheck').prop('disabled', false)
 //            loaderbar('#loadbar', false)
 //            // districtmapdrawn('/mapApp/districtboundary/NONE/',newdistrict,onEachFeaturedis)

 //        }).fail(function() {
 //            // loaderbar('.regc.circlemainsmall',false)
 //        });
 //    }
















   function loadpointfunction(urls, oneach, layer, checkboxid,icon, mapstate) {
       $("#overlaybox").removeClass("hide")

        

       $.ajax({
           url: urls,
           async: false
       }).done(function(data) {

           // console.log(data[0]["geometry"]["type"])

           console.log(data.length)
          layer = new L.GeoJSON(data, {
					pointToLayer: function (feature, latlng) {
						 var baseballIcon = L.icon({iconUrl:icon ,iconSize: [40,40]});
					 return L.marker(latlng, {icon: baseballIcon});
					},

					onEachFeature: oneach
				});

    
           if (mapstate) {
               map.addLayer(layer)
           }

           $("#overlaybox").addClass("hide")

       });

       $('body').on('click', '#'+ checkboxid, function() {
       // $('#' + checkboxid).on('change', function() {
             
           var man = $('#' + checkboxid).is(':checked');
           if (man == true) {
               if (layer) {
                   map.addLayer(layer);
                   // map.addLayer(regioncapital);
                   // removelaturn(deliverylayer, true)
               }
           } else {
               map.removeLayer(layer);
               // map.removeLayer(regioncapital);
           }
       })


   }


var myStyle = {
    "color": "#777",
    "stroke": "TRUE",
    "weight": 4,
    "opacity": 1
};


// loadpointfunction("/mapapp/projectspoint/Infrastructure",onEach_projectpoints,Infrastructure,'Infrastructure','/static/mapApp/img/sectors/infrastructure2.png')

var Infrastructure_pt,Infrastructure_ln
       $.ajax({
           url: "/mapapp/projectspoint/Infrastructure",
           async: false
       }).done(function(data) {
          Infrastructure_pt = new L.GeoJSON(data, {
          pointToLayer: function (feature, latlng) {
             var baseballIcon = L.icon({iconUrl:'/static/mapApp/img/sectors/infrastructure2.png' ,iconSize: [40,40]});
           return L.marker(latlng, {icon:baseballIcon});
          },

          onEachFeature: onEach_projectpoints
        });

    
           // if (mapstate) {
           //     map.addLayer(layer)
           // }

           $("#overlaybox").addClass("hide")

       });




       $.ajax({
           url: "/mapapp/projectsline/Infrastructure/",
           async: false
       }).done(function(data) {

           // console.log(data[0]["geometry"]["type"])

         
          Infrastructure_ln =   L.geoJSON(data, {
                style: myStyle,
                onEachFeature: onEach_projectpoints
            });
    
            // map.addLayer(Infrastructure_ln)
           $("#overlaybox").addClass("hide")

       });





       $('body').on('click', '#Infrastructure', function() {
       // $('#' + checkboxid).on('change', function() {
             
           var man = $('#Infrastructure').is(':checked');
           if (man == true) {
               if (Infrastructure_ln ) {
                 
                 // regmap.bringToBack()
                 map.removeLayer(regmap);
                  // map.addLayer();
                  map.addLayer(Infrastructure_pt);
                  map.addLayer(Infrastructure_ln);
               
                  Infrastructure_ln.bringToFront()
                   // map.addLayer(regioncapital);
                   // removelaturn(deliverylayer, true)
               }
               // else if (Infrastructure_pt ){

               //   map.addLayer(Infrastructure_pt);
               // }
           } else {
                map.addLayer(regmap);
              map.removeLayer(Infrastructure_ln);
              map.removeLayer(Infrastructure_pt);
           }
       })














//      $.ajax({
//            url: "/mapapp/maplayer/",
//            async: false
//        }).done(function(data) {

//             alert("hii")
//           L.geoJSON(data, {
//                 style: myStyle
//             }).addTo(map);

          

//            $("#overlaybox").addClass("hide")

//        });







   function buildingpointStyles(feature, latlng) {
      var geojsonMarkerOptions = {
    radius: 6,
    fillColor: "#b1da5a",
    color: "#fff",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
       return L.circleMarker(latlng, geojsonMarkerOptions)
   }


var thisIcon = new L.Icon({
    iconUrl: '/static/mapApp/img/sectors/icons.png',
    iconAnchor: new L.Point(16, 16),

});
var toutIcon = new L.Icon({
    iconUrl: '/static/mapApp/img/sectors/health.png',
    iconAnchor: new L.Point(16, 16),
 
});



   function onEach_projectpoints(feature, layer) {
       layer.on({ click: zoomToFeaturerpoint,

        // mouseover: function(e){
            
        //     e.target.setIcon(thisIcon);
        // },
        // mouseout: function(e){
        //     console.log("mouseout");
       
        //    e.target.setIcon(toutIcon);
        // }


        });
       labeltoshow = '<div class="row" style="width:50px;" id=>'
       
       labeltoshow += "</div"
       // layer.bindPopup(labeltoshow,{Width: "auto"});
   };

    var theMarker = {};
    var boxToggle = 'off';
   function zoomToFeaturerpoint(e) {

    // alert(e.getCenter())
       // map.fitBounds(e.target.getBounds());
       // var latLngs = [e.target.getLatLng()];
       // // var markerBounds = L.latLngBounds(latLngs);
       // map.fitBounds(latLngs);

       $("#loadbar2").removeClass("hidden")
       $.get('/mapapp/projattri/' + e.target.feature.id, function(data) {
           $('#tab1').html(data)
           $("#loadbar2").addClass("hidden")
       });



          $.get('/mapapp/projectprogressattr/?code=' + e.target.feature.properties['proj_id'],function(data) {
           $('#tab2').html(data)
       });





            lat = e.latlng.lat;
              lon = e.latlng.lng;

           if (theMarker != undefined) {
                        map.removeLayer(theMarker);
                  };

              //Add a marker to show where you clicked.
               theMarker = L.marker([lat,lon]).addTo(map);  


       if (boxToggle == 'off') {
           $(".box1").animate({ width: "toggle" });
           boxToggle = 'on';
       } else if (boxToggle == 'on') {
           boxToggle = 'on';
       }
   }







// function zoomToFeaturerline(e) {

//     alert("hoooppe")
//        // map.fitBounds(e.target.getBounds());
//        var latLngs = [e.target.getLatLng()];
//        // var markerBounds = L.latLngBounds(latLngs);
//        map.fitBounds(latLngs);


//        $.get('/mapapp/projattri/' + e.target.feature.id, function(data) {
//            $('#tab1').html(data)
//        });



//           $.get('/mapapp/projectprogressattr/?code=' + e.target.feature.properties['proj_id'],function(data) {
//            $('#tab2').html(data)
//        });





//             lat = e.latlng.lat;
//               lon = e.latlng.lng;

//            if (theMarker != undefined) {
//                         map.removeLayer(theMarker);
//                   };

//               //Add a marker to show where you clicked.
//                theMarker = L.marker([lat,lon]).addTo(map);  









//        if (boxToggle == 'off') {
//            $(".box1").animate({ width: "toggle" });
//            boxToggle = 'on';
//        } else if (boxToggle == 'on') {
//            boxToggle = 'on';
//        }
//    }





























var legendToggle = 'no';

$("#legendbtn").click(function() {
  if (legendToggle == 'no') {
    $('#resultBox').css("display", "none");
    legendToggle = 'yes';
  }else {    
    $('#resultBox').css("display", "block"); 
    legendToggle = 'no';
  }
});





  $("#filtermap").click(function() {
       $(".slidebox1").animate({ width: "toggle" });
       //  if (boxToggle == 'off') {
       //   $(".box2").animate({width: "toggle"});
       //   boxToggle = 'on';
       // }else if (boxToggle == 'on') {   
       //   boxToggle = 'on';
       // }
   });

$("#berryClose1").click(function() {
    $(".slidebox1").animate({ width: "toggle" });
    boxToggle = 'off';
});



$("#berryClose").click(function() {
    $(".slidebox").animate({ width: "toggle" });
    boxToggle = 'off';
});

   //end of autocomplete  
   var basemapCont = 'off';
   var legendCont = 'off';

   function shutall() {
       $(".legendCont").css('display', 'none');
       $(".legendcet").css('display', 'none');
       $(".basemapCont").css('display', 'none');
       $(".basemapcet").css('display', 'none');
       basemapCont = 'off';
       legendCont = 'off';

   }

   function toggleLegend() {
       $(".legendCont").animate({
           width: "toggle"
       });
       $(".legendcet").animate({
           width: "toggle"
       });
   }


   function toggleBasemap() {
       $(".basemapCont").animate({
           width: "toggle"
       });
       $(".basemapcet").animate({
           width: "toggle"
       });
   }

   $('#legBox').click(function() {

       if (legendCont == 'off') {
           shutall();
           toggleLegend();

           legendCont = 'on';
           basemapCont = 'off';
       } else {
           shutall();
           legendCont = 'off';
           basemapCont = 'off';
       }
   });
   $('#baseMap').click(function() {
       if (basemapCont == 'off') {
           shutall();
           toggleBasemap();
           basemapCont = 'on';
           legendCont = 'off';
       } else {
           shutall();
           basemapCont = 'off';
           legendCont = 'off';
       }
   });









   $("#zoomin").click(function() {

       map.zoomIn(1);

   })


   $("#zoomout").click(function() {

       map.zoomOut(1);

   })



   $("#zoomex").click(function() {
       let ghanabounds = L.latLngBounds([3.7388,-4.262],[12.1748,2.200]);
       map.fitBounds(ghanabounds);

   })


   $('#zoomtabfil').on('click', function() {
       location.reload();
   })





   
   $('#basemap10').css('border-color', '#f00')
   $('.tileDiv').click(function(e) {

       map.removeLayer(initialbasemap)
       $('#basemap > img').css('border-color', '#3e5766')
       var toolname = $(this).attr('id');
       if (toolname == 'no_basemap') {
           initialbasemap = L.tileLayer('').addTo(map);;

       } else if (toolname == 'basemap1') {

           initialbasemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
               maxZoom: 19,
               attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
           }).addTo(map);

       } else if (toolname == 'basemap2') {

           initialbasemap = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
               maxZoom: 20,
               subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
           }).addTo(map);

       } else if (toolname == 'basemap3') {

           initialbasemap = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
               maxZoom: 19,
               attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
           }).addTo(map);
       } else if (toolname == 'basemap4') {
           initialbasemap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
               maxZoom: 17,
               attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
           }).addTo(map);

       } else if (toolname == 'basemap5') {
           initialbasemap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
               maxZoom: 17,
               attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
           }).addTo(map);

       } else if (toolname == 'basemap6') {
           initialbasemap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
               attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
           }).addTo(map);
       } else if (toolname == 'basemap7') {
           initialbasemap = L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/roads_and_labels/{z}/{x}/{y}.png', {
               maxZoom: 18,
               attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
           }).addTo(map)


       } else if (toolname == 'basemap8') {
           initialbasemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
               maxZoom: 19,
               attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
           }).addTo(map);


       } else if (toolname == 'basemap9') {
           initialbasemap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
               attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
           }).addTo(map);


       } else if (toolname == 'basemap10') {
           initialbasemap = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
               attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
               subdomains: 'abcd',
               minZoom: 0,
               maxZoom: 20,
               ext: 'png'
           }).addTo(map);


       }
   })














var Administration,Public_Safety,Economic,Infrastructure,Social
loadpointfunction("/mapapp/projectspoint/Administration",onEach_projectpoints,Administration,'Administration','/static/mapApp/img/sectors/admin2.png')

loadpointfunction("/mapapp/projectspoint/Public_Safety",onEach_projectpoints,Public_Safety,'Public_Safety','/static/mapApp/img/sectors/psafety2.png')

loadpointfunction("/mapapp/projectspoint/Economic",onEach_projectpoints,Economic,'Economic','/static/mapApp/img/sectors/economic2.png')

// loadpointfunction("/mapapp/projectspoint/Infrastructure",onEach_projectpoints,Infrastructure,'Infrastructure','/static/mapApp/img/sectors/infrastructure2.png')
// 
loadpointfunction("/mapapp/projectspoint/Social",onEach_projectpoints,Social,'Social','/static/mapApp/img/sectors/social2.png')

// loadpointfunction("/mapapp/projectspoint/Fisheries",onEach_projectpoints,fish,'fishchk','/static/mapApp/img/sectors/fisheries.png')



    $( "#dialog" ).dialog({
      autoOpen: false,
      width: 600, 
       height: 500, 
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "blind",
        duration: 1000
      },
    });
 
// $( function() {

//     $( "#filtermapload" ).on( "click", function() {
//       alert("eloooooooo")
//     if(!$("#dialog").dialog("isOpen")) {
//           $("#dialog").dialog("open");
//         } else {
//           $("#dialog").dialog("close");
//         }

//     });

//   } );
 // $("#dialog").dialog("option", "maxHeight", 600);



// var myLines = [{
//     "type": "LineString",
//     "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
// }, {
//     "type": "LineString",
//     "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
// }];

// var myStyle = {
//     "color": "#ff7800",
//     "weight": 5,
//     "opacity": 0.65
// };


// L.geoJSON(myLines, {
//     style: myStyle
// }).addTo(map);