$(document).ready(function(){

var	map;


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
		// mapTypeControlOptions:{
		// position: google.maps.ControlPosition.TOP_CENTER,
		// },
		
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

};
//Loads the google map
google.maps.event.addDomListener(window, 'load', init);

var	Numbers = /(?=(.*[1-9]){1}).{1,}/;
// Validation for Number of people
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

	var maxNumber = $(this).parent().find('span.input-errors')
	if ($(this).val() <= 7){
		$(this).parent().find('span.input-errors .max').remove();
	} else if ( (!$(this).val().match(maxNumber)) && ($("li.max").length === 0) ){
		$(this).parent().find('span.input-errors ul').append("<li class='max'>Must be less than 7 people</li>")
	}


	});

//Validation for Days of Hire
// $("#Hire").focus(function(){
// 	if ($(this).val().length === 0) {
// 		$(this).parent().find('span.input-errors').empty();
// 		$(this).parent().find('span.input-errors').append("<ul class='error'></ul>");
// 		$(this).parent().find('span.input-errors ul').append(
// 								"<li class='numbers'>Must include 1 number</li>"					
// 							)

// 	}
// }).blur(function(){

// }).keyup(function(){
// 	if ($(this).val().match(Numbers)) {
// 		$(this).parent().find('span.input-errors .numbers').remove();

// 	}else if ( (!$(this).val().match(Numbers)) && ($("li.numbers").length === 0) ){
// 		$(this).parent().find('span.input-errors ul').append("<li class='numbers'>Must hire for at least 1 day</li>")
// 	}

// })
//Google Maps


});
