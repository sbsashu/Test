let { SECRET } = require("../config")
let jwt = require('jsonwebtoken');

module.exports = {
    Access_Token: async (req, res, next) => {

        if(!req.header('Authorization')) return res.status(401).send({success: false, message: 'Token is not provided'}) 
        
        let token = req.header('Authorization').split(' ')[1];
        try {
             
         if(!token) return res.status(401).send({success: false, message: 'Invalid Token'});

         let user = await jwt.verify(token, SECRET);
         req.user = user.data;

         if(user) {
             next();
         } else {
             return res.status(401).send({success: false, message: 'Invalid Token'});
         }
        } catch (error) {
            console.log('ERROR WHILE TOKEN DECODE', error.message);
            return res.status(500).send({success: false, message: 'Server Error'});
        }
    }
}