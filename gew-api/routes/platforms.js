var express = require('express');
var router = express.Router();
var Platforms = require('../controllers/platforms');
var verifyToken = require("../config/auth").verifyToken;

router.get('/', verifyToken, async function(req, res, next) {
    Platforms.getPlatforms()
      .then(dados => {
        let arr = []
        dados.forEach(element => {
            arr.push(element.slug)
        });
        res.jsonp(arr)
      })
      .catch(e => res.status(500).send(`Erro na listagem dos generos: ${e}`))
  });

module.exports = router;