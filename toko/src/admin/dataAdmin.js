const { json } = require('body-parser');
const {
  Router
} = require('express');
const client = require('../../koneksi.js');
const router = Router();

// Rute untuk menjalankan kueri ke database
router.get('/ambildataadmin', (req, res) => {
    client.query('SELECT * FROM admin')
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        console.error('Kesalahan saat menjalankan kueri', err);
        res.status(500).json({ error: 'Kesalahan saat menjalankan kueri' });
      });
  });

  router.post('/tambahdataadmin', (req, res) => {
    const { username, password } = req.body;
  
 
    const query = {
      text: 'INSERT INTO admin (username, password) VALUES ($1, $2)',
      values: [username, password],
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
router.put('/ubahdataadmin/:id', (req, res) => {
    const { username, password } = req.body;
    const id_admin = req.params.id_admin; // Ambil ID barang dari parameter URL
  
    // Lakukan validasi data jika diperlukan
  
    const query = {
      text: 'UPDATE admin SET username = $1, password = $2 WHERE id_admin = $3',
      values: [username, password, id_admin],
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
router.delete('/hapusdataadmin/:id', (req, res) => {
  const id = req.params.id; // Ambil ID barang dari parameter URL

  // Lakukan validasi data jika diperlukan

  const query = {
    text: 'DELETE FROM admin WHERE id_admin = $1',
    values: [id_admin],
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