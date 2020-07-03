var express = require('express');
var router = express.Router();
var Games = require('../controllers/games');
var qs = require('querystring')
var verifyToken = require("../config/auth").verifyToken;

/*GET game by slug */
router.get('/:slug', verifyToken, async function(req, res, next) {
  Games.getGame(decodeURIComponent(req.params.slug))
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(e => res.status(500).send(`Erro na obtenção do jogo "${req.params.slug}": ${e}`))
})

/*GET search games by pseudo slug */
router.get('/search/:slug', async function(req, res, next) {
  Games.getSearchGames(decodeURIComponent(req.params.slug))
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(e => res.status(500).send(`Erro na obtenção do jogo "${req.params.slug}": ${e}`))
})

/* GET filtered page. */
router.get('/:tab/:page', verifyToken, async function(req, res, next) {
  Games.getPage(parseInt(req.params.page), req.params.tab, req.query)
    .then(async (dados) => {
      res.jsonp(dados)
    })
    .catch(e => res.status(500).send(`Erro na listagem da página ${req.params.page}: ${e}`))
});

module.exports = router;
