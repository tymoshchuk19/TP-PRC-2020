var express = require('express');
var router = express.Router();
var Developers = require('../controllers/developers');

router.get('/', async function(req, res, next) {
    Developers.getDevelopers()
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