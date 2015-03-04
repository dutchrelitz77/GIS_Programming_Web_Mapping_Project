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

/* Add MTC layers */

// Spain MTC layer
var spainMTC = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/mtc/spainMTC.kml'
  })
});

// Spain MTC layer
var englandMTC = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/mtc/englandMTC.kml'
  })
});

/* Add all Temple layers */

// Bern temple layer
var bernTemple = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/temples/bernTemple.kml'
  })
});

// Denmark temple layer
var denmarkTemple = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/temples/denmarkTemple.kml'
  })
});

// Finland temple layer
var finlandTemple = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/temples/finlandTemple.kml'
  })
});

// Frankfurt temple layer
var frankfurtTemple = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/temples/frankfurtTemple.kml'
  })
});

// Freiberg temple layer
var freibergTemple = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/temples/freibergTemple.kml'
  })
});

// London temple layer
var londonTemple = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/temples/londonTemple.kml'
  })
});

// Netherlands temple layer
var netherlandsTemple = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/temples/netherlandsTemple.kml'
  })
});

// Paris temple layer
var parisTemple = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/temples/parisTemple.kml'
  })
});

// Portugal temple layer
var portugalTemple = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/temples/portugalTemple.kml'
  })
});

// Rome temple layer
var romeTemple = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/temples/romeTemple.kml'
  })
});

// Spain temple layer
var spainTemple = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/temples/spainTemple.kml'
  })
});

// Stockholm temple layer
var stockholmTemple = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/temples/stockholmTemple.kml'
  })
});

// Ukraine temple layer
var ukraineTemple = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/temples/ukraineTemple.kml'
  })
});

// Function to get layers extents

function getExtents (layers_all) {
  myView = map.getView();
  mySize = map.getSize();
  myExtent = layers_all.getSource().getExtent();
  myView.fitExtent(myExtent, mySize);
}

/* Initialize the map and set up main settings */

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
  layers: [raster, spainMTC, englandMTC, bernTemple, denmarkTemple, finlandTemple, frankfurtTemple, freibergTemple, 
           londonTemple, netherlandsTemple, parisTemple, portugalTemple, romeTemple, spainTemple, stockholmTemple, ukraineTemple],
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

    var displaycontent = '';

    // if function for four KML files and their HTML styling for popup box
    if (feature.get('type') == 'Temple') {
      displaycontent = '<b>Temple Name:</b><br> ' + feature.get('name') 
                     + '<br><b>Status:</b> ' + feature.get('Status')
                     + '<br><b>Announcement:</b><br> ' + feature.get('Announcement') 
                     + '<br><b>Groundbreaking:</b><br> ' + feature.get('Groundbreaking')
                     + '<br><b>Dedicated:</b> ' + feature.get('Dedicated')
                     + '<br><b>Historical Facts: </b> ' + feature.get('Historical') 
                     + '<br><b><img src="' + feature.get('Image') + '" height="200" width="200">' 
                     + '<br><a href="' + feature.get('website') + '" target="_blank">Click Here for more info</a>';
    } else if(feature.get('type') == 'MTC'){
      displaycontent = '<b>Name of MTC:</b><br> ' + feature.get('name') 
                     + '<br><b>Dedication Date:</b><br> ' + feature.get('Dedicated') 
                     + '<br><b>Historical Facts: </b><br> ' + feature.get('Historical') 
                     + '<br><b><img src="' + feature.get('Image') + '" height="200" width="200">' 
                     + '<br><a href="' + feature.get('website') + '" target="_blank">Click Here for more info</a>';
    } else if(feature.get('type') == 'Journey'){
      displaycontent = '<b>Temple Name:</b> ' + feature.get('name') 
                     + '<br><b>Status:</b> ' + feature.get('Status') 
                     + '<br><b>Historical Facts: </b> ' + feature.get('Historical') 
                     + '<br><b><img src="' + feature.get('Image') + '" height="200" width="200">';
    } else if(feature.get('type') == 'CountryData'){
      displaycontent = '<b>Temple Name:</b> ' + feature.get('name') 
                     + '<br><b>Status:</b> ' + feature.get('Status') 
                     + '<br><b>Historical Facts: </b> ' + feature.get('Historical') 
                     + '<br><b><img src="' + feature.get('Image') + '" height="200" width="200">';
    } else {
      displaycontent = '';
    };

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

