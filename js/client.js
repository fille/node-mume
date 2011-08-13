var keymap = [];
var hist =  new History(20);
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
 		
	if(isHot.isHotKey == true  && isHot.action != "" ){
           var length =  $("#infield").val().length-1;
           $("#infield").val($("#infield").val().substring(0,length));
	   send(isHot.action);	  
	}else{ 
	 
	 switch(e.keyCode){
	 case 13: {
	  send("");
          hist.clearIndex();
          break;
	 }
	 case 38: {
	   $("#infield").val(hist.getLatest()); 
         break;
	 }
	}}
    }); 

    
    var send = function(action){
	if(action == "" ){
    	socket.emit("newcommand",{"cmd":$("#infield").val()+ "\n" });
        $("#out").append($("#infield").val());
    	$("#infield").select();
        hist.enqueue($("#infield").val());
	
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

     function  History(maxval)
     {
	this.data = [];
        this.index = 0;
        this.maxLength = maxval;
	this.length =  function () { return this.data.length;}
	this.enqueue = function(word) {this.data.push(word); if(this.length() == this.maxLength) { this.dequeue();  }}
	this.dequeue = function() { return this.data.shift(); }
        this.peek = function() { return data[0]  }
	this.clear = function () {this.data = [] }
        this.get = function(i) {return this.data[i] }
        this.getLatest = function() {
      
	  var out = this.get(this.index);
          this.index++;
	   if(this.index >= this.maxLength || this.index >= this.length() ) {    
	       this.clearIndex();
           }
           
          return out; 
          } 
        this.clearIndex = function () { this.index = 0  }
     }

   
 
