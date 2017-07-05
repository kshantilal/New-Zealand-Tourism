$(document).ready(function(){

var	map, numberofPeople;


//Scroll on click
$("#down-arrow").click(function(){
	$('html,body').animate({
		scrollTop: $("#map").offset().top
	},
	'slow');

});

function init(){
	var mapOptions = {
		//Set where the map starts
		center: {
			lat: -41.299688,
			lng: 174.811406,
		},
		zoom: 5,
		disableDefaultUI: false,
		disableDoubleClickZoom: false,
		streetViewControl: true,
		scrollwheel: true,
		draggable: true,
		draggableCursor: "pointer",
		draggingCursor: "crosshair",
		fullscreenControl: true,
		keyboardShortcuts: false,
		minZoom: 5,
		gestureHandling: "auto",

		mapTypeControlOptions:{
		position: google.maps.ControlPosition.TOP_LEFT,
		},
		
		styles: [

		{elementType: 'geometry', stylers: [{color: '#242f3e'}]},
		{elementType: 'labels.text.stroke', stylers: [{color: '#34495E'}]},
		{elementType: 'labels.text.fill', stylers: [{color: '#BDC3C7'}]},

		{
			featureType: "road",
			elementType: "geometry",
			stylers: [
			{color: "#6C7A89"},
			{saturation: -80}

			]
		},
		{
			  featureType: 'road',
			  elementType: 'labels.text.fill',
			  stylers: [{color: '#95A5A6'}]
		},

		{
			featureType: "road.highway",
			elementType: "geometry",
			stylers: [
			{color: "#ABB7B7"}

			]
		},
		{
			featureType: 'water',
			elementType: 'geometry',
			stylers: [{color: '#17263c'}]
		},
		{
			featureType: 'landscape.man_made',
			elementType: 'geometry',
			stylers: [
				{color: '#2C3E50'},
				
			]
		},
		{
			featureType: 'landscape.natural',
			elementType: 'geometry',
			stylers: [
				{color: '#34495E'},
				
			]
		},
		{
			featureType: 'landscape.natural.terrain',
			elementType: 'geometry',
			stylers: [
				{color: '#22313F'},
				
			]
		},

		

		]

	};


	map = new google.maps.Map(document.getElementById('map'), mapOptions);
	new AutocompleteDirectionsHandler(map); //initializes the autocomplete forms

};
//Loads the google map
google.maps.event.addDomListener(window, 'load', init);

var	Numbers = /(?=(.*[1-9]){1}).{1,}/;
// Validation for Number of people
$(".People").focus(function(){
	if ($(this).val().length === 0) {
		$(this).parent().find('span.input-errors').empty();
		$(this).parent().find('span.input-errors').append("<ul class='error'></ul>");
		$(this).parent().find('span.input-errors ul').append(
								"<li class='numbers'>Must be at least 1 person</li>"+
								"<li class='numbers'>Must be a number</li>"
							)

	}
}).blur(function(){

}).keyup(function(){

	if ($(this).val().match(Numbers)) {
		$(this).parent().find('span.input-errors .numbers').remove();

	}else if ( (!$(this).val().match(Numbers)) && ($("li.numbers").length === 0) ){
		$(this).parent().find('span.input-errors ul').append("<li class='numbers'>Must be at least 1 person</li>" + "<li class='numbers'>Must be a number</li>")
	
	}

	var maxNumber = $(this).parent().find('span.input-errors')
	if ($(this).val() < 7){
		$(this).parent().find('span.input-errors .max').remove();
	} else if ( (!$(this).val().match(maxNumber)) && ($("li.max").length === 0) ){
		$(this).parent().find('span.input-errors ul').append("<li class='max'>Must be less than 7 people</li>")
	}


	});

//Validation for Days of Hire
$(".Hire").focus(function(){
	if ($(this).val().length === 0) {
		$(this).parent().find('span.input-errors').empty();
		$(this).parent().find('span.input-errors').append("<ul class='error'></ul>");
		$(this).parent().find('span.input-errors ul').append(
								"<li class='numbers'>Must include 1 number</li>"
							)

	}
}).blur(function(){

}).keyup(function(){
	if ($(this).val().match(Numbers)) {
		$(this).parent().find('span.input-errors .numbers').remove();

	}else if ( (!$(this).val().match(Numbers)) && ($("li.numbers").length === 0) ){
		$(this).parent().find('span.input-errors ul').append("<li class='numbers'>Must hire for at least 1 day</li>")
	}

})
//Google Maps

function AutocompleteDirectionsHandler(map) {
		this.map = map;
		this.originPlaceId = null;
		this.destinationPlaceId = null;
		this.travelMode = 'DRIVING';
		var originInput = document.getElementById('origin-input');
		var destinationInput = document.getElementById('destination-input');
		this.directionsService = new google.maps.DirectionsService;
		this.directionsDisplay = new google.maps.DirectionsRenderer;
		this.directionsDisplay.setMap(map);

		var originAutocomplete = new google.maps.places.Autocomplete(
			originInput, {placeIdOnly: true});
		var destinationAutocomplete = new google.maps.places.Autocomplete(
			destinationInput, {placeIdOnly: true});


		this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
		this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

	  }


	  AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
		var me = this;
		autocomplete.bindTo('bounds', this.map);
		autocomplete.addListener('place_changed', function() {
		  var place = autocomplete.getPlace();
		  if (!place.place_id) {
			window.alert("Please select an option from the dropdown list.");
			return;
		  }
		  if (mode === 'ORIG') {
			me.originPlaceId = place.place_id;
		  } else {
			me.destinationPlaceId = place.place_id;
		  }
		  me.route();
		});

	  };

		AutocompleteDirectionsHandler.prototype.route = function() {
		if (!this.originPlaceId || !this.destinationPlaceId) {
			return;
		}
		var me = this;

		this.directionsService.route({
		  origin: {'placeId': this.originPlaceId},
		  destination: {'placeId': this.destinationPlaceId},
		  travelMode: this.travelMode
		}, function(response, status) {
			console.log(response);
		  if (status === 'OK') {
			me.directionsDisplay.setDirections(response);
			DistanceDisplay(response.routes[0].legs[0].distance.text, response.routes[0].legs[0].duration.text);
		  } else {
			window.alert('Directions request failed due to ' + status);
		  }
		});
	  };

	function DistanceDisplay(distance,duration){
	var Details = $(".details").val();
	$("#routeDistance").empty().prepend("<div><h1 class='text'>"+distance+"</h1><h5>Distance</h5></div>");
	$("#routeDuration").empty().prepend("<div><h1 class='text'>"+duration+"</h1><h5>Duration</h5</div>");


};




var daysofHire = $("#daysofHire").val();
var numberofPeople = $("#numberofPeople").val();

$("#numberofPeople").focus(function(){
	console.log('focus');
 }).keyup(function(){
 	console.log('here');
	if ((daysofHire >= 1) && (daysofHire <= 5) && (numberofPeople == 1)) {
	   $("#motorbike").css("display", "block");
	 }
	 if ((daysofHire >= 1) && (daysofHire <= 10) && (numberofPeople >= 1) && (numberofPeople <= 2)) {
	   $("#small-car").css("display", "block");
	 }
	 if ((daysofHire >= 3) && (daysofHire <= 10) && (numberofPeople >= 1) && (numberofPeople <= 5)) {
	   $("#large-car").css("display", "block");
	 }
	 if ((daysofHire >= 2) && (daysofHire <= 15) && (numberofPeople >= 2) && (numberofPeople <= 6)) {
	   $("#motor-home").css("display", "block");
	 }

 });

 



var motorBike = 109;
var	smallCar = 129;
var largeCar = 144;
var motorHome = 200;

var petrolPrice = 1.859;
// Transport Click
// function hireCost(){
// 	if (motorbike == 109 * petrolPrice) {	
// 	}
// }
// // console.log(hireCost);
// hireCost();

// console.log(petrolPrice);
// $("#motorbike").click(function(){
// 	if (motorBike == 109) {

// 		console.log(motorBike * petrolPrice);
// 	}
// });

// $("#small-car").click(function(){
// 	if (smallCar == 129) {
// 		console.log('this costs 129');
// 	}
// });
// $("#large-car").click(function(){
// 	if (largeCar == 144) {
// 		console.log('this costs 144');
// 	}
// });
// $("#motor-home").click(function(){
// 	if (motorHome == 200) {
// 		console.log('this costs 200');
// 	}
});


