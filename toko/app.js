const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParse = require('body-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const barangRouter = require('./src/barang/barang.controller')

const app = express();
app.use(bodyParse.urlencoded({ extended : false}));

app.use(bodyParse.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

function penambahanDuaAngka(angka1, angka2) {
    return angka1 + angka2;
  }
  
  function pengkuadratanAngka1DenganAngka2(angka1, angka2) {
    return angka1 ** angka2;
  }
  
  function operasiDuaAngka(angka1, angka2, fungsiOperasiAngka) {
    const pi = 3.14;
    return fungsiOperasiAngka(angka1, pi);
  }
  
  app.post("/kuadrat", (req, res) => {
    const { angka1, angka2 } = req.body;
    const hasilKali = operasiDuaAngka(
      angka1,
      angka2,
      (angka1, angka2) => angka1 * angka2
    );
    res.json(hasilKali);
  });

// Fungsi callback gerbang logika AND
  function gerbangAnd(value1, value2, callback) {
    const result = value1 && value2;
    callback(result);
  }
  
  // Fungsi callback gerbang logika OR
  function gerbangOr(value1, value2, callback) {
    const result = value1 || value2;
    callback(result);
  }
  
  // Fungsi callback gerbang logika NOT
  function gerbangNot(value, callback) {
    const result = !value;
    callback(result);
  
  }

  app.post("/gerbanglogika", (req, res) => {
    const { value1, value2 } = req.body;
    const hasil = gerbangAnd(
      value1,
      value2,
      (value1, value2) => value1 && value2
    );
    res.json(hasil);
  });
  

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/barang', barangRouter);

module.exports = app;
