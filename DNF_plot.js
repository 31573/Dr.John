console.log('i')
d3.json("DNF_output.json").then(function(data) {
  // Initialized arrays
  let locations = [];
  let statuses = [];

  console.log(data[0]);
  // For loop to populate arrays
  for (let i = 0; i < data.length; i++) {
    let row = data[i];
    locations.push(row.location);
    statuses.push(row.status);
    console.log(row);
  }

  // Count occurrences of each status
  let statusCounts = {};
  statuses.forEach(status => {
    if (!statusCounts[status]) {
      statusCounts[status] = 1;
    } else {
      statusCounts[status]++;
    }
  });

  // Create data for the bar graph
  let trace1 = {
    x: Object.keys(statusCounts),
    y: Object.values(statusCounts),
    type: "bar"
  };

  // Create data array
  let data_points = [trace1];

  // Apply a title to the layout
  let layout = {
    title: "Did Not Finish (DNF) By Location",
    barmode: "group",
    // Include margins in the layout so the x-tick labels display correctly
    margin: {
      l: 50,
      r: 50,
      b: 200,
      t: 50,
      pad: 4
    }
  };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("DNF_plot", data_points, layout);
});