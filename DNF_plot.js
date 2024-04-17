
// Make a request to fetch the JSON data from the URL
d3.json("https://raw.githubusercontent.com/31573/Dr.John/main/DNF_data.json")
  .then(function(data) {
   
    // This function will be executed when the data is successfully fetched
    console.log(data); // Output the fetched data to the console for verification

    // Filter the data for the specified conditions: status = "DNF" and season = 2014
    let filteredData = data.filter(entry => entry.status === "DNF" && entry.season_x === 2014);

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
      hoverinfo: "text",
      marker: {
        color: 'rgb(158,202,225)',
        opacity: 0.6,
        line: {
          color: 'rgb(8,48,107)',
          width: 1.5
        }
      }
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
    Plotly.newPlot("DNF_plot", data_points, layout);
  })
  .catch(function(error) {
    // This function will be executed if there's an error fetching the data
    console.error("Error fetching the JSON data:", error);
  });