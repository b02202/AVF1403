// Robert Brooks
// AVF 1403
// Project 1
// app.js
// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var win1 = Titanium.UI.createWindow({  
    title:'Project 1',
    backgroundColor: '#000',
	backgroundImage: 'bg.png'
});

var ui = require('ui');
win1.open();
