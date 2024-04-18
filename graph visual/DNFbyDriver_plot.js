
Copy code
// Make a request to fetch the JSON data from the URL for mergedSRa.json
d3.text("https://raw.githubusercontent.com/31573/Dr.John/main/graph%20visual/mergedSRa.json")
  .then(function(dataSRa) {
    // Split the text data by newline characters to get individual JSON entries
    let linesSRa = dataSRa.trim().split('\n');
    
    // Parse each JSON entry
    let jsonDataSRa = linesSRa.map(line => JSON.parse(line.trim()));

    // Filter the data for the specified driver IDs and status = "DNF"
    let filteredDataSRa = jsonDataSRa.filter(entry => [1, 3, 6, 31, 34, 10, 29].includes(entry.driver_id) && entry.status === "DNF");

    // Count the occurrences of DNF for each driver ID
    let dnfCountsSRa = {};
    filteredDataSRa.forEach(entry => {
      if (!dnfCountsSRa[entry.driver_id]) {
        dnfCountsSRa[entry.driver_id] = 1;
      } else {
        dnfCountsSRa[entry.driver_id]++;
      }
    });

    // Prepare data for the DNF bar graph
    let traceDNF = {
      x: Object.keys(dnfCountsSRa).map(id => parseInt(id)), // Convert driver IDs to integers
      y: Object.values(dnfCountsSRa),
      type: "bar",
      name: "DNF"
    };

    // Make a request to fetch the JSON data from the URL for mergedDR.json
    d3.text("https://raw.githubusercontent.com/31573/Dr.John/main/graph%20visual/mergedDR.json")
      .then(function(dataDR) {
        // Split the text data by newline characters to get individual JSON entries
        let linesDR = dataDR.trim().split('\n');

        // Parse each JSON entry
        let jsonDataDR = linesDR.map(line => JSON.parse(line.trim()));

        // Filter the data for the specified driver IDs and accidents
        let filteredDataDR = jsonDataDR.filter(entry => [1, 3, 6, 31, 34, 10, 29].includes(entry.driver_id) && entry.accidents);

        // Count the occurrences of accidents for each driver ID
        let accidentCountsDR = {};
        filteredDataDR.forEach(entry => {
          if (!accidentCountsDR[entry.driver_id]) {
            accidentCountsDR[entry.driver_id] = 1;
          } else {
            accidentCountsDR[entry.driver_id]++;
          }
        });

        // Prepare data for the accidents bar graph
        let traceAccidents = {
          x: Object.keys(accidentCountsDR).map(id => parseInt(id)), // Convert driver IDs to integers
          y: Object.values(accidentCountsDR),
          type: "bar",
          name: "Accidents"
        };

        // Create data array for both DNF and accidents
        let dataPoints = [traceDNF, traceAccidents];

        // Apply a title to the layout
        let layout = {
          title: "Count of DNF and Accidents by Driver ID",
          xaxis: { 
            title: "Driver ID",
            tickvals: [1, 3, 6, 31, 34, 10, 29], // Specify tick values for the x-axis
            ticktext: ["1", "3", "6", "31", "34", "10", "29"] // Specify corresponding tick labels
          },
          yaxis: { title: "Count" }
        };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("plot", dataPoints, layout);
      })
      .catch(function(error) {
        console.error("Error fetching mergedDR.json:", error);
      });
  })
  .catch(function(error) {
    console.error("Error fetching mergedSRa.json:", error);
  });