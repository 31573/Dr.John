let seasons=["2014","2015","2016","2017","2018","2019"];

function optionChanged(year){
  d3.json("meta_data_inclusive_output.json").then(function(data){
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


    // For loop to populate arrays -------------------------------------------------------------------------
    for (let i = 0; i < data.length; i++) {
      let row = data[i];
      locations.push(row.location);
      statuses.push(row.status);
      if (row.season === 2014) {data2014.push(row)}
      else if (row.season === 2015) { data2015.push(row) }
      else if (row.season === 2016) { data2016.push(row) }
      else if (row.season === 2017) { data2017.push(row) }
      else if (row.season === 2018) { data2018.push(row) }
      else {data2019.push(row) }
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
    };


    // ------------------------------------------------------------------
    //DROPDOWN YEAR FUNCTION
    // ------------------------------------------------------------------
    // function for matching the year from the dropdown to dataset
    function selYear(dropDownYear){
      let seasonlist=[2014,2015,2016,2017,2018,2019];
      let datasets = [data2014,data2015,data2016,data2017,data2018,data2019];
      for (let i = 0; i<datasets.length ;i++){
        if (dropDownYear === seasons[i]){
          console.log("Collecting Data for "+seasonlist[i]);
          console.log(datasets[i]);
        
          DNF_plot(datasets[i]);
        }
      }
    };
    //call function for selecting year
    selYear(year)
})};