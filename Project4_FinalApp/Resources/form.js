// Robert Brooks
// AVF 1403
// Project 4 Final App
// form.js

// form Container
var editView = Ti.UI.createScrollView({
	layout: "vertical",
	backgroundColor: "#000",
	width: '100%',
	top: 20

});

// Form Fields
var fieldHeight = 40;
var editDate = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  color: '#336699',
	  top: 10,
	  left: 10,
	  right: 10, 
	  height: fieldHeight,
	  hintText: "Date 02/25/2014"
});
var editTitle = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  color: '#336699',
	  top: 10,
	  left: 10,
	  right: 10, 
	  height: fieldHeight,
	  hintText: "Story Title"
});
var saveButton = Ti.UI.createButton({
	title: "Submit",
	color: "#fff",
	font: {fontSize: 25, fontFamily: "Helvetica"},
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
    backgroundColor: "#0099ff",
    borderRadius: 20,
    borderColor: "#fff",
    height: 50,
    top: 20,
    left: 40,
    right: 40,
    enabled: true
 
});
var cancelButton = Ti.UI.createButton({
	title: "Cancel",
	color: "#fff",
	font: {fontSize: 25, fontFamily: "Helvetica"},
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
    backgroundColor: "#0099ff",
    borderRadius: 20,
    borderColor: "#fff",
    height: 50,
    top: 20,
    left: 40,
    right: 40,
    enabled: true
   
});