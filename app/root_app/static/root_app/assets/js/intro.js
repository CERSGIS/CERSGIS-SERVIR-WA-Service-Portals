
$(document).ready(function() {  
// Steps for Intro.js
function startIntro() {
    const introSteps = [
        {
            // element: $('[data-step="1"]')[0],
            element: document.querySelector('[data-step="1"]'),
            title: "Side Navigations",
            intro: "Explore various navigation options within the portal.",
            position: 'right'
        },
        {
            element: document.querySelector('[data-step="2"]'),
            title: "Toggle",
            intro: "Click this icon to expand or collapse the side navigation menu.",
            position: 'right'
        },
        {
            element: document.querySelector('[data-step="3"]'),
            title: "Details",
            intro: "Learn more about the app.",
            position: 'right'
        },
        {
            element: document.querySelector('[data-step="4"]'),
            title: "Layers",
            intro: "Visualize the different components of the displayed map.",
            position: 'right'
        },
        // {
        //     element: document.querySelector('[data-step="5"]'),
        //     title: "Legend",
        //     intro: "Understand the information represented on the map.",
        //     position: 'right'
        // },
        {
            element: document.querySelector('[data-step="6"]'),
            title: "Basemaps",
            intro: "Filter the displayed map by selecting from various map types, such as OpenStreetMap or ocean maps.",
            position: 'right'
        },
        {
            element: document.querySelector('[data-step="7"]'),
            title: "Footprints",
            intro: "Identify areas affected by galamsey activities. Use the pop-up menu to filter these areas by the year of interest.",
            position: 'right'
        },
        {
            element: document.querySelector('[data-step="8"]'),
            title: "Analysis",
            intro: "Obtain detailed information about your selected area. Query an area of interest using the options in the pop-up menu.",
            position: 'right'
        },
        {
            element: document.querySelector('[data-step="9"]'),
            title: "Report",
            intro: "Access reports on issues related to galamsey, including socio-economic and gender reports.",
            position: 'right'
        },
        // {
        //     element: document.querySelector('[data-step="10"]'),
        //     intro: ".",
        //     position: 'right'
        // },
        {
            element: document.querySelector('[data-step="10"]'),            
            title: "Data Request",
            intro: "Submit a request for specific data needed by completing the pop-up form. Available for organizations, companies, or individual users.",
            position: 'right'
        },
        {
            element: document.querySelector('.leaflet-control-zoom-in'),
            title: "Zoom In",
            intro: "none",
            position: 'right'
        },
        {
            element: document.querySelector('.leaflet-control-zoom-out'),
            title: "Zoom Out",
            intro: "none",
            position: 'right'
        },
        {
            element: document.querySelector('.leaflet-control-measure-toggle'),
            title: "Measure",
            intro: "none",
            position: 'right'
        },
        {
            element: document.querySelector('.leaflet-draw-draw-polygon'),
            title: "Draw Polygon",
            intro: "none",
            position: 'right'
        },
        {
            element: document.querySelector('.leaflet-draw-draw-rectangle'),
            title: "Draw Rectangle",
            intro: "none",
            position: 'right'
        },
        {
            element: document.querySelector('.leaflet-draw-edit-edit'),
            title: "Edit",
            intro: "none.",
            position: 'right'
        },
        {
            element: document.querySelector('.leaflet-draw-edit-remove'),
            title: "Remove",
            intro: "none.",
            position: 'right'
        },
        {
            element: document.querySelector('.leaflet-browser-print'),
            title: "Print",
            intro: "none.",
            position: 'right'
        },
        {
            element: document.querySelector('[data-step="11"]'),
            title: "Statistics",
            intro: "View statistics on galamsey footprints.",
            position: 'left'
        },
        // Add more steps as needed
    ];

    // Initialize Intro.js with the defined steps
    introJs().setOptions({
        steps: introSteps
    }).start();
}

    // Start Intro.js on document load
    // startIntro();

    // Start Intro.js on button click
    $('#manual_btn').click(function() {
        startIntro();
        addHints();
    });

});
