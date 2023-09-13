const client = require("../../koneksi.js");
const express = require("express");
const port = 3002;
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
client.connect(handleError);

  
function handleError(error){
    if(error) {
      console.error("Error connecting to database: "+ error)
    }
   }
   client.connect(handleError);
  

// Rute untuk menjalankan kueri ke database
app.get('/ambildataproduk', (req, res) => {
    client.query('SELECT * FROM produk')
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        console.error('Kesalahan saat menjalankan kueri', err);
        res.status(500).json({ error: 'Kesalahan saat menjalankan kueri' });
      });
  });

  app.post('/tambahproduk', (req, res) => {
    const { nama_produk, harga_produk, detail_produk, stok, gambar } = req.body;
  
    // Lakukan validasi data jika diperlukan
  
    const query = {
      text: 'INSERT INTO produk (nama_produk, harga_produk, detail_produk, stok, gambar) VALUES ($1, $2, $3, $4, $5)',
      values: [nama_produk, harga_produk, detail_produk, stok, gambar],
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

// Rute untuk mengedit data dalam tabel produk
app.put('/ubahdataproduk/:id', (req, res) => {
    const { nama_produk, harga_produk, detail_produk, stok, gambar } = req.body;
    const id_produk = req.params.id_produk; // Ambil ID produk dari parameter URL
  
    // Lakukan validasi data jika diperlukan
  
    const query = {
      text: 'UPDATE produk SET nama_produk = $1, harga_produk = $2, detail_produk = $3, stok = $4, gambar = $5 WHERE id_produk = $6',
      values: [nama_produk, harga_produk, detail_produk, stok, gambar, id_produk],
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

  // Rute untuk menghapus data dalam tabel produk
app.delete('/hapusproduk/:id', (req, res) => {
  const id_produk = req.params.id_produk; // Ambil ID produk dari parameter URL

  // Lakukan validasi data jika diperlukan

  const query = {
    text: 'DELETE FROM produk WHERE id_produk = $1',
    values: [id_produk],
  };

  client.query(query)
    .then(() => {
      res.json({ message: 'Data berhasil dihapus' });
    })
    .catch(err => {
      console.error('Kesalahan saat menghapus data', err);
      res.status(500).json({ error: 'Kesalahan saat menghapus data' });
    });
});

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });