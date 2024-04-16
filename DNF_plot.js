
// Make a request to fetch the JSON data from the URL
d3.json("https://raw.githubusercontent.com/31573/Dr.John/main/meta_data_inclusive_output.json")
  .then(function(data) {
    // This function will be executed when the data is successfully fetched
    console.log(data); // Output the fetched data to the console for verification

    // Extract unique locations and count DNF occurrences for each location
    let locationCounts = {};
    let locationAccidents = {};
    let locationFailures = {};

    data.forEach(entry => {
      if (!locationCounts[entry.location]) {
        locationCounts[entry.location] = 1;
        locationAccidents[entry.location] = entry.accidents;
        locationFailures[entry.location] = entry.failures;
      } else {
        locationCounts[entry.location]++;
        locationAccidents[entry.location] += entry.accidents;
        locationFailures[entry.location] += entry.failures;
      }
    });

    // Create data for the bar graph
    let trace1 = {
      x: Object.keys(locationCounts),
      y: Object.values(locationCounts),
      type: "bar",
      text: Object.keys(locationCounts).map(location => `Count of DNF: ${locationCounts[location]}, Accidents: ${locationAccidents[location]}, Failures: ${locationFailures[location]}`),
      hoverinfo: "text"
    };

    // Create data array
    let data_points = [trace1];

    // Apply a title to the layout
    let layout = {
      title: "Did Not Finish (DNF) By Location",
      xaxis: { title: "Location" },
      yaxis: { title: "Count of DNF" },
      // Include margins in the layout so the x-tick labels display correctly
      margin: {
        l: 50,
        r: 50,
        b: 200,
        t: 50,
        pad: 4
      }
    };

    // Render the plot to the div tag with id "DNF_plot"
    Plotly.newPlot("DNF_plot", data_points, layout);
  })
  .catch(function(error) {
    // This function will be executed if there's an error fetching the data
    console.error("Error fetching the JSON data:", error);
  });