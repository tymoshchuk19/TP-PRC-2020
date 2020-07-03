var jwt = require('jsonwebtoken');

async function authLogin(user){
    return await jwt.sign({ user: user }, 'secretkey', { expiresIn: '3000s' }); 
}

// Verify Token
function verifyToken(req, res, next) {
    // Check if bearer is undefined
    if(req.headers['authorization']) {
        // Set the token
        req.token = req.headers['authorization']
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if(err) {
                res.sendStatus(403);
            } else {
                res.json({
                    message: 'Utilizador autenticado!',
                    authData
                });
                // Next middleware
                next();
            }
        });
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

exports.authLogin = authLogin;
exports.verifyToken = verifyToken;