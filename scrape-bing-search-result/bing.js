var casper=require('casper').create({
	verbose:true,
	logLevel:'error'
	//clientScript=[]
});

var links=[];

function getLink() {
	var links= document.querySelectorAll('.b_algo a');
	return Array.prototype.map.call(links, function(e) {
		return e.getAttribute('href');
	});
};

casper.start("http://bing.com", function() {
	this.fill('form[action="/search"]', {
		q:'carpool'
	}, true);
});


casper.then(function() {
	links=this.evaluate(getLink);

	this.fill('form[action="/search"]', {
		q:'unity'
	}, true);
});

casper.then(function() {
	links=links.concat(this.evaluate(getLink));
});


casper.run(function() {
	//echo results in readable
	this.echo(links.length + ' links found:');
	this.echo('-'+links.join('\n -')).exit();
});