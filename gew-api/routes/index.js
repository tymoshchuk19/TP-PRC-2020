var express = require('express');
var router = express.Router();
var Games = require('../controllers/games')


/* GET home page. */
router.get('/', function(req, res, next) {
  Games.getLaunched()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem dos jogos: ${e}`))
});

/* GET home page. */
router.get('/:tab/:page', async function(req, res, next) {
  Games.getPage(req.params.page, req.params.tab)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem da página ${req.params.page}: ${e}`))
});

// router.get('/1/:page', async function(req, res, next) {
//   Games.getPage(req.params.page, 1)
//     .then(dados => res.jsonp(dados))
//     .catch(e => res.status(500).send(`Erro na listagem da página ${req.params.page}: ${e}`))
// });

// router.get('/2/:page', async function(req, res, next) {
//   Games.getPage(req.params.page, 2)
//     .then(dados => res.jsonp(dados))
//     .catch(e => res.status(500).send(`Erro na listagem da página ${req.params.page}: ${e}`))
// });

module.exports = router;
