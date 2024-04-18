let seasons=["2014","2015","2016","2017","2018","2019"];

function teamChanged(team){
  console.log(team);
  d3.json("https://raw.githubusercontent.com/31573/Dr.John/main/meta_data_inclusive_output.json").then(function(data){
    //empty lists to collect data
    let teamData = [];
    let team_DNFs = [];
    
    //for loops filtering for team
    for (let i = 0; i < data.length; i++) {
      let row = data[i];
      if (row.team === team) {teamData.push(row)};
    };
    
    //for loop filtering for DNF
    for (let i =0;i<teamData.length;i++) {
      let item = teamData[i];
      if (item.status !== "F") {team_DNFs.push(item.season)}
    };
    
    function teamPlot(team){
      // Initialize an empty object to store counts-----------------------------------------------------------------
      let counts = {};

      // Iterate over the dnf array
      team_DNFs.forEach(function(z) {
        // If the location is not already a key in the counts object, initialize it with a count of 1
        if (!counts[z]) {
            counts[z] = 1;
        } else {
            // If the location is already a key, increment its count
            counts[z]++;
        }
    });
      
  
      let years = Object.keys(counts).map(key => parseInt(key));
      
      // Create data for the bar graph----------------------------------------------------------------------------------------
      let trace1 = {
        x: years,
        y: Object.values(counts),
        type: "scatter"
      };

      let data_points = [trace1];
      // Apply a title to the layout
      let layout = {
        title: "DNFs by Year for " + team,
        xaxis: {
            title: "Year"
        },
        yaxis: {
            title: "DNF Count"
        }
      };

      Plotly.newPlot("line_plot",data_points,layout);
  };
 // ------------------------------------------------------------------
//DROPDOWN TEAM FUNCTION
// ------------------------------------------------------------------
// function for matching the team from the dropdown to dataset
  function selTeam(dropDownTeam){
      let teamList=["Mercedes","RedBull","McLaren","Ferrari","ToroRosso","ForceIndia","Williams","Sauber", "Caterham", "Marussia"
      , "LotusF1", "ManorMarussia",  "Renault", "HaasF1Team",  "AlfaRomeo", "RacingPoint"];

      for (let i = 0; i<teamList.length ;i++){
        if (dropDownTeam === teamList[i]){
          console.log("Collecting Data for "+ teamList[i]);
          console.log()
          teamPlot(dropDownTeam);
        }  ;
        //else {con;sole.log(0)};
      };
    };
  //call function for selecting year
  selTeam(team)
  
    }
  ) 
};



function optionChanged(year){
  d3.json("https://raw.githubusercontent.com/31573/Dr.John/main/meta_data_inclusive_output.json").then(function(data){
    // ------------------------------------------------------------------
    // YEARLY DATA
    // ------------------------------------------------------------------
    // Initialized arrays
    let locations = [];
    let statuses = [];
    let data2014 = [];
    let data2015 = [];
    let data2016 = [];
    let data2017 = [];
    let data2018 = [];
    let data2019 = [];
    
    let dnf2014 = [];
    let dnf2015 = [];
    let dnf2016 = [];
    let dnf2017 = [];
    let dnf2018 = [];
    let dnf2019 = [];

    // For loop to populate arrays -------------------------------------------------------------------------
    for (let i = 0; i < data.length; i++) {
      let row = data[i];
      locations.push(row.location);
      statuses.push(row.status);

      //All yearly data
      if (row.season === 2014) {data2014.push(row)}
      else if (row.season === 2015) { data2015.push(row) }
      else if (row.season === 2016) { data2016.push(row) }
      else if (row.season === 2017) { data2017.push(row) }
      else if (row.season === 2018) { data2018.push(row) }
      else {data2019.push(row) };

      //DNF Yearly Data
      if (row.status !=="F") {
        if (row.season === 2014) {dnf2014.push(row)}
        else if (row.season === 2015) { dnf2015.push(row) }
        else if (row.season === 2016) { dnf2016.push(row) }
        else if (row.season === 2017) { dnf2017.push(row) }
        else if (row.season === 2018) { dnf2018.push(row) }
        else {dnf2019.push(row) }
      };
    
    };

  
    // ------------------------------------------------------------------
    // DNF PLOT
    // ------------------------------------------------------------------
    function DNF_plot (yearly_data) {
      let locations = [];
      //get location data from yearly data
      for(let i =0;i<yearly_data.length;i++){
        locations.push(yearly_data[i].location)
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
      
      // Create data for the bar graph----------------------------------------------------------------------------------------
      let trace1 = {
        x: Object.keys(counts),
        y: Object.values(counts),
        type: "bar"
      };
    
      // Create data array
      let data_points = [trace1];
    
      // Apply a title to the layout
      let layout = {
        title: "Did Not Finish (DNF) By Location for "+year,
        ylabel:"DNF Count",
        barmode: "group",
        // Include margins in the layout so the x-tick labels display correctly
        margin: {
          l: 50,
          r: 50,
          b: 200,
          t: 50,
          pad: 4
        
      }};
    
      // Render the plot to the div tag with id "plot"
      Plotly.newPlot("DNF_plot", data_points, layout);
    };
    //--------------------------------------------------------------------------------------
    // DRIVER AND TEAM DNFs
    //--------------------------------------------------------------------------------------
    function driverStats(yearly_data) {
      let drivers = [];
      //get location data from yearly data
      for(let i =0;i<yearly_data.length;i++){
        drivers.push(yearly_data[i].name)
      };
      // Initialize an empty object to store counts-----------------------------------------------------------------
      let counts = {};
      
      // Iterate over the locations array
      drivers.forEach(function(driver) {
        // If the location is not already a key in the counts object, initialize it with a count of 1
        if (!counts[driver]) {
            counts[driver] = 1;
        } else {
            // If the location is already a key, increment its count
            counts[driver]++;
        }
      });
        // Create data for the bar graph----------------------------------------------------------------------------------------
        let trace2 = {
          x: Object.keys(counts),
          y: Object.values(counts),
          type: "bar",
          marker: {
            color: 'rgb(251,204,104)',
            opacity: 0.5
          }
        };
  
        // Create data array
        let data_points = [trace2];
  
        // Apply a title to the layout
        let layout = {
          title: "Did Not Finish (DNF) By Driver for "+year,
          ylabel:"DNF Count",
          barmode: "group",

        // Include margins in the layout so the x-tick labels display correctly
          margin: {
          l: 50,
          r: 50,
          b: 200,
          t: 50,
          pad: 4
      
        }};
  
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("driver_plot", data_points, layout);
  };
   
    // ---------------------------------------------------------------
    function teamStats(yearly_data) {
      let teams = [];
      //get location data from yearly data
      for(let i =0;i<yearly_data.length;i++){
        teams.push(yearly_data[i].team)
      };
      // Initialize an empty object to store counts-----------------------------------------------------------------
      let counts = {};
      
      // Iterate over the locations array
      teams.forEach(function(team) {
        // If the location is not already a key in the counts object, initialize it with a count of 1
        if (!counts[team]) {
            counts[team] = 1;
        } else {
            // If the location is already a key, increment its count
            counts[team]++;
        }
    });
    // Create data for the bar graph----------------------------------------------------------------------------------------
    let trace3 = {
      x: Object.keys(counts),
      y: Object.values(counts),
      type: "bar",
      marker: {
        color: 'rgb(158,202,225)' // Specify the color here
      }
    };

    // Create data array
    let data_points = [trace3];

    // Apply a title to the layout
    let layout = {
      title: "Did Not Finish (DNF) By Team for "+year,
      ylabel:"DNF Count",
      barmode: "group",
    // Include margins in the layout so the x-tick labels display correctly
      margin: {
      l: 50,
      r: 50,
      b: 200,
      t: 50,
      pad: 4
  
    }};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("team_plot", data_points, layout);
    };
   
  
    // ------------------------------------------------------------------
    //DROPDOWN YEAR FUNCTION
    // ------------------------------------------------------------------
    // function for matching the year from the dropdown to dataset
    function selYear(dropDownYear){
      let seasonlist=[2014,2015,2016,2017,2018,2019];
      let dnflist = [dnf2014, dnf2015, dnf2016, dnf2017, dnf2018, dnf2019]
      let datasets = [data2014,data2015,data2016,data2017,data2018,data2019];
      for (let i = 0; i<datasets.length ;i++){
        if (dropDownYear === seasons[i]){
          console.log("Collecting Data for "+seasonlist[i]);
          console.log(datasets[i]);
          console.log(dnflist[i]);
        
          DNF_plot(dnflist[i]);
          driverStats(dnflist[i]);
          teamStats(dnflist[i]);
        }
      }
    };
    //call function for selecting year
    selYear(year)
})};

