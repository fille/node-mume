var net = require('net');
var express = require('express');
var io = require('socket.io');

;
  
  exports.NewMudcon  = function ()
  {
 	 var currentSocketClient = net.createConnection(4242,"mume.org"); 
  	 mudclient.push(currentSocketClient);
	 
	 currentSocketClient.addListener("data",function(d){ socket.write(d)});
    currentSocketClient.write(d,"utf8",function(d) {})
 
}


var app = require('express').createServer();

exports.StartSite = function() {

   app.listen(9000);
      
}

app.get('/',function(req,res) { 

	res.partial('layout.jade',{});
})

exports.StartSocket = function()
{
	var clients =[];
	var socket = io.listen(app);
	
	socket.on('connection',function(client) {
		        
			client.mume  = net.createConnection(4242,"mume.org"); 
                       client.mume.addListener("data",function(d){ console.log("hej"); client.send(d);});
                               
			clients.push(client);
			client.on('message',function() {});
			client.on('disconnect',function() {} );		
	});	
	

	
}

var server =require('./server.js'); 
server.StartSite();
server.StartSocket();
