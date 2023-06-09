const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = function(req,res ,next){
    if(req.method === "OPTIONS"){
        next();
    }
    try {
        let token = req.headers.authorization;
        token = token.replace(/"/g, '');
        if (!token){
            return res.json({
                message:"User not logged",
                headers: req.headers
            })
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({
            message:"Error",
            err
        })
    }
}