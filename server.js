var net = require('net');
var express = require('express');
var io = require('socket.io');

var client = null;
var conn	;
var server = net.createServer(function (socket) {
  
  client = net.createConnection(4242,"mume.org")

  client.addListener("data",function(d){ socket.write(d)});
    
  socket.on("data",function(d){
  
  		client.write(d,"utf8",function(d) {
  		})
  });
  
 
});

var app = require('express').createServer();
exports.StartSite = function() {

   app.listen(9000);
   this.StartSocket();
}


  
server.listen(1337, "127.0.0.1");
