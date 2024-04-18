// Make a request to fetch the JSON data from the URL
d3.text("https://raw.githubusercontent.com/31573/Dr.John/main/graph visual/mergedSRa.json")
  .then(function(data) {
    // Split the text data by newline characters to get individual JSON entries
    let lines = data.trim().split('\n');

    // Parse each JSON entry
    let jsonData = lines.map(line => JSON.parse(line.trim())); // Trim any extra whitespace

    // Filter the data for the specified condition: status = "DNF"
    let filteredData = jsonData.filter(entry => entry.status === "DNF");

    // Count the occurrences of DNF for each location and engine manufacturer
    let dnfCounts = {};
    filteredData.forEach(entry => {
      let key = `${entry.location}-${entry.enginemanufacturer}`;
      if (!dnfCounts[key]) {
        dnfCounts[key] = 1;
      } else {
        dnfCounts[key]++;
      }
    });

    // Define colors for engine manufacturers
    let colorMap = {
      "Mercedes": "#00D2BE",
      "Renault": "#1E41FF",
      "Ferrari": "#DC0000",
      "McLaren": "#FF8700",
      "ToroRosso": "#469BFF",
      "ForceIndia": "#F596C8",
      "Williams": "red", // Add red
      "RedBull": "blue", // Add blue
      "FIA": "green", // Add green
      "Lotus": "black" // Add black
    };

    // Prepare data for the bar graph
    let trace1 = {
      x: Object.keys(dnfCounts),
      y: Object.values(dnfCounts),
      type: "bar",
      text: Object.values(dnfCounts),
      textposition: "auto",
      hoverinfo: "text",
      marker: {
        color: Object.keys(dnfCounts).map(key => {
          let manufacturer = key.split('-')[1];
          return colorMap[manufacturer];
        })
      }
    };

    // Create data array
    let data_points = [trace1];

    // Apply a title to the layout
    let layout = {
      title: "Count of DNF (Did Not Finish) by Location and Engine Manufacturer",
      xaxis: { title: "Location - Engine Manufacturer" },
      yaxis: { title: "Count of DNF" },
      // Include margins in the layout so the x-tick labels display correctly
      margin: {
        l: 50,
        r: 50,
        b: 200,
        t: 50,
        pad: 4
      },
      // Add legend to the top right
      legend: { x: 1, y: 1, traceorder: 'normal', font: { family: 'sans-serif', size: 12, color: '#000' } }
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
