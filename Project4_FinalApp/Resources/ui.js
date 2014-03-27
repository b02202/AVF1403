// Robert Brooks
// AVF 1403
// Project 4 Final App
// ui.js

// require Acs Cloud Services
var Cloud = require('ti.cloud');
// Bring in remote data from  remote.js
var remote = require('data');

// include sql db from database.js
Ti.include('database.js');

// include Edit-Form Componenets from form.js
Ti.include('form.js');

//Ti.include('camera.js');
Ti.include('geo.js');

// Current User Variable
var currentUser;

var favInfo;

// call create / open DB function
openDB();
// table for SQL DB
var tableView = Titanium.UI.createTableView({
	//data: data,
	editable: true,
	top: 20,
	bottom: 75
	//height: '90%'
	//height: 'auto'
});

// call getRowData Function
var tableData = getRowData();
tableView.setData(tableData);

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

// *** Begin Web Window ***
// window for webView
var webWin =Ti.UI.createWindow({
	tabBarHidden: true,
	//title: "Project 4",
	backgroundColor: "#fff"
});
// WebView takes user to news story url
var webView = Titanium.UI.createWebView({
	//height: '90%',
	top: 20,
	bottom:75
});

// Back button for webview
var backBtn = Ti.UI.createButton({
	title: 'Back',
	color: '#fff',
	font: {fontSize: 25, fontFamily: "Helvetica"},
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	backgroundColor: '#0099ff',
	bottom: 0,
	height: 75,
	width: '100%'
});

webWin.add(webView);
webWin.add(backBtn);

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

var newsButton = Ti.UI.createButton({
	title: 'TOP NEWS',
	font: {fontSize: 25, fontFamily: "Arial"},
	color: '#fff',
	backgroundColor: '#b5b7b9',
	borderColor: '#fff',
	borderWidth: 1,
	width: '25%',
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
	width: '25%',
	height: 75,
	bottom: 0,
	left: '25%',
	enabled: false
    //disabledColor: '#b5b7b9'
});
var cloudSyncBtn = Ti.UI.createButton({
	title: 'Sync with ACS',
	font: {fontSize: 25, fontFamily: "Arial"},
	color: '#fff',
	backgroundColor: '#0099ff',
	borderColor: '#fff',
	borderWidth: 1,
	width: '100%',
	height: 75,
	bottom: 85,
	right: 0,
	enabled: true
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
			
			// Create Custom ACS Object
			
			Cloud.Objects.create({
			    classname: 'favoriteNews',
			    user_id: currentUser,
			    fields: {
			    	book_id: 1,
			        title: favInfo.title,
			        date: favInfo.date,
			        url: favInfo.url
			    }
			}, function (e) {
			    if (e.success) {
			        var favStory = e.favoriteNews[0];
			        alert('Success:\n' +
			            'id: ' + favStory.id + '\n' +
			            'title: ' + favStory.title + '\n' +
			            'date: ' + favStory.date + '\n' +
			            'url: ' + favStory.url + '\n' +
			            'user id: ' + currentUser);
			    } else {
			        alert('Error:\n' +
			            ((e.error && e.message) || JSON.stringify(e)));
			    }
			});
		
		// success alert
			alert('This story has been added to your favorites.');			
		}
	});	
	dialog.show();	
});


// *** Begin  Edit ***
var editOptions = {
	title: 'Edit or delete user info',
	options: ['Edit', 'Delete', 'Cancel'],
	cancel: 2,
	selectedIndex: 2,
	destructive: 1
};
var editWin = Ti.UI.createWindow({
			title: "Edit",
			modal: true,
			backgroundColor: '#fff'
			});
   

tableView.addEventListener('click', function(e){
// Get rowData stored in row
	var id = e.rowData.id;
	
	var currentRow = db.execute('SELECT * FROM fav WHERE ID=?', id);
	
	var rowData = {};
	rowData.id = currentRow.fieldByName('id');
	rowData.date = currentRow.fieldByName('date');
	rowData.title = currentRow.fieldByName('title');

	
//add options
	var editDialog = Ti.UI.createOptionDialog(editOptions);
    


// dialog event listener
	 editDialog.addEventListener('click', function(e){
		editDate.value = rowData.date;
		editTitle.value = rowData.title;
		if(e.index === 0) {
			
			editWin.add(editView);
			editWin.open();
			var save = function(){
				if (editDate.value == '' && editTitle.value == '') {
					alert('Please enter all required fields.');
				} else {
					var favEdit = {};
					favEdit.date = editDate.value;
					favEdit.title = editTitle.value;
							
				//set db data
				db.execute('UPDATE fav SET date=?, title=? WHERE id=?',favEdit.date, favEdit.title, id);
		
				// update into db
				data = getRowData();
				tableView.setData(data);
		
				//Clear form fields with success
				editDate.value = '';
				editTitle.value = '';
		
		//Hide Keyboard
				editDate.blur();
				editTitle.blur();
		
		//Remove Event Listener from save button
				saveButton.removeEventListener('click', save);
				editWin.close();
				alert('Info updated.');
	}		
};
saveButton.addEventListener('click', save);

// Cancel Function
var cancel = function(){
	cancelButton.removeEventListener('click', cancel);
	editWin.close();
};
cancelButton.addEventListener('click', cancel);
		} else if (e.index === 1) {
			db.execute('DELETE FROM fav WHERE id=?', id);
			data = getRowData();
			tableView.setData(data);

alert('This item has been deleted.');
		}	
	});
	editDialog.show();
});

// add form components to edit
editView.add(editDate);
editView.add(editTitle);
editView.add(saveButton);
editView.add(cancelButton);
// *** End Edit ***

// *** Begin Login Form ***
// Form Layout

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

var fullTxtField = Ti.UI.createTextArea({
	  			borderWidth: 2,
	  			borderColor: '#fff',
	  			borderRadius: 5,
	  			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	  			keyboardType: Ti.UI.KEYBOARD_ASCII,
	  			suppressReturn: false,
	  			color: '#336699',
	  			top: 10,
	  			left: 10,
	  			right: 10, 
	 			height: 300,
	  			value: "Your full story goes here."
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
var photoWin = Ti.UI.createWindow({
	title: 'Photo Gallery',
	backgroundColor: '#fff',
});
var photoView = Ti.UI.createScrollView({
				layout: "vertical",
				backgroundColor: "#000",
				width: '100%',
				//top: '50%',
				bottom: 60

			});
var cloudPhotos = Ti.UI.createButton({
	title: 'View Exsiting Photos',
	font: {fontSize: 25, fontFamily: "Arial"},
	color: '#fff',
	backgroundColor: '#0099ff',
	borderColor: '#fff',
	borderWidth: 1,
	width: '100%',
	height: 60,
	bottom: 100,
	//right: '25%',
	enabled: true
	
});
storyWin.add(cloudPhotos);
photoWin.add(photoView);
//photoWin.add(photoView);

cloudPhotos.addEventListener('click', function(){
				// add cloud photo query and display images in an image view (for loop)
	Cloud.Photos.query({
	    //classname: 'story',
	    page: 1,
	    per_page: 10,
	    where: {
	        //book_id: 1,
	        user_id: currentUser
	    }
	    
	}, function (e) {
	    if (e.success) {
	        alert('Success:\n' +
	            e.photos.length +' stories have been saved from the cloud.');
	       var makeViews = function(){
	       		
				for(var i=0, j=e.photos.length; i<j; i++){
					var photo  = e.photos[i];
	       			var image2 = photo.urls.original;
					var newView = Ti.UI.createView({
						top: 20,
						//left: 4,
						backgroundColor: "#000"
						//backgroundImage: image2,
						//width: 200,
						//height: 200
					});
					
					var imageView = Ti.UI.createImageView({
						image: image2
					});
					
					newView.add(imageView);
		
		//var imageView = Ti.UI.createImageView({
			//image: dirList[i]
		//});
		
		//newView.add(imageView);
		photoView.add(newView);
	}
}; 
makeViews();
	        
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
});
				photoWin.open();
});
backButton.addEventListener('click', function(){
				galWin.close();
				storyWin.close();
				photoWin.close();
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
			picFormView.add(fullTxtField);
			picFormView.add(sendBtn);
			galWin.add(picFormView);
			galWin.add(imgView);
			galWin.open();
			
			sendBtn.addEventListener('click', function(){
				
				var img = imgView.toImage();
				dataFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'photo.jpg');
				if (dataFile.exists()){
					dataFile.deleteFile();
				}
					
					//dataFile.createFile();
					dataFile.write(img);
					var fileContent = dataFile.read();
					
					// push to ACS Custom Object
					
					Cloud.Objects.create({
					    classname: 'story',
					    user_id: currentUser,
					    photo: fileContent,
					    fields: {
					    	book_id: 1,
					        title: titleField1.value,
					        text: fullTxtField.value
					        //photo: dataFile
					    }
					}, function (e) {
					    if (e.success) {
					        var saveStory = e.story[0];
					        alert('Success:\n' +
					            'id: ' + saveStory.id + '\n' +
					            'title: ' + saveStory.title + '\n' +
					            'text: ' + saveStory.date + '\n' +
					            'photo: ' + saveStory.photo + '\n' +
					            'user id: ' + currentUser);
					    } else {
					        alert('Error:\n' +
					            ((e.error && e.message) || JSON.stringify(e)));
					    }
					});
					/*//push to ACS Photo Object
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
						});*/
					
					//emailDialog.addAttachment(fileContent);
					//emailDialog.subject = titleField.value;
					//emailDialog.messageBody = fullTxtField.value + '\n' + 'Location = ' + coordText;
					//emailDialog.open();
				
				//dataFile.createFile();
				//dataFile.write(img);
				//var fileContent = dataFile.read();
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
	text: fullTxtField.value = "";
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
		//picBtn.enabled = true;
		//picBtn.backgroundColor = '#0099ff';
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
	userForm.add(favButton);
	userForm.add(newsButton);
	userForm.open();
	favButton.enabled = true;
	newsButton.enabled = true;
	storyBtn.enabled= true;
	favButton.backgroundColor = '#0099ff';
	newsButton.backgroundColor = '#0099ff';
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


// *** cloud sync ***
cloudSyncBtn.addEventListener('click', function(){
	Cloud.Objects.query({
    classname: 'favoriteNews',
    page: 1,
    per_page: 10,
    where: {
        book_id: 1,
        user_id: currentUser
    }
    
}, function (e) {
    if (e.success) {
        alert('Success:\n' +
            e.favoriteNews.length +' stories have been saved from the cloud.');
        for (var i = 0; i < e.favoriteNews.length; i++) {
            var favStory = e.favoriteNews[i];
            db.execute('INSERT INTO fav (date, title) VALUES(?,?)', favStory.date, favStory.title );
			var data = getRowData();
			tableView.setData(data);
			
            /*alert('id: ' + favStory.id + '\n' +
                'story: ' + favStory.title + '\n' +
                'date: ' + favStory.dater + '\n' +
                'url: ' + favStory.url + '\n' +
                'created_at: ' + favStory.created_at);*/
        }
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});
});
//newsWin.add(label1);
favWin.add(tableView);
//favWin.add(label2);
favWin.add(favClose);
//favWin.add(favClose);
favWin.add(cloudSyncBtn);
newsWin.add(newsClose);
photoWin.add(backButton);

newsButton.addEventListener('click', function(){
	newsWin.open();
});

favButton.addEventListener('click', function(){
	favWin.open();
});
favClose.addEventListener('click', function(){
	favWin.close();
});
storyBtn.addEventListener('click', function(){
	storyWin.open();
});





newsWin.add(table1);
//formView.add(emailTxt);
//formView.add(passTxt);
//formView.add(createLogin);
//formView.add(forgotLogin);
//formView.add(submitButton);
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
