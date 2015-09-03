var $ = jQuery;

// Array with equivalences between OpenWeatherMap icons and our own set of icons
var weatherIcons = {};
    weatherIcons["01d"] = "wi-day-sunny";
    weatherIcons["01n"] = "wi-night-clear";
    weatherIcons["02d"] = "wi-day-cloudy";
    weatherIcons["02n"] = "wi-night-alt-cloudy";
    weatherIcons["03d"] = "wi-cloud";
    weatherIcons["03n"] = "wi-cloud";
    weatherIcons["04d"] = "wi-cloudy";
    weatherIcons["04n"] = "wi-cloudy";
    weatherIcons["09d"] = "wi-rain";
    weatherIcons["09n"] = "wi-rain";
    weatherIcons["10d"] = "wi-day-rain";
    weatherIcons["10n"] = "wi-night-alt-rain";
    weatherIcons["11d"] = "wi-thunderstorm";
    weatherIcons["11n"] = "wi-thunderstorm";
    weatherIcons["13d"] = "wi-snow";
    weatherIcons["13n"] = "wi-snow";
    weatherIcons["50d"] = "wi-fog";
    weatherIcons["50n"] = "wi-fog";



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


  $('.widget').each(function(index, element){
    $.ajax({
      dataType: "json",
      url: 'http://api.openweathermap.org/data/2.5/weather?units=metric&id='+this.id,
      success: function(data){
        if (data.cod != 404) {
          $(element).append('<span class="temp">'+data.main.temp+' ˚C</span><i class="cmwi wi '+weatherIcons[data.weather[0].icon]+'">');
        } else {
          // if an error occur we just display nothing
        }
      }, 
      fail: function(){
        // if an error occur we just display nothing
      }
    });
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

			
