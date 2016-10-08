/****************************************
*Log in to Twitter
*Submit Search query
*Unable to use jQuery
****************************************/


var casper = require('casper').create({
	verbose: true,
    logLevel: 'error',
    pageSettings: {
        
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0'
    }
   // clientScripts:["vendor/jquery.min.js", "vendor/lodash.js"]
});

var url= 'http://www.twitter.com/'

var twitterId = 'NathanTippy';
var email= 'TWITTER ACCOUNT MAIL';
var auth= "TWITTER PASSWORD";
var searchKey = 'magic'


casper.start(url + twitterId, function() {
this.echo(this.getTitle());
});

casper.then(function() {
	this.fillSelectors('form.js-front-signin', {
		'input[name="session[username_or_email]"]':email,
		'input[name="session[password]"]':auth
	}, true);
});

casper.then(function() {
	console.log('Authentication ok, new location is '+ this.getCurrentUrl());
});


casper.then(function() {
	this.fill('form#global-nav-search', {
		q: searchKey
	}, true);
});


casper.waitForSelector('.trends-inner', function() {
	console.log('Search results is loaded');
});


casper.then(function() {
	this.emit('results.log');
});

casper.on('results.log', function() {
	this.captureSelector('twitPic.png', 'div.stream-container  ');
});



casper.run()
