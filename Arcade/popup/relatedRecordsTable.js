// Table styling
var cssGray = "style='background-color: lightgray'";
var cssRight = "style='text-align: right;'";
var cssCenter = "style='text-align: center;'";

// Table markup
var html = "<table style='width: 100%;'>";

// Get data from related table
var relatedTableName = "Areas"
var relatedFS = FeatureSetByRelationshipName($feature, relatedTableName)

var table = [
  {header: "Area-ID", "field": "AreaID", "style": cssCenter},
  {header: "Type", "field": "AreaType", "style": cssRight}
]

// Helper function
function createTableRow(row, rowStyle) {
  var r = `<tr ${rowStyle}>`

  for(var i in table) {
    var value = table[i].header;
    
    if(!IsEmpty(row)) {
        value = row[table[i].field]
    }

    //var value = IIF(IsEmpty(row), table[i].header, row[table[i].field])
    r += `<td ${table[i].style}>${value}</td>`
  }
  
  r += "</tr>"
  
  return r
}


if (Count(relatedFS) > 0) { // Check if feature have related records
  var i = 0;
  html += createTableRow(null, ''); // Add table headers
  
  for (var row in relatedFS) {
    var style = IIF(i % 2 != 0, cssGray, '');
    html += createTableRow(row, style);
    i++
  }
    
  html += "</table>"
    
} else {
  html = "No areas registered on this property"
}

return { 
	type : "text", 
	text : html //this property supports html tags 
}