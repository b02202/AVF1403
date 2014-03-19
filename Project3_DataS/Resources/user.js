

Ti.include('form.js');

//var Cloud = require('ti.cloud');
// Begin User Login ***
var login =
(function() { 
	// load the Cloud Module
	var Cloud = require('ti.cloud');
	Cloud;
	// set .debug property to 'true' as we are in Development mode
	Cloud.debug = true;
	var loginUser = function(){
		Cloud.Users.login({
			login:  emailTxt.value,
			password: PassTxt
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



// Begin User Create ***
var createUser = 
(function() { 
	// load the Cloud Module
	var Cloud = require('ti.cloud');
	Cloud;
	// set .debug property to 'true' as we are in Development mode
	Cloud.debug = true;
	var userCreate = function(){
		Cloud.Users.create({
			email: emailTxt2.value,
    		first_name: firstTxt.value,
   	 		last_name: lastTxt.value,
   		 	password: passTxt2.value,
  	  		password_confirmation: passTxt2.value
		}, function(e){
			// use .info method to view login info in the Console, if successful
			if (e.success){
				var user = e.users[0];
				alert('Success:\n' +
	            'id: ' + user.id + '\n' +
	            'sessionId: ' + Cloud.sessionId + '\n' +
	            'first name: ' + user.first_name + '\n' +
	            'last name: ' + user.last_name);
			} else {
				alert((e.error && e.message) || JSON.stringify(e));
			}
		});
	}; // loginUser ends
	userCreate();
	// now your app is ready to access ACS network and data services
})();


/*(function() { 
			// load the Cloud Module
			var Cloud = require('ti.cloud');
			// set .debug property to 'true' as we are in Development mode
			Cloud.debug = true;
			var userCreate = function(){
				Cloud.Users.create({
					email: emailTxt.value,
		    		first_name: 'test_firstname',
		   	 		last_name: 'test_lastname',
		   		 	password: passTxt.value,
		  	  		password_confirmation: passTxt.value
				}, function(e){
					// use .info method to view login info in the Console, if successful
					if (e.success){
						var user = e.users[0];
						alert('Success:\n' +
			            'id: ' + user.id + '\n' +
			            'sessionId: ' + Cloud.sessionId + '\n' +
			            'first name: ' + user.first_name + '\n' +
			            'last name: ' + user.last_name);
			} else {
				alert((e.error && e.message) || JSON.stringify(e));
			}
		});
	}; // loginUser ends
	userCreate();
	// now your app is ready to access ACS network and data services
})();*/


//var ui = require('ui');
//win1.open();
