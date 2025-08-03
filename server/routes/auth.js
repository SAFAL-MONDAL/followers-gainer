// server/routes/auth.js
const express = require('express');
const authController = require('../controller/authController'); // No destructuring

const router = express.Router();

// Debug to check available methods
console.log('Auth methods:', Object.keys(authController));

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh-token', authController.refreshToken);

module.exports = router;