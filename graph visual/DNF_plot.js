// Make a request to fetch the JSON data from the URL
d3.text("https://raw.githubusercontent.com/31573/Dr.John/main/graph visual/DNF_data.json")
  .then(function(data) {
    // Split the text data by newline characters to get individual JSON entries
    let lines = data.trim().split('\n');

    // Parse each JSON entry
    let jsonData = lines.map(line => JSON.parse(line.trim())); // Trim any extra whitespace
   
    // This function will be executed when the data is successfully fetched
    console.log(jsonData); // Output the fetched data to the console for verification

    // Filter the data for the specified conditions: status = "DNF" and season = 2014
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
    let trace1 = {
      x: Object.keys(dnfCounts),
      y: Object.values(dnfCounts),
      type: "bar",
      text: Object.values(dnfCounts),
      textposition: "auto",
      hoverinfo: "text"
    };

    // Create data array
    let data_points = [trace1];

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

    // Render the plot to the div tag with id "DNF_plot"
    Plotly.newPlot("DNF_plot", data_points, layout).then(function(gd) {
      Plotly.toImage(gd, { format: 'png', width: 800, height: 600 })
        .then(function(url) {
          let a = document.createElement('a');
          a.href = url;
          a.download = 'DNF_plot.png';
          document.body.appendChild(a);
          a.click();
        })
        .catch(function(err) {
          console.error('Error saving plot as image:', err);
        });
    });
  })
  .catch(function(error) {
    // This function will be executed if there's an error fetching the data
    console.error("Error fetching the JSON data:", error);
  });