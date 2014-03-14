//store info

// List View JSON Template
/*var data = [];
for(var i = 0; i < 10; i++) {
	data.push({
		rowtitle: { text: 'Row' + (i + 1) 
		},
		thumb: {
			image: [i]
		},
		
	});
}*/


var listLogic = function(){
	var data = [];
	var template = {
		childTemplates: [ {       // Construct Row with ChildTemplates Property
			type: 'Ti.UI.ImageView',
			bindId: 'thumb',
			properties: {
				left: 0,
				width: 45,
				backgroundImage: 'logo.png'
		}
	},
	{
		type: 'Ti.UI.Label',
		bindId: 'rowtitle',
		properties: {
			left: 48,
			top: 1,
			color: '#cc6600'
		}
	},
	{
		type: 'Ti.UI.Label',
		bindId: 'coordinates',
		properties: {
			left: 48,
			bottom: 2,
			width: '75%',
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			color: '#fff',
			backgroundColor: '#ff9900',
			font: {
				size: '6sp'
			}
		}
	} ]
};

for (var i = 0; i < 25; i++) {
	data.push({
		rowtitle: {
			text: titleField[i].title
		},
		coordinates: {
			text: "replace with location coords"
		}
	});
}
// Create List View for Photos
var listView = Ti.UI.createListView({
	top: 50,
	templates: {
		'photo': template
	},
	defaultItemTemplate: 'photo'
});

var section = Ti.UI.createListSection({
	items: data
});
listView.sections = [section];
};
