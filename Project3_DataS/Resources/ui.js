


Ti.include('form.js');


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

var name;
var welcomeLabel = Ti.UI.createLabel({
	font: {fontSize: 30, fontFamily: "Arial"},
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	color: '#fff',
	visible: false
}); 

var welcomeLabel2 = Ti.UI.createLabel({
	font: {fontSize: 30, fontFamily: "Arial"},
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	color: '#fff',
	visible: false
});

var userForm =Ti.UI.createWindow({
	tabBarHidden: true,
	//title: "Project 4",
	backgroundColor: "#000"
});

var userContainer = Ti.UI.createView ({
	height: '100%',
	width: '100%'
	//backgroundColor: '#000',
	//backgroundImage: 'bg.png'
	
});

// Button Events ***
submitButton.addEventListener('click', function(){
	if (emailTxt.value == '' || passTxt.value == ''){
		alert('Please enter a username and password.');
	} else{
		(function() { 
	// load the Cloud Module
	var Cloud = require('ti.cloud');
	Cloud;
	// set .debug property to 'true' as we are in Development mode
	Cloud.debug = true;
	var loginUser = function(){
		Cloud.Users.login({
			login:  emailTxt.value,
			password: passTxt.value
		}, function(e){
			// use .info method to view login info in the Console, if successful
			if (e.success){
				var user = e.users[0];
				Ti.API.info('Success!\n' + 
					'ACS User ID: ' + user.id + '\n' + 
					'ACS App sessionId: ' + Cloud.sessionId + '\n' + 
					'ACS App Username: ' + user.username);
					formView.visible = false;
					welcomeLabel.visible = true;
					name = user.first_name;
					welcomeLabel.text = 'Welcome ' + name + '!'; //+ '\n' + 'Please Choose Top News or Favorites Below.';
			} else {
				alert((e.error && e.message) || JSON.stringify(e));
			}
		});
	}; // loginUser ends
	loginUser();
	// now your app is ready to access ACS network and data services
})();


		
		//name = emailTxt.value;
		
		
		// hide keyboard
		emailTxt.blur();
		passTxt.blur();
	}
	
});

submitButton2.addEventListener('click', function(){
	if (emailTxt2.value == '' || passTxt2.value == ''){
		alert('Please enter a username and password.');
	} else{
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
	            formView2.visible = false;
				welcomeLabel2.visible = true;
				name = user.first_name;
				welcomeLabel2.text = 'Welcome ' + name  + '!'; // + '\n' + 'Please Choose Top News or Favorites Below.';
			} else {
				alert((e.error && e.message) || JSON.stringify(e));
			}
		});
	}; // loginUser ends
	userCreate();
	// now your app is ready to access ACS network and data services
})();

		
		
		// hide keyboard
		emailTxt.blur();
		passTxt.blur();
	}
	
});

createLogin.addEventListener('click', function(){
	userForm.add(userContainer);
	userForm.open();
	
	
});

//var user = require('user');

userContainer.add(formView2);
userContainer.add(welcomeLabel2);
container.add(logo);
container.add(headline);
container.add(welcomeLabel);
container.add(formView);
win1.add(container);