// Create projection
var projection = ol.proj.get('EPSG:3857');

/* Add all layers to map */

// Create bing raster layer
var raster = new ol.layer.Tile({
  source: new ol.source.BingMaps({
    imagerySet: 'AerialWithLabels',
    key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3'
  })
});

// Add MTC layer
var mtc = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/MTCEurope_try.kml'
  })
});

// Add Temples layer
var temples = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/StreamGages.kml'
  })
});

/* Initialize the map and set the setting for it */

// Initialize map
var map = new ol.Map({
  controls: ol.control.defaults().extend([
    new ol.control.FullScreen()
  ]),
  layers: [raster, mtc, temples],
  renderer: exampleNS.getRendererFromQueryString(),
  target: 'map',
  view: new ol.View({
    center: [876970.8463461736, 5859807.853963373],
    projection: projection,
    zoom: 4
  })
});

/* Settings for popup boxes */

function onPopupClose(evt) {
  select.unselectAll();
}

function onFeatureSelect(event) {
  var feature = event.feature;
  // Since KML is user-generated, do naive protection against
  // Javascript.
  var content = "<h2>"+feature.attributes.name + "</h2>" + feature.attributes.description;
  if (content.search("<script") != -1) {
    content = "Content contained Javascript! Escaped content below.<br>" + content.replace(/</g, "&lt;");
  }
  popup = new OpenLayers.Popup.FramedCloud("chicken", 
    feature.geometry.getBounds().getCenterLonLat(),
    new OpenLayers.Size(100,100),
    content,
    null, true, onPopupClose);
  feature.popup = popup;
  map.addPopup(popup);
}

function onFeatureUnselect(event) {
  var feature = event.feature;
  if(feature.popup) {
      map.removePopup(feature.popup);
      feature.popup.destroy();
      delete feature.popup;
  }
}