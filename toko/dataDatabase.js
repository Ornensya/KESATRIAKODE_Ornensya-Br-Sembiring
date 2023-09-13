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
  
//   pool.query('SELECT * FROM barang')
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

  app.post('/tambahProduct', (req, res) => {
    const { nama_barang, harga, stok } = req.body;
  
    // Lakukan validasi data jika diperlukan
  
    const query = {
      text: 'INSERT INTO barang (nama_barang, harga, stok) VALUES ($1, $2, $3)',
      values: [nama_barang, harga, stok],
    };
  
    client.query(query)
      .then(() => {
        res.status(201).json({ message: 'Data berhasil ditambahkan' });
      })
      .catch(err => {
        console.error('Kesalahan saat mengimput data', err);
        res.status(500).json({ error: 'Kesalahan saat mengimput data' });
      });
  });

// Rute untuk mengedit data dalam tabel barang
app.put('/ubah Product/:id', (req, res) => {
    const { nama_barang, harga, stok } = req.body;
    const id = req.params.id; // Ambil ID barang dari parameter URL
  
    // Lakukan validasi data jika diperlukan
  
    const query = {
      text: 'UPDATE barang SET nama_barang = $1, harga = $2, stok = $3 WHERE id = $4',
      values: [nama_barang, harga, stok, id],
    };
  
    client.query(query)
      .then(() => {
        res.json({ message: 'Data berhasil diubah' });
      })
      .catch(err => {
        console.error('Kesalahan saat mengedit data', err);
        res.status(500).json({ error: 'Kesalahan saat mengedit data' });
      });
  });
  
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
  
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });