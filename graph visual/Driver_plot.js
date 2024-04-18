
// Make a request to fetch the CSV data
fetch("https://raw.githubusercontent.com/31573/Dr.John/main/data/retirements.csv")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text(); // Parse response as text
  })
  .then(function(csvData) {
    // Parse the CSV data using PapaParse
    let parsedData = Papa.parse(csvData, { header: true }).data;

    // Initialize an object to store the sum of failures for each driver
    let sumOfFailuresByDriverId = {};

    // Iterate over the parsed data to calculate the sum of failures for each driver
    parsedData.forEach(entry => {
      let driverId = entry.driver_id.toString(); // Convert driver_id to string
      if (!sumOfFailuresByDriverId[driverId]) {
        sumOfFailuresByDriverId[driverId] = 0;
      }
      sumOfFailuresByDriverId[driverId] += parseInt(entry.failures); // Add failures to the sum
    });

    // Prepare data for the bar graph
    let trace = {
      x: Object.keys(sumOfFailuresByDriverId),
      y: Object.values(sumOfFailuresByDriverId),
      type: "bar",
      text: Object.values(sumOfFailuresByDriverId),
      textposition: "auto",
      hoverinfo: "text"
    };

    // Create data array for the graph
    let data = [trace];

    // Apply a title to the layout
    let layout = {
      title: "Sum of Failures by Driver ID",
      xaxis: { title: "Driver ID" },
      yaxis: { title: "Sum of Failures" }
    };

    // Render the plot to the div element
    Plotly.newPlot("failuresByDriver", data, layout);
  })
  .catch(function(error) {
    console.error("Error fetching or parsing CSV data:", error);
  });