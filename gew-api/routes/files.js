var express = require('express');
var router = express.Router();
var multer = require('multer');
var verifyToken = require("../config/auth").verifyToken;

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, `../public/images`);
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });

const upload = multer({
  storage: storage
});

router.post('/', upload.single('newfile'), (req, res) => {
    console.log(req.file)
    res.json("New file added");
});

module.exports = router;