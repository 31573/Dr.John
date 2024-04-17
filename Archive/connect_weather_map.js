// Code from Xpert Learning Assistant and https://www.tothenew.com/blog/connect-to-postgresql-using-javascript/

const { Client } = require('pg');

const connectionString = 'postgres://postgres:postgres@localhost:5432/f1_halo';
const pgClient = new Client({
  connectionString: connectionString
});

pgClient.connect();

pgClient.query('SELECT * from location_weather', (err, res) => {
  if (err) {
    console.error(err);
    pgClient.end();
    return;
  }

  const data_weather_map = res.rows;
  console.log(data_weather_map); // Verify the data

  // Store the data in a JavaScript file
  const fs = require('fs');
  fs.writeFileSync('data_weather_map.js', `const data = ${JSON.stringify(data_weather_map)};`);

  pgClient.end();
});