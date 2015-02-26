// Create projection
var projection = ol.proj.get('EPSG:3857');

// Elements that make up the popup
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

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
    url: 'kml/londonTemple_new.kml'
  })
});

// Get layers extents - add code here

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
  overlays: [overlay],
  target: document.getElementById('map'),
  view: new ol.View({
    center: [876970.8463461736, 5859807.853963373],
    projection: projection,
    zoom: 4
  })
});

// Event to click on the popups

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
    overlay.setPosition(coord);
    var displaycontent = '<b>Owner:</b> ' + feature.get('name') + '<br><b>License:</b> ' + feature.get('Status');
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

// map.on('click', function(evt) {
//   //try to destroy it before doing anything else...s
//   //$(element).popover('destroy');
  
//   //Try to get a feature at the point of interest
//   var feature = map.forEachFeatureAtPixel(evt.pixel,
//     function(feature, layer) {
//     return feature;
//     });
    
//   //if we found a feature then create and show the popup.
//   if (feature) {
//   var geometry = feature.getGeometry();
//   var coord = geometry.getCoordinates();
//   overlay.setPosition(coord);
//   var displaycontent = feature.get('description');
//   content.innerHTML = displaycontent;
//   }
// });


// var popup = new ol.Overlay({
//   element: element,
//   positioning: 'bottom-center',
//   stopEvent: false
// });
// map.addOverlay(popup);

// // display popup on click

// map.on('click', function(evt) {
//   //try to destroy it before doing anything else...s
//   $(element).popover('destroy');
  
//   //Try to get a feature at the point of interest
//   var feature = map.forEachFeatureAtPixel(evt.pixel,
//     function(feature, layer) {
//     return feature;
//     });
    
//   //if we found a feature then create and show the popup.
//   if (feature) {
//   var geometry = feature.getGeometry();
//   var coord = geometry.getCoordinates();
//   popup.setPosition(coord);
//   var displaycontent = '<b>Owner:</b> ' + feature.get('name') + '<br><b>License:</b> ' + feature.get('Status');
//   $(element).popover({
//     'placement': 'top',
//     'html': true,
//     'content': displaycontent
//   });
  
//   $(element).popover('show');
  
//   } else {
//   $(element).popover('destroy');
//   }
// });

// // change mouse cursor when over marker
// map.on('pointermove', function(e) {
//   if (e.dragging) {
//   $(element).popover('destroy');
//   return;
//   }
//   var pixel = map.getEventPixel(e.originalEvent);
//   var hit = map.hasFeatureAtPixel(pixel);
//   map.getTarget().style.cursor = hit ? 'pointer' : '';
// });