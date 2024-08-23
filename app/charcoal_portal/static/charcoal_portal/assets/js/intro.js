
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
            title: "Charcoal Points",
            intro: "Identify areas affected by charcoal activities. Use the pop-up menu to filter these areas by the year of interest.",
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
            intro: "To make the map appear closer and larger, users can zoom in using the plus (+) symbol.",
            position: 'right'
        },
        {
            element: document.querySelector('.leaflet-control-zoom-out'),
            title: "Zoom Out",
            intro: "Users can enlarge and decrease the size of the displayed map by using the minus (-) icon.",
            position: 'right'
        },
        {
            element: document.querySelector('.leaflet-control-measure-toggle'),
            title: "Measure",
            intro: "Measurements of the size or area covered by the activity being studied can be made using the measure icon.",
            position: 'right'
        },
        {
            element: document.querySelector('.leaflet-draw-draw-polygon'),
            title: "Draw Polygon",
            intro: "The user can draw a polygon around the activity study area with the aid of this icon.",
            position: 'right'
        },
        {
            element: document.querySelector('.leaflet-draw-draw-rectangle'),
            title: "Draw Rectangle",
            intro: "The icon, which resembles a square, helps to outline the action area with rectangles.",
            position: 'right'
        },
        {
            element: document.querySelector('.leaflet-draw-edit-edit'),
            title: "Edit",
            intro: "You can edit the layers you have selected with the help of this icon.",
            position: 'right'
        },
        {
            element: document.querySelector('.leaflet-draw-edit-remove'),
            title: "Remove",
            intro: "The user can eliminate unnecessary layers from the layers they have chosen by using the trash symbol.",
            position: 'right'
        },
        {
            element: document.querySelector('.leaflet-browser-print'),
            title: "Print",
            intro: "The print icon facilitates users' ability to print",
            position: 'right'
        },
        // {
        //     element: document.querySelector('[data-step="11"]'),
        //     title: "Statistics",
        //     intro: "View statistics on galamsey footprints.",
        //     position: 'left'
        // },
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
