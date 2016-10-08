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

var fs = require('fs');
var url= 'http://pycoders.com/archive'

var link=[];
var title=[];
var date=[];

function generateTable() {
	var data;
	return data = "<tr>\n <td>" + date.join('\n') + "</td>\n <td>" + title.join('\n') + "</td>\n <td>" + link.join('\n') + "<td>\n </tr>";
}

function getLink() {
	var link = $('.campaign a');
	return _.map(link, function(e) {
		return e.getAttribute('href');
	});
};

function getTitle() {
	var title = $('.campaign a');
	return _.map(title, function(e) {
		return e.innerHTML.replace("/\:.*$/g, ");
	});
};

function getDate() {
	var date = $('.campaign');
	return _.map(date, function(e) {
		return e.innerText.replace(/\-.*$/g, "");;
	});
};

casper.start(url, function() {

});

casper.then(function() {
	link=this.evaluate(getLink);
});

casper.then(function() {
	date=this.evaluate(getDate);
});

casper.then(function() {
	title= this.evaluate(getTitle);
});

casper.run(function() {
var html;
html = '<table><tr><td>Date</td><td>Title</td><td>Link</td></tr>';
html = html + generateTable();
html += '</table>';
fs.write('date.html', html, 'w');
this.echo("\n Execution is done").exit();
});


/*casper.run(function() {
	//echo results in readable
	this.echo(link.length + ' links found:');
	//this.echo('-'+link.join('\n -'));
	this.echo('-'+title.join('\n -'));
	this.echo('-'+date.join('\n -')).exit();

});*/