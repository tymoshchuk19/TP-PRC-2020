var express = require('express');
var router = express.Router();
var Users = require('../controllers/users');
var verifyToken = require("../config/auth").verifyToken;
var jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
    // Mock user
    const user = req.body
    Users.newUser(user)
      .then(user => res.json(user))
      .catch(e => res.status(500).send(`Erro no registro do utilizador ${user.body.name}: ${e}`))
  });
  
router.post('/authenticate', (req, res) => {
    Users.getUser(req.body.username)
        .then(user => {
            if(user && user.password === req.body.password) {
                jwt.sign({ user: req.body }, 'secretkey', { expiresIn: '3000s' }, (err, token) => {
                    res.json({
                        token
                    });
                });
            } else {
                res.jsonp({ msg: 'Credenciais inválidas' })  
            }
        })
        .catch(err => res.jsonp(err));
});

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

module.exports = router;