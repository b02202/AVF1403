// Robert Brooks
// AVF 1403
// Project 2 Native Features and Remote Data
// camera.js

Ti.include('geo.js');
var dataFile;
Ti.Geolocation.addEventListener('location', runGeo);
var emailDialog1 = Ti.UI.createEmailDialog({
	barColor: '#ffcc00',
	html: true
});
var emailDialog = Ti.UI.createEmailDialog({
	barColor: '#ffcc00',
	html: true
});

var picWin = Titanium.UI.createWindow({  
    title:'Image',
    backgroundColor: '#000',
	backgroundImage: 'bg.png'
});

var picBtn = Ti.UI.createButton({
	title: 'USE CAMERA',
	font: {fontSize: 25, fontFamily: "Arial"},
	color: '#fff',
	backgroundColor: '#b5b7b9',
	borderColor: '#fff',
	borderWidth: 1,
	width: '100%',
	height: 75,
	top: 100,
	//right: '25%',
	enabled: false
	
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
var fullTxtField1 = Ti.UI.createTextArea({
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
			
var sendBtn1 = Ti.UI.createButton({
	title: "Send Story",
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

var backButton1 = Ti.UI.createButton({
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
backButton1.addEventListener('click', function(){
				picWin.close();
			});


picWin.add(backButton1);

picBtn.addEventListener('click', function(e){
	Ti.Media.showCamera({
		saveToPhotoGallery: true,
		allowEditing: true,
		mediaTypes: [Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO],
		success: function(e) {
	 		if(e.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				var camFormView = Ti.UI.createScrollView({
				layout: "vertical",
				backgroundColor: "#000",
				width: '100%',
				top: '50%',
				bottom: 60

				});
				
				var camImg = Ti.UI.createImageView({
					image: e.media,
					width: '50%',
					//height: '50%',
					top: 85,
					bottom: '52%',
					left: '25%'
				});
				
				camFormView.add(titleField1);
				camFormView.add(fullTxtField1);
				camFormView.add(sendBtn1);
				picWin.add(camFormView);
				picWin.add(camImg);
				picWin.open();
				
		sendBtn1.addEventListener('click', function(){
				//runGeo();
				
				var img = camImg.toImage();
				dataFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,"story01.png");
				if (dataFile.exists()){
					dataFile.deleteFile();
				}
				//dataFile.createFile();
				dataFile.write(img);
				var fileContent = dataFile.read();
				emailDialog1.addAttachment(fileContent);
				emailDialog1.subject = titleField1.value;
				emailDialog1.messageBody = fullTxtField1.value + '\n' + 'Location = ' + coordText;
				emailDialog1.open();
			});
			
			emailDialog1.addEventListener('complete', function(e){
				alert('Your Email Has Been Sent.');
				if(dataFile.exists()){
					dataFile.deleteFile();
				}
			
			});
			
			
			
			} else {
				alert("thought this was a photo but, it's:" + e.mediaType);
			}
		},
		error: function(error) {
			if (error.code == Ti.Media.NO_CAMERA) {
				alert("please run this on a device");
			} else {
				alert("other error: " + error.code);
			}
		}
	});
});


// *** Begin Story Page ***
var storyWin = Ti.UI.createWindow({
	title: 'Your Stories',
	backgroundColor: '#fff',
});

var galWin = Ti.UI.createWindow({
	title: 'Photo Gallery',
	backgroundColor: '#fff',
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
storyBtn.addEventListener('click', function(){
	storyWin.open();
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
			var titleField = Ti.UI.createTextField({
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
			
			var sendBtn = Ti.UI.createButton({
				title: "Send Story",
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
			picFormView.add(titleField);
			picFormView.add(fullTxtField);
			picFormView.add(sendBtn);
			galWin.add(picFormView);
			galWin.add(imgView);
			galWin.open();
			
			sendBtn.addEventListener('click', function(){
				
				var img = imgView.toImage();
				dataFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,"story01.png");
				if (dataFile.exists()){
					dataFile.deleteFile();
				}
				//dataFile.createFile();
				dataFile.write(img);
				var fileContent = dataFile.read();
				emailDialog.addAttachment(fileContent);
				emailDialog.subject = titleField.value;
				emailDialog.messageBody = fullTxtField.value + '\n' + 'Location = ' + coordText;
				emailDialog.open();
			});
			
			emailDialog.addEventListener('complete', function(e){
				alert('Your Email Has Been Sent.');
				if(dataFile.exists()){
					dataFile.deleteFile();
				}
			
			});
			
			
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
});

storyWin.add(gallBtn);
storyWin.add(picBtn);
storyWin.add(backButton);
