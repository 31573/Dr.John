const years = [2014, 2015, 2016, 2017, 2018, 2019]

d3.json("data/race_loc_wea_ret.json").then(function(data) {
  console.log('Data:', data);
  console.log(data[0].main)

  variables(data)

// Create a function that collects/passes along the main JSON data and creates the variables.
function variables(all_tracks) {

  // Initialie the variables.

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
        console.log(circle)
        markersGroup.addLayer(circle)
        
}
}
// Define map tiles for each year
let baseMaps = {}

let world = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

// for (i = 0; i < years.length; i++) {
//   baseMaps[years[i]] = tiles
// };

// console.log(baseMaps)

// Create the map variable.
let myMap = L.map("map", {
  center: [43.7347, 7.42056],
  zoom: 7,
  layers: [world] // Initial base map
});

baseMaps.addTo(myMap)

markersGroup = L.layerGroup()
markersGroup.addTo(myMap)

L.control.layers(baseMaps, null, {
  collapsed: false,
}).addTo(myMap);

// Xpert Learning Assistant helped me with the code below:
// Create radio buttons to switch between base maps
var radioButtons = document.getElementsByName('year');
radioButtons.forEach(function(radio) {
  radio.addEventListener('change', function() {
    var selectedYear = this.value;
    map.removeLayer(baseMaps[Object.keys(baseMaps).find(key => key !== selectedYear)]);
    map.addLayer(baseMaps[selectedYear])
    variable_years(selectedYear)
    markersGroup.addTo(myMap);
  });
});
  }})