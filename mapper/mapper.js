/* Writer: Filip Lagerlov
 * This is a mapper for the client based on node soup select. 
 * calling the getMapper() function returns a Mapper object.
 * 
 *  Todo:    
 *  Map the xml input
 *  save input to file;
 *
 */  


   var select = require('soupselect').select,
        htmlparser = require("htmlparser"),
        http = require('http'),
        sys = require('sys');
  

exports.getMapper = function() {
      return new Mapper();
}


var Mapper = function () {
   this.zones = [];
   this.currentZone;
   this.handler = new htmlparser.DefaultHandler(function(err,dom) {
                     if(err) {}
		      else { 
                        var roomName = select(dom,'name')[0].children[0].data;
			var description = select(dom,'description')[0].children[0].data;
                      }
                  });

   this.parser = new htmlparser.Parser(this.handler);
   this.fetchData = function (data) {
			this.parser.parseComplete(data);
    	            }
   this.createNewZoon = function () {  
	var newzone = new Zone(this.zones.length);
	this.zones.push(newzone);
	this.currentZone = newzone;
    } 

}

var Room = function(roomId,name,desc,exits){

			this.name = name;
			this.description = desc
			this.exits = {"north":0 ,"south":0,"west":0,"east":0};
			this.roomId = roomId;  
		}

var Zone = function(zoneiId) {
		
		this.id = zoneid
		this.rooms = [];
		this.addNewRoom = function(name,desc,exits){
			var room = new Room(this.length,desc)
			this.rooms.push(room);
		}
		this.length = this.rooms.length;
	}
		

      
//Example:

var a = require('./mapper.js').getMapper();
a.fetchData("<name>hej</name>");
 
