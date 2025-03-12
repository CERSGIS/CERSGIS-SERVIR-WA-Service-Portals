
jQuery(document).ready(function() {
    jQuery('#switchyear').change(function() {
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
var legendbox = 'off';
var querybox = 'off';
var box3 = 'off';
var basemapbox = 'off';

function shutallboxes() {
    $(".detials").css('display', 'none');
    $(".legend").css('display', 'none');
    $(".query").css('display', 'none');
    $(".basemap").css('display', 'none');
    // $(".iconbox").removeClass("active");
    legendbox = 'off';
    querybox = 'off';
    detialsbox = 'off';
    basemapbox = 'off';
}


function detials() {
    $(".detials").css('display', 'block');
    $(".legend").css('display', 'none');
    $(".query").css('display', 'none');
    $(".basemap").css('display', 'none');
    // $(".iconbox").removeClass("active");
    // $("#iconbox1").addClass("active");
    legendbox = 'off';
    querybox = 'off';
    detialsbox = 'on';
    basemapbox = 'off';
}

function legend() {
    $(".detials").css('display', 'none');
    $(".legend").css('display', 'block');
    $(".query").css('display', 'none');
    $(".basemap").css('display', 'none');
    // $(".iconbox").removeClass("active");
    // $("#iconbox2").addClass("active");
    legendbox = 'on';
    querybox = 'off';
    detialsbox = 'off';
    basemapbox = 'off';
}

function query() {
    $(".detials").css('display', 'none');
    $(".legend").css('display', 'none');
    $(".query").css('display', 'block');
    $(".basemap").css('display', 'none');
    // $(".iconbox").removeClass("active");
    // $("#iconbox3").addClass("active");
    legendbox = 'off';
    querybox = 'on';
    detialsbox = 'off';
    basemapbox = 'off';
}

function basemap() {
    $(".detials").css('display', 'none');
    $(".legend").css('display', 'none');
    $(".query").css('display', 'none');
    $(".basemap").css('display', 'block');
    // $(".iconbox").removeClass("active");
    // $("#iconbox3").addClass("active");
    legendbox = 'off';
    querybox = 'off';
    detialsbox = 'off';
    basemapbox = 'on';
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


$('#legend').click(function() {
    if (legendbox == 'off') {
        shutallboxes()
        legend();
        // togglebox();
    } else if (legendbox == 'on') {
        // alert('box1 already on shutting down entire box');
        shutallboxes()
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

$('.closebox').click(function() {
        shutallboxes()
});



// $('#iconbox2').click(function() {

//     if (box == 'off') {
//         togglebox();
//         cardbox2();
//         // alert('only box2');
//     } else if (box == 'on' && box2 == 'on') {
//         // alert('box2 already on shutting down entire box');
//         shutallboxes()
//         togglebox();
//     } else if (box == 'on' && box1 == 'on') {
//         // alert('box1 is on turning on box2');
//         cardbox2()
//     } else if (box == 'on' && box3 == 'on') {
//         // alert('box1 is on turning on box2');
//         cardbox2()
//     }
// });

// $('#iconbox3').click(function() {

//     if (box == 'off') {
//         togglebox();
//         cardbox3();
//         // alert('only box2');
//     } else if (box == 'on' && box3 == 'on') {
//         // alert('box2 already on shutting down entire box');
//         shutallboxes()
//         togglebox();
//     } else if (box == 'on' && box1 == 'on') {
//         // alert('box1 is on turning on box2');
//         cardbox3()
//     } else if (box == 'on' && box2 == 'on') {
//         // alert('box1 is on turning on box2');
//         cardbox3()
//     }
// });


// $('.slide-toggle').click(function() {
//         shutallboxes()
//         togglebox();
// });


