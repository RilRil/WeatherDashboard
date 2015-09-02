var $ = jQuery;

$( document ).ready(function() {

	
	// ### Events  Handler ###
	$('#input-search').focus();
	$('#input-search').keypress(function(event){
		if (event.which == 13) {
			getWeatherFromInput();
		}
	});

	$('#button-search').click(function(){
		getWeatherFromInput();
	});



	// ### Functions ###

	// make an API call and get the weather for the city the user searched for
	function getWeatherFromInput() {
		var city = $('#input-search').val().trim();
		$.ajax({
			dataType: "json",
			url: 'http://api.openweathermap.org/data/2.5/weather?q='+city,
			success: function(data){
				if (data.cod != 404) {
					$('#results').html(data.name+"["+data.sys.country+"] <span class='addwidget'><a href='/add/"+data.id+"'><i class='fa fa-plus-circle'></i>Add to your widgets</a></span>");
					$('#results').fadeIn();
				} else {
					$('#results').html("Sorry, no city found with that name.");
				}
			}, 
			fail: function(){
				$('#results').html("Sorry, an error occurred.");
			}
		});
	}
	
});

			
