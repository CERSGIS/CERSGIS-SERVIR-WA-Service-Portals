  /**
   * Sidebar toggle
   */
  if (document.querySelector('.toggle-sidebar-btn')) {

    document.addEventListener('click', function(e) {
        if (e.target.matches('.toggle-sidebar-btn')){
        document.querySelector('body').classList.toggle('toggle-sidebar')
        }
    })

  }


$(document).ready(function() {
    $('#switchyear').change(function() {
        if ($(this).prop('checked')) {
            $(".oneyear").css('display', 'none');
            $(".twoyear").css('display', 'block');
        }
        else {
            $(".oneyear").css('display', ' block');
            $(".twoyear").css('display', 'none');
        }
    });
});

// var basemapCont = 'off';
var detialsbox = 'off';
var layerbox = 'off';
var querybox = 'off';
var box3 = 'off';
var basemapbox = 'off';
var legendbox = 'off';
var footprintsbox = 'off';
var analyticsbox = 'off';
var reportbox = 'off';
var manualbox = 'off';
var referencebox = 'off';

function shutallboxes() {
    $(".detials").css('display', 'none');
    $(".layer").css('display', 'none');
    // $(".query").css('display', 'none');
    $(".footprints-modal").css('display', 'none');
    $(".basemap").css('display', 'none');
    $(".query-container").css('display', 'none');
    $(".report").css('display', 'none');
    $(".manual").css('display', 'none');
    $(".reference").css('display', 'none');
    // $(".iconbox").removeClass("active");
    layerbox = 'off';
    querybox = 'off';
    detialsbox = 'off';
    basemapbox = 'off';
    footprintsbox = 'off';
    analyticsbox = 'off';
    reportbox = 'off';
    manualbox = 'off';
    referencebox = 'off';

    // Toggle dashboard off
    toggleDashboardOff()

    if ($('body').hasClass('analysis-opened')){
        $('body').toggleClass('analysis-opened')
        $('#map').removeClass('d-none')
        $('#analysis-map').addClass('d-none')
    }

    analysis_map.invalidateSize()
    map.invalidateSize()
}


function detials() {
    $(".detials").css('display', 'block');
    $(".layer").css('display', 'none');
    // $(".query").css('display', 'none');
    $(".footprints-modal").css('display', 'none');
    $(".basemap").css('display', 'none');
    $(".query-container").css('display', 'none');
    $(".report").css('display', 'none');
    $(".manual").css('display', 'none');
    $(".reference").css('display', 'none');
    // $(".iconbox").removeClass("active");
    // $("#iconbox1").addClass("active");
    layerbox = 'off';
    querybox = 'off';
    detialsbox = 'on';
    basemapbox = 'off';
    footprintsbox = 'off';
    analyticsbox = 'off';
    reportbox = 'off';
    manualbox = 'off';
    referencebox = 'off';
    
}

function layer() {
    $(".detials").css('display', 'none');
    $(".layer").css('display', 'block');
    // $(".query").css('display', 'none');
    $(".footprints-modal").css('display', 'none');
    $(".basemap").css('display', 'none');
    $(".query-container").css('display', 'none');
    $(".report").css('display', 'none');
    $(".manual").css('display', 'none');
    $(".reference").css('display', 'none');
    // $(".iconbox").removeClass("active");
    // $("#iconbox2").addClass("active");
    layerbox = 'on';
    querybox = 'off';
    detialsbox = 'off';
    basemapbox = 'off';
    footprintsbox = 'off';
    reportbox = 'off';
    manualbox = 'off';
    referencebox = 'off';
}

function showlegend() {
    $('.legend').css('display','block')

    legendbox = 'on';
}

function hidelegend() {
    $('.legend').css('display','none')

    legendbox = 'off';
}

function query() {
    $(".detials").css('display', 'none');
    $(".layer").css('display', 'none');
    // $(".query").css('display', 'block');
    $(".footprints-modal").css('display', 'block');
    $(".basemap").css('display', 'none');
    $(".query-container").css('display', 'none');
    $(".report").css('display', 'none');
    $(".manual").css('display', 'none');
    $(".reference").css('display', 'none');
    // $(".iconbox").removeClass("active");
    // $("#iconbox3").addClass("active");
    layerbox = 'off';
    querybox = 'on';
    detialsbox = 'off';
    basemapbox = 'off';
    analyticsbox = 'off';
    reportbox = 'off';
    manualbox = 'off';
    referencebox = 'off';
}

function basemap() {
    $(".detials").css('display', 'none');
    $(".layer").css('display', 'none');
    // $(".query").css('display', 'none');
    $(".footprints-modal").css('display', 'none');
    $(".basemap").css('display', 'block');
    $(".query-container").css('display', 'none');
    $(".report").css('display', 'none');
    $(".manual").css('display', 'none');
    $(".reference").css('display', 'none');
    // $(".iconbox").removeClass("active");
    // $("#iconbox3").addClass("active");
    layerbox = 'off';
    querybox = 'off';
    detialsbox = 'off';
    basemapbox = 'on';
    footprintsbox = 'off';
    analyticsbox = 'off';
    reportbox = 'off';
    manualbox = 'off';
    referencebox = 'off';
}

function footprints() {
    $(".detials").css('display', 'none');
    $(".layer").css('display', 'none');
    // $(".query").css('display', 'none');
    $(".footprints-modal").css('display', 'block');
    $(".basemap").css('display', 'none');
    $(".query-container").css('display', 'none');
    $(".report").css('display', 'none');
    $(".manual").css('display', 'none');
    $('.reference').css('display', 'none');
    // $(".iconbox").removeClass("active");
    // $("#iconbox3").addClass("active");
    layerbox = 'off';
    querybox = 'off';
    detialsbox = 'off';
    basemapbox = 'off';
    footprintsbox = 'on';
    analyticsbox = 'off';
    reportbox = 'off';
    manualbox = 'off';
    referencebox = 'off';
}

min = ['', 's']

function analytics() {
    $(".detials").css('display', 'none');
    $(".layer").css('display', 'none');
    $(".footprints-modal").css('display', 'none');
    $(".basemap").css('display', 'none');
    $(".query-container").css('display', 'block');
    $(".report").css('display', 'none');
    $(".manual").css('display', 'none');
    $('.reference').css('display', 'none');
    layerbox = 'off';
    querybox = 'off';
    detialsbox = 'off';
    basemapbox = 'off';
    footprintsbox = 'off';
    analyticsbox = 'on';
    reportbox = 'off';
    manualbox = 'off';
    referencebox = 'off';

    if (!$('body').hasClass('analysis-opened')){
        $('body').toggleClass('analysis-opened')
        $('#map').addClass('d-none')
        $('#analysis-map').removeClass('d-none')
    }

}

function report() {
    $(".detials").css('display', 'none');
    $(".layer").css('display', 'none');
    $(".footprints-modal").css('display', 'none');
    $(".basemap").css('display', 'none');
    $(".query-container").css('display', 'none');
    $(".report").css('display', 'block');
    $(".manual").css('display', 'none');
    $('.reference').css('display', 'none');
    layerbox = 'off';
    querybox = 'off';
    detialsbox = 'off';
    basemapbox = 'off';
    footprintsbox = 'off';
    analyticsbox = 'off';
    reportbox = 'on';
    manualbox = 'off';
    referencebox = 'off';
}

function manual() {
    $(".detials").css('display', 'none');
    $(".layer").css('display', 'none');
    $(".footprints-modal").css('display', 'none');
    $(".basemap").css('display', 'none');
    $(".query-container").css('display', 'none');
    $(".report").css('display', 'none');
    $(".manual").css('display', 'block');
    $('.reference').css('display', 'none');
    layerbox = 'off';
    querybox = 'off';
    detialsbox = 'off';
    basemapbox = 'off';
    footprintsbox = 'off';
    analyticsbox = 'off';
    reportbox = 'off';
    manualbox = 'on';
    referencebox = 'off';
}

function reference() {
    $(".detials").css('display', 'none');
    $(".layer").css('display', 'none');
    $(".footprints-modal").css('display', 'none');
    $(".basemap").css('display', 'none');
    $(".query-container").css('display', 'none');
    $(".report").css('display', 'none');
    $(".manual").css('display', 'none');
    $('.reference').css('display', 'block');
    layerbox = 'off';
    querybox = 'off';
    detialsbox = 'off';
    basemapbox = 'off';
    footprintsbox = 'off';
    analyticsbox = 'off';
    reportbox = 'off';
    manualbox = 'off';
    referencebox = 'on';
}


function togglebox() {
    $(".box").animate({
        width: "toggle"
    });
}

function toggleDashboardOff() {
    $(".map-items").css('display', 'block'); 
    $(".dashboard-container").css('display', 'none'); 
}

 // Toggle Dashboard On/Off
 $('#dashboard_btn.dashboard_div').click(function() {
     shutallboxes()
     $(".map-items").css('display', 'none');
     $(".dashboard-container").css('display', 'block');    
});
    
// For toggling map dropdown
 $('#map_nav_div').click(function() {
    // shutallboxes()
    $('.dropdown-list.map_nav_dropdown').toggleClass('show-list')
    $(".map-items").css('display', 'block'); 
    $(".map-container").css('display', 'block'); 
    $(".dashboard-container").css('display', 'none');       
});

$('#details.details_div').click(function() {
    if (detialsbox == 'off') {
        shutallboxes()
        detials();
        // togglebox();
    } else if (detialsbox == 'on') {
        // alert('box1 already on shutting down entire box');
        shutallboxes()
    }
});


$('#layer.layer_div').click(function() {
    if (layerbox == 'off') {
        shutallboxes()
        layer();
        // togglebox();
    } else if (layerbox == 'on') {
        // alert('box1 already on shutting down entire box');
        shutallboxes()
    }
});

$('#legend.legend_div').click(function () {
    if (legendbox == 'off') {
        showlegend()
    } else if (legendbox == 'on') {
        hidelegend()
    }
});

$('#query.query_div').click(function() {
    if (querybox == 'off') {
        shutallboxes()
        query();
        // togglebox();
    } else if (querybox == 'on') {
        // alert('box1 already on shutting down entire box');
        shutallboxes()
    }
});

$('#basemap.basemap_div').click(function() {
    if (basemapbox == 'off') {
        shutallboxes()
        basemap();
        // togglebox();
    } else if (basemapbox == 'on') {
        // alert('box1 already on shutting down entire box');
        shutallboxes()
    }
});

$('#footprints.footprints_div').click(function() {
    if (footprintsbox == 'off') {
        shutallboxes()
        footprints();
        // togglebox();
    } else if (footprintsbox == 'on') {
        // alert('box1 already on shutting down entire box');
        shutallboxes()
    }
});

$('#analytics.analytics_div').click(function() {
    if (analyticsbox == 'off') {
        shutallboxes()
        toggleDashboardOff()
        analytics();
    } else if (analyticsbox == 'on') {
        shutallboxes()
        toggleDashboardOff()
    }
});

// $('#report.report_div').click(function() {
//     if (reportbox == 'off') {
//         shutallboxes()
//         report();
//     } else if (reportbox == 'on') {
//         shutallboxes()
//     }
// });


$('#report.report_div').click(function() {
        let url = this.getAttribute("url");  // Get URL from HTML
        window.location.href = url;  // Redirect
});

$('#manual.manual_div').click(function() {
    if (manualbox == 'off') {
        shutallboxes()
        manual();
    } else if (manualbox == 'on') {
        shutallboxes()
    }
});

$('#reference.reference_div').click(function () {
    if (referencebox == 'off') {
        shutallboxes()
        reference()
    } else if (referencebox == 'on') {
        shutallboxes()
    }
});


$('.closebox').click(function() {
        shutallboxes()
});


$('.closebox1').click(function() {
        hidelegend()
});

// FOOTPRINT MANIPULATION
function resetfootprint() {
    $('.level').css('display','none');
    $('.protected_areas').css('display','none');
    $('.region').css('display','none');
    $('.district').css('display','none');
    $('.oneyear').css('display','none');
    $('.twoyear').css('display','none');
    $('.switchyear').css('display','none');
    $('.execute').css('display','none');
    
}

function adminboundaryselect() {
    $('.level').css('display','block');
    $('.protected_areas').css('display','none');
    $('.oneyear').css('display','block');
    $('.switchyear').css('display','block');
}

function protectedareaselect() {
    $('.level').css('display','none');
    $('.protected_areas').css('display','block');
    $('.region').css('display','none');
    $('.district').css('display','none');
    $('.oneyear').css('display','block');
    $('.switchyear').css('display','block');
}

function nationalselect() {
    $('.region').css('display','none');
    $('.district').css('display','none');
}

function regionalselect() {
    $('.region').css('display','block');
    $('.district').css('display','none');
}

function districtselect() {
    $('.region').css('display','block');
    $('.district').css('display','block');
}