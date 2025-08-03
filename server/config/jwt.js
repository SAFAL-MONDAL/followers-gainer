const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const generateToken = (userId, isAdmin = false) => {
    return jwt.sign(
        { id: userId, isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '30d' }
    );
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        logger.error(`JWT verification failed: ${err.message}`);
        return null;
    }
};

module.exports = { generateToken, verifyToken };