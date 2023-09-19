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
router.get('/ambildatakategori', (req, res) => {
    client.query('SELECT * FROM kategori_produk')
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        console.error('Kesalahan saat menjalankan kueri', err);
        res.status(500).json({ error: 'Kesalahan saat menjalankan kueri' });
      });
  });

  router.post('/tambahdatakategori', authenticateToken, (req, res) => {
    const { jenis_kategori} = req.body;
  
    // Lakukan validasi data jika diperlukan
  
    const query = {
      text: 'INSERT INTO kategori_produk (jenis_kategori) VALUES ($1)',
      values: [jenis_kategori],
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

// Rute untuk mengedit data dalam tabel kategori_produk
router.put('/ubahdatakategori/:id', authenticateToken, (req, res) => {
    const { jenis_kategori } = req.body;
    const id = req.params.id; // Ambil ID kategori_produk dari parameter URL
  
    // Lakukan validasi data jika diperlukan
  
    const query = {
      text: 'UPDATE kategori_produk SET jenis_kategori = $1 WHERE id_kategori = $2',
      values: [jenis_kategori, id],
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

  // Rute untuk menghapus data dalam tabel kategori_produk
router.delete('/hapusdatakategori/:id', authenticateToken, (req, res) => {
  const id = req.params.id; // Ambil ID kategori_produk dari parameter URL

  // Lakukan validasi data jika diperlukan

  const query = {
    text: 'DELETE FROM kategori_produk WHERE id_kategori = $1',
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