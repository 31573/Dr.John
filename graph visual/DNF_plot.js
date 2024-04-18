//Make a request to fetch the JSON data from the URL
fetch("https://raw.githubusercontent.com/31573/Dr.John/main/graph%20visual/DNF_data.json")
  .then(response => response.text()) // Parse response as text
  .then(function(data) {
    // Split the text data by newline characters to get individual JSON entries
    let lines = data.trim().split('\n');

    // Parse each JSON entry
    let jsonData = lines.map(line => JSON.parse(line.trim())); // Trim any extra whitespace

    // Filter the data for the specified conditions: status = "DNF" and season_x = 2014
    let filteredData = jsonData.filter(entry => entry.status === "DNF" && entry.season_x === 2014);

    // Count the occurrences of DNF for each location
    let dnfCounts = {};
    filteredData.forEach(entry => {
      if (!dnfCounts[entry.location]) {
        dnfCounts[entry.location] = 1;
      } else {
        dnfCounts[entry.location]++;
      }
    });

    // Prepare data for the bar graph
    let trace = {
      x: Object.keys(dnfCounts),
      y: Object.values(dnfCounts),
      type: "bar",
      text: Object.values(dnfCounts),
      textposition: "auto",
      hoverinfo: "text"
    };

    // Create data array for the graph
    let plotData = [trace]; // Renamed the variable to plotData

    // Apply a title to the layout
    let layout = {
      title: "Count of DNF (Did Not Finish) by Location in 2014",
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

    // Render the plot to a div element
    Plotly.newPlot("DNF_plot", plotData, layout); // Changed the variable to plotData
  })
  .catch(function(error) {
    // This function will be executed if there's an error fetching the data
    console.error("Error fetching the JSON data:", error);
  });