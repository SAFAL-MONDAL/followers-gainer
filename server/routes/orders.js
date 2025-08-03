const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { apiLimiter } = require('../middleware/rateLimiter');
const { asyncHandler } = require('../utils/apiResponse');
const { validateOrder } = require('../utils/validation');
const {
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus
} = require('../controller/orderController');

// User routes
router.post('/', auth, apiLimiter, asyncHandler((req, res, next) => {
    const context = {
        minQuantity: req.body.minQuantity,
        maxQuantity: req.body.maxQuantity
    };
    validateOrder(req.body, context);
    next();
}), asyncHandler(createOrder));

router.get('/user', auth, apiLimiter, asyncHandler(getUserOrders));

// Admin routes
router.get('/', auth, apiLimiter, asyncHandler(getAllOrders));
router.patch('/:id/status', auth, apiLimiter, asyncHandler(updateOrderStatus));

module.exports = router;