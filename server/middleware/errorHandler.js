const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    logger.error(err.stack);
    
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            error: Object.values(err.errors).map(val => val.message)
        });
    }
    
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            error: 'Invalid ID format'
        });
    }
    
    res.status(500).json({
        success: false,
        error: 'Server error'
    });
};

module.exports = errorHandler;