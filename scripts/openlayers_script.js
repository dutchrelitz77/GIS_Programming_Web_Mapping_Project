/**
 * Elements that make up the popup.
 */
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

/* Add Journey layer */
var Orsonspath = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/Journey/Orsonspath.kml'
  })
});
Orsonspath.name = 'Orsonspath';

/* Add Polygon layer */
var europe = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/Polygon/stats.kml'
  })
});
europe.name = 'europe';

/* Add MTC layers */

// Spain MTC layer
var spainMTC = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/mtc/spainMTC.kml'
  })
});
spainMTC.name = 'spainMTC';

// Spain MTC layer
var englandMTC = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/mtc/englandMTC.kml'
  })
});
englandMTC.name = 'englandMTC';

/* Add all Temple layers */

// Bern temple layer
var bernTemple = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/temples/bernTemple.kml'
  })
});
bernTemple.name = 'bernTemple';


// Denmark temple layer
var denmarkTemple = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/temples/denmarkTemple.kml'
  })
});
denmarkTemple.name = 'denmarkTemple';


// Finland temple layer
var finlandTemple = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/temples/finlandTemple.kml'
  })
});
finlandTemple.name = 'finlandTemple';


// Frankfurt temple layer
var frankfurtTemple = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/temples/frankfurtTemple.kml'
  })
});
frankfurtTemple.name = 'frankfurtTemple';


// Freiberg temple layer
var freibergTemple = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/temples/freibergTemple.kml'
  })
});
freibergTemple.name = 'freibergTemple';


// London temple layer
var londonTemple = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/temples/londonTemple.kml'
  })
});
londonTemple.name = 'londonTemple';


// Netherlands temple layer
var netherlandsTemple = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/temples/netherlandsTemple.kml'
  })
});
netherlandsTemple.name = 'netherlandsTemple';


// Paris temple layer
var parisTemple = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/temples/parisTemple.kml'
  })
});
parisTemple.name = 'parisTemple';


// Portugal temple layer
var portugalTemple = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/temples/portugalTemple.kml'
  })
});
portugalTemple.name = 'portugalTemple';


// Rome temple layer
var romeTemple = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/temples/romeTemple.kml'
  })
});
romeTemple.name = 'romeTemple';


// Spain temple layer
var spainTemple = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/temples/spainTemple.kml'
  })
});
spainTemple.name = 'spainTemple';


// Stockholm temple layer
var stockholmTemple = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/temples/stockholmTemple.kml'
  })
});
stockholmTemple.name = 'stockholmTemple';


// Ukraine temple layer
var ukraineTemple = new ol.layer.Vector({
  source: new ol.source.KML({
    projection: projection,
    url: 'kml/temples/ukraineTemple.kml'
  })
});
ukraineTemple.name = 'ukraineTemple';


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
    new ol.control.FullScreen(),
    new ol.control.ScaleLine()
  ]),
  layers: [raster, europe, spainMTC, englandMTC, bernTemple, denmarkTemple, finlandTemple, frankfurtTemple, freibergTemple, 
           londonTemple, netherlandsTemple, parisTemple, portugalTemple, romeTemple, spainTemple, stockholmTemple, ukraineTemple,
           Orsonspath],
  overlays: [overlay],
  target: document.getElementById('map'),
  renderer: exampleNS.getRendererFromQueryString(),
  view: new ol.View({
    center: [5006970.8463461736, 8009807.853963373],
    projection: projection,
    zoom: 3
  })
});
var element = document.getElementById('popup');

// Add zoom to extents button on map
myExtentButton = new ol.control.ZoomToExtent({
  extent: europe.getSource().getExtent()
});
map.addControl(myExtentButton);

// display popup on click
map.on('click', function(evt) {
  
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
 var displaycontent = '';

    // if function for four KML files and their HTML styling for popup box
    if (feature.get('type') == 'Temple') {
      displaycontent = '<b>Temple Name:</b><br> ' + feature.get('name') 
                     + '<br><b>Status:</b> ' + feature.get('Status')
                     + '<br><b>Announcement:</b><br> ' + feature.get('Announcement') 
                     + '<br><b>Groundbreaking:</b><br> ' + feature.get('Groundbreaking')
                     + '<br><b>Dedicated:</b> ' + feature.get('Dedicated')
                     + '<br><b>Historical Facts: </b> ' + feature.get('Historical') 
                     + '<br><b><img src="' + feature.get('Image') + '" height="200" width="225">' 
                     + '<br><a href="' + feature.get('website') + '" target="_blank">Click Here for more info</a>';
    } else if(feature.get('type') == 'MTC'){
      displaycontent = '<b>Name of MTC:</b><br> ' + feature.get('name') 
                     + '<br><b>Dedication Date:</b><br> ' + feature.get('Dedicated') 
                     + '<br><b>Historical Facts: </b><br> ' + feature.get('Historical') 
                     + '<br><b><img src="' + feature.get('Image') + '" height="200" width="225">' 
                     + '<br><a href="' + feature.get('website') + '" target="_blank">Click Here for more info</a>';
    } else if(feature.get('type') == 'Journey'){
      displaycontent = '<b>Temple Name:</b><br> ' + feature.get('name')
                     + '<br><b>Description:</b><br> ' + feature.get('Description') 
                     + '<br><b><img src="' + feature.get('Image') + '" height="200" width="225">'
                     + '<br><a href="' + feature.get('website') + '" target="_blank">Click Here for more info</a>';
    } else if(feature.get('type') == 'CountryData'){
      displaycontent = '<b>LDS Population:</b> ' + feature.get('LDSpop') 
                     + '<br><b>Missions:</b> ' + feature.get('Missions') 
                     + '<br><b>Congregations: </b> ' + feature.get('Congregations') 
                     + '<br><b>Temples: </b> ' + feature.get('Operating_Temples')
                     + '<br><b><img src="' + feature.get('Image') + '" height="200" width="225">'
                     + '<br><a href="' + feature.get('website') + '" target="_blank">Click Here for more info</a>';
    } else {
      displaycontent = '';
    };
  }
});

function setCountry(temple) 
{
  //Cycle through all my layers. 
  //If the layer name is the same as the one that got passed in (theCountry) then turn it's visibility on
  //otherwise turn its visbility off.
  
  //First get an array of layers
  layers=map.getLayers().a;
  
  //Now check for the name of the layer
  for (var i=1; i <= 16; i++) 
  {
    if (layers[i].name==temple) 
    {
      //turn on the layer
      layers[i].setVisible(true);
      //zoom to the layer extents
      var feature = layers[i].getSource().getFeatures()[0];
      var coord = feature.getGeometry().getCoordinates();
      myView = map.getView()
      myView.setCenter(coord);
      myView.setZoom(15);
    }
    else
    {   
      //turn off all other layers
      layers[i].setVisible(false);
      Orsonspath.setVisible(false);
    }
  }
  
  //If "none" then zoom to max extent of map
  if (temple=="none") 
  {
    ZoomToMaxExtent();
  }
}

function setPolygon(data) 
{
  //Cycle through all my layers. 
  //If the layer name is the same as the one that got passed in (theCountry) then turn it's visibility on
  //otherwise turn its visbility off.
  
  //First get an array of layers
  layers=map.getLayers().a;
  
  //Now check for the name of the layer
  for (var i=1; i <= 16; i++) 
  {
    if (layers[i].name==data) 
    {
      //turn on the layer
      layers[i].setVisible(true);
      //zoom to the layer extents
      map.getView().fitExtent(layers[i].getSource().getExtent(), map.getSize());
    }
    else
    {   
      //turn off all other layers
      layers[i].setVisible(false);
      Orsonspath.setVisible(false);
    }
  }
  
  //If "none" then zoom to max extent of map
  if (data=="none") 
  {
    ZoomToMaxExtent();
  }
}

function showData() {
  // turn off all other layers
  layers = map.getLayers().a;
  for (var i=1; i <= 16; i++) {
    layers[i].setVisible(false);
  }

  // Show data for the Orsonspath
  Orsonspath.setVisible(true);

  // Zoom to the Orsonspath polyline
  myFeature = Orsonspath.getSource().getFeatures()[0];
  myCoords = myFeature.getGeometry().getCoordinates();
  myView = map.getView();
  midCoordIndex = parseInt(myCoords.length/2);
  midCoord = myCoords[midCoordIndex];
  myView.setCenter(midCoord);
  myView.setZoom(4);
}

function TurnAllLayersOn() {
  //turn all the layers in the map off
  layers = map.getLayers().a;
  for (var i=1; i <= 16; i++) {
    layers[i].setVisible(true);
  }
  Orsonspath.setVisible(true);
}

function TurnAllLayersOff() {
  //turn all the layers in the map off
  layers = map.getLayers().a;
  for (var i=1; i <= 16; i++) {
    layers[i].setVisible(false);
  }
  Orsonspath.setVisible(false);
}
