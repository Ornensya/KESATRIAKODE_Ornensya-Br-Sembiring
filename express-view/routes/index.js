const express = require('express');
const router = express.Router();
const { PrismaClient } = require ('@prisma/client');
const prisma = new PrismaClient();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/barang', async (req, res) => {
  const judul = "barang yang akan ditampilkan";
  const iniArray = ["buku", "pulpen", "spidol"];
  const barang = await prisma.barang.findMany({
    select: {
      id : true,
      nama : true,
      stok : true,
      harga : true
    }
  });
  res.render('barang', {
    judul,
    iniArray,
    barang
  });
});

// Tambah barang
router.get('/tambahbarang', async (req, res) => {
  res.render('tambahbarang'); // Render halaman tambahbarang.ejs


router.post('/tambahbarang', async (req, res) => {
  const { nama, harga, stok } = req.body;
  
  // Mengonversi harga dan stok menjadi angka (number)
  const hargaNumber = parseFloat(harga);
  const stokNumber = parseInt(stok);

  await prisma.barang.create({
    data: {
      nama: nama,
      harga: hargaNumber,
      stok: stokNumber
    }
  });

  return res.status(200).json({
    message: "Data barang berhasil ditambahkan"
  });
});
});

module.exports = router;
