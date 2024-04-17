function charts(year) {
  d3.json("data/race_location_weather.json").then(function(data) {
    console.log('Weather bar data:', data);
    console.log(data[0].main)

    seasons = [2014, 2015, 2016, 2017, 2018, 2019]
    console.log(seasons)
    
    // Initiatlize variables.
    let main = []
    let description = []
    let country = []
    let locality = []
    let temp = []
    let name = []
    let status = []

    // Create a for loop to run through the data
    // and, if the season row matches the season 
    // from the eventual dropdown, make the variable equal
    // to the specified value from the data.
    for (let i = 0; i < data.length; i++) {
      if (data[i].season == year) {
        // Extract values from each row.
        main.push(data[i].main)
        description.push(data[i].description)
        country.push(data[i].country)
        locality.push(data[i].locality)
        temp.push(data[i].temp)
        name.push(data[i].name)
        
      };
    };
console.log(data.season)

// Initialize an object to store counts of 'DNF' per location per season
const dnfCounts = {};

// Iterate over the data and group by season and location
data.forEach(row => {
  const { season, locality, status } = row;
  console.log(row)
  // Create a key for the group
  const groupKey = `${season}-${locality}`;
  
  // Initialize the count if it doesn't exist
  if (!dnfCounts[groupKey]) {
      dnfCounts[groupKey] = 0;
  }
  console.log(dnfCounts[groupKey])
  // Increment the count if the status is 'DNF'
  if (status === 'DNF') {
      dnfCounts[groupKey]++;
  }
});

// Output the counts
console.log(dnfCounts)

    // Check to see if you pulled the data correctly. 
    // If it doesn't work, it could be that there's
    // no "test" id to check against (yet).
    console.log('weather:', main);
    console.log('temperature:', temp);
    console.log('name:', name);
    console.log('locality:', locality);
    console.log('status:', status);

    weather_descriptions = {
    'Clear': 0,
    'Clouds': 1,
    'Haze': 2,
    'Mist': 3,
    'Rain': 4,
    'Thunderstorm': 5
    }

    console.log(Object.values(weather_descriptions));
    console.log(Object.keys(weather_descriptions));

    function array(arg) {
      list = []
      current_location = null
      previous_location = null
      for (let i = 0; i < arg.length; i++) {
        current_location = data[i].locality
        if (previous_location == current_location) {
          console.log('Already captured')
        }
        else {
        list.push(arg[i])
        } 
        previous_location = current_location
      }
      return list;
    };

      locality_list = []
      current_location = null
      previous_location = null
      for (let i = 0; i < locality.length; i++) {
        current_location = data[i].locality
        if (previous_location == current_location) {
          console.log('Already captured')
        }
        else {
        locality_list.push(data[i].locality)
        } 
        previous_location = current_location
      }

      console.log('locality_list:', locality_list);
      

    let main_array = array(main)
    console.log('main_array:', main_array)

    // Create a new array with corresponding values from the object.
    // Xpert Learning Assistant helped me with this code.
    let y_values = main_array.map(value => weather_descriptions[value]);
    console.log(y_values);
    
    let locality_array = array(locality)
    console.log('locality_array:', locality_array)

    let status_array = array(status)
    console.log('status_array:', status_array)

    let driver_array = array(name)
    console.log(driver_array)

    // Build the bar graph using the above variables.
    let traceBar1 = {
      x: locality_array,
      y: y_values,
      text: description,
      name: 'Weather',
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'rgba(204, 204, 204, 0.95)',
        line: {
          color: 'rgba(217, 217, 217, 1.0)',
          width: 1,
        },
        symbol: 'circle',
        size: 16
      }
    };
    let traceBar2 = {
      x: locality_array,
      y: status_array,
      type: 'bar',  
      orientation: 'v',
      name: 'DNFs',
      yaxis: 'y2',
    };
    let dataBarInit = [traceBar1, traceBar2];
    // Apply a title to the layout.
    let layoutBar = {
      title: 'Weather and finish status at each race location per season',
      xaxis: {},
      yaxis: {
        showticklabels: true,
        tickmode: 'array',
        tickvals: [0, 1, 2, 3, 4, 5],
        ticktext: ['Clear', 'Clouds', 'Haze', 'Mist', 'Rain', 'Thunderstorm'],
        title: 'Weather type'
      },
      yaxis2: {
        title: 'DNFs',
        titlefont: {color: 'rgb(148, 103, 189)'},
        tickfont: {color: 'rgb(148, 103, 189)'},
        overlaying: 'y',
        side: 'right',
        showticklabels: true,
        tickmode: 'array',
        tickvals: [0, 1, 2, 3, 4, 5],
      },
      margin: {
        l: 100,
        r: 0,
        t: 100,
        b: 100}
      };
    Plotly.newPlot("bar", dataBarInit, layoutBar);
  });
};
// Create a function for the optionChanged function from
// the HTML file. This function takes the input from the
// eventual dropdown and runs it through the functions above.
function optionChanged(change) {
  charts(change);
  };

// Create a function that will initiatlize the whole page
// and the run the functions above.
function init() {
  d3.json("data/race_location_weather.json").then(function(data) {

    console.log('Weather bar data:', data);
    
    console.log(data[0].main)

  let seasons = []
  console.log(data[0].season)
  current_season = 0
  previous_season = 0
  for (i=0; i<data.length; i++) {
    current_season = data[i].season
    if (previous_season == current_season) {
      console.log('Already captured')
    }
    else {
      seasons.push(current_season)
    }
    previous_season = current_season
  }

  console.log(seasons)

  // Populate the dropdown menu by looping through
    // the data and pulling the seasons then
    // using D3 to create new option classes under
    // the selDataset id.
    for (let i = 0; i < seasons.length; i++) {
    d3.select('#selDataset')
      .append('option')
      .text(seasons[i])
    };

    // Initiatlize default charts and the metadata card
    // so the page is populated when it opens.
    let initial = seasons[0]
    charts(initial)
  })};

// Run the init function to make everything works.
init();

