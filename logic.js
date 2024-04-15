let seasons=["2014","2015","2016","2017","2018","2019"];

function optionChanged(year){
    console.log(year)
};


d3.json("DNF_output.json").then(function(data) {
    // Initialized arrays
    let locations = [];
    let statuses = [];
    let data2014 = [];
    let data2015 = [];
    let data2016 = [];
    let data2017 = [];
    let data2018 = [];
    let data2019 = [];

  
    console.log(data.length);
    // For loop to populate arrays
    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        locations.push(row.location);
        statuses.push(row.status);
        if (data[i].season = 2014) {data2014.push(data[i])}
        else if (data[i].season = 2015) {data2015.push(data[i])}
        else if (data[i].season = 2016) {data2016.push(data[i])}
        else if (data[i].season = 2017) {data2017.push(data[i])}
        else if (data[i].season = 2018) {data2018.push(data[i])}
        else {data2019.push(data[i])}
    };
    console.log(data2017.length);
    // Initialize an empty object to store counts-----------------------------------------------------------------
    let counts = {};
  
    // Iterate over the locations array
    locations.forEach(function(location) {
      // If the location is not already a key in the counts object, initialize it with a count of 1
      if (!counts[location]) {
          counts[location] = 1;
      } else {
          // If the location is already a key, increment its count
          counts[location]++;
      }
  });
  
  
    // Convert counts object to array of key-value pairs
    let countsArray = Object.entries(counts);
  
    // Sort the array based on counts (descending order)
    countsArray.sort(function(a, b) {
      return b[1] - a[1];
    });
  
    // If you want to convert the sorted array back to an object
    let sortedCounts = {};
    countsArray.forEach(function(pair) {
      sortedCounts[pair[0]] = pair[1];
    });
    // Output the sorted counts
    console.log(sortedCounts);
  
    // Count occurrences of each status -----------------------------------------------------------------------------------
    let statusCounts = {};
    statuses.forEach(status => {
      if (!statusCounts[status]) {
        statusCounts[status] = 1;
      } else {
        statusCounts[status]++;
      }
    });
    // Create data for the bar graph----------------------------------------------------------------------------------------
    let trace1 = {
      x: Object.keys(sortedCounts),
      y: Object.values(sortedCounts),
      type: "bar"
    };
  
    // Create data array
    let data_points = [trace1];
  
    // Apply a title to the layout
    let layout = {
      title: "Did Not Finish (DNF) By Location",
      barmode: "group"
      // Include margins in the layout so the x-tick labels display correctly
      //margin: {
        //l: 50,
        //r: 50,
        //b: 200,
        //t: 50,
        //pad: 4
      
    };
  
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("DNF_plot", data_points, layout);
  });