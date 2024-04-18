function charts(year) {
  d3.json("./data/race_loc_wea_ret.json").then(function(data) {
    console.log('Data:', data);
    console.log('Season:', data[0].season)
    
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
    let accidents = []
    let failures = []
    let driver_id = []

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
        status.push(data[i].status)
        accidents.push(data[i].accidents)
        failures.push(data[i].failures) 
        driver_id.push(data[i].driver_id)
        
      };
    };

  // Check to see if you pulled the data correctly.
  console.log('weather:', main);
  console.log('temperature:', temp);
  console.log('name:', name);
  console.log('locality:', locality);
  console.log('status:', status);
  console.log('accidents:', accidents);
  console.log('failures:', failures);

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
      current_location = locality[i]
      // console.log('locality[i]:', locality[i], 'row:', i)
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

  // locality_list = []
  // current_location = null
  // previous_location = null
  // for (let i = 0; i < locality.length; i++) {
  //   current_location = data[i].locality
  //   if (previous_location == current_location) {
  //     console.log('Already captured')
  //   }
  //   else {
  //   locality_list.push(data[i].locality)
  //   } 
  //   previous_location = current_location
  // }

  // console.log('locality_list:', locality_list);
  
  let locality_array = array(locality)
  console.log('locality_array:',  locality_array)

  let country_array = array(country)
  console.log('country_array:', country_array)

  let main_array = array(main)
  console.log('main_array:', main_array)

  // Create a new array with corresponding values from the object.
  // Xpert Learning Assistant helped me with this code.
  let y_values = main_array.map(value => weather_descriptions[value]);
  console.log(y_values);

  // Xpert Learning Assistant helped me with this but I promise I was like 90% there.
  function count() {
    let dict = {};
    let current_location = null;
    let previous_location = null;
    for (let i = 0; i < status.length; i++) {
        current_location = locality[i];
        if (current_location !== previous_location) {
            dict[current_location] = 0; // Reset the counter when encountering a new location
        }
        if (status[i] === 'DNF') {
            dict[current_location]++; // Increment the counter for the location
        }
        previous_location = current_location;
    }
    return dict;
  }

  let DNF_count = count()
  console.log(DNF_count)

  // function accident_failure_counts() {
  //   let accidict = {};
  //   let failure_dict = {}
  //   let current_location = null;
  //   let previous_location = null;
  //   for (let i = 0; i < accidents.length; i++) {
  //       current_location = locality[i];
  //       if (current_location !== previous_location) {
  //           accidict[current_location] = 0 // Reset the counter when encountering a new location
  //           failure_dict[current_location] = 0;
  //       }
  //       else {
  //           accidict[current_location]++ // Increment the counter for the location
  //           failure_dict[current_location]++
  //       }
  //       previous_location = current_location;
  //   }
  //   return accidict;
  //   return failure_dict;
  // }

  function accident_failure_counts() {
    let accidict = {};
    let failure_dict = {};
    let current_location = null;
    let previous_location = null;
    let previous_driver = 0
    let current_driver = 0
    let failure_count = 0
    for (let i = 0; i < locality.length; i++) {
        current_location = locality[i];
        current_driver = driver_id[i];
        if (current_location !== previous_location && previous_driver != current_driver) {
            accidict[current_location] = 0; // Reset the counter when encountering a new location
            failure_dict[current_location] = 0;
        }
        else {
            accidict[current_location] = accidents[i]++; // Increment the counter for the location
            failure_dict[current_location] = failures[i]++;
        }

        previous_location = current_location;
    }
  return {accidict, failure_dict};
}

  console.log(accident_failure_counts());

  // Build the bar graph using the above variables.
  let traceBar1 = {
    x: locality_array,
    y: (Object.values(DNF_count)),
    // z: 0,
    type: 'bar', 
    opacity: 0.5, 
    orientation: 'v',
    name: 'DNFs'
  };
  let traceBar2 = {
    x: locality_array,
    y: y_values,
    // z: 100,
    name: 'Weather',
    type: 'scatter',
    mode: 'markers',
    yaxis: 'y2',
    marker: {
      color: 'black',
      opacity: 1,
      symbol: 'circle',
      size: 16
    }
  };
  let dataBarInit = [traceBar1, traceBar2];
  // Apply a title to the layout.
  let layoutBar = {
    title: 'Weather and finish status at each race location per season',
    xaxis: {showline: false},
    yaxis: {
      title: 'DNFs',
      titlefont: {color: '#ffbe85'},
      tickfont: {color: '#ffbe85'},
      side: 'right',
      showticklabels: true,
      showline: false,
      showgrid: false,
    },
    yaxis2: {
      showticklabels: true,
      tickmode: 'array',
      tickvals: [0, 1, 2, 3, 4, 5],
      ticktext: ['Clear', 'Clouds', 'Haze', 'Mist', 'Rain', 'Thunderstorm'],
      title: 'Weather type',
      overlaying: 'y',
      showline: false,
      zeroline: false
    },
    margin: {
      l: 100,
      r: 0,
      t: 100,
      b: 100}
    };
  Plotly.newPlot("bar", dataBarInit, layoutBar);
  Plotly.moveTraces('bar', 0)
})}


// Create a function for the optionChanged function from
// the HTML file. This function takes the input from the
// eventual dropdown and runs it through the functions above.
function optionChanged(change) {
charts(change);
};

// Create a function that will initiatlize the whole page
// and the run the functions above.
function init() {
d3.json("data/race_loc_wea_ret.json").then(function(data) {

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

