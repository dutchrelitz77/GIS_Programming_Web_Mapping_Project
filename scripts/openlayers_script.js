// Create projection
var projection = ol.proj.get('EPSG:3857');

// Elements that make the popup
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function() {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

/**
 * Create an overlay to anchor the popup to the map.
 */
var overlay = new ol.Overlay({
  element: container
});


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
    url: 'kml/mtc.kml'
  })
});

/* Add all Temple layers */


// London temple layer
var temples = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/londonTemple.kml'
  })
});

/* Initialize the map and set the setting for it */

// Initialize map
var map = new ol.Map({
  layers: [raster, mtc, temples],
  target: document.getElementById('map'),
  renderer: exampleNS.getRendererFromQueryString(),
  overlays: [overlay],
  view: new ol.View({
    center: [876970.8463461736, 5859807.853963373],
    projection: projection,
    zoom: 4
  })
});

/**
 * Add a click handler to the map to render the popup.
 */
map.on('click', function(evt) {
  var coordinate = evt.coordinate;
  var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
      coordinate, 'EPSG:3857', 'EPSG:4326'));

  content.innerHTML = '<p>You clicked here:</p><code>' + hdms +
      '</code>';
  overlay.setPosition(coordinate);
});