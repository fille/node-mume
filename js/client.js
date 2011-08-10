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
 	console.log(isHot);	
	if(isHot.isHotKey == true){
	  Console.log("hej");
	}	

    });   
    
    var send = function(action){
	if(action == "" ){
    	socket.emit("newcommand",{"cmd":$("#infield").val()+ "\n" });
        $("#out").append($("#infield").val());
    	$("#infield").select();
    	}else {
	  
	}
    }
   var isHotkey = function(key){

	var ishot = {"isHotKey":"false"};
	//no break statment inside a foreach? 
	keymap.forEach(function(obj){	
             if(obj.keycode == key  ) {	
		ishot.action = obj.action;
		ishot.isHotKey = true;   
	     }
	});
	return ishot;	
   }


 });
 });
 
