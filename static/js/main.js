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


// ### Functions ###

function deleteSavedWidget(id) {
  var index = id.substring(2,4);
  var widgets = localStorage.getItem("widgets") ? JSON.parse(localStorage.getItem("widgets")) : [];
  if (widgets.length > 0) {
    widgets.splice(index, 1);
    localStorage.setItem("widgets", JSON.stringify(widgets));
    $('.liw'+index).fadeOut(400, function(){ $(this).remove(); });
  }
  $('#input-search').focus();
}


function getSavedWidgetsWithCurrentWeather(){
  var widgets = localStorage.getItem("widgets") ? JSON.parse(localStorage.getItem("widgets")) : [];
  if (widgets.length >0) {
    widgets.forEach(function(w, index){
      $('#widgetlisthome').append('<li class="widget" id="li'+index+'"><span class="cityname">'+w.name+'<span class="citycountry">['+w.sys.country+']</span></span>');
      getWeather(w, index);
    });
  } else {
    $('#widgetlisthome').append('<li class="nowidget">You have no widgets saved yet. <a href="/settings">Do it now !</a></li>');
  }

}


function getSavedWidgets() {
  var widgets = localStorage.getItem("widgets") ? JSON.parse(localStorage.getItem("widgets")) : [];
  if (widgets.length > 0) {
    widgets.forEach(function(w, index){
      $('#widgetlisthome').append('<li class="widget liw'+index+'">'+w.name+'<span class="deletewidget" id="dw'+index+'"><i class="fa fa-times"></i>delete</span>');
    });
    $('.deletewidget').click(function(){ deleteSavedWidget(this.id);} );
  } else {
    $('#widgetlisthome').append('<li class="nowidget">No widgets saved yet</li>');    
  }
}

function saveWidget(){
  var widgets = localStorage.getItem("widgets") ? JSON.parse(localStorage.getItem("widgets")) : [];
  var city = $('#input-search').val().trim();
  $.ajax({
    dataType: "json",
    url: 'http://api.openweathermap.org/data/2.5/weather?q='+city,
    success: function(data){
      if (data.cod != 404) {
        widgets.push(data);
        localStorage.setItem("widgets", JSON.stringify(widgets));
        var index = (widgets.length -1);
        $('.nowidget').fadeOut(400, function(){ $(this).remove(); });
        $('#widgetlisthome').append('<li class="widget liw'+index+'">'+data.name+'<span class="deletewidget" id="dw'+index+'"><i class="fa fa-times"></i>delete</span>');
        $('.deletewidget').click(function(){ deleteSavedWidget(this.id);} );
        $('#restultrow').fadeOut();
        $('#results').empty();
        $('#input-search').val("");
        $('#input-search').focus();
      } else {
      }
    }, 
    fail: function(){
    }
  });
}

// make an API call and get the weather for the city the user searched for
function getCityFromInput() {
  var city = $('#input-search').val().trim();
  $.ajax({
    dataType: "json",
    url: 'http://api.openweathermap.org/data/2.5/weather?q='+city,
    success: function(data){
      if (data.cod != 404) {
        $('#results').html("<div id='restultrow'>"+data.name+"["+data.sys.country+"] <span class='addwidget'><i class='fa fa-plus-circle'></i>Add to your widgets</span></div>");
        $('#results').fadeIn();
        $('.addwidget').click(function (){ saveWidget(); });
      } else {
        $('#results').html("Sorry, no city found with that name.");
      }
    }, 
    fail: function(){
      $('#results').html("Sorry, an error occurred.");
    }
  });
}

function getWeather(w, index) {
  $.ajax({
      dataType: "json",
      url: 'http://api.openweathermap.org/data/2.5/weather?units=metric&id='+w.id,
      success: function(data){
        if (data.cod != 404) {
          $('#li'+index).append('<span class="temp">'+data.main.temp+' ˚C</span><i class="cmwi wi '+weatherIcons[data.weather[0].icon]+'">');
        } else {
          // if an error occur we just display nothing
        }
      }, 
      fail: function(){
        // if an error occur we just display nothing
      }
    });
}

$( document ).ready(function() {

	// ### Events  Handler ###

	$('#input-search').focus();
	$('#input-search').keypress(function(event){
		if (event.which == 13) {
			getCityFromInput();
		}
	});

	$('#button-search').click(function(){
		getCityFromInput();
	});

  $('#deleteall').click(function(){
    localStorage.removeItem("widgets");
    $('#widgetlisthome').fadeOut(400, function(){ $(this).empty().show(); });
  });
	
});
