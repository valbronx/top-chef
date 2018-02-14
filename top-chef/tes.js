var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
            console.log("dwf1");

  var test=true;
  urlbase = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-';
  i=1;
  while(i<30){
  	          console.log("dwf2");

   url=urlbase+i.toString();
     	          console.log(url);

   request(url, function(error, response, html){
	  
    if(!error){
      var $ = cheerio.load(html);
		
      var title, release, rating;
          console.log("dwf");
  		var jsons = [];


      $('[attr-gtm-type="poi"]').each(function(){
	    var data = $(this);
		title = $(this).attr('attr-gtm-title');
		var json = { title : "", release : "", rating : ""};
        json.title = title;
        json.release = release;
		jsons.push(json)
      })    
  	  fs.appendFile('output.json', JSON.stringify(jsons, null, 4), function(err){
    	  console.log('File successfully written! - Check your project directory for the output.json file');
  	  })
    }
    else{
    	test=false;
    }

   })
      i++;

  }


  res.send('Check your console!')

})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;