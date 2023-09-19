const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

  //Read Data Barang
router.get('/barang', async (req, res) => {
const {
  search
} = req.query;
let barang;
if (search) {

  barang = await prisma.barang.findMany({
    select:{
      id:true,
      nama:true,
      harga:true,
      stok:true
    },
    where : {
      nama : {
        startsWith : `%${search}%`,
        mode: 'insensitive'
        // endsWith : `%${search}%`
      }
    },
    orderBy: {
      id:'asc'
    }
  });
}else {
  barang = await prisma.barang.findMany({
    select: {
      id: true,
      nama: true,
      harga: true,
      stok: true
    },
    orderBy: {
      id: 'asc'
    }
  });
}
  const data = barang.map((item) => {
    return{
      id: Number(item.id),
      nama: item.nama,
      harga: Number(item.harga),
      stok: Number(item.stok),
    }
  });

  return res.status(200).json({
    data
  })
});

// Menampilkan data barang berdasarkan ID
router.get('/barang/:id', async (req, res) => {
  const {id} = req.params; // Ambil ID dari parameter URL
  const barang = await prisma.barang.findFirst({
    select:{
      id:true,
      nama:true,
      harga:true,
      stok:true
    },
    where: {
      id:id
    }
  });

  return res.status(200).json({
    data:barang? {
      id: Number(barang.id),
      nama: barang.nama,
      harga: Number(barang.harga),
      stok: Number(barang.stok),
    } : {}
  })
});


  // Create data barang
router.post('/barang', async (req, res) => {
  const {
    nama, 
    harga,
    stok,
  } = req.body;

  await prisma.barang.create({
    data: {
      nama: nama,
      harga: harga,
      stok:stok
    }
  });

  return res.status(200).json({
    message: "Success"
  })
});


// Update Data Barang
router.put('/barang/:id', async (req, res) => {
  const id = parseInt(req.params.id); // Ambil ID dari parameter URL
  const {
    nama,
    harga,
    stok
  } = req.body;

  await prisma.barang.update({
    where: { id: id },
    data: { 
      nama:nama,
      harga:harga,
      stok:stok
    }
  });
  return res.status(200).json({
    message: "Success"
  })
});


//Delete Data Barang
router.delete('/deletebarang/:id', async(req, res) => {
  const id = parseInt(req.params.id); // Ambil ID dari parameter URL
  await prisma.barang.delete({
    where: {
      id: id
    },
  })
  return res.status(200).json({
    message: "Success"
  })
});


module.exports = router;
