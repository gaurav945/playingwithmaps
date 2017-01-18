$(document).ready(function () {
	$('#zoom-button').on('click', function () {
	      // debugger;
	      var zoom = $('#zoom').val();
	      initializeZoom(parseInt(zoom));
	    })
});

var map;
var service;
var infowindow;

function initialize() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      console.log('this is the latitude : ' + pos.lat + ', this is the longitude : ' + pos.lng);
      var pyrmont = new google.maps.LatLng(pos.lat, pos.lng);
      map = new google.maps.Map(document.getElementById('map'), {
          center: pyrmont,
          zoom: 12
        });

      var request = {
        location: pyrmont,
        radius: '500',
        query: 'restaurant'
      };

      service = new google.maps.places.PlacesService(map);
      service.textSearch(request, callback);
      // infoWindow.setPosition(pos);
      // infoWindow.setContent('Location found.');
      // map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function initializeZoom(zoom) {
	// debugger;
	// var radius = radius;
  navigator.geolocation.getCurrentPosition(function(position) {
  	// console.log(radius);
  	// debugger;
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    console.log('this is the latitude : ' + pos.lat + ', this is the longitude : ' + pos.lng);
    var pyrmont = new google.maps.LatLng(pos.lat, pos.lng);
    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: zoom
      });

    var request = {
      location: pyrmont,
      radius: '500',
      query: 'restaurant'
    };

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
  });
}
      // infoWindow.setPosition(pos);
      // infoWindow.setContent('Location found.');
      // map.setCenter(pos);
    // }//, function() {
      // handleLocationError(true, infoWindow, map.getCenter());
    // });
  // } //else {
    // Browser doesn't support Geolocation
    // handleLocationError(false, infoWindow, map.getCenter());
  // }

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}