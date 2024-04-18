const years = [2014, 2015, 2016, 2017, 2018, 2019]

// Define map tiles for each year
let baseMaps = {}

let tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

for (i = 0; i < years.length; i++) {
  baseMaps[years[i]] = tiles
};

console.log(baseMaps) 
  
// for (i = 0; i < years.length; i++) {
//   overlays = {
//     [`Season ${years[i]}:`]: markersGroup}
//   }

let markersGroup = L.layerGroup()

d3.json("./data/race_loc_wea_ret.json").then(function(data) {
  console.log('Data:', data);

  for (i = 0; i < years.length; i++) {
    var tracks = data.filter(track => track.season == years[i])
  }
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
      circle.addTo(markersGroup)}
      markersGroup.addTo(myMap)
   })

  // Create the map variable.
  let myMap = L.map("map", {
    center: [43.7347, 7.42056],
    zoom: 7,
    layers: [baseMaps['2014']] // Initial base map
  });

  // markersGroup.addTo(myMap)

  L.control.layers(baseMaps, null, {
    collapsed: false,
  }).addTo(myMap);

  // Xpert Learning Assistant helped me with the code below:
  // Create radio buttons to switch between base maps
  // var radioButtons = years.forEach;
  // radioButtons.forEach(function(radio) {
  //   radio.addEventListener('change', function() {
  //     var selectedYear = this.value;
  //     console.log(selectedYear)
  //     map.removeLayer(baseMaps[Object.keys(baseMaps).find(key => key !== selectedYear)]);
  //     map.addLayer(baseMaps[selectedYear])
  //     // variable_years(selectedYear)
  //     markersGroup.addTo(myMap)
  //     console.log(markersGroup);
  //   });
  ;