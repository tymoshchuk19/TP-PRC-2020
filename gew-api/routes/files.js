var express = require('express');
var router = express.Router();
var multer = require('multer');
var Users = require('../controllers/users');
var verifyToken = require("../config/auth").verifyToken;

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, `./public/images/`);
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });

const upload = multer({
  storage: storage
});

router.post('/',verifyToken ,upload.single('newfile'), async function (req, res) {
    await Users.setProfilePic(req.user.username, req.file.filename)
              .then(data => res.json(data) )
              .catch(e => res.status(500).send(`Erro no update da imagem de perfil de "${req.user.username}": ${e}`))

});

module.exports = router;