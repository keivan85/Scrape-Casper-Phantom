var casper = require('casper').create({
	verbose: true,
    logLevel: 'debug',
    pageSettings: {
        loadImages:  false,        // The WebPage instance used by Casper will
        loadPlugins: false,         // use these settings
        userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X Chrome/22.0.1229.94'
    },
    clientScripts:["/vendor/jquery.min.js"]
});

casper.start('https://play.google.com/store/apps/details?id=com.rene.hotpursuit', function() {
	this.echo(this.getTitle());
});

casper.then(function() {
	this.echo(this.getCurrentUrl());
});

casper.run(function() {
	this.echo('Done').exit();
});

//casper.run();