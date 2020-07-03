var express = require('express');
var router = express.Router();
var Genres = require('../controllers/genres');
var verifyToken = require("../config/auth").verifyToken;

router.get('/', verifyToken, async function(req, res, next) {
    Genres.getGenres()
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