// Code from Xpert Learning Assistant and https://www.tothenew.com/blog/connect-to-postgresql-using-javascript/

const { Client } = require('pg');

const connectionString = 'postgres://postgres:postgres@localhost:5432/project_three_db';
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

  const data = res.rows;
  console.log(data); // Verify the data

  // Store the data in a JavaScript file
  const fs = require('fs');
  fs.writeFileSync('data.js', `const data = ${JSON.stringify(data)};`);

  pgClient.end();
});