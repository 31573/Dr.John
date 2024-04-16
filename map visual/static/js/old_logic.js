// load data from static file as backup to dynamic link via console.log
// console.log(data)

// Creating the map object
let myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 3
});
  
// Adding tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
  
// link to get the earthquakes data
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
// Getting earthquake data
d3.json(link).then(function(data){
    // Loop through the features array, and create one marker for each earthquake object.
    data.features.forEach(function(features) {
        let coordinates = [features.geometry.coordinates[1], features.geometry.coordinates[0]];
        let magnitude = features.properties.mag;
        let depth = features.geometry.coordinates[2];
        let color = getColor(depth);
        
        // Add circles to the map
        L.circle(coordinates, {
            fillOpacity: 0.75,
            color: "white",
            fillColor: color,
            radius: magnitude * 20000 // Adjust the radius based on magnitude
        }).bindPopup(`<h1>${features.properties.title}</h1><hr><h3>Magnitude: ${magnitude}</h3><h3>Depth: ${depth}</h3>`).addTo(myMap);
    });
  
    // Create legend
    let legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {
      let div = L.DomUtil.create('div', 'info legend');
      let grades = [0, 15, 30, 45, 50, 65, 80]; // Depth thresholds
      let colors = ['#ffffff', '#ffff00', '#ffcc00', '#ffa500', '#ff4500', '#ff0000', '#8b0000']; // Corresponding colors
  
      div.innerHTML += '<h3>Earthquake Depth</h3>';
      for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
          '<i style="background:' + colors[i] + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
  
      return div;
    };
    legend.addTo(myMap);
});
  
// Function to determine color based on depth
function getColor(depth) {
    let color = "";
    if (depth > 80) {
        color = "#8b0000";
    } else if (depth > 65) {
      color = "#ff0000";
    } else if (depth > 50) {
      color = "#ff4500";
    } else if (depth > 45) {
      color = "#ffa500";
    } else if (depth > 30) {
      color = "#ffcc00";
    } else if (depth > 15) {
      color = "#ffff00";
    } else {
      color = "#ffffff";
    }
    return color;
}  