const pool = require("./koneksi.js");
const express = require("express");
const port = 3000;
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = express();
  
function handleError(error){
    if(error) {
      console.error("Error connecting to database: "+ error)
    }
   }
   pool.connect(handleError);
  
//   pool.query('SELECT * FROM produk')
//     .then(result => {
//       // Lakukan sesuatu dengan hasil kueri di sini
//       console.log(result.rows);
//     })
//     .catch(err => {
//       console.error('Kesalahan saat menjalankan kueri', err);
//     });


// Rute untuk menjalankan kueri ke database
app.get('/ambildata', (req, res) => {
    pool.query('SELECT * FROM barang')
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        console.error('Kesalahan saat menjalankan kueri', err);
        res.status(500).json({ error: 'Kesalahan saat menjalankan kueri' });
      });
  });
  
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });