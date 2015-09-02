var $ = jQuery;
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

  $('.widget').each(function(index, element){
    console.log($(this.id));
    $.ajax({
      dataType: "json",
      url: 'http://api.openweathermap.org/data/2.5/weather?units=metric&id='+this.id,
      success: function(data){
        if (data.cod != 404) {
          $(element).append('<span class="temp">'+data.main.temp+' ˚C</span><i class="cmwi wi '+weatherIcons[data.weather[0].icon]+'">');
        } else {

        }
      }, 
      fail: function(){
      }
    });
  });
    

});

