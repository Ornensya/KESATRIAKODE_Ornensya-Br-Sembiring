const client = require('../../koneksi.js');
const express = require("express");
const port = 3002;
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
app.get('/ambildatauser', (req, res) => {
    client.query('SELECT * FROM pengguna')
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        console.error('Kesalahan saat menjalankan kueri', err);
        res.status(500).json({ error: 'Kesalahan saat menjalankan kueri' });
      });
  });

  app.post('/tambahdatauser', (req, res) => {
    const { nama_pengguna ,username, password } = req.body;
  
 
    const query = {
      text: 'INSERT INTO pengguna (nama_pengguna ,username, password) VALUES ($1, $2, $3)',
      values: [nama_pengguna ,username, password],
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
app.put('/ubahdatauser/:id', (req, res) => {
    const { username, password } = req.body;
    const id_pengguna = req.params.id_pengguna; // Ambil ID barang dari parameter URL
  
    // Lakukan validasi data jika diperlukan
  
    const query = {
      text: 'UPDATE pengguna SET nama_pengguna = $1, username = $2, password = $3 WHERE id_pengguna= $4',
      values: [nama_pengguna ,username, password, id_pengguna],
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

  // Rute untuk menghapus data dalam tabel barang
app.delete('/hapusdatauser/:id', (req, res) => {
  const id_pengguna = req.params.id_pengguna; // Ambil ID barang dari parameter URL

  // Lakukan validasi data jika diperlukan

  const query = {
    text: 'DELETE FROM pengguna WHERE id_pengguna = $1',
    values: [id_pengguna],
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