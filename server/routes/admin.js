const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();
const { adminAuth } = require('../middleware/auth');
const {
  getAllOrders,
  updateOrderStatus,
  createService,
  updateService,
  deleteService,
  getAllUsers
} = require('../controller/adminController');

// Admin-only routes
router.get('/orders', adminAuth, getAllOrders);
router.patch('/orders/:id/status', adminAuth, updateOrderStatus);
router.post('/services', adminAuth, createService);
router.put('/services/:id', adminAuth, updateService);
router.delete('/services/:id', adminAuth, deleteService);
router.get('/users', adminAuth, getAllUsers);

module.exports = router;