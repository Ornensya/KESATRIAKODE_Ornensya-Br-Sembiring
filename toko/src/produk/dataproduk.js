const { json } = require('body-parser');
const { Router} = require('express');
const client = require('../../koneksi.js');
const router = Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = require('../../app.js');


// Middleware untuk memeriksa token
async function authenticateToken(req, res, next) {
  const token = req.header('Authorization'); // Anda bisa mengirim token dalam header 'Authorization'
  // const token = req.body.token;

  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak. Token tidak ada.' });
  }

  try {
    // Cek token di database
    const query = 'SELECT * FROM admin WHERE token = $1';
    const result = await client.query(query, [token]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Token tidak valid.' });
    }

    // Jika token valid, izinkan akses
    next();
  } catch (error) {
    console.error('Kesalahan saat memeriksa token:', error);
    res.status(500).json({ message: 'Kesalahan server.' });
  }
}

//   jwt.verify(token, 'coba', (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: 'Akses ditolak. Token tidak valid.' });
//     }
//     req.user = user;
//     console.log(user);
//     next(); // Lanjutkan ke middleware atau handler berikutnya
//   });
// }

// Rute untuk menjalankan kueri ke database
router.get('/ambildataproduk', (req, res) => {
    client.query('SELECT * FROM produk')
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        console.error('Kesalahan saat menjalankan kueri', err);
        res.status(500).json({ error: 'Kesalahan saat menjalankan kueri' });
      });
  });

  router.post('/tambahdataproduk', authenticateToken, (req, res) => {
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
// router.put('/ubahdataproduk/:id', authenticateToken, (req, res) => {
//     const { nama_produk, harga_produk, detail_produk, stok, gambar } = req.body;
//     const id = req.params.id; // Ambil ID produk dari parameter URL
  
//     // Lakukan validasi data jika diperlukan
  
//     const query = {
//       text: 'UPDATE produk SET nama_produk = $1, harga_produk = $2, detail_produk = $3, stok = $4, gambar = $5 WHERE id_produk = $6',
//       values: [nama_produk, harga_produk, detail_produk, stok, gambar, id],
//     };
  
//     client.query(query)
//       .then(() => {
//         res.json({ message: 'Data berhasil diubah' });
//       })
//       .catch(err => {
//         console.error('Kesalahan saat mengedit data', err);
//         res.status(500).json({ error: 'Kesalahan saat mengedit data' });
//       });
//   });

  // Rute untuk menghapus data dalam tabel produk erdasarkan ID
// router.delete('/hapusdataproduk/:id', authenticateToken, (req, res) => {
//   const id = req.params.id; // Ambil ID produk dari parameter URL

//   // Lakukan validasi data jika diperlukan

//   const query = {
//     text: 'DELETE FROM produk WHERE id_produk = $1',
//     values: [id],
//   };

//   client.query(query)
//     .then(() => {
//       res.json({ message: 'Data berhasil dihapus' });
//     })
//     .catch(err => {
//       console.error('Kesalahan saat menghapus data', err);
//       res.status(500).json({ error: 'Kesalahan saat menghapus data' });
//     });
// });


// Rute untuk mengedit data dalam tabel produk
router.put('/ubahdataproduk/:id', authenticateToken, (req, res) => {
  const { nama_produk, harga_produk, detail_produk, stok, gambar } = req.body;
  const id = req.params.id; // Ambil ID produk dari parameter URL

  // Buat fungsi callback untuk mencari ID produk
  const cariProduk = (id, callback) => {
    const query = {
      text: 'SELECT * FROM produk WHERE id_produk = $1',
      values: [id],
    };

    client.query(query)
      .then(result => {
        if (result.rows.length === 0) {
          // Produk tidak ditemukan
          callback(new Error('Produk tidak ditemukan'), null);
        } else {
          // Produk ditemukan, panggil callback dengan hasilnya
          callback(null, result.rows[0]);
        }
      })
      .catch(err => {
        // Handle kesalahan saat mencari produk
        callback(err, null);
      });
  };

  // Panggil fungsi callback untuk mencari produk berdasarkan ID
  cariProduk(id, (err, produk) => {
    if (err) {
      console.error('Kesalahan saat mencari produk', err);
      res.status(500).json({ error: 'Kesalahan saat mencari produk' });
    } else {
      // Lakukan validasi data jika diperlukan
      // Kemudian update data produk
      const queryUpdate = {
        text: 'UPDATE produk SET nama_produk = $1, harga_produk = $2, detail_produk = $3, stok = $4, gambar = $5 WHERE id_produk = $6',
        values: [nama_produk, harga_produk, detail_produk, stok, gambar, id],
      };

      client.query(queryUpdate)
        .then(() => {
          res.json({ message: 'Data berhasil diubah' });
        })
        .catch(err => {
          console.error('Kesalahan saat mengedit data', err);
          res.status(500).json({ error: 'Kesalahan saat mengedit data' });
        });
    }
  });
});


router.delete('/hapusdataproduk/:id', authenticate, (req, res) => {
  const id_produk = req.params.id; // Ambil ID produk dari parameter URL

  Product.findById(id_produk, (err, findData) => {
    if (err) {
      console.error('Kesalahan saat mencari produk', err);
      return res.status(500).json({ error: 'Kesalahan saat mencari produk' });
    }

    if (!findData) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    findData.remove((err) => {
      if (err) {
        console.error('Kesalahan saat menghapus produk', err);
        return res.status(500).json({ error: 'Kesalahan saat menghapus produk' });
      }
      res.json({ message: 'Data berhasil dihapus' });
    });
  });
});

module.exports = router;