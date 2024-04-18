// Ensure that the DOM content is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function() {

  // Load the JSON data using d3.json
  d3.json("data/race_loc_wea_ret.json").then(function(data) {
      console.log('Data:', data);
      
      // Call the createMap function with the loaded data
      createMap(data);
  });

  // Define the createMap function
  function createMap(data) {
      // Initialize an empty object to store markers for each season
      let seasonMarkers = {};

      // Loop through each entry in the data
      data.forEach(entry => {
          // Extract information from the entry
          let season = entry.season;
          let lat = entry.lat;
          let lon = entry.long;
          let locality = entry.locality;
          let country = entry.country;
          let weather = entry.main;
          let status = entry.status;

          // Check if markers object for the current season exists, if not create it
          if (!seasonMarkers[season]) {
              seasonMarkers[season] = {};
          }

          // Check if a marker exists for the current location, if not create it
          let key = `${lat},${lon}`;
          if (!seasonMarkers[season][key]) {
              // Initialize marker data for the current location
              seasonMarkers[season][key] = {
                  lat: lat,
                  lon: lon,
                  locality: locality,
                  country: country,
                  weather: weather,
                  incidents: 0
              };
          }

          // Update incident count if status is "DNF"
          if (status === "DNF") {
              seasonMarkers[season][key].incidents++;
          }
      });

      // Create overlay layers for each season
      let overlayMaps = {};
      Object.keys(seasonMarkers).forEach(season => {
          let markers = [];
          Object.values(seasonMarkers[season]).forEach(markerData => {
              // Determine marker color based on the number of incidents
              let color = calculateColor(markerData.incidents);
              // Determine marker radius based on the number of incidents
              let radius = calculateRadius(markerData.incidents);
              let popupContent = `<b>Location:</b> ${markerData.locality}, ${markerData.country}<br>`;
              popupContent += `<b>Weather:</b> ${markerData.weather}<br>`;
              popupContent += `<b>Incidents:</b> ${markerData.incidents}<br>`;
              markers.push(L.circleMarker([markerData.lat, markerData.lon], {
                  fillOpacity: 0.75,
                  color: 'black',
                  weight: 0.25,
                  fillColor: color,
                  radius: radius
              }).bindPopup(popupContent));
          });
          overlayMaps[`${season} season`] = L.layerGroup(markers);
      });

      // Add a tile layer to the map
      let world = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });

      // Create the map variable
      let myMap = L.map("map", {
          center: [43.7347, 7.42056],
          zoom: 2,
          layers: [world]
      });

      // Add layer control to the map
      L.control.layers(null, overlayMaps, {
          collapsed: false
      }).addTo(myMap);
  }

  // Function to calculate marker color based on the number of incidents
  function calculateColor(incidents) {
      // Define color gradient based on the number of incidents
      // Modify the gradient as needed
      if (incidents > 5) {
          return '#a30505';
      } else if (incidents > 3) {
          return '#a62929';
      } else if (incidents > 1) {
          return '#bf6363';
      } else {
          return '#cfa1a1';
      }
  }

  // Function to calculate marker radius based on the number of incidents
  function calculateRadius(incidents) {
      // Define a scaling factor for the radius
      // Modify the factor as needed
      let scaleFactor = 10;
      return Math.sqrt(incidents) * scaleFactor;
  }

});
