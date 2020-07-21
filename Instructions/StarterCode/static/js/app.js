// from data.js
var tableData = data;

var ufoTable = d3.select("#ufo-table");
var tableBody = ufoTable.select('tbody');
var filterButton = d3.select("#filter-btn");

// Create the table with all the UFO sightings
tableData.forEach(function(sigthing) {
    var row = tableBody.append('tr'); // one row per sighting
    Object.entries(sigthing).forEach(function([key, value]) {
        tableBody.append('td').text(value);
    });
});

// Add more filter input tags
var filtersList = d3.select("#filters");
function createInputTag(idTag, textLabel) {
    var li = filtersList.append('li').attr('class', 'list-group-item');
    li.append('label').attr('for', idTag).text(textLabel);
    li.append('input').attr('class', 'form-control').attr('type', 'text').attr('id', idTag);
};
createInputTag('city', 'Enter City');
createInputTag('state', 'Enter State');
createInputTag('country', 'Enter Country');
createInputTag('shape', 'Enter Shape');

// Listen for events
filterButton.on("click", function() {
    d3.event.preventDefault();
    
    // Get date input
    var dateInput = d3.select("#datetime").property("value");
    var cityInput = d3.select("#city").property("value").toLowerCase();
    var stateInput = d3.select("#state").property("value").toLowerCase();
    var countryInput = d3.select("#country").property("value").toLowerCase();
    var shapeInput = d3.select("#shape").property("value").toLowerCase();

    // Filter the table (I am avoiding the arrow functions...)
    filteredTableData = tableData;
    if(dateInput) {
        filteredTableData = filteredTableData.filter(sighting => sighting.datetime === dateInput);
    };
    if(cityInput) {
        filteredTableData = filteredTableData.filter(sighting => sighting.city === cityInput);
    };
    if(stateInput) {
        filteredTableData = filteredTableData.filter(sighting => sighting.state === stateInput);
    };
    if(countryInput) {
        filteredTableData = filteredTableData.filter(sighting => sighting.country === countryInput);
    };
    if(shapeInput) {
        filteredTableData = filteredTableData.filter(sighting => sighting.shape === shapeInput);
    };

    // Clear the current table
    tableBody.text("");

    // Enter the filtered table
    filteredTableData.forEach(function(sigthing) {
        var row = tableBody.append('tr'); // one row per sighting
        Object.entries(sigthing).forEach(function([key, value]) {
            tableBody.append('td').text(value);
        });
    });

});


