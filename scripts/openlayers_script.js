// var styles = [
//   'Road',
//   'Aerial',
//   'AerialWithLabels',
//   'collinsBart',
//   'ordnanceSurvey'
// ];

// var layers = [];
// var i, ii;
// for (i = 0, ii = styles.length; i < ii; ++i) {
//   layers.push(new ol.layer.Tile({
//     visible: false,
//     preload: Infinity,
//     source: new ol.source.BingMaps({
//       key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
//       imagerySet: styles[i]
//       // use maxZoom 19 to see stretched tiles instead of the BingMaps
//       // "no photos at this zoom level" tiles
//       // maxZoom: 19
//     })
//   }));
// }

// var map = new ol.Map({
//   layers: layers,
//   renderer: exampleNS.getRendererFromQueryString(),
//   // Improve user experience by loading tiles while dragging/zooming. Will make
//   // zooming choppy on mobile or slow devices.
//   loadTilesWhileInteracting: true,
//   target: 'map',
//   view: new ol.View({
//     center: [-6655.5402445057125, 6709968.258934638],
//     zoom: 13
//   })
// });

// $('#layer-select').change(function() {
//   var style = $(this).find(':selected').val();
//   var i, ii;
//   for (i = 0, ii = layers.length; i < ii; ++i) {
//     layers[i].setVisible(styles[i] == style);
//   }
// });
// $('#layer-select').trigger('change');


// New code from online
var projection = ol.proj.get('EPSG:3857');

var raster = new ol.layer.Tile({
  source: new ol.source.BingMaps({
    imagerySet: 'AerialWithLabels',
    key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3'
  })
});

var vector = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/MTCEurope.kml'
  })
});

var map = new ol.Map({
  layers: [raster, vector],
  target: document.getElementById('map'),
  view: new ol.View({
    center: [876970.8463461736, 5859807.853963373],
    projection: projection,
    zoom: 10
  })
});

var displayFeatureInfo = function(pixel) {
  var features = [];
  map.forEachFeatureAtPixel(pixel, function(feature, layer) {
    features.push(feature);
  });
  if (features.length > 0) {
    var info = [];
    var i, ii;
    for (i = 0, ii = features.length; i < ii; ++i) {
      info.push(features[i].get('name'));
    }
    document.getElementById('info').innerHTML = info.join(', ') || '(unknown)';
    map.getTarget().style.cursor = 'pointer';
  } else {
    document.getElementById('info').innerHTML = '&nbsp;';
    map.getTarget().style.cursor = '';
  }
};

map.on('pointermove', function(evt) {
  if (evt.dragging) {
    return;
  }
  var pixel = map.getEventPixel(evt.originalEvent);
  displayFeatureInfo(pixel);
});

map.on('click', function(evt) {
  displayFeatureInfo(evt.pixel);
});

var exportKMLElement = document.getElementById('export-kml');
if ('download' in exportKMLElement) {
  var vectorSource = vector.getSource();
  exportKMLElement.addEventListener('click', function(e) {
    if (!exportKMLElement.href) {
      var features = [];
      vectorSource.forEachFeature(function(feature) {
        var clone = feature.clone();
        clone.setId(feature.getId());  // clone does not set the id
        clone.getGeometry().transform(projection, 'EPSG:4326');
        features.push(clone);
      });
      var string = new ol.format.KML().writeFeatures(features);
      var base64 = exampleNS.strToBase64(string);
      exportKMLElement.href =
          'data:application/vnd.google-earth.kml+xml;base64,' + base64;
    }
  }, false);
} else {
  var info = document.getElementById('no-download');
  /**
   * display error message
   */
  info.style.display = '';
}