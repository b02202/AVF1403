
var db = Titanium.Database.open('fav');
var openDB = function(){
db.execute('CREATE TABLE IF NOT EXISTS fav (id INTEGER PRIMARY KEY, date TEXT, title TEXT);');		
};

// getRowData function
var getRowData = function() {
	var currentData = [];
	
	// loop db data
	var rows = db.execute('SELECT * FROM fav');
	
	while (rows.isValidRow()) {
		var id = rows.fieldByName('id');
		var date = rows.fieldByName('date');
		var newsTitle = rows.fieldByName('title');
	
		//Add table row
		// store the fields directly to rowData
		currentData.push({
			title: date + " - " + newsTitle ,
			id: id
		});	
		//Loop to next row
		rows.next();			
	}
	return currentData;
};