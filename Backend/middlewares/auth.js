const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config')
 const  authenticator = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log("Full Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("No token or incorrect token format");
        return res.status(403).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    
    console.log("Extracted Token:", token);
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Decoded Token:", decoded);
        
        req.userId = decoded.userId;
        console.log("Set User ID:", req.userId);
        
        next();
    } catch (error) {
        console.error("Token Verification Error:", error);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};


module.exports = authenticator;