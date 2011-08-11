var keymap = [];

$(function() {
    
   jQuery.getJSON("/keymap.json",function(data) {
	keymap = data;
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
 	  
    $("#infield").live("keyup",function(e){
	
     	isHot = isHotkey(e.keyCode);
 		
	if(isHot.isHotKey == true){
           send(isHot.action);	  
	}else{ 
	 
	 switch(e.keyCode){
	 case 13: {
	  send("");
          break;
	  }
	}
	}	
    }); 

    
    var send = function(action){
	if(action == "" ){
    	socket.emit("newcommand",{"cmd":$("#infield").val()+ "\n" });
        $("#out").append($("#infield").val());
    	$("#infield").select();
    	}else {
	  socket.emit("newcommand",{"cmd":action + "\n"});
	  $("#out").append(action);
	}
    }
   var isHotkey = function(key){

	var ishot = {"isHotKey":"false"};
	keymap.forEach(function(obj){	
             if(obj.keycode == key  ) {	
		ishot.action = obj.action;
		ishot.isHotKey = true;   
	        return true;
	     }
	});
	return ishot;	
   }


 });
 });
 
