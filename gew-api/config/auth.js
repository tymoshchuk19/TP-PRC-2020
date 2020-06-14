
// Verify Token
function verifyToken(req, res, next) {
    // Check if bearer is undefined
    if(req.headers['authorization']) {
        // Set the token
        req.token = req.headers['authorization']
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

exports.verifyToken = verifyToken;