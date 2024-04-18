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

    // Define the driver IDs to include
    let driverIdsToInclude = [1, 6, 10, 29, 31, 34];

    // Initialize an object to store the sum of failures and accidents for each driver
    let sumOfFailuresAndAccidentsByDriverId = {};

    // Filter the data for the specified driver IDs and calculate the sum of failures and accidents
    parsedData.forEach(entry => {
      let driverId = parseInt(entry.Driver_id);
      if (driverIdsToInclude.includes(driverId)) {
        if (!sumOfFailuresAndAccidentsByDriverId[driverId]) {
          sumOfFailuresAndAccidentsByDriverId[driverId] = 0;
        }
        sumOfFailuresAndAccidentsByDriverId[driverId] += parseInt(entry.failures) + parseInt(entry.accidents);
      }
    });

    // Prepare data for the bar graph
    let trace = {
      x: Object.keys(sumOfFailuresAndAccidentsByDriverId),
      y: Object.values(sumOfFailuresAndAccidentsByDriverId),
      type: "bar",
      text: Object.values(sumOfFailuresAndAccidentsByDriverId),
      textposition: "auto",
      hoverinfo: "text"
    };

    // Create data array for the graph
    let data = [trace];

    // Apply a title to the layout
    let layout = {
      title: "Sum of Failures and Accidents by Driver",
      xaxis: { title: "Driver ID" },
      yaxis: { title: "Sum of Failures and Accidents" }
    };

    // Render the plot to the div element
    Plotly.newPlot("failuresAccidents", data, layout);
  })
  .catch(function(error) {
    console.error("Error fetching or parsing CSV data:", error);
  });