// Make a request to fetch the CSV data
fetch("https://raw.githubusercontent.com/31573/Dr.John/main/data/starterfields.csv")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text(); // Parse response as text
  })
  .then(function(csvData) {
    // Parse the CSV data using PapaParse
    let parsedData = Papa.parse(csvData, { header: true }).data;

    // Process the parsed data and create the plot
    // For example, you can count the occurrences of DNF by driver
    
    // Example code to count DNF occurrences by driver
    let dnfCountsByDriverId = {};
    parsedData.forEach(entry => {
      if (!dnfCountsByDriverId[entry.driver_id]) {
        dnfCountsByDriverId[entry.driver_id] = 1;
      } else {
        dnfCountsByDriverId[entry.driver_id]++;
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
    let data = [trace];

    // Apply a title to the layout
    let layout = {
      title: "Count of DNF (Did Not Finish) by Driver",
      xaxis: { title: "Driver ID" },
      yaxis: { title: "Count of DNF" }
    };

    // Render the plot to the div element
    Plotly.newPlot("DNFbyDriver", data, layout);
  })
  .catch(function(error) {
    console.error("Error fetching or parsing CSV data:", error);
  });