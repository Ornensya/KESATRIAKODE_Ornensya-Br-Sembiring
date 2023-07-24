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

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/barang', barangRouter);

module.exports = app;
