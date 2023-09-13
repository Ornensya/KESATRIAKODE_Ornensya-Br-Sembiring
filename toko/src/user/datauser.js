const { json } = require('body-parser');
const { Router} = require('express');
const client = require('../../koneksi.js');
const router = Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = require('../../app.js');


// Rute untuk menjalankan kueri ke database
router.get('/ambildatauser', (req, res) => {
    client.query('SELECT * FROM pengguna')
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        console.error('Kesalahan saat menjalankan kueri', err);
        res.status(500).json({ error: 'Kesalahan saat menjalankan kueri' });
      });
  });

  router.post('/tambahdatauser', (req, res) => {
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

// Rute untuk mengedit data dalam tabel pengguna
router.put('/ubahdatauser/:id', (req, res) => {
    const { nama_pengguna, username, password } = req.body;
    const id = req.params.id; // Ambil ID pengguna dari parameter URL
  
    // Lakukan validasi data jika diperlukan
  
    const query = {
      text: 'UPDATE pengguna SET nama_pengguna = $1, username = $2, password = $3 WHERE id_pengguna= $4',
      values: [nama_pengguna,username, password, id],
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

  // Rute untuk menghapus data dalam tabel pengguna
router.delete('/hapusdatauser/:id', (req, res) => {
  const id = req.params.id; // Ambil ID pengguna dari parameter URL

  // Lakukan validasi data jika diperlukan

  const query = {
    text: 'DELETE FROM pengguna WHERE id_pengguna = $1',
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

// Endpoint untuk pendaftaran pengguna
router.post('/register', async (req, res) => {
  const { nama_pengguna, username, password } = req.body;

  // Hash password sebelum menyimpannya di database
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await client.query(
      'INSERT INTO pengguna (nama_pengguna, username, password) VALUES ($1, $2, $3) RETURNING id_pengguna',
      [nama_pengguna, username, hashedPassword]
    );

    const userId = result.rows[0].id;
    const token = jwt.sign({ userId }, 'pelatihan900');

    res.status(201).json({ token });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint untuk login pengguna
router.post('/login', async (req, res) => {
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

    const token = jwt.sign({ userId: user.id_pengguna }, 'pelatihan');

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
});
module.exports = router;