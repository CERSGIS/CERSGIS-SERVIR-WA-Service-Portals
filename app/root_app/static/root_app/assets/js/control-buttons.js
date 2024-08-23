$(document).ready(function () {


  function mapDisabled(map) {
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    //map.dragging.disable();
    map.keyboard.disable();
    if (map.tap) map.tap.disable();
  }

  var map_drawn_layers = new L.FeatureGroup();
  map.addLayer(map_drawn_layers);


  var measureOptions = {
    position: 'bottomleft',
    primaryAreaUnit: 'hectares',
    secondaryAreaUnit: 'sqmeters',
    primaryLengthUnit: 'meters',
    secondaryLengthUnit: 'kilometers'
  }

  // Zoom In
  $('#zoom-in').click(() => {
    map.zoomIn(1);
  });

  // Zoom Out
  $('#zoom-out').click(() => {
    map.zoomOut(1)
  });

  $('#zoom-extent').click(() => {
    map.setView(initialView,initialZoom)
  });

  $('#measure-tool').click(() => {
    console.log('Measure Clicked');
    control_measure = L.control.measure(measureOptions);
    control_measure.onAdd(map);
    control_measure._startMeasure();
    console.log(control_measure)

    // control_measure._startMeasure();
  });

  $('#draw-polygon').click(() => {
    measureArea()
  });

  // 
  $('#draw-rectangle').click(() => {
    var rectangle = new L.Draw.Rectangle(map, {});
    
    rectangle.enable();
  });

  map.on(L.Draw.Event.CREATED, (e) => {
    map_drawn_layers.addLayer(e.layer)
    console.log(map_drawn_layers.toGeoJSON())
  });

});
