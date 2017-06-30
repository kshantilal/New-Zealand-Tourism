$(document).ready(function(){


$("#People").focus(function(){
	if ($(this).val().length === 0) {
		$(this).parent().find('span.input-errors').empty();
		$(this).parent().find('span.input-errors').append("<ul class='error'></ul>");
		$(this).parent().find('span.input-errors ul').append(
								"<li class='numbers'>Must include 1 number</li>"
								
								
							)

	}
}).blur(function(){


}).keyup(function(){
	// console.log($(this).val());
	var	Numbers = /(?=(.*[0-9]){1}).{1,}/;
	if ($(this).val().match(Numbers)) {
		$(this).parent().find('span.input-errors .numbers').remove();

	}else if ( (!$(this).val().match(Numbers)) && ($("li.numbers").length === 0) ){
		$(this).parent().find('span.input-errors ul').append("<li class='numbers'>Must include 1 number</li>")
	}

	var maxNumber = $(this).parent().find('span.input-errors')
	if ($(this).val().length <= 2){
		$(this).parent().find('span.input-errors .max').remove();
	}else if ( (!$(this).val().match(maxNumber)) && ($("li.max").length === 0) ){
		$(this).parent().find('span.input-errors ul').append("<li class='max'>Must be less than 2 numbers</li>")
	}

	// var betweenNumber = $(this).parent().find('span.input-errors')
	if ($(this).val() > 7){
		console.log('greater than 7');
	} else ($(this).val() <= 7)
		console.log('less than 7')


	function required(Numbers, maxNumber){
		console.log('here');
	}



});

});