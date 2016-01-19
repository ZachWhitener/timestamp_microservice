'use strict'; 

var moment = require('moment'); 

module.exports = function(app) {
    
    //convert unix to natural
    var unixToNat = function(date){
        return moment.unix(date).format("MMMM D, YYYY");
    }
    //convert natural to unix
    var natToUnix = function(date){
        return moment(date, "MMMM D, YYYY").format("X");
    }
    app.get('/:query', function(req, res){
       var q = req.params.query;
       var natural = null; 
       var unix = null; 
       
       console.log(+q); 
       //check to see if it is a unix date
       //will contain only numbers
       if (+q > 0) {
            unix = +q;
            natural = unixToNat(q);
       }
       if(isNaN(q) && moment(q, "MMMM D, YYYY").isValid()){
            unix = natToUnix(q);
            natural = unixToNat(unix);
        }
        
        var dateObj = {
            "unix": unix, 
            "natural": natural
        };
        
        res.send(JSON.stringify(dateObj)); 
       
    });
}