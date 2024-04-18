// Make a request to fetch the JSON data from the URL
fetch("https://raw.githubusercontent.com/31573/Dr.John/main/graph%20visual/mergedSRa.json")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text(); // Parse response as text
  })
  .then(function(data) {
    // Split the text data by newline characters to get individual JSON entries
    let lines = data.trim().split('\n');

    // Parse each JSON entry
    let jsonData = lines.map(line => JSON.parse(line.trim())); // Trim any extra whitespace

    // Initialize an object to store the count of DNF by driver_id
    let dnfCountsByDriverId = {};

    // Count DNF occurrences by driver_id
    jsonData.forEach(entry => {
      let driverId = entry.driver_id;
      if (entry.status === "DNF") {
        if (!dnfCountsByDriverId[driverId]) {
          dnfCountsByDriverId[driverId] = 1;
        } else {
          dnfCountsByDriverId[driverId]++;
        }
      }
    });

    // Prepare data for the bar graph
    let trace = {
      x: Object.keys(dnfCountsByDriverId),
      y: Object.values(dnfCountsByDriverId),
      type: "bar",
      text: Object.values(dnfCountsByDriverId),
      textposition: "auto",
      hoverinfo: "text"
    };

    // Create data array for the graph
    let plotData = [trace];

    // Apply a title to the layout
    let layout = {
      title: "Count of DNF by Driver ID",
      xaxis: { title: "Driver ID" },
      yaxis: { title: "Count of DNF" }
    };

    // Render the plot to a div element
    Plotly.newPlot("IndDriver_plot", plotData, layout);
  })
  .catch(function(error) {
    // Handle errors
    console.error("Error fetching or parsing JSON data:", error);
  });