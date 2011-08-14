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
                        var roomName = select(dom,'name');
			 console.log(title[0]);
                      }
                  });

   this.parser = new htmlparser.Parser(this.handler);
   this.fetchData = function (data) {
			this.parser.parseComplete(data);
    	            }	

}
/*       
Example:
var a = require('./mapper.js').getMapper();
a.fetchData("<name>hej</name>");
*/ 
