/****************************************
*modified from 
https://github.com/casperjs/casperjs/blob/master/samples/googlepagination.js
*capture first 4 pages of best buy
use capture, startPage = "";
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

var currentPage = 1;
var startPage = "";


function terminate() {
	this.echo("That all we have").exit();
};

function startPageFn() {
	var startPage= document.querySelector("span.BVRRSelectedPageNumber");
	return Array.prototype.map.call(startPage, function(e) {
		return e.innerText;
	});
};

var processPage = function() {
	casper.wait(3000, function() {
		console.log("waited 3 secodns");
	});
	this.echo('captureing page: ' + currentPage);
	this.capture('drone-result-p' + currentPage + '.png');

	if(currentPage > 4 || !this.exists('.BVRRRatingNormalImage')) {
		return terminate.call(casper);
	};

	currentPage++
	this.echo('requesting next page: '+ currentPage);
	this.thenClick('span.BVRRPageLink.BVRRNextPage a').then(function() {
		this.waitFor(function() {
			return startPage !=1;
		}, processPage, terminate);
	});
};


casper.start(url, function() {
	this.echo(this.getTitle());
});

casper.wait(4000, function() {
	this.echo("I've waited for 4 seconds.");
});

casper.then(function() {
	this.click('button[data-click-location="customerreviewstab"]');
	console.log('Click reviews tab');
});

casper.then(function() {
	startPage = this.evaluate(startPageFn);
});

casper.waitForSelector('.BVRRRatingNormalImage', processPage, terminate);



casper.run()