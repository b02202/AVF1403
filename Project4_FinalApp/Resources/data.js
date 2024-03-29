// Robert Brooks
// AVF 1403
// Project 4 Final App
// data.js


var URL = "http://api.reddit.com/r/news/top";
var json;
var testTitle;
var testAuthor;
var theRow;
var mySections = [];
var remoteResponse = function() {
   
    json = JSON.parse(this.responseText);
    
    testTitle = json.data.children[0].data.title;
    testAuthor = json.data.children[0].data.author;
    
    var tableSection = Ti.UI.createTableViewSection({
	
	});
	for (i=0; i<json.data.children.length; i++){
		theRow = Ti.UI.createTableViewRow({
			height: 'auto',			
			domain: json.data.children[i].data.domain,
			rowTitle: json.data.children[i].data.title,
			author: json.data.children[i].data.author,
			date: json.data.children[i].data.created_utc,
			url: json.data.children[i].data.url,
			hasChild: true
			
		});
		var rowText = Ti.UI.createLabel({
			text: theRow.rowTitle,
			font: {fontSize: 15, fontFamily: "Arial"},
			color: '#000',
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			bottom: 20,
			left: 5,
			date: theRow.date,
			url: theRow.url
			
		});
		
		var rowSubText = Ti.UI.createLabel({
			text: theRow.domain,
			color: '#0018ff',
			font: {fontSize: 11, fontFamily: "Arial"},
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			bottom: 3,
			left: 5
		});
		
		theRow.add(rowText);
		theRow.add(rowSubText);
		tableSection.add(theRow);
	}
	mySections.push(tableSection);
	table1.setData(mySections);
    Ti.API.debug(testTitle);
    Ti.API.debug(testAuthor);
    exports.url = theRow.url;
};

var remoteError = function(e) {
    Ti.API.debug("Status: " + this.status);
    Ti.API.debug("Text: " + this.responseText);
    Ti.API.debug("Error: " + e.error);
    alert("There's a problem pulling remote data");
};

var xhr = Ti.Network.createHTTPClient({
    onload: remoteResponse,
    onerror: remoteError,
    timeout: 5000
});
//var req = require('ui');

xhr.open("GET", URL);
xhr.send();
exports.data = xhr;