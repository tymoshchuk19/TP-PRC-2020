var express = require('express');
var router = express.Router();
var Games = require('../controllers/games');
var qs = require('querystring')


/* GET home page. */
// router.get('/', function(req, res, next) {
//   Games.getLaunched()
//     .then(dados => res.jsonp(dados))
//     .catch(e => res.status(500).send(`Erro na listagem dos jogos: ${e}`))
// });

router.get('/:name', async function(req, res, next) {
  Games.getGames(decodeURIComponent(req.params.name))
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(e => res.status(500).send(`Erro na listagem da página ${req.params.page}: ${e}`))
})

/* GET filtered page. */
router.get('/:tab/:page', async function(req, res, next) {
  Games.getPage(parseInt(req.params.page), req.params.tab, req.query)
    .then(async (dados) => {
      res.jsonp(dados)
    })
    .catch(e => res.status(500).send(`Erro na listagem da página ${req.params.page}: ${e}`))
});

module.exports = router;
