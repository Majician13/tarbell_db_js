const sqlite3 = require('sqlite3').verbose();

class DatabaseHelper {
  constructor() {
    console.log('Connecting to the database...');
    this.db = new sqlite3.Database('TarbellIndex.db', (err) => {
      if (err) {
        console.error('Error connecting to the database:', err.message);
      } else {
        console.log('Connected to the database.');
      }
    });
  }

  getAllData() {
    console.log('Fetching all data from the database...');
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM tarbell', (err, rows) => {
        if (err) {
          console.error('Error fetching data:', err.message);
          // Display the error in the UI
          const resultsDiv = document.getElementById('results');
          resultsDiv.innerHTML = `<p>Error fetching data: ${err.message}</p>`;
          reject(err);
        } else {
          console.log('Fetched all data successfully:', rows);
          resolve(rows);
        }
      });
    });
  }

  search(keyword) {
    console.log(`Searching for keyword: ${keyword}`);
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM tarbell
        WHERE TITLE LIKE ? OR DESCRIPTION LIKE ?
      `;

      console.log('SQL Query:', query);
      console.log('Parameters:', [`%${keyword}%`, `%${keyword}%`]);

      this.db.all(query, [`%${keyword}%`, `%${keyword}%`], (err, rows) => {
        if (err) {
          console.error('Error searching:', err.message);
          // Display the error in the UI
          const resultsDiv = document.getElementById('results');
          resultsDiv.innerHTML = `<p>Error searching: ${err.message}</p>`;
          reject(err);
        } else {
          console.log('Search completed successfully:', rows);
          resolve(rows);
        }
      });
    });
  }

  insert(data) {
    console.log('Inserting data:', data);
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO tarbell (ID, TITLE, DESCRIPTION) VALUES (?, ?, ?)',
        [data.ID, data.TITLE, data.DESCRIPTION],
        function (err) {
          if (err) {
            console.error('Error inserting data:', err.message, this);
            // Display the error in the UI (if applicable)
            // You might need to adjust this based on your UI structure
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = `<p>Error inserting data: ${err.message}</p>`;
            reject(err);
          } else {
            console.log('Data inserted successfully with rowid:', this.lastID);
            resolve(this.lastID);
          }
        }
      );
    });
  }
}

module.exports = DatabaseHelper;