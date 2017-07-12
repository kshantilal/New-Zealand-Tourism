$(document).ready(function(){

var map, mapOptions;
var Numbers, maxNumber, hasMap, hasOrig, hasDest; // Validation variables
var mySwiper, mixer; //Variable for plugins
var realDistance, Details; // Finds the distance then turns it into a number
var vehicleName, litrePerFuel, hireCost; // Variables for details

var totalHireCost, totalFuelCost, fuelPerDistance, finalCost; // Variables for cost

// Maths for transport
var motorBike = 109;
var smallCar = 129;
var largeCar = 144;
var motorHome = 200;
var fuelCost = 1.859; 
var vehicles; // Vehicles array

var searchValue, hireValue; // Variables for number of people and hire input fields

// Mix it up
var WordNumberPeople, WordNumberHire, inputPeople, inputHire, FilterVariable;

// Scroll on click
$("#down-arrow").click(function(){
	$("html,body").animate({
		scrollTop: $(".vehicle-details").offset().top
	},
	1500);

});
	mySwiper = new Swiper(".swiper-container", {
	nextButton: ".swiper-button-next",
	prevButton: ".swiper-button-prev",
	slidesPerView: 1,
	paginationClickable: true, //If you click on the dots they will go to that slde
	spaceBetween: 30,
	loop: true, // Loops over the slider
	speed: 2000,
	autoplay: 5000,
	easein: 1,
	autoplayDisableOnInteraction: false, // When user interacts with the slider it continues after use

});


function init(){
	mapOptions = {
	// Set where the map starts
	center: {
		lat: -41.0726221,
		lng: 172.9166629,
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

	{elementType: "geometry", stylers: [{color: "#242f3e"}]},
	{elementType: "labels.text.stroke", stylers: [{color: "#191f2d"}]},
	{elementType: "labels.text.fill", stylers: [{color: "#919da5"}]},

	{
		featureType: "road",
		elementType: "geometry",
		stylers: [
		{color: "#4a576c"},

		]
	},
	{
		featureType: "road",
		elementType: "labels.text.fill",
		stylers: [{color: "#93bdec"}]
	},

	{
		featureType: "road.highway",
		elementType: "geometry",
		stylers: [
		{color: "#ABB7B7"}

		]
	},
	{
		featureType: "water",
		elementType: "geometry",
		stylers: [{color: "#0e2035"}]
	},
	{
		featureType: "landscape.man_made",
		elementType: "geometry",
		stylers: [
			{color: "#1e2a36"},
			
		]
	},
	{
		featureType: "landscape.natural",
		elementType: "geometry",
		stylers: [
			{color: "#1d2c3b"},
			
		]
	},
	{
		featureType: "landscape.natural.terrain",
		elementType: "geometry",
		stylers: [
			{color: "#24363d"},
			
		]
	},
	{
		featureType: "administrative.locality",
		elementType: "labels.text.fill",
		stylers: [
		  {color: "#9e9e9d"}

		]
	},
	{
		featureType: "administrative.locality",
		elementType: "labels.text.stroke",
		stylers: [
		  {"color": "#10152a"}

		]
	},
	{
		featureType: "poi.park",
		elementType: "labels.text.fill",
		stylers: [
		{color: "#6b9a76"}

		]
	},

	]

	};


	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	new AutocompleteDirectionsHandler(map); // Initializes the autocomplete forms

};
// Loads the google map
google.maps.event.addDomListener(window, "load", init);


// Validation for Number of people
Numbers = /(?=(.*[1-9]){1}).{1,}/;
$("#People").focus(function(){
	if ($(this).val().length === 0) {
		$(this).parent().find("span.input-errors").empty();
		$(this).parent().find("span.input-errors").append("<ul class='error'></ul>");
		$(this).parent().find("span.input-errors ul").append(
								"<li class='numbers'>Must be at least 1 person</li>"+
								"<li class='numbers'>Must be a number</li>"
							)

	}
}).keyup(function(){

	if ($(this).val().match(Numbers)) {
		$(this).parent().find("span.input-errors .numbers").remove();

	}else if ( (!$(this).val().match(Numbers)) && ($("li.numbers").length === 0) ){
		$(this).parent().find("span.input-errors ul").append("<li class='numbers'>Must be at least 1 person</li>" + "<li class='numbers'>Must be a number</li>")
	
	}

	maxNumber = $(this).parent().find("span.input-errors")
	if ($(this).val() < 7){
		$(this).parent().find("span.input-errors .max").remove();
	} else if ( (!$(this).val().match(maxNumber)) && ($("li.max").length === 0) ){
		$(this).parent().find("span.input-errors ul").append("<li class='max'>Must be less than 7 people</li>")
	}


	});

// Validation for Days of Hire
$("#Hire").focus(function(){
	if ($(this).val().length === 0) {
		$(this).parent().find("span.input-errors").empty();
		$(this).parent().find("span.input-errors").append("<ul class='error'></ul>");
		$(this).parent().find("span.input-errors ul").append(
								"<li class='numbers'>Must include 1 number</li>"
							)

	}
}).keyup(function(){
	if ($(this).val().match(Numbers)) {
		$(this).parent().find("span.input-errors .numbers").remove();

	}else if ( (!$(this).val().match(Numbers)) && ($("li.numbers").length === 0) ){
		$(this).parent().find("span.input-errors ul").append("<li class='numbers'>Must hire for at least 1 day</li>")
	}
	maxNumber = $(this).parent().find("span.input-errors")
	if ($(this).val() <= 15){
		$(this).parent().find("span.input-errors .max").remove();
	} else if ( (!$(this).val().match(maxNumber)) && ($("li.max").length === 0) ){
		$(this).parent().find("span.input-errors ul").append("<li class='max'>Must be less than 15 days</li>")
	}

});

// disable mousewheel on a input number field when in focus
$('form').on('focus', 'input[type=number]', function (e) {
	$(this).on('mousewheel.disableScroll', function (e) {
		e.preventDefault()
	})
});
$('form').on('blur', 'input[type=number]', function (e) {
	$(this).off('mousewheel.disableScroll')
});

// Google Maps
function AutocompleteDirectionsHandler(map) {
	this.map = map;
	this.originPlaceId = null;
	this.destinationPlaceId = null;
	this.travelMode = "DRIVING";
	var originInput = document.getElementById("origin-input");
	var destinationInput = document.getElementById("destination-input");
	this.directionsService = new google.maps.DirectionsService;
	this.directionsDisplay = new google.maps.DirectionsRenderer;
	this.directionsDisplay.setMap(map);

	var originAutocomplete = new google.maps.places.Autocomplete(
		originInput, {placeIdOnly: true, componentRestrictions: {country: "NZ"}
	});
	var destinationAutocomplete = new google.maps.places.Autocomplete(
		destinationInput, {placeIdOnly: true, componentRestrictions: {country: "NZ"}
	});

	this.setupPlaceChangedListener(originAutocomplete, "ORIG");
	this.setupPlaceChangedListener(destinationAutocomplete, "DEST");
};


AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode){
	var me = this;
	autocomplete.bindTo("bounds", this.map);
	autocomplete.addListener("place_changed", function(){
		var place = autocomplete.getPlace();
		if (!place.place_id){
			window.alert("Please select an option from the dropdown list.");
			return;
		}
		if (mode === "ORIG"){
			me.originPlaceId = place.place_id;
			hasOrig = true;
		} else {
			me.destinationPlaceId = place.place_id;
			hasDest = true;
		}
		me.route();
		hasMap = true;
		checkStep2(); // Prevents details to load before info is inputted
	});

};

AutocompleteDirectionsHandler.prototype.route = function(){
	if (!this.originPlaceId || !this.destinationPlaceId){
		return;
	}
	var me = this;

	this.directionsService.route({
		origin: {"placeId": this.originPlaceId},
		destination: {"placeId": this.destinationPlaceId},
		travelMode: this.travelMode
	}, function(response, status) {
			if (status === "OK") {
			me.directionsDisplay.setDirections(response);
			DistanceDisplay(response.routes[0].legs[0].distance.text, response.routes[0].legs[0].duration.text);
			} else {
			window.alert("Directions request failed due to " + status);
			}

	});
};

function DistanceDisplay(distance,duration){
	Details = $(".details").val();
	$("#routeDistance").empty().prepend("<div><h2 class='text'>"+distance+"</h2><h4>Distance</h4</div>");
	$("#routeDuration").empty().prepend("<div><h2 class='text'>"+duration+"</h2><h4>Duration</h4</div>");
	realDistance = parseFloat(distance.replace(",",""));
};



$("#origin-input").focus(function(){
	hasOrig = false;
	$(this).val("");
	checkStep2();
});

$("#destination-input").focus(function(){
	hasDest = false;
	$(this).val("");
	checkStep2();
});


// Show transport details depending on what vehicle the user clicks on
vehicles = [
	{
		vehicleName: "motorbike",
		hireCost: 109,
		litrePerFuel: 3.7,
		Name: "Motorbike"

	},
	{
		vehicleName: "smallCar",
		hireCost: 129,
		litrePerFuel: 8.5,
		Name: "Small Car"
	},
	{
		vehicleName: "largeCar",
		hireCost: 144,
		litrePerFuel: 9.7,
		Name: "Large Car"
	},
	{
		vehicleName: "motorHome",
		hireCost: 200,
		litrePerFuel: 17,
		Name: "Motor Home"
	},
	

];



$(".vehicleIcon").click(function(event){
	
	vehicleName = ($(this).attr("data-value"));
	for (var i = 0; i < vehicles.length; i++) {
		if (vehicles[i].vehicleName == vehicleName) {
			litrePerFuel = (vehicles[i].litrePerFuel);
			hireCost = (vehicles[i]).hireCost;
			Name = (vehicles[i].Name);

		}
	}

	// Hire Cost
	hireCalc = parseInt($("#Hire").val());
	totalHireCost = hireCalc * hireCost;

	// Fuel Cost
	fuelPerDistance = fuelCost * litrePerFuel / 100;
	totalFuelCost = realDistance * fuelPerDistance;

	// Final Cost.  
	finalCost = totalHireCost + totalFuelCost; 

	$("#active-car").empty().prepend("<h3 class='text'>"+Name+"</h3>");
	$("#hireDetail").empty().prepend("<div><h2 class='text'>"+"$"+totalHireCost+"</h2><h4>Hire Cost</h4></div>");
	$("#fuelCost").empty().prepend("<div><h2 class='text'>"+"$"+totalFuelCost.toPrecision(3)+"</h2><h4>Fuel Cost</h4></div>");
	$("#totalCost").empty().prepend("<div><h2 class='text'>"+"$"+finalCost.toPrecision(4)+"</h2><h4>Total</h4></div>");
	
	$(".transport-images .active").removeClass("active").find("img").toggle();
	$(this).toggleClass("active");
	$(this).find("img").toggle(); 

	$("html,body").animate({
		scrollTop: $(".details-container").offset().top
	},
	"slow");


});


function checkStep2(){
	if(!hasOrig || !hasDest || !$("#People").val() || !$("#Hire").val()){
		$("#step2").hide();
		return;
	}

	$("#step2").show();
};

$("#People,#Hire").keyup(checkStep2);



// Mix it up plugin

inputPeople = document.querySelector("[data-ref='input-people']");
inputHire = document.querySelector("[data-ref='input-hire']");

mixer = mixitup("#mix-container");

function transportMix(){
	FilterVariable = "." + WordNumberPeople + "." + WordNumberHire;
	mixer.filter(FilterVariable);
};


// Key up function for Number of people
$(inputPeople).keyup(function(){

	searchValue;

	if ($(this).val().length > 2){
		// If the input value is greater than 2 characters, don't send
		searchValue = "";
	} else {
		searchValue = $(this).val();
	}

	WordNumberPeople = (toWords(searchValue) + "People");
	transportMix();

});

// Key up function for Days of Hire
$(inputHire).keyup(function(){

	hireValue;

	if ($(this).val().length > 2){
		// If the input value is greater than 2 characters, don't send
		hireValue = "";
	} else {
		hireValue = $(this).val();
	}

	WordNumberHire = (toWords(hireValue) + "Day");
	transportMix();

});





});









