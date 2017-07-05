$(document).ready(function(){

var	map;
var Numbers, maxNumber; //validation variables



// Scroll on click
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
// Loads the google map
google.maps.event.addDomListener(window, 'load', init);


// Validation for Number of people
Numbers = /(?=(.*[1-9]){1}).{1,}/;
$("#People").focus(function(){
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

	maxNumber = $(this).parent().find('span.input-errors')
	if ($(this).val() < 7){
		$(this).parent().find('span.input-errors .max').remove();
	} else if ( (!$(this).val().match(maxNumber)) && ($("li.max").length === 0) ){
		$(this).parent().find('span.input-errors ul').append("<li class='max'>Must be less than 7 people</li>")
	}


	});

// Validation for Days of Hire
$("#Hire").focus(function(){
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
	maxNumber = $(this).parent().find('span.input-errors')
	if ($(this).val() <= 15){
		$(this).parent().find('span.input-errors .max').remove();
	} else if ( (!$(this).val().match(maxNumber)) && ($("li.max").length === 0) ){
		$(this).parent().find('span.input-errors ul').append("<li class='max'>Must be less than 15 people</li>")
	}

});
// Google Maps

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
};


AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode){
	var me = this;
	autocomplete.bindTo('bounds', this.map);
	autocomplete.addListener('place_changed', function(){
		var place = autocomplete.getPlace();
		if (!place.place_id){
			window.alert("Please select an option from the dropdown list.");
			return;
		}
		if (mode === 'ORIG'){
			me.originPlaceId = place.place_id;
		} else {
			me.destinationPlaceId = place.place_id;
		}
		me.route();
	});

};

AutocompleteDirectionsHandler.prototype.route = function(){
	if (!this.originPlaceId || !this.destinationPlaceId){
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

// Maths for transport
var motorBike = 109;
var	smallCar = 129;
var largeCar = 144;
var motorHome = 200;

var fuelCost = 1.859;
var HireCost;
// Transport Click


$("#motorbike").click(function(){
	HireCost = parseInt($("#Hire").val());
	if (motorBike * HireCost)  {
		$("#hireDetail").empty().prepend("<div><h1 class='text'>"+"$"+HireCost * motorBike+"</h1><h5>Hire Cost</h5></div>");
		// console.log("Your hiring cost for motorbike is: " +motorBike * HireCost);
	}
});

$("#small-car").click(function(){
	HireCost = parseInt($("#Hire").val());
	if (smallCar * HireCost) {
		$("#hireDetail").empty().prepend("<div><h1 class='text'>"+"$"+HireCost * smallCar+"</h1><h5>Hire Cost</h5></div>");
		// console.log("Your hiring cost for small car is: " + smallCar * HireCost);
	}
});
$("#large-car").click(function(){
	HireCost = parseInt($("#Hire").val());
	if (largeCar * HireCost) {
		$("#hireDetail").empty().prepend("<div><h1 class='text'>"+"$"+HireCost * largeCar+"</h1><h5>Hire Cost</h5></div>");
		// console.log("Your hiring cost for large car is: " + largeCar * HireCost);
	}
});
$("#motor-home").click(function(){
	HireCost = parseInt($("#Hire").val());
	if (motorHome * HireCost) {
		$("#hireDetail").empty().prepend("<div><h1 class='text'>"+"$"+HireCost * motorHome+"</h1><h5>Hire Cost</h5></div>");
		// console.log("Your hiring cost for motorhome is: " + motorHome * HireCost);
	}
});

// Mix it up plugin

var WordNumberPeople, WordNumberHire;
var inputPeople = document.querySelector('[data-ref="input-people"]');
var inputHire = document.querySelector('[data-ref="input-hire"]');

var mixer = mixitup('#mix-container');

function transportMix(){
	var FilterVariable = "." + WordNumberPeople + "." + WordNumberHire;
	mixer.filter(FilterVariable);
};

// Set up a handler to listen for "keyup" events from the search input

// Key up function for Number of people
$(inputPeople).keyup(function(){

var searchValue;

console.log($(this).val());

	if ($(this).val().length > 2){
		// If the input value is greater than 2 characters, don't send
		searchValue = '';
	} else {
		searchValue = $(this).val();
	}

	// console.log(searchValue);

	WordNumberPeople = (toWords(searchValue) + "People");
	// console.log("Your word result for people is: "+ WordNumberPeople);
	transportMix();

});

// Key up function for Days of Hire
$(inputHire).keyup(function(){

	var hireValue;

	if ($(this).val().length > 2){
		// If the input value is greater than 2 characters, don't send
		hireValue = '';
	} else {
		hireValue = $(this).val();
	}
	// console.log(searchValue);

	WordNumberHire = (toWords(hireValue) + "Day");
	// console.log(WordNumberHire);
	transportMix();

});



});









