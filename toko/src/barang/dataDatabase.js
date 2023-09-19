const { json } = require('body-parser');
const { Router} = require('express');
const client = require('../../koneksi.js');
const router = Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = require('../../app.js');


// Middleware untuk memeriksa token
function authenticateToken(req, res, next) {
  const token = req.header('Authorization'); // Anda bisa mengirim token dalam header 'Authorization'
  // const token = req.body.token;

  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak. Token tidak ada.' });
  }

  jwt.verify(token, 'coba', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Akses ditolak. Token tidak valid.' });
    }
    req.user = user;
    console.log(user);
    next(); // Lanjutkan ke middleware atau handler berikutnya
  });
}

// Rute untuk menjalankan kueri ke database
router.get('/ambildatabarang', (req, res) => {
    client.query('SELECT * FROM barang')
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        console.error('Kesalahan saat menjalankan kueri', err);
        res.status(500).json({ error: 'Kesalahan saat menjalankan kueri' });
      });
  });



  router.post('/tambahdata', authenticateToken, (req, res) => {
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
router.put('/ubahdata/:id', (req, res) => {
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

  // Rute untuk menghapus data dalam tabel barang
router.delete('/hapusdata/:id', (req, res) => {
  const id = req.params.id; // Ambil ID barang dari parameter URL

  // Lakukan validasi data jika diperlukan

  const query = {
    text: 'DELETE FROM barang WHERE id = $1',
    values: [id],
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


module.exports = router;