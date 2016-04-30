var map;var centerCoord=new google.maps.LatLng(46.782101,23.643855);var centerCoord=new google.maps.LatLng(40.453577,-3.68763);var browserDetectedLocation=null;var markersArray=[];var infoWindow=new google.maps.InfoWindow({});function setLocation()
{if(navigator.geolocation)
{navigator.geolocation.getCurrentPosition(function(position)
{blueIcon="http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png";browserDetectedLocation=new google.maps.LatLng(position.coords.latitude,position.coords.longitude);map.setCenter(browserDetectedLocation);var marker=new google.maps.Marker({position:browserDetectedLocation,map:map,title:'You are here',icon:blueIcon});$('#home-messages').text("Location detected. Please wait...");},function(){$('#home-messages').text("Your location cannot be detected.");});}else if(google.gears)
{var geo=google.gears.factory.create('beta.geolocation');geo.getCurrentPosition(function(position)
{blueIcon="http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png";browserDetectedLocation=new google.maps.LatLng(position.latitude,position.longitude);map.setCenter(browserDetectedLocation);var marker=new google.maps.Marker({position:browserDetectedLocation,map:map,title:'You are here',icon:blueIcon});$('#home-messages').text("Location detected. Please wait...");},function(){$('#home-messages').text("Your location cannot be found.");});}
else
{$('#home-messages').text("Your location cannot be found.");}}
function InitMap(options,mapIdentifier,defaultLocation,detectLocation)
{var settings={zoom:15,center:defaultLocation,mapTypeId:google.maps.MapTypeId.Map};if(options!=null)settings=options;map=new google.maps.Map(document.getElementById(mapIdentifier),settings);map.setCenter(defaultLocation);if(detectLocation==true)setLocation();else
{$('#home-messages').text("Click an office on the left to view its location.");}
return map;}
function handle_clicks()
{$('#home-sidebar ul li div.outer').click(function(){clearOverlays();var coordString_lat=$(this).find('.lat').text();var coordString_long=$(this).find('.long').text();var coordTitle=$(this).find('.address').html();var update2Location=new google.maps.LatLng(coordString_lat,coordString_long);map.setCenter(update2Location);addMarker(update2Location,'aaaa',coordTitle);$('#home-messages').text("Viewing: "+coordTitle);});}
function addMarker(m_position,m_title,m_infowindow){marker=new google.maps.Marker({position:m_position,map:map,title:m_title});markersArray.push(marker);var mark=markersArray.pop();google.maps.event.addListener(mark,'click',function(){infoWindow.open(map,mark);var stringContent=m_infowindow;infoWindow.setContent("<div id=\"infowin-overlay\""+stringContent+"</div>");overlayHeight=$('#infowin-overlay').height();overlayWidth=$('#infowin-overlay').width();$('#infowin-overlay').parent().css('height',overlayHeight);$('#infowin-overlay').parent().css('width',overlayWidth);});markersArray.push(mark);}
function clearOverlays(){if(markersArray){for(i in markersArray){markersArray[i].setMap(null);}}}
$(document).ready(function(){if($('#map').get(0))
{map=InitMap(null,'map',centerCoord,true);handle_clicks();}});