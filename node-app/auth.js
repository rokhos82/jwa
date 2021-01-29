const crypto = require('crypto');
const secret = require('./secret.js');
const jwt = require('jsonwebtoken');

function authenticateToken(req,res,next) {
  // Get the jwt access token from the request header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401); // If there is not a token

  jwt.verify(token,secret,(err,user) => {
    console.log(err);
    if(err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function generateAccessToken(username) {
  return jwt.sign(username,secret,{expiresIn: '86400s'});
}
