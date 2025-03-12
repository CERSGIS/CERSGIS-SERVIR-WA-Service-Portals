// Function to Load Vector Tiles for Footprints
function loadVectorLayerFunction(url, layername, storename) {
  let loaddata;
  loaddata = L.tileLayer.wms(url, {
      layers: storename + ':' + layername,
      format: 'image/png',
      transparent: true,
  });
  return loaddata;
}