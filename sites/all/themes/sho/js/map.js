 var shofcoMapStyles = [
  {
    "featureType": "water",
    "stylers": [
      { "gamma": 1.82 },
      { "saturation": -46 },
      { "lightness": -24 },
      { "hue": "#73c4d6" }
    ]
  },{
    "featureType": "landscape",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "poi",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "transit",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "road",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "landscape",
    "stylers": [
      { "visibility": "on" },
      { "color": "#ffe479" }
    ]
  },{
    "featureType": "administrative",
    "elementType": "labels",
    "stylers": [
      { "weight": 0.1 },
      { "color": "#686933" }
    ]
  },{
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      { "color": "#ffffff" },
      { "weight": 1.4 }
    ]
  },{
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      { "visibility": "on" },
      { "color": "#e9c469" },
      { "weight": 1 }
    ]
  }
];    

function shofcoMapInit() {

  var kiberaLL = new google.maps.LatLng(-1.3124628,36.7906571),
      mathareLL = new google.maps.LatLng(-1.2589565,36.8564781),
      markerImage = '/sites/all/themes/sho/img/marker3.png',
      markerImageOrange = 'img/marker3.png',
      nairobiInforWindowContent = '<div class="map-iw nairobi-iw">Nairobi, Kenya.</div>',
      kiberaInforWindowContent = '<div class="map-iw kibera-iw">Kibera</div>',
      mathareInforWindowContent = '<div class="map-iw mathare-iw">Mathare</div>',
      styledMap = new google.maps.StyledMapType(shofcoMapStyles, {name: "Styled Map"});

  var mapOptions = {
    center: kiberaLL,
    zoom: 5,
    mapTypeControl: false,
    streetViewControl: false,
    panControl: false,
    zoomControl: true,
    zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE
    }
  };

  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

  var kiberaInfoWindow = new google.maps.InfoWindow({
    content: nairobiInforWindowContent
  });

  var mathareInfoWindow = new google.maps.InfoWindow({
    content: mathareInforWindowContent
  });

  var kiberaMarker = new google.maps.Marker({
    position: kiberaLL,
    map: map,
    icon: markerImage,
    title:"Kibera"
  });

  var mathareMarker = new google.maps.Marker({
    position: mathareLL,
    map: map,
    icon: markerImage,
    title:"Mathare",
    visible: false
  });

  //zoom event for clustering
  google.maps.event.addListener(map, 'zoom_changed', function() {
    if (map.zoom >= 10) {
      mathareMarker.setVisible(true);
      mathareInfoWindow.open(map,mathareMarker);
      kiberaInfoWindow.setContent(kiberaInforWindowContent);
    } else {
      mathareMarker.setVisible(false);
      mathareInfoWindow.close();
      kiberaInfoWindow.setContent(nairobiInforWindowContent);
    }
  });

  //clicks for markers
  google.maps.event.addListener(kiberaMarker, 'click', function() {
    kiberaInfoWindow.open(map,kiberaMarker);
  });

  google.maps.event.addListener(mathareMarker, 'click', function() {
    mathareInfoWindow.open(map,mathareMarker);
  });

  kiberaInfoWindow.open(map,kiberaMarker);

  google.maps.event.addDomListener(window, 'resize', function() {
    console.log('here');
    map.setCenter(kiberaLL);
  });

}

google.maps.event.addDomListener(window, 'load', shofcoMapInit);


