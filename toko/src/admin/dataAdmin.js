const { json } = require('body-parser');
const { Router} = require('express');
const client = require('../../koneksi.js');
const router = Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = require('../../app.js');

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

  // Endpoint untuk pendaftaran pengguna
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Hash password sebelum menyimpannya di database
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await client.query(
      'INSERT INTO pengguna ( username, password) VALUES ($1, $2) RETURNING id_admin',
      [username, hashedPassword]
    );

    res.status(201).json({ message: 'Pendaftaran Berhasil' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Rute untuk mengedit data dalam tabel barang
router.put('/ubahdataadmin/:id', (req, res) => {
    const { username, password } = req.body;
    const id = req.params.id; // Ambil ID barang dari parameter URL
  
    // Lakukan validasi data jika diperlukan
  
    const query = {
      text: 'UPDATE admin SET username = $1, password = $2 WHERE id_admin = $3',
      values: [username, password, id],
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




// Endpoint untuk login Admin
router.post('/loginadmin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await client.query(
      'SELECT * FROM pengguna WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).send('Invalid credentials');
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ userId: user.id_admin }, 'coba');

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;