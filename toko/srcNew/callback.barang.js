const client = require('../koneksiCallback.js');
const express = require("express");
const port = 3001;
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
  
client.connect(handleError);

function handleError(error) {
  if (error) {
    console.error('Error connecting to database: ' + error);
  }
}

// Rute untuk menjalankan kueri ke database
app.get('/ambilData', (req, res) => {
    client.query('SELECT * FROM barang', (err, result) => {
      if (err) {
        console.error('Kesalahan saat menjalankan kueri', err);
        res.status(500).json({ error: 'Kesalahan saat menjalankan kueri' });
      } else {
        res.json(result.rows);
      }
    });
  });

// Rute untuk menjalankan neambah data produk ke database
app.post('/addData', (req, res) => {
    const { nama_barang, harga, stok } = req.body;

    const query = {
      text: 'INSERT INTO barang (nama_barang, harga, stok) VALUES ($1, $2, $3)',
      values: [nama_barang, harga, stok],
    };
  
    client.query(query, (err) => {
      if (err) {
        console.error('Kesalahan saat mengimput data', err);
        res.status(500).json({ error: 'Kesalahan saat mengimput data' });
      } else {
        res.status(201).json({ message: 'Data berhasil ditambahkan' });
      }
    });
  });
  
// Rute untuk mengedit data produk berdasarkan id produk
app.put('/editData/:id', (req, res) => {
  const { nama_barang, harga, stok } = req.body;
  const id = req.params.id; // Ambil ID produk dari parameter URL

  const query = {
    text: 'UPDATE barang SET nama_barang = $1, harga = $2, stok = $3 WHERE id = $4',
    values: [nama_barang, harga, stok, id],
  };

  client.query(query, (err) => {
    if (err) {
      console.error('Kesalahan saat mengedit data', err);
      res.status(500).json({ error: 'Kesalahan saat mengedit data' });
    } else {
      res.json({ message: 'Data berhasil diubah' });
    }
  });
});

// Rute untuk menghapus data dalam tabel barang berdasarkan ID
app.delete('/hapusData/:id', (req, res) => {
    const id = req.params.id; // Ambil ID barang dari parameter URL
  
    const query = {
      text: 'DELETE FROM barang WHERE id = $1',
      values: [id],
    };
  
    client.query(query, (err) => {
      if (err) {
        console.error('Kesalahan saat menghapus data', err);
        res.status(500).json({ error: 'Kesalahan saat menghapus data' });
      } else {
        res.json({ message: 'Data berhasil dihapus' });
      }
    });
  });
  

  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});