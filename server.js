const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3306;

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'az001005',
  database: 'test'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

app.get('/facilities', (req, res) => {
  const query = 'SELECT * FROM facilities';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
