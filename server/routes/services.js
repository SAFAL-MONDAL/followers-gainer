const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { apiLimiter } = require('../middleware/rateLimiter');
const { asyncHandler } = require('../utils/apiResponse');
const { validateService } = require('../utils/validation');
const {
    getAllServices,
    getServiceById,
    getServicesByPlatform,
    createService,
    updateService
} = require('../controller/serviceController');

// Public routes
router.get('/', apiLimiter, asyncHandler(getAllServices));
router.get('/:id', apiLimiter, asyncHandler(getServiceById));
router.get('/platform/:platform', apiLimiter, asyncHandler(getServicesByPlatform));

// Admin routes
router.post('/', auth, validateService, asyncHandler(createService));
router.put('/:id', auth, validateService, asyncHandler(updateService));

module.exports = router;