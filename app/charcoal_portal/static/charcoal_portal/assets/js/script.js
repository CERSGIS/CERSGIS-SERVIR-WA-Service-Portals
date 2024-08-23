  /**
   * Sidebar toggle
   */
  if (document.querySelector('.toggle-sidebar-btn')) {
    console.log('Clicked')
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
var charcoaldatabox = 'off';
var analyticsbox = 'off';
var reportbox = 'off';
var manualbox = 'off';
var referencebox = 'off';

function shutallboxes() {
    $(".detials").css('display', 'none');
    $(".layer").css('display', 'none');
    $(".query").css('display', 'none');
    $(".basemap").css('display', 'none');
    $(".charcoaldata-modal").css('display', 'none');
    $(".analytics").css('display', 'none');
    $(".report").css('display', 'none');
    $(".manual").css('display', 'none');
    $('.reference').css('display', 'none');
    
    // $(".iconbox").removeClass("active");
    layerbox = 'off';
    querybox = 'off';
    detialsbox = 'off';
    basemapbox = 'off';
    charcoaldatabox = 'off';
    analyticsbox = 'off';
    reportbox = 'off';
    manualbox = 'off';
    referencebox = 'off';
}


function detials() {
    $(".detials").css('display', 'block');
    $(".layer").css('display', 'none');
    $(".query").css('display', 'none');
    $(".basemap").css('display', 'none');
    $(".charcoaldata-modal").css('display', 'none');
    $(".analytics").css('display', 'none');
    $(".report").css('display', 'none');
    $('.reference').css('display', 'none');
    // $(".iconbox").removeClass("active");
    // $("#iconbox1").addClass("active");
    layerbox = 'off';
    querybox = 'off';
    detialsbox = 'on';
    basemapbox = 'off';
    charcoaldatabox = 'off';
    analyticsbox = 'off';
    reportbox = 'off';
    referencebox = 'off';
}

function layer() {
    $(".detials").css('display', 'none');
    $(".layer").css('display', 'block');
    $(".query").css('display', 'none');
    $(".basemap").css('display', 'none');
    $(".charcoaldata-modal").css('display', 'none');
    $(".analytics").css('display', 'none');
    $(".report").css('display', 'none');
    $('.reference').css('display', 'none');

    // $(".iconbox").removeClass("active");
    // $("#iconbox2").addClass("active");
    layerbox = 'on';
    querybox = 'off';
    detialsbox = 'off';
    basemapbox = 'off';
    charcoaldatabox = 'off';
    analyticsbox = 'off';
    reportbox = 'off';
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
    $(".query").css('display', 'block');
    $(".basemap").css('display', 'none');
    $(".charcoaldata-modal").css('display', 'none');
    $(".analytics").css('display', 'none');
    $(".report").css('display', 'none');
    $('.reference').css('display', 'none');

    // $(".iconbox").removeClass("active");
    // $("#iconbox3").addClass("active");
    layerbox = 'off';
    querybox = 'on';
    detialsbox = 'off';
    basemapbox = 'off';
    charcoaldatabox = 'off';
    analyticsbox = 'off';
    reportbox = 'off';
    referencebox = 'off';
}

function basemap() {
    $(".detials").css('display', 'none');
    $(".layer").css('display', 'none');
    $(".query").css('display', 'none');
    $(".basemap").css('display', 'block');
    $(".charcoaldata-modal").css('display', 'none');
    $(".analytics").css('display', 'none');
    $(".report").css('display', 'none');
    $('.reference').css('display', 'none');

    // $(".iconbox").removeClass("active");
    // $("#iconbox3").addClass("active");
    layerbox = 'off';
    querybox = 'off';
    detialsbox = 'off';
    basemapbox = 'on';
    charcoaldatabox = 'off';
    analyticsbox = 'off';
    reportbox = 'off';
    referencebox = 'off';
}

function charcoaldata() {
    $(".detials").css('display', 'none');
    $(".layer").css('display', 'none');
    // $(".query").css('display', 'none');
    $(".charcoaldata-modal").css('display', 'block');
    $(".basemap").css('display', 'none');
    $(".analytics").css('display', 'none');
    $(".report").css('display', 'none');
    $('.reference').css('display', 'none');

    // $(".iconbox").removeClass("active");
    // $("#iconbox3").addClass("active");
    layerbox = 'off';
    querybox = 'off';
    detialsbox = 'off';
    basemapbox = 'off';
    charcoaldatabox = 'on';
    analyticsbox = 'off';
    reportbox = 'off';
    referencebox = 'off';
}

function analytics() {
    $(".detials").css('display', 'none');
    $(".layer").css('display', 'none');
    $(".charcoaldata-modal").css('display', 'none');
    $(".basemap").css('display', 'none');
    $(".analytics").css('display', 'block');
    $(".report").css('display', 'none');
    $('.reference').css('display', 'none');

    layerbox = 'off';
    querybox = 'off';
    detialsbox = 'off';
    basemapbox = 'off';
    charcoaldatabox = 'off';
    analyticsbox = 'on';
    reportbox = 'off';
    referencebox = 'off';
}

function report() {
    $(".detials").css('display', 'none');
    $(".layer").css('display', 'none');
    $(".charcoaldata-modal").css('display', 'none');
    $(".basemap").css('display', 'none');
    $(".analytics").css('display', 'none');
    $(".report").css('display', 'block');
    $('.reference').css('display', 'none');

    layerbox = 'off';
    querybox = 'off';
    detialsbox = 'off';
    basemapbox = 'off';
    charcoaldatabox = 'off';
    analyticsbox = 'off';
    reportbox = 'on';
    referencebox = 'off';
}

function manual() {
    $(".detials").css('display', 'none');
    $(".layer").css('display', 'none');
    $(".footprints-modal").css('display', 'none');
    $(".basemap").css('display', 'none');
    $(".analytics").css('display', 'none');
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
    $(".analytics").css('display', 'none');
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



$('#details').click(function() {
    if (detialsbox == 'off') {
        shutallboxes()
        detials();
        // togglebox();
    } else if (detialsbox == 'on') {
        // alert('box1 already on shutting down entire box');
        shutallboxes()
    }
});


$('#layer').click(function() {
    if (layerbox == 'off') {
        shutallboxes()
        layer();
        // togglebox();
    } else if (layerbox == 'on') {
        // alert('box1 already on shutting down entire box');
        shutallboxes()
    }
});

$('#legend').click(function () {
    if (legendbox == 'off') {
        showlegend()
    } else if (legendbox == 'on') {
        hidelegend()
    }
});

$('#query').click(function() {
    if (querybox == 'off') {
        shutallboxes()
        query();
        // togglebox();
    } else if (querybox == 'on') {
        // alert('box1 already on shutting down entire box');
        shutallboxes()
    }
});

$('#basemap').click(function() {
    if (basemapbox == 'off') {
        shutallboxes()
        basemap();
        // togglebox();
    } else if (basemapbox == 'on') {
        // alert('box1 already on shutting down entire box');
        shutallboxes()
    }
});

$('#charcoaldata.charcoaldata_div').click(function() {
    if (charcoaldatabox == 'off') {
        shutallboxes()
        charcoaldata();
        // togglebox();
    } else if (charcoaldatabox == 'on') {
        // alert('box1 already on shutting down entire box');
        shutallboxes()
    }
});

$('#analytics.analytics_div').click(function() {
    if (analyticsbox == 'off') {
        shutallboxes()
        analytics();
    } else if (analyticsbox == 'on') {
        shutallboxes()
    }
});

$('#report.report_div').click(function() {
    if (reportbox == 'off') {
        shutallboxes()
        report();
    } else if (reportbox == 'on') {
        shutallboxes()
    }
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