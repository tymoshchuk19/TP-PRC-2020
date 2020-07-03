var express = require('express');
var router = express.Router();
var Users = require('../controllers/users');
var verifyToken = require("../config/auth").verifyToken;
var authLogin = require("../config/auth").authLogin;

router.post('/register', (req, res) => {
    // Mock user
    const user = req.body
    Users.newUser(user)
      .then(user => res.json(user))
      .catch(e => res.status(500).send(`Erro no registro do utilizador ${user.name}: ${e}`))
  });
  
router.post('/authenticate', (req, res) => {
    Users.getUser(req.body.username)
        .then(async user => {
            if(user && user.password === req.body.password) {
                token = await authLogin(req.body)
                res.json({
                    user,
                    token
                });
            } else {
                res.jsonp({ msg: 'Credenciais inválidas' })  
            }
        })
        .catch(err => res.jsonp(err));
});

<<<<<<< HEAD
router.get('/authenticated', verifyToken, (req, res) => {  
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Utilizador autenticado!',
                authData
            });
        }
    });
});
=======
router.get('/favorites/:user', verifyToken, (req, res) => {
    Users.getFavorites(req.params.user)
      .then(data => res.json(data))
      .catch(e => res.status(500).send(`Erro na obtenção da lista de favoritos do utilizador "${req.params.user}": ${e}`))
})

router.get('/wishes/:user', verifyToken, (req, res) => {
    Users.getWishes(req.params.user)
      .then(data => res.json(data))
      .catch(e => res.status(500).send(`Erro na obtenção da lista de desejos do utilizador "${req.params.user}": ${e}`))
})
>>>>>>> ee23deba9b6a7181311e421ae6b6e2779df733f7

router.post('/favorites/:user/:game', (req, res) => {
    Users.newFavorite(req.params.user, req.params.game)
      .then(data => res.json(data))
      .catch(e => res.status(500).send(`Erro na adição à lista de favoritos do utilizador "${req.params.user}": ${e}`))
})

router.post('/wishes/:user/:game', (req, res) => {
    Users.newWish(req.params.user, req.params.game)
      .then(data => res.json(data))
      .catch(e => res.status(500).send(`Erro na adição à lista de desejos do utilizador "${req.params.user}": ${e}`))
})


router.get('/:username', (req, res) => {
    Users.getUser(req.params.username)
    .then(data => res.json(data))
    .catch(e => res.status(500).send(`Erro na obtenção do utilizador "${req.params.username}": ${e}`))
})

module.exports = router;