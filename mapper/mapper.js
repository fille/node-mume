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

   this.handler = new htmlparser.DefaultHandler(function(err,dom) {
                     if(err) {}
		      else { 
                        var roomName = select(dom,'name')[0].children[0].data;
			var description = select(dom,'description')[0].children[0].data;
			var exits   = select(dom,'exits')[0].children[0].data;	          	
		
                      }
                  });

   this.parser = new htmlparser.Parser(this.handler);
   this.fetchData = function (data) {
			this.parser.parseComplete(data);
    	            }	

}

var room = function(name,desc,exits){

			this.name = name;
			this.description = desc
			this.exits = exits;
		  }
      
//Example:

var a = require('./mapper.js').getMapper();
a.fetchData("<name>hej</name>");
 
