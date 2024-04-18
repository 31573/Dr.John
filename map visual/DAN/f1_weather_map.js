d3.json("data/race_loc_wea_ret.json").then(function(data) {
  console.log('Data:', data);
  console.log(data[0].main)

  variables(data)

// Create a function that collects/passes along the main JSON data and creates the variables.
function variables(all_tracks) {

  // Initialie the variables.
  let years = [2014, 2015, 2016, 2017, 2018, 2019]

  let lat = []
  let lon = []
  let locality = []
  let country = []
  let temp = []
  let description = []
  let season = []
  let date = []

  let season_2014 = []
  let season_2015 = []
  let season_2016 = []
  let season_2017 = []
  let season_2018 = []
  let season_2019 = []
  //Log the last variable to check it.
  console.log(lat)

  // Loop through the data to create the variables.
  function variable_years(year) {
    const tracks = all_tracks.filter(track => track.season == year)
    console.log(tracks);
    // if (tracks[0].season == year) {
      for (let i = 0; i < tracks.length; i++) {
        lat = tracks[i].lat
        lon = tracks[i].long
        locality = tracks[i].locality
        country = tracks[i].country
        temp = tracks[i].temp
        description = tracks[i].description
        season = tracks[i].season
        date = tracks[i].date

        // While still in the for loop, create the circle markers for each entry.
        var circle = (L.circleMarker([lat, lon], {
        fillOpacity: 0.85,
        color: 'black',
        weight: 0.25,
        // Make the fill color correspond to the depth using a function we'll create below.
        fillColor: 'red',
        // Make the marker size correspond to the magnitude using a function we'll create below.
        radius: 5
        }).bindPopup(`<h3>${locality}, ${country}</h3> <hr> <h4>Season: ${season}<br>Date: ${date}<br>Weather: ${description}<br>Temperature: ${temp} F</h4>`)
        )

        if (year == 2014) {
          season_2014.push(circle)
        }
        else if (year == 2015) {
          season_2015.push(circle)
        }
        else if (year == 2016) {
          season_2016.push(circle)
        }
        else if (year == 2017) {
          season_2017.push(circle)
        }
        else if (year == 2018) {
          season_2018.push(circle)
        }
        else if (year == 2019) (
          season_2019.push(circle)
        )
      }
    // }
  }

variable_years(2014)
variable_years(2015)
variable_years(2016)
variable_years(2017)
variable_years(2018)
variable_years(2019)

// console.log(season_2014)
// console.log(season_2015)

let season_2014_markers = L.layerGroup(season_2014)
let season_2015_markers = L.layerGroup(season_2015)
let season_2016_markers = L.layerGroup(season_2016)
let season_2017_markers = L.layerGroup(season_2017)
let season_2018_markers = L.layerGroup(season_2018)
let season_2019_markers = L.layerGroup(season_2019)

// let baseMaps = {
//   '2014 season': season_2014_markers,
//   '2015 season': season_2015_markers,
//   '2016 season': season_2016_markers,
//   '2017 season': season_2017_markers,
//   '2018 season': season_2018_markers,
//   '2019 season': season_2019_markers
// };

// Define map tiles for each year
var baseMaps = {
  "2014": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}),
  "2015": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}),
  "2016": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}),
  "2017": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}),
  "2018": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}),
  "2019": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
};

// Create radio buttons to switch between base maps
var radioButtons = document.getElementsByName('year');
radioButtons.forEach(function(radio) {
  radio.addEventListener('change', function() {
    var selectedYear = this.value;
    map.removeLayer(baseMaps[Object.keys(baseMaps).find(key => key !== selectedYear)]);
    map.addLayer(baseMaps[selectedYear]);
  });
});

// Create the map variable.
let myMap = L.map("map", {
  center: [43.7347, 7.42056],
  zoom: 7,
  layers: [baseMaps["2014"]] // Initial base map
});


L.control.layers(baseMaps, {
  collapsed: false,
}).addTo(myMap);

}
//   // Create the function to associate the color with the depth.
//   function colorDepth(d) {
//     let colors = ['#ffffb2','#fed976','#feb24c','#fd8d3c','#fc4e2a','#e31a1c','#b10026']

//     if (d <= 10) {
//       return colors[0]
//     }
//     else if (d <= 30) {
//       return colors[1]
//     }
//     else if (d <= 50) {
//       return colors[2]
//     }
//     else if (d <= 70) {
//       return colors[3]
//     }
//     else if (d <= 90) {
//       return colors[4]
//     }
//     else return colors[5]
//   };

//   // Create the function to associate the marker size with the magnitude.
//   // Note that some magnitudes may be 0, missing, or even negative, and trying to get a square root of those will result in an error.
//   function markerSize(arg) {
//     if (arg > 0) {
//       return (Math.sqrt(arg) * 8)
//     }
//     else if (arg < 0) {
//       let pos = arg * -1
//       return (Math.sqrt(pos) * 1)
//     }
//     else if (arg == 0) {
//       return 0.00001
//     }
//   };

//   // Create the function for the legend.
//   function mapLegend(map) {
//     // The code below comes from Leaflet's tutorial on making a choropleth map.
//     var legend = L.control({position: 'bottomright'});

//     legend.onAdd = function(map) {
//     var div = L.DomUtil.create('div', 'legend')
//         // Set the grades to match the majority of the depth data.
//         grades = [-10, 10, 30, 50, 70, 90],
//         labels = [];

//     // Loop through the grades and generate a label with a colored square for each grade.
//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//         '<i style="background:' + colorDepth(grades[i] + 1) + '"></i> ' +
//         grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//     }

//     return div;
//     };

//     legend.addTo(map);
//   };

// // Run the map legend function.
// mapLegend(myMap);

});