// Init Google map
var THEMEREX_googlemap_init_obj = {};
var THEMEREX_googlemap_styles = {
	'default': [],
	'simple': [
				{
				  stylers: [
					{ hue: "#00ffe6" },
					{ saturation: -20 }
				  ]
				},{
				  featureType: "road",
				  elementType: "geometry",
				  stylers: [
					{ lightness: 100 },
					{ visibility: "simplified" }
				  ]
				},{
				  featureType: "road",
				  elementType: "labels",
				  stylers: [
					{ visibility: "off" }
				  ]
				}
			  ],
	'greyscale': [
					{
						"stylers": [
							{ "saturation": -100 }
						]
					}
				],
	'greyscale2': [
				{
				 "featureType": "landscape",
				 "stylers": [
				  { "hue": "#FF0300" },
				  { "saturation": -100 },
				  { "lightness": 20.4705882352941 },
				  { "gamma": 1 }
				 ]
				},
				{
				 "featureType": "road.highway",
				 "stylers": [
				  { "hue": "#FF0300" },
				  { "saturation": -100 },
				  { "lightness": 25.59999999999998 },
				  { "gamma": 1 }
				 ]
				},
				{
				 "featureType": "road.arterial",
				 "stylers": [
				  { "hue": "#FF0300" },
				  { "saturation": -100 },
				  { "lightness": -22 },
				  { "gamma": 1 }
				 ]
				},
				{
				 "featureType": "road.local",
				 "stylers": [
				  { "hue": "#FF0300" },
				  { "saturation": -100 },
				  { "lightness": 21.411764705882348 },
				  { "gamma": 1 }
				 ]
				},
				{
				 "featureType": "water",
				 "stylers": [
				  { "hue": "#FF0300" },
				  { "saturation": -100 },
				  { "lightness": 21.411764705882348 },
				  { "gamma": 1 }
				 ]
				},
				{
				 "featureType": "poi",
				 "stylers": [
				  { "hue": "#FF0300" },
				  { "saturation": -100 },
				  { "lightness": 4.941176470588232 },
				  { "gamma": 1 }
				 ]
				}
			   ]
}

function googlemap_init(dom_obj, coords, description, point) {
	"use strict";
	try {
		if (coords.latlng!=='') {
			var latlngStr = coords.latlng.split(',');
			var lat = parseFloat(latlngStr[0]);
			var lng = parseFloat(latlngStr[1]);
			var latlng = new google.maps.LatLng(lat, lng);
		} else
			var latlng = new google.maps.LatLng(0, 0);
		var id = dom_obj.id;
		THEMEREX_googlemap_init_obj[id] = {};
		THEMEREX_googlemap_init_obj[id].dom = dom_obj;
		THEMEREX_googlemap_init_obj[id].point = point;
		THEMEREX_googlemap_init_obj[id].description = description;
		THEMEREX_googlemap_init_obj[id].opt = {
			zoom: coords.zoom,
			center: latlng,
			scrollwheel: true,
			scaleControl: false,
			disableDefaultUI: false,
			styles: THEMEREX_googlemap_styles[coords.style ? coords.style : 'default'],
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var custom_map = new google.maps.Geocoder();
		custom_map.geocode(coords.latlng!=='' ? {'latLng': latlng} : {"address": coords.address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				THEMEREX_googlemap_init_obj[id].address = results[0].geometry.location;
				googlemap_create(id);
			} else
				alert(THEMEREX_GEOCODE_ERROR + ' ' + status);
		});

		jQuery(window).resize(function() {
			if (THEMEREX_googlemap_init_obj[id].map) THEMEREX_googlemap_init_obj[id].map.setCenter(THEMEREX_googlemap_init_obj[id].address);
		});

	} catch (e) {
		//alert(THEMEREX_GOOGLE_MAP_NOT_AVAIL);
	};
}

function googlemap_create(id) {
	"use strict";
	if (!THEMEREX_googlemap_init_obj[id].address) return false;
	THEMEREX_googlemap_init_obj[id].map = new google.maps.Map(THEMEREX_googlemap_init_obj[id].dom, THEMEREX_googlemap_init_obj[id].opt);
	THEMEREX_googlemap_init_obj[id].map.setCenter(THEMEREX_googlemap_init_obj[id].address);
	var marker = new google.maps.Marker({
		map: THEMEREX_googlemap_init_obj[id].map,
		icon: THEMEREX_googlemap_init_obj[id].point,
		position: THEMEREX_googlemap_init_obj[id].map.getCenter()
	});
	var infowindow = new google.maps.InfoWindow({
		content: THEMEREX_googlemap_init_obj[id].description
	});
	google.maps.event.addListener(marker, "click", function() {
		infowindow.open(THEMEREX_googlemap_init_obj[id].map, marker);
	});
}

function googlemap_refresh() {
	"use strict";
	for (id in THEMEREX_googlemap_init_obj) {
		googlemap_create(id);
	}
}
