const http = require('http');

const express = require('express');

const app = express(http);

const multer = require('multer');

const path = require('path');

const crypto = require('crypto-js');

import router from './router/web';
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "storage"));
  },
  filename: (req, file, cb) => {
    let name = crypto.MD5(file.fieldname + '-' + Date.now());
    cb(null, name.toString() + path.extname(file.originalname));
  }
});
app.set('view engine', 'pug');
app.set('views', './res/views');
router(app);
app.listen(80);