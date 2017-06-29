$(document).ready(function(){

// var	numberofPeople = false;
// Validate Number of people

// $("#People").keyup(function(){
// 	$(this).parent().find('span.errors');
// 	var peopleErrors = $(this).parent().find('span.input-errors')
// 	peopleErrors.empty();
// 	if ($(this).val().length === 0) {
// 		peopleErrors.text("This field is required").addClass("error");
// 		return;
// 	}
// 	numberofPeople = true



// });

$("#People").focus(function(){
	if ($(this).val().length === 0) {
		$(this).parent().find('span.input-errors').empty();
		$(this).parent().find('span.input-errors').append("<ul class='error'></ul>");
		$(this).parent().find('span.input-errors ul').append(
								"<li class='required'>This is required</li>"+
								"<li class='numbers'>Must include 1 number</li>"

							)

	}
}).blur(function(){


}).keyup(function(){
	console.log($(this).val());
	// if ($(this).val().length !== 0) {
	// 	$(this).parent(find).find('span-input-errors .required').remove()

	// }else if ( ($(this).val().length === 0) && ($("li.required").length === 0) ) {
	// 	$(this).parent().find('span.input-errors ul').append("<li class='required'>This is required</li>")

	// }
	//Must include at least 3 numbers
	var	Numbers = /(?=(.*[0-9]){1}).{1,}/;
	if ($(this).val().match(Numbers)) {
		$(this).parent().find('span.input-errors .numbers').remove();

	}else if ( (!$(this).val().match(Numbers)) && ($("li.numbers").length === 0) ){
		$(this).parent().find('span.input-errors ul').append("<li class='numbers'>Must include 1 number</li>")
	}


	});

	function required(Numbers){
		console.log('here');
	}

});