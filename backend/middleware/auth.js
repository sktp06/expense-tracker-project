// middleware/auth.js
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1]; //need!!!!
    
    if (!token) return res.status(401).json({ error: 'Access Denied' });
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        console.log("Authenticated User:", req.user);
        next(); //It allows the request to continue if authentication is successful.
    } catch (err) {
        res.status(400).json({ error: 'Invalid Token' });
    }
};
