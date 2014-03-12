// Robert Brooks
// AVF 1403
// Project 2 Native Features and Remote Data
// ui.js

// Bring in remote data from  remote.js
var remote = require('data');

// include sql db from database.js
Ti.include('database.js');

// include Edit-Form Componenets from form.js
Ti.include('form.js');

// call create / open DB function
openDB();
// table for SQL DB
var tableView = Titanium.UI.createTableView({
	//data: data,
	editable: true,
	height: '90%'
	//height: 'auto'
});

// call getRowData Function
var tableData = getRowData();
tableView.setData(tableData);

// add form components to edit
editView.add(editDate, editTitle, saveButton, cancelButton);


// *** Begin Web Window ***
// window for webView
var webWin =Ti.UI.createWindow({
	tabBarHidden: true,
	//title: "Project 4",
	backgroundColor: "#fff"
});
// WebView takes user to news story url
var webView = Titanium.UI.createWebView({
	height: '90%',
	top: 0
});

// Back button for webview
var backBtn = Ti.UI.createButton({
	title: 'Back',
	color: '#fff',
	font: {fontSize: 25, fontFamily: "Helvetica"},
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	backgroundColor: '#0099ff',
	bottom: 0,
	height: '10%',
	width: '100%'
});

webWin.add(webView, backBtn);
// *** End Web Window ***

var container = Ti.UI.createView ({
	height: '100%',
	width: '100%'
	//backgroundColor: '#000',
	//backgroundImage: 'bg.png'
	
});

var logo = Ti.UI.createImageView({
	image: 'logo.png',
	bottom: '75%'
});
var headline = Ti.UI.createLabel({
	text: "Please Login to Begin",
	font: {fontSize: 25, fontFamily: "Arial"},
	color: '#fff',
	top: '25%'
});

 var newsButton = Ti.UI.createButton({
	title: 'TOP NEWS',
	font: {fontSize: 25, fontFamily: "Arial"},
	color: '#fff',
	backgroundColor: '#b5b7b9',
	borderColor: '#fff',
	borderWidth: 1,
	width: '50%',
	height: 75,
	bottom: 0,
	left: 0,
	enabled: false
    //disabledColor: '#b5b7b9'
});

var favButton = Ti.UI.createButton({
	title: 'FAVORITES',
	font: {fontSize: 25, fontFamily: "Arial"},
	color: '#fff',
	backgroundColor: '#b5b7b9',
	borderColor: '#fff',
	borderWidth: 1,
	width: '50%',
	height: 75,
	bottom: 0,
	right: 0,
	enabled: false
    //disabledColor: '#b5b7b9'
});

// favorite funciton
var favOptions = {
	title: 'View or add to Favorites?',
	options: ['View', '+ Favorites', 'Cancel'],
	cancel: 2,
	selectedIndex: 2,
	destructive: 1
};
table1.addEventListener('click', function(e){
	var utc = e.source.date;
	var d = new Date(utc * 1000);
	var day = d.getUTCDate();
	var month = d.getUTCMonth() + 1;
	var year = d.getUTCFullYear();
	var simpleDate = month + '/' + day + '/' + year;
		
	var favInfo = {};
		favInfo.date = simpleDate;
		favInfo.title = e.source.text;
		favInfo.url = e.source.url;
		
	var dialog = Ti.UI.createOptionDialog(favOptions);
	
	dialog.addEventListener('click', function(e){
		if(e.index === 0) {
			webView.url = favInfo.url;
			webWin.open();
			backBtn.addEventListener('click', function(){
				webWin.close();
			});
			
		} else if (e.index === 1 ) {			
			db.execute('INSERT INTO fav (date, title) VALUES(?,?)', favInfo.date, favInfo.title );
			var data = getRowData();
			tableView.setData(data);
		
		// success alert
			alert('Your information has been saved');			
		}
	});	
	dialog.show();	
});



// Form Layout
var formView = Ti.UI.createView({
	//scrollType: "vertical",
	//backgroundColor: "#fff",
	//borderRadius: 20,
	//borderColor: "#fff",
	top: '30%',
	left: '10%',
	right: '10%',
	//height: 200,
	//bottom: '50',
	visible: true
});

// Form Fields
var fieldHeight = 50;
var emailTxt = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  color: '#000',
	  top: 10,
	  left: 0,
	  right: 0, 
	  font: {fontSize: 15, fontFamily: "Arial"},
	  height: fieldHeight,
	  hintText: "USER LOGIN / EMAIL "
});
var passTxt = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  color: '#000',
	  font: {fontSize: 15, fontFamily: "Arial"},
	  top: emailTxt.top + 60,
	  left: 0,
	  right: 0, 
	  height: fieldHeight,
	  hintText: "PASSWORD  ex. Password123"
});

var createLogin = Ti.UI.createLabel({
	text: "Create Account",
	color: '#FFF',
	font: {fontSize: 15, fontFamily: "Arial"},
	textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	top: 125,
	left: 0,
	height: 20,
	width: '50%'
	
});

var forgotLogin = Ti.UI.createLabel({
	text: "Forgot Login or Password?",
	color: '#FFF',
	font: {fontSize: 15, fontFamily: "Arial"},
	textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
	top: 125,
	right: 0,
	height: 20,
	width: '50%'
	
});

var submitButton = Ti.UI.createButton({
	title: "Submit",
	color: "#fff",
	font: {fontSize: 25, fontFamily: "Helvetica"},
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
    backgroundColor: "#0099ff",
    borderRadius: 20,
    borderColor: "#fff",
    height: 50,
    top: 160,
    left: '25%',
    right: '25%',
    enabled: true
    
 
});
var name;
var welcomeLabel = Ti.UI.createLabel({
	font: {fontSize: 30, fontFamily: "Arial"},
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	color: '#fff',
	visible: false
}); 

submitButton.addEventListener('click', function(){
	if (emailTxt.value == '' || passTxt.value == ''){
		alert('Please enter a username and password.');
	} else{
		favButton.enabled = true;
		favButton.backgroundColor = '#0099ff';
		newsButton.enabled = true;
		newsButton.backgroundColor = '#0099ff';
		formView.visible = false;
		welcomeLabel.visible = true;
		name = emailTxt.value;
		welcomeLabel.text = 'Welcome ' + name + '!' + '\n' + 'Please Choose Top News or Favorites Below.';
		
		// hide keyboard
		emailTxt.blur();
		passTxt.blur();
	}
	
});
var newsWin = Ti.UI.createWindow({
	title:'Top News',
    backgroundColor: '#fff'
	//backgroundImage: 'bg.png'
	
});
var favWin = Ti.UI.createWindow({
	title:'Favorites',
    backgroundColor: '#000',
	backgroundImage: 'bg.png'
	
});

var favClose = Ti.UI.createButton({
	title: 'Close',
	font: {fontSize: 25, fontFamily: "Arial"},
	color: '#fff',
	backgroundColor: '#0099ff',
	borderColor: '#fff',
	borderWidth: 1,
	width: '100%',
	height: 75,
	bottom: 0,
	right: 0,
	enabled: true
    //disabledColor: '#b5b7b9'
});
var newsClose = Ti.UI.createButton({
	title: 'Close',
	font: {fontSize: 25, fontFamily: "Arial"},
	color: '#fff',
	backgroundColor: '#0099ff',
	borderColor: '#fff',
	borderWidth: 1,
	width: '100%',
	height: 75,
	bottom: 0,
	right: 0,
	enabled: true
    //disabledColor: '#b5b7b9'
});
newsClose.addEventListener('click', function(){
	newsWin.close();
});

favClose.addEventListener('click', function(){
	favWin.close();
});
//newsWin.add(label1);
favWin.add(tableView);
//favWin.add(label2);
favWin.add(favClose);
newsWin.add(newsClose);

newsButton.addEventListener('click', function(){
	newsWin.open();
});

favButton.addEventListener('click', function(){
	favWin.open();
});

newsWin.add(table1);
formView.add(emailTxt);
formView.add(passTxt);
formView.add(createLogin);
formView.add(forgotLogin);
formView.add(submitButton);
container.add(logo);
container.add(headline);
container.add(welcomeLabel);
container.add(formView);
win1.add(container);
win1.add(newsButton);
win1.add(favButton);
