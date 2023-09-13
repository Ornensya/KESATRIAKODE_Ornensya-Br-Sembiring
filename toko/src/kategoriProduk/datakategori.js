const { json } = require('body-parser');
const {
  Router
} = require('express');
const client = require('../../koneksi.js');
const router = Router();

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

  router.post('/tambahkategori', (req, res) => {
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
router.put('/ubahkategori/:id', (req, res) => {
    const { jenis_kategori } = req.body;
    const id_kategori = req.params.id_kategori; // Ambil ID kategori_produk dari parameter URL
  
    // Lakukan validasi data jika diperlukan
  
    const query = {
      text: 'UPDATE kategori_produk SET jenis_kategori = $1 WHERE id_kategori = $2',
      values: [jenis_kategori, id_kategori],
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
router.delete('/hapusdatakategori/:id', (req, res) => {
  const id_kategori = req.params.id_kategori; // Ambil ID kategori_produk dari parameter URL

  // Lakukan validasi data jika diperlukan

  const query = {
    text: 'DELETE FROM kategori_produk WHERE id_kategori = $1',
    values: [id_kategori],
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