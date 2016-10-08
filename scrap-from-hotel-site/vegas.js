/****************************************
*Grab the hotel name and price
*Print name and price in console
*wait fro selector load
****************************************/


var casper = require('casper').create({
	verbose: true,
    logLevel: 'debug',
    pageSettings: {
        loadImages:  false,        // The WebPage instance used by Casper will
        loadPlugins: false,         // use these settings
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0'
    },
    clientScripts:["vendor/jquery.min.js", "vendor/lodash.js"]
});

var url= 'https://goo.gl/NrLkgZ'

var names=[];
var prices=[];




function getNames() {
	var names = $('[data-selenium=hotel-name]');
	return _.map(names, function(e) {
		return e.innerHTML;
	});
};

function getPrices() {
	var prices = $('[data-selenium=display-price]');
	return _.map(prices, function(e) {
		return e.innerHTML;
	});
};



casper.start(url, function() {
this.echo(this.getTitle());
});

casper.waitForSelector('.hotel-name', function() {
	console.log('Hotel-name Selector is loaded');
});

casper.then(function() {
	this.clickLabel('Stars (5...1)', 'span');
	console.log('Click to filter');
});

casper.wait(8000, function() {
	this.echo("I've waited for 8 seconds.");
});

casper.then(function() {
	names = this.evaluate(getNames);
	//prices= this.evaluate(getPrices);
});

casper.then(function() {
	this.echo(names.length + ' names found:');
	this.echo('-'+names.join('\n -'));
	//this.echo('-'+prices.join('\n -')).exit();
})

casper.run()
