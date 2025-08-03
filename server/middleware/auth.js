const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (err) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

const adminAuth = async (req, res, next) => {
    auth(req, res, () => {
        if (!req.user.isAdmin) {
            return res.status(403).send({ error: 'Admin access required.' });
        }
        next();
    });
};

module.exports = { auth, adminAuth };