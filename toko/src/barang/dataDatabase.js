const { json } = require('body-parser');
const {
  Router
} = require('express');
const client = require('../../koneksi.js');
const router = Router();
  

// Rute untuk menjalankan kueri ke database
router.get('/ambildatabarang', (req, res) => {
    pool.query('SELECT * FROM barang')
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        console.error('Kesalahan saat menjalankan kueri', err);
        res.status(500).json({ error: 'Kesalahan saat menjalankan kueri' });
      });
  });

  router.post('/tambahProduct', (req, res) => {
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
router.put('/ubah Product/:id', (req, res) => {
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
router.delete('/hapusData/:id', (req, res) => {
  const id = req.params.id; // Ambil ID barang dari parameter URL

  // Lakukan validasi data jika diperlukan

  const query = {
    text: 'DELETE FROM barang WHERE id = $1',
    values: [id],
  };

  pool.query(query)
    .then(() => {
      res.json({ message: 'Data berhasil dihapus' });
    })
    .catch(err => {
      console.error('Kesalahan saat menghapus data', err);
      res.status(500).json({ error: 'Kesalahan saat menghapus data' });
    });
});


module.exports = router;