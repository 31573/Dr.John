
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

    // Initialize an object to store the sum of accidents for each driver
    let sumOfAccidentsByDriverId = {};

    // Iterate over the parsed data to calculate the sum of accidents for each driver
    parsedData.forEach(entry => {
      let driverId = entry.driver_id.toString(); // Convert driver_id to string
      if (!sumOfAccidentsByDriverId[driverId]) {
        sumOfAccidentsByDriverId[driverId] = 0;
      }
      sumOfAccidentsByDriverId[driverId] += parseInt(entry.accidents); // Add accidents to the sum
    });

    // Prepare data for the bar graph
    let trace = {
      x: Object.keys(sumOfAccidentsByDriverId),
      y: Object.values(sumOfAccidentsByDriverId),
      type: "bar",
      text: Object.values(sumOfAccidentsByDriverId),
      textposition: "auto",
      hoverinfo: "text"
    };

    // Create data array for the graph
    let data = [trace];

    // Apply a title to the layout
    let layout = {
      title: "Sum of Accidents by Driver ID",
      xaxis: { title: "Driver ID" },
      yaxis: { title: "Sum of Accidents" }
    };

    // Render the plot to the div element
    Plotly.newPlot("accidentsByDriver", data, layout);
  })
  .catch(function(error) {
    console.error("Error fetching or parsing CSV data:", error);
  });