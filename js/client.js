
$(function() {
    
    $("#in").click(function() {  
      if( $("#infield").val() != "")
      {
           socket.emit("newcommand",{"cmd":$("#infield").val()+ "\\r" })
   
      }
    })
    var socket = new io.connect('127.0.0.1',{'port':'9000'});
    
    socket.on('connect', function() {  $("#out").append("<p class=\"status\">Connected</p>")});
    socket.on('data',function(d) {
    
     $("#out").append(d.data + "");	
    });
    });
    
 