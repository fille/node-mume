    var select = require('soupselect').select,
        htmlparser = require("htmlparser"),
        http = require('http'),
        sys = require('sys');

 var body = "<name>sven</name>"
 exports.getMapper = function()
{
  
  var handler = new htmlparser.DefaultHandler(function(err,dom) {
   
    if(err) {
     sys.debug("Error: " + err);
    }else {
      var title = select(dom,'name');
      console.log(title[0]);
    }

   
   });
   var parser = new htmlparser.Parser(handler);
   parser.parseComplete(body);   
}       

var a = require('./mapper.js');
a.getMapper(); 
