let seasons=["2014","2015","2016","2017","2018","2019"];

function optionChanged(year){
    console.log(year)
    // Sample data
  const data = [
    { driver: "Lewis Hamilton", team: "Mercedes", year: 2015, dnf: true },
    { driver: "Max Verstappen", team: "Red Bull Racing", year: 2014, dnf: true },
    { driver: "Lewis Hamilton", team: "Mercedes", year: 2014, dnf: true },
    { driver: "Max Verstappen", team: "Red Bull Racing", year: 2015, dnf: true }
    // Add more data from metadata ----------------------------------
  ];

  // Function to calculate DNFs per driver and per team for a given year
  function calculateStats(year) {
    let driverStats = {};
    let teamStats = {};

  // Filter data for the given year
    let filteredData = data.filter(item => item.year === year);

  // Calculate DNFs per driver and per team
    filteredData.forEach(item => {
      if (item.dnf) {
          // DNFs per driver
          if (!driverStats[item.driver]) {
              driverStats[item.driver] = 1;
          } else {
              driverStats[item.driver]++;
          }

          // DNFs per team
          if (!teamStats[item.team]) {
              teamStats[item.team] = 1;
          } else {
              teamStats[item.team]++;
          }
      }
  });

  return { driverStats, teamStats };
  }

// Function to display stats on the webpage
function displayStats(year) {
  //let year = 2014; // Replace this with the desired year

  let { driverStats, teamStats } = calculateStats(year);
  console.log({ driverStats, teamStats } );

  let driverStatsDiv = document.getElementById('driverStats');
  let teamStatsDiv = document.getElementById('teamStats');

  // Display driver stats
  driverStatsDiv.innerHTML = `<h2>Driver Stats for ${year}</h2>`;
  Object.keys(driverStats).forEach(driver => {
      driverStatsDiv.innerHTML += `<p>${driver}: ${driverStats[driver]} DNF(s)</p>`;
  });

  // Display team stats
  teamStatsDiv.innerHTML = `<h2>Team Stats for ${year}</h2>`;
  Object.keys(teamStats).forEach(team => {
      teamStatsDiv.innerHTML += `<p>${team}: ${teamStats[team]} DNF(s)</p>`;
  });
}

// Call the displayStats function to display stats on page load
displayStats(year);
};
// -------------------------------------------------------


// -------------------------------------------------------
d3.json("DNF_output.json").then(function(data) {
    // Initialized arrays
    let locations = [];
    let statuses = [];
    let data2014 = [];
    let data2015 = [];
    let data2016 = [];
    let data2017 = [];
    let data2018 = [];
    let data2019 = [];


    // For loop to populate arrays
    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        locations.push(row.location);
        statuses.push(row.status);
        if (data[i].season = 2014) {data2014.push(data[i])}
        else if (data[i].season = 2015) {data2015.push(data[i])}
        else if (data[i].season = 2016) {data2016.push(data[i])}
        else if (data[i].season = 2017) {data2017.push(data[i])}
        else if (data[i].season = 2018) {data2018.push(data[i])}
        else {data2019.push(data[i])}
    };
    // Initialize an empty object to store counts-----------------------------------------------------------------
    let counts = {};
  
    // Iterate over the locations array
    locations.forEach(function(location) {
      // If the location is not already a key in the counts object, initialize it with a count of 1
      if (!counts[location]) {
          counts[location] = 1;
      } else {
          // If the location is already a key, increment its count
          counts[location]++;
      }
  });
  
  
    // Convert counts object to array of key-value pairs
    let countsArray = Object.entries(counts);
  
    // Sort the array based on counts (descending order)
    countsArray.sort(function(a, b) {
      return b[1] - a[1];
    });
  
    // If you want to convert the sorted array back to an object
    let sortedCounts = {};
    countsArray.forEach(function(pair) {
      sortedCounts[pair[0]] = pair[1];
    });
    // Output the sorted counts
    console.log(sortedCounts);
  
    // Count occurrences of each status -----------------------------------------------------------------------------------
    let statusCounts = {};
    statuses.forEach(status => {
      if (!statusCounts[status]) {
        statusCounts[status] = 1;
      } else {
        statusCounts[status]++;
      }
    });
    // Create data for the bar graph----------------------------------------------------------------------------------------
    let trace1 = {
      x: Object.keys(sortedCounts),
      y: Object.values(sortedCounts),
      type: "bar"
    };
  
    // Create data array
    let data_points = [trace1];
  
    // Apply a title to the layout
    let layout = {
      title: "Did Not Finish (DNF) By Location",
      barmode: "group"
      // Include margins in the layout so the x-tick labels display correctly
      //margin: {
        //l: 50,
        //r: 50,
        //b: 200,
        //t: 50,
        //pad: 4
      
    };
  
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("DNF_plot", data_points, layout);
  });