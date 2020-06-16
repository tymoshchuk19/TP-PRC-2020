var express = require('express');
var router = express.Router();
var Games = require('../controllers/games');


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
});

/*GET filtered page. */
router.get('/:tab/:page/:filter/:fValue', async function(req, res, next) {
  Games.getFilterPage(parseInt(req.params.page), req.params.tab, req.params.filter, req.params.fValue)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem da página ${req.params.page}: ${e}`))
});

/* GET home page. */
router.get('/:tab/:page', async function(req, res, next) {
  Games.getPage(parseInt(req.params.page), req.params.tab)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem da página ${req.params.page}: ${e}`))
});

module.exports = router;
