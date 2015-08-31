 /* Author: Cyril Maurel
 */


var mouseX = 0;
var mouseY = 0;
var currentTiltObj;
var tiltContainer;
var minX;
var maxX;
var tiltContainerWidth;
var isMobileDevice;


$( document ).ready(function() {

  tiltContainer = $('.photo');
  tiltContainerWidth = tiltContainer.width();
  containerPosition = tiltContainer.offset();
  minX = containerPosition.left;
  maxX = containerPosition.left + tiltContainerWidth;
  isMobileDevice = jQuery.browser.mobile;

  $("span.timeago").timeago();

  var files = $('.tilt_image');
  var arrayImages = [];

  for (var i = 0; i < files.length; i++) {
    arrayImages[i+1] = files[i].value;
  }

  var TiltObj = new Lenticular.Image( tiltContainer, {
    files : arrayImages,
    images : "whatever-##.jpg",
    frames: files.length,
    useTilt: isMobileDevice
  });

  $('body').bind('mousemove', setMouseCoords);
  currentTiltObj = TiltObj;
  tilt(currentTiltObj);

/*    if (isMobileDevice) {
      tiltContainer.append('<input class="tiltslidebar two-thirds column" type="range" min="0" max="50" value="0" />');
    }*/


  function setMouseCoords(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    containerPosition = tiltContainer.offset();
    minX = containerPosition.left;
    maxX = containerPosition.left + tiltContainerWidth;
    if (mouseX >= minX  && mouseX <= maxX) {
      tilt(currentTiltObj);
    }
  }

  function tilt(tiltObj) {
    containerPosition = tiltContainer.offset();
    minX = containerPosition.left;
    maxX = containerPosition.left + tiltContainerWidth;
    var x = mouseX - minX;
    var segmentSize = tiltContainerWidth / (tiltObj.frames);
    var segment;

    if (x <= 0) {
      segment = 0;
    } else if(x >= tiltContainerWidth) {
      segment = tiltObj.frames-1;
    } else {
      segment = Math.floor(x / segmentSize);
    }

    tiltObj.showFrame(segment);
  }



  if ($('.share-button.facebook').length != 0) {
    $.ajaxSetup({ cache: true });
    $.getScript('//connect.facebook.net/en_UK/all.js', function(){
      FB.init({
        appId: '573150882777167',
      });     
    });
  }

  $('.share-button.facebook').click(function(){
    var width          = 520;
    var height         = 350;
    var leftPosition   = (window.screen.width / 2) - ((width / 2) + 10);
    var topPosition    = (window.screen.height / 2) - ((height / 2) + 50);
    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
    var url            = $(location).attr('href');
    var link           = "https://www.facebook.com/sharer/sharer.php?u="+url;
    window.open(link,'sharer', windowFeatures);
    return false;
  });

  $('.share-button.twitter').click(function(){
    var width          = 520;
    var height         = 350;
    var leftPosition   = (window.screen.width / 2) - ((width / 2) + 10);
    var topPosition    = (window.screen.height / 2) - ((height / 2) + 50);
    var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
    var url            = $('#url').val();
    var link           = 'https://twitter.com/share?url='+url+'&text='+$('#twitter-text').val();
    window.open(link,'sharer', windowFeatures);
  });

  $('.share').click(function(){
    $('.embed-sharecontainer').show();
  });

  $('.embed-sharecontainer').click(function(){
    $('.embed-sharecontainer').hide();    
  });

});



$(window).load(function() {
  if ($('.embed-body').length != 0) {
    var newheight = $('.embedcontainer').height() + 2;
    window.parent.postMessage("height::"+$('#postUrl').val()+"::"+newheight, "*");
  }
});





