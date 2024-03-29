var URL = "http://fitnesstogetherminthill.com/_data/food.json";
var json;
//var testTitle;
//var testAuthor;
Ti.include('ui.js');
var theRow;
var mySections = [];
var remoteResponse = function() {
   
    json = JSON.parse(this.responseText);
    
    //testTitle = json.data.children[0].data.title;
    //testAuthor = json.data.children[0].data.author;
    
    var tableSection = Ti.UI.createTableViewSection({
	
	});
	for (i=0; i<json.data.children.length; i++){
		theRow = Ti.UI.createTableViewRow({
			height: 'auto',			
			//domain: json.data.children[i].desc,
			rowTitle: json.data.children[i].desc,
			cal: json.data.children[i].kcal,
			protein: json.data.children[i].protein,
			hasChild: true
			
		});
		var rowText = Ti.UI.createLabel({
			text: theRow.rowTitle,
			font: {fontSize: 15, fontFamily: "Arial"},
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			bottom: 20,
			left: 5
			
		});
		
		var rowSubText = Ti.UI.createLabel({
			//text: theRow.domain,
			color: '#0018ff',
			font: {fontSize: 11, fontFamily: "Arial"},
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			bottom: 3,
			left: 5
		});
		
		theRow.add(rowText);
		tableSection.add(theRow);
	}
	mySections.push(tableSection);
	table1.setData(mySections);
    //Ti.API.debug(testTitle);
    //Ti.API.debug(testAuthor);
    //exports.url = theRow.url;
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

xhr.open("GET", URL);
xhr.send();
//exports.data = xhr;