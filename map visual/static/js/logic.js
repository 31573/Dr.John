// load data from static file as backup to dynamic link via console.log
// console.log(data)

// Creating the map object
let myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 1
});
  
// Adding tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

/*
Define a markerSize() function that will give each city a different radius based on its population.
function markerSize(inputPopulation) {
    return Math.sqrt(inputPopulation) * 50;
  }
*/
  
// link to get the earthquakes data (data= earthquake summary over 7 week period updated every minute)
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// Getting earthquake data
d3.json(link).then(function(data){
    console.log(data)
    let cityMarkers = [];
    // Loop through the features array, and create one marker for each earthquake object.
    for (let i = 0; i < data.features.length; i++) {
        // Conditionals for earthquake deapth of eathquake
        // let greater depth = darker color
        let color = "";
        if (data.features[i].geometry.coordinates[2] > 80) {
            color = "red";
        }
        else if (data.features[i].geometry.coordinates[2] > 65) {
            color = "orangered";
        }
        else if (data.features[i].geometry.coordinates[2] > 50) {
            color = "orange";
        }
        else if (data.features[i].geometry.coordinates[2] > 45) {
            color = "orangeyellow";
        }
        else if (data.features[i].geometry.coordinates[2] > 30) {
            color = "yellow";
        }
        else if (data.features[i].geometry.coordinates[2] > 15) {
            color = "cream";
        }
        else {
            color = "green";
        }


        //console.log(data.features[i].geometry.coordinates.slice(0,2)) 
        //Add circles to the map.
        L.circle(data.features[i].geometry.coordinates.slice(0,2).reverse(), {
            fillOpacity: 0.75,
            color: "white",
            fillColor: color,
            // Adjust the radius.
            radius: (data.features[i].properties.mag)*100000
        }).bindPopup(`${data.features[i].id} Earthquake info: ${data.features[i].properties.title}</h3>`).addTo(myMap);
        
        // cityMarkers.push(
        //     L.marker(data.features[i].geometry.coordinates.slice(0,2)).bindPopup("<h1>" + data.features[i].properties.title + "</h1>")
        // );
        //.bindPopup(`${data.features[i].id} Earthquake info: ${data.features[i].properties.title}</h3>`).addTo(myMap);
    } 

    // Create legend
    let legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {
      let div = L.DomUtil.create('div', 'info legend');
      let grades = [0, 15, 30, 45, 50, 65, 80]; // Depth thresholds
      let colors = ['white', 'cream', 'yellow', '#ffa500', '#ff4500', '#ff0000', '#8b0000']; // Corresponding colors
  
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
