var net = require('net');
var express = require('express');
var io = require('socket.io');
var fs = require('fs');
 

var app = require('express').createServer()


exports.StartSite = function() {
   app.listen(9000);
}

app.get('/',function(req,res) { 
   res.partial('layout.jade',{});
})

app.get('/style.css',function(req,res) {
   
    fs.readFile("css/style.css",function(err,d) {
    res.end(d+"");
    });	
});

app.get('/client.js',function(req,res) {
	
  fs.readFile("js/client.js",function(err,d) {
     res.end(d +"");	
  });
});
app.get('/settings.json',function(req,res) {

   fs.readFile("js/settings.json",function(err,d) {
      res.end(d+"");
   })
});

exports.StartSocket = function()
{
   var clients =[];
   var socket = io.listen(app);
	
   socket.sockets.on('connection',function(client) {
		        
   client.mume  = net.createConnection(4242,"mume.org"); 
   client.mume.addListener("data",function(d){       
        
  var newstring =  d.toString().split("\r\n").join("<br>")
        client.emit("data",{data:newstring});  
   });
                               
   clients.push(client);
   client.on('newcommand',function(d) {
   client.mume.write(d.cmd+"","utf8",function(d) {} )}); 
   client.on('disconnect',function() {});		
 });	
}

var server =require('./server.js'); 
server.StartSite();
server.StartSocket();
