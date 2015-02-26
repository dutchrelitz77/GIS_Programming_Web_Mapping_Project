// Create projection
var projection = ol.proj.get('EPSG:3857');

/* Elements  */

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
    url: 'kml/londonTemple_new.kml'
  })
});

// Get layers extents

/* Initialize the map and set the setting for it */

// Initialize map
var map = new ol.Map({
  controls: ol.control.defaults({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false
    })
  }).extend([
    new ol.control.ZoomToExtent({
      extent: [
        813079.7791264898, 5929220.284081122,
        898966.9639063801, 5936863.986909639
      ]
    })
  ]),
  layers: [raster, mtc, temples],
  target: document.getElementById('map'),
  renderer: exampleNS.getRendererFromQueryString(),
  view: new ol.View({
    center: [876970.8463461736, 5859807.853963373],
    projection: projection,
    zoom: 4
  })
});
var element = document.getElementById('popup');

var popup = new ol.Overlay({
  element: element,
  positioning: 'bottom-center',
  stopEvent: false
});
map.addOverlay(popup);

// display popup on click

map.on('click', function(evt) {
  //try to destroy it before doing anything else...s
  $(element).popover('destroy');
  
  //Try to get a feature at the point of interest
  var feature = map.forEachFeatureAtPixel(evt.pixel,
      function(feature, layer) {
      return feature;
    });
    
  //if we found a feature then create and show the popup.
  if (feature) {
    var geometry = feature.getGeometry();
    var coord = geometry.getCoordinates();
    popup.setPosition(coord);
    var displaycontent = '<b>Temple Name:</b> ' + feature.get('name') + '<br><b>Status:</b> ' + feature.get('Status') + '<br><b>Historical Facts: </b> ' + feature.get('Historical') + '<br><b><img src="pictures/london_temple.jpg" alt="London Temple" height="100" width="100">';
    $(element).popover({
      'placement': 'top',
      'html': true,
      'content': displaycontent
  });
  
  $(element).popover('show');
  
  } else {
    $(element).popover('destroy');
  }
});

// change mouse cursor when over marker
map.on('pointermove', function(e) {
  if (e.dragging) {
    $(element).popover('destroy');
    return;
  }
  var pixel = map.getEventPixel(e.originalEvent);
  var hit = map.hasFeatureAtPixel(pixel);
  map.getTarget().style.cursor = hit ? 'pointer' : '';
});