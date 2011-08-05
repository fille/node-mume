
$(function() {

    var socket = new io.connect('127.0.0.1',{'port':'9000'});
    
    socket.on('connect', function() {
    	  $("#out").append("<p class=\"status\">Connected</p>")
    	  $("#out").scrollTop = $("#out").scrollHeight;		  
    });
    socket.on('data',function(d) {
    
     $("#out").append(d.data.toString().split(" ").join("&nbsp;"));
     $("#out").scrollTop($("#out")[0].scrollHeight);	
     
    });
    
    
    $("#in").live("click",function(e) {  
		  
		     
      if( $("#infield").val() != ""){    
       send();
      }
    });
 	  
 	 $("#infield").live("keyup",function(e)
 	 {
 
 	 	switch(e.keyCode){
 	 		case 13:
 	 		  send();
 	 		  break;
 	 	}
 	 });   
    
    var send = function()
    {
    	socket.emit("newcommand",{"cmd":$("#infield").val()+ "\n" });
    	$("#infield").select();
    }
 });
    
 