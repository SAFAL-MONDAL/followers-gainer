const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    platform: {
        type: String,
        required: true,
        enum: ['YouTube', 'Instagram', 'Facebook', 'TikTok', 'Telegram']
    },
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    minQuantity: {
        type: Number,
        required: true
    },
    maxQuantity: {
        type: Number,
        required: true
    },
    pricePerUnit: {
        type: Number,
        required: true
    },
    discount: Number,
    options: [{
        name: String,
        price: Number
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);