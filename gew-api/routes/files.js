var express = require('express');
var router = express.Router();
var multer = require('multer');
var verifyToken = require("../config/auth").verifyToken;

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, `../public/uploads`);
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
  }

  const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

router.post('/', verifyToken, upload.single('newfile'), (req, res) => {
    console.log(req.body)
    res.json("New file added");
});

module.exports = router;