// Robert Brooks
// AVF 1403
// Project 3 Data Sync
// app.js

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
// Table for remote data
var table1 = Ti.UI.createTableView({
	//height: '90%',
	top: 20,
	bottom: 75
});

var win1 = Titanium.UI.createWindow({  
    title:'Project 2',
    backgroundColor: '#000',
	backgroundImage: 'bg.png'
});


// ACS Function ***
(function() { 
	// load the Cloud Module
	var Cloud = require('ti.cloud');
	// set .debug property to 'true' as we are in Development mode
	Cloud.debug = true;
	var loginUser = function(){
		Cloud.Users.login({
			login: 'com.fullsail.project3',
			password: '12345'
		}, function(e){
			// use .info method to view login info in the Console, if successful
			if (e.success){
				var user = e.users[0];
				Ti.API.info('Success!\n' + 
					'ACS User ID: ' + user.id + '\n' + 
					'ACS App sessionId: ' + Cloud.sessionId + '\n' + 
					'ACS App Username: ' + user.username);
			} else {
				alert((e.error && e.message) || JSON.stringify(e));
			}
		});
	}; // loginUser ends
	loginUser();
	// now your app is ready to access ACS network and data services
})();


//var ui = require('ui');
win1.open();
