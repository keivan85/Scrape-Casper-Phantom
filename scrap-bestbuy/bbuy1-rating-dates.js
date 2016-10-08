/****************************************
*Wait for page to load, click review tab, scrape contents
*Print reviews and date
*Unable to use jQuery
****************************************/


var casper = require('casper').create({
	verbose: true,
    logLevel: 'error',
    pageSettings: {
        loadImages:  false,        // The WebPage instance used by Casper will
        loadPlugins: false,         // use these settings
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0'
    }
   // clientScripts:["vendor/jquery.min.js", "vendor/lodash.js"]
});

var url= 'http://www.bestbuy.com/site/dji-phantom-3-4k-quadcopter-white/4846201.p?skuId=4846201'

var ratings=[];
var dates=[];




function getRatings() {
	var ratings = document.querySelectorAll('.BVRRRatingNormalImage img');
	return Array.prototype.map.call(ratings, function(e) {
		return e.getAttribute('title');
	});
};

function getDates() {
	var dates = document.querySelectorAll('span.BVRRValue.BVRRReviewDate');
	return Array.prototype.map.call(dates, function(e) {
		return e.innerText;
	});
};



casper.start(url, function() {
this.echo(this.getTitle());
});

casper.wait(2000, function() {
	this.echo("I've waited for 8 seconds.");
});

casper.then(function() {
	this.click('button[data-click-location="customerreviewstab"]');
	console.log('Click reviews tab');
});


casper.waitForSelector('.BVRRRatingNormalImage', function() {
	console.log('Rating is loaded');
});




casper.then(function() {
	ratings = this.evaluate(getRatings);
	dates= this.evaluate(getDates);
});

casper.then(function() {
	this.echo(ratings.length + ' ratings found:');
	this.echo('-'+ ratings.join('\n -'));
	this.echo('-'+ dates.join('\n -'));
})

casper.run()