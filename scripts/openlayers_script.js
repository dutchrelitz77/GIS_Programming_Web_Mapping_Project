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
    url: 'kml/temples_try.kml'
  })
});

/* Initialize the map and set the setting for it */

// Initialize map
var map = new ol.Map({
  layers: [raster, mtc, temples],
  target: document.getElementById('map'),
  view: new ol.View({
    center: [876970.8463461736, 5859807.853963373],
    projection: projection,
    zoom: 4
  })
});