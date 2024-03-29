// Robert Brooks
// AVF 1403
// Project 1
//var remote = require('data');
Ti.include('data.js');
var container = Ti.UI.createView ({
	height: '100%',
	width: '100%',
	//backgroundColor: '#000',
	//backgroundImage: 'bg.png'
	
});

var logo = Ti.UI.createImageView({
	image: 'logo.png',
	bottom: '75%'
});
var headline = Ti.UI.createLabel({
	text: "Client Accountability App",
	font: {fontSize: 25, fontFamily: "Arial"},
	color: '#fff',
	top: '25%'
});

 nutButton = Ti.UI.createButton({
	title: 'NUTRITION',
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

var exButton = Ti.UI.createButton({
	title: 'EXERCISE',
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
	//text: 'Welcome ' + name + '!' + '\n' + 'Please Choose Nutrition or Exercise Below.',
	font: {fontSize: 30, fontFamily: "Arial"},
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	color: '#fff',
	visible: false
}); 

submitButton.addEventListener('click', function(){
	if (emailTxt.value == '' || passTxt.value == ''){
		alert('Please enter a username and password.');
	} else{
		exButton.enabled = true;
		exButton.backgroundColor = '#0099ff';
		nutButton.enabled = true;
		nutButton.backgroundColor = '#0099ff';
		formView.visible = false;
		welcomeLabel.visible = true;
		name = emailTxt.value;
		welcomeLabel.text = 'Welcome ' + name + '!' + '\n' + 'Please Choose Nutrition or Exercise Below.';
		
		// hide keyboard
		emailTxt.blur();
		passTxt.blur();
	}
	
});
var nutWin = Ti.UI.createWindow({
	title:'Nutrition',
    backgroundColor: '#000',
	backgroundImage: 'bg.png'
	
});
var exWin = Ti.UI.createWindow({
	title:'Nutrition',
    backgroundColor: '#000',
	backgroundImage: 'bg.png'
	
});
var label1 = Ti.UI.createLabel({
	text: '1',
	color: 'fff'
});
var label2 = Ti.UI.createLabel({
	text: '2',
	color: 'fff'
});
var exClose = Ti.UI.createButton({
	title: 'Close',
	font: {fontSize: 25, fontFamily: "Arial"},
	color: '#fff',
	backgroundColor: '#b5b7b9',
	borderColor: '#fff',
	borderWidth: 1,
	width: '100%',
	height: 75,
	bottom: 0,
	right: 0,
	enabled: true
    //disabledColor: '#b5b7b9'
});
var nutClose = Ti.UI.createButton({
	title: 'Close',
	font: {fontSize: 25, fontFamily: "Arial"},
	color: '#fff',
	backgroundColor: '#b5b7b9',
	borderColor: '#fff',
	borderWidth: 1,
	width: '100%',
	height: 75,
	bottom: 0,
	right: 0,
	enabled: true
    //disabledColor: '#b5b7b9'
});
nutClose.addEventListener('click', function(){
	nutWin.close();
});

exClose.addEventListener('click', function(){
	exWin.close();
});
nutWin.add(label1);
exWin.add(label2);
exWin.add(exClose);
nutWin.add(nutClose);

nutButton.addEventListener('click', function(){
	nutWin.open();
});

exButton.addEventListener('click', function(){
	exWin.open();
});
var table1 = Ti.UI.createTableView({
	
});


nutWin.add(table1);
formView.add(emailTxt);
formView.add(passTxt);
formView.add(createLogin);
formView.add(forgotLogin);
formView.add(submitButton);
//, passTxt, createLogin, forgotLogin, submitButton);
container.add(logo);
container.add(headline);
container.add(welcomeLabel);
container.add(formView);
//container.add(nutButton);
//container.add(exButton);
//, headline, welcomeLabel, formView, nutButton, exButton);
win1.add(container);
win1.add(nutButton);
win1.add(exButton);
