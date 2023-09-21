const express = require("express");
const { route } = require("./users");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { body, validationResult } = require("express-validator");
const prisma = new PrismaClient();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/barang", async (req, res) => {
  const judul = "shdjadjhjashjda";
  const barang = await prisma.barang.findMany({
    select: {
      id: true,
      nama: true,
      stok: true,
      harga: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  res.render("barang", {
    judul,
    barang,
    success: req.flash("success"),
  });
});

// Tambah barang
router.get("/barang/tambah", async (req, res) => {
  res.render("tambahbarang", {
    error: req.flash("error"),
  });
}); // Render halaman tambahbarang.ejs

router.post(
  "/barang/tambah",
  body("nama").notEmpty().withMessage("nama wajib diisi"),
  body("harga")
    .notEmpty()
    .withMessage("harga wajib diisi")
    .isInt()
    .withMessage("harga harus bertipe angka"),
  body("stok")
    .notEmpty()
    .withMessage("stok wajib diisi")
    .isInt()
    .withMessage("stok harus bertipe angka"),
  async (req, res) => {
    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
      req.flash("error", validationError.array());
      return res.redirect("/barang/tambah");
    }
    const { nama, harga, stok } = req.body;

    // Mengonversi harga dan stok menjadi angka (number)
    const hargaNumber = parseFloat(harga);
    const stokNumber = parseInt(stok);

    await prisma.barang.create({
      data: {
        nama: nama,
        harga: hargaNumber,
        stok: stokNumber,
      },
    });

    req.flash("success", "Berhasil Menambah Data");
    return res.redirect("/barang");
  }
);
// });

// Edit barang - Render the editbarang.ejs template
router.get("/barang/edit/:id", async (req, res) => {
  const itemId = req.params.id;
  const itemToEdit = await prisma.barang.findUnique({
    where: { id: parseInt(itemId) },
  });
  res.render("editbarang", { 
    item: itemToEdit,
  error: req.flash("error")
});
});

// Route untuk mengedit data barang berdasarkan ID
router.post(
  "/barang/edit/:id",
  body("nama").notEmpty().withMessage("nama wajib diisi"),
  body("harga")
    .notEmpty()
    .withMessage("harga wajib diisi")
    .isInt()
    .withMessage("harga harus bertipe angka"),
  body("stok")
    .notEmpty()
    .withMessage("stok wajib diisi")
    .isInt()
    .withMessage("stok harus bertipe angka"),
  async (req, res) => {
    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
      req.flash("error", validationError.array());
      return res.redirect("/barang/edit/"+req.params.id);
    }
    // console.log("Update barang route reached");
    const { id } = req.params; // Mengambil ID dari parameter URL
    const { nama, harga, stok } = req.body; // Mengambil data yang akan diubah dari permintaan

    await prisma.barang.update({
      where: { id: parseInt(id) }, // Menggunakan parseInt karena ID biasanya berupa angka
      data: {
        nama,
        harga: Number(harga),
        stok: Number(stok),
      },
    });
    req.flash("success", "Berhasil Mengubah Data");
    res.redirect("/barang");
  }
);

// Route untuk menghapus data barang berdasarkan ID
router.get("/barang/hapus/:id", async (req, res) => {
  const itemId = req.params.id;

  try {
    // Hapus data barang berdasarkan ID
    await prisma.barang.delete({
      where: { id: parseInt(itemId) },
    });

    req.flash("success", "Data berhasil dihapus");
  } catch (error) {
    req.flash("error", "Gagal menghapus data");
  }

  res.redirect("/barang");
});

router.get("/barang", async (req, res) => {
  // const judul = "shdjadjhjashjda";
  // let barang;

  // Mengambil kata kunci pencarian dari query string jika ada
  const keyword = req.query.keyword;

  if (keyword) {
    // Jika ada kata kunci pencarian, lakukan pencarian berdasarkan nama barang
    barang = await prisma.barang.findMany({
      where: {
        nama: {
          contains: keyword, // Melakukan pencarian berdasarkan nama barang yang mengandung kata kunci
        },
      },
      select: {
        id: true,
        nama: true,
        stok: true,
        harga: true,
      },
      orderBy: {
        id: "asc",
      },
    });
  } else {
    // Jika tidak ada kata kunci pencarian, tampilkan semua barang
    barang = await prisma.barang.findMany({
      select: {
        id: true,
        nama: true,
        stok: true,
        harga: true,
      },
      orderBy: {
        id: "asc",
      },
    });
  }

  res.render("barang", {
    judul,
    barang,
    success: req.flash("success"),
  });
});


module.exports = router;
