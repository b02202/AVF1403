// Robert Brooks
// AVF 1403
// Project 3 Data Sync
// ui.js


var Cloud = require('ti.cloud');
Ti.include('form.js');
//var gallery = require('gallery');
//Ti.include('gallery.js');
var currentUser;
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
var storyBtn = Ti.UI.createButton({
	title: 'CREATE NEWS',
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
	
});


// *** Gallery ***
var storyWin = Ti.UI.createWindow({
	title: 'Your Stories',
	backgroundColor: '#fff',
});

var galWin = Ti.UI.createWindow({
	title: 'Photo Gallery',
	backgroundColor: '#fff',
});
var titleField1 = Ti.UI.createTextField({
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  	color: '#336699',
	top: 20,
	left: 10,
	right: 10, 
	height: 40,
	hintText: "Your Story Title."
});



var gallBtn = Ti.UI.createButton({
	title: '+ from Photo Gallery',
	font: {fontSize: 25, fontFamily: "Arial"},
	color: '#fff',
	backgroundColor: '#0099ff',
	borderColor: '#fff',
	borderWidth: 1,
	width: '100%',
	height: 60,
	top: 20,
	//right: '25%',
	enabled: true
	
});

var backButton = Ti.UI.createButton({
	title: '<< BACK',
	font: {fontSize: 25, fontFamily: "Arial"},
	color: '#fff',
	backgroundColor: '#0099ff',
	borderColor: '#fff',
	borderWidth: 1,
	width: '100%',
	height: 60,
	bottom: 0,
	//right: '25%',
	enabled: true
	
});
backButton.addEventListener('click', function(){
				galWin.close();
				storyWin.close();
			});
galWin.add(backButton);

gallBtn.addEventListener('click', function(e) {
	Ti.Media.openPhotoGallery({
		allowEditing: true,
		success: function(e){
			var picFormView = Ti.UI.createScrollView({
				layout: "vertical",
				backgroundColor: "#000",
				width: '100%',
				top: '50%',
				bottom: 60

			});
			var imgView = Ti.UI.createImageView({
				image: e.media,
				width: '50%',
				//height: '50%',
				top: 85,
				bottom: '52%',
				left: '25%'
			});

			
			var sendBtn = Ti.UI.createButton({
				title: "Upload to cloud",
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
			picFormView.add(titleField1);
			//picFormView.add(fullTxtField);
			picFormView.add(sendBtn);
			galWin.add(picFormView);
			galWin.add(imgView);
			galWin.open();
			
			sendBtn.addEventListener('click', function(){
				
				var img = imgView.toImage();
				dataFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, titleField1.value +'.png');
				if (dataFile.exists()){
					dataFile.deleteFile();
				}
					
					//dataFile.createFile();
					dataFile.write(img);
					var fileContent = dataFile.read();
					
					// push to ACS
					Cloud.Photos.create({
						photo: fileContent, //Titanium.Filesystem.getFile('photo.jpg')
						user_id : currentUser
						}, function (e) {
							if (e.success) {
							var photo = e.photos[0];
						        alert('Success:\n' +
						            'id: ' + photo.id + '\n' +
						            'filename: ' + photo.filename + '\n' +
						            'size: ' + photo.size + '\n' +
						            'updated_at: ' + photo.updated_at + '\n' +
						            'userid:' + currentUser);
					
						} else {
						        alert('Error:\n' +
						            ((e.error && e.message) || JSON.stringify(e)));
						    }
						});
					
					//emailDialog.addAttachment(fileContent);
					//emailDialog.subject = titleField.value;
					//emailDialog.messageBody = fullTxtField.value + '\n' + 'Location = ' + coordText;
					//emailDialog.open();
				
				//dataFile.createFile();
				dataFile.write(img);
				var fileContent = dataFile.read();
				//emailDialog.addAttachment(fileContent);
				//emailDialog.subject = titleField.value;
				//emailDialog.messageBody = fullTxtField.value + '\n' + 'Location = ' + coordText;
				//emailDialog.open();
			});
			
			/*emailDialog.addEventListener('complete', function(e){
				alert('Your Email Has Been Sent.');
				if(dataFile.exists()){
					dataFile.deleteFile();
				}
			
			});*/
			
			
		},
		error: function(error) {
			if (error.code == Ti.Media.NO_CAMERA) {
				alert("please run this on a device");
			} else {
				alert("other error: " + error.code);
			}
		},
		cancel: function(e){
			alert("Photo gallery was canceled");
		}
		
	});
	titleField1.value = "";
});

storyBtn.addEventListener('click', function(){
	storyWin.open();
});


// Button Events ***
submitButton.addEventListener('click', function(){
	if (emailTxt.value == '' || passTxt.value == ''){
		alert('Please enter a username and password.');
	} else{
		favButton.enabled = true;
		favButton.backgroundColor = '#0099ff';
		newsButton.enabled = true;
		newsButton.backgroundColor = '#0099ff';
		picBtn.enabled = true;
		picBtn.backgroundColor = '#0099ff';
		storyBtn.enabled = true,
		storyBtn.backgroundColor = '#0099ff';
		formView.visible = false;
		welcomeLabel.visible = true;
		name = emailTxt.value;
		//welcomeLabel.text = 'Welcome ' + name + '!' + '\n' + 'Please Choose Top News or Favorites Below.';
		
		// hide keyboard
		emailTxt.blur();
		passTxt.blur(); 
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
					currentUser = user.id;
			} else {
				alert((e.error && e.message) || JSON.stringify(e));
			}
		});
	}; // loginUser ends
	loginUser();
	// now your app is ready to access ACS network and data services
})();
	}
});

submitButton2.addEventListener('click', function(){
	if (emailTxt2.value == '' || passTxt2.value == ''){
		alert('Please enter a username and password.');
	} else{
		favButton.enabled = true;
		favButton.backgroundColor = '#0099ff';
		newsButton.enabled = true;
		newsButton.backgroundColor = '#0099ff';
		picBtn.enabled = true;
		picBtn.backgroundColor = '#0099ff';
		storyBtn.enabled = true,
		storyBtn.backgroundColor = '#0099ff';
		formView.visible = false;
		welcomeLabel.visible = true;
		name = emailTxt.value;
		//welcomeLabel.text = 'Welcome ' + name + '!' + '\n' + 'Please Choose Top News or Favorites Below.';
		
		// hide keyboard
		emailTxt.blur();
		passTxt.blur();
	
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
				currentUser = user.id;
			} else {
				alert((e.error && e.message) || JSON.stringify(e));
			}
		});
	}; // userCreate ends
	userCreate();
	// now your app is ready to access ACS network and data services
})();
	}
	
});

createLogin.addEventListener('click', function(){
	userForm.add(userContainer);
	userForm.add(storyBtn);
	userForm.open();
	storyBtn.enabled=true;
	storyBtn.backgroundColor = '#0099ff';	
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
userContainer.add(formView2);
userContainer.add(welcomeLabel2);
win1.add(container);
win1.add(newsButton);
win1.add(favButton);
win1.add(storyBtn);

// *** gallery add ***
storyWin.add(gallBtn);
//storyWin.add(picBtn);
storyWin.add(backButton);