const express = require('express');
const { adminAuth } = require('../middleware/auth');
const adminController = require('../controller/adminController'); // No destructuring

const router = express.Router();

// Verify the controller methods exist
console.log('Available methods:', Object.keys(adminController));

// Admin routes
router.get('/orders', adminAuth, adminController.getAllOrders);
router.patch('/orders/:id/status', adminAuth, adminController.updateOrderStatus);
router.post('/services', adminAuth, adminController.createService);
router.put('/services/:id', adminAuth, adminController.updateService); // This was failing
router.delete('/services/:id', adminAuth, adminController.deleteService);
router.get('/users', adminAuth, adminController.getAllUsers);

module.exports = router;