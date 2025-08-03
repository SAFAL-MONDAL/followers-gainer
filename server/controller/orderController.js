const Order = require('../models/Orders');
const Service = require('../models/Services');

exports.createOrder = async (req, res) => {
    try {
        const { serviceId, quantity, link, options } = req.body;
        
        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        
        if (quantity < service.minQuantity || quantity > service.maxQuantity) {
            return res.status(400).json({ 
                message: `Quantity must be between ${service.minQuantity} and ${service.maxQuantity}` 
            });
        }
        
        let totalPrice = quantity * service.pricePerUnit;
        if (service.discount) {
            totalPrice = totalPrice * (1 - service.discount / 100);
        }
        
        const order = new Order({
            user: req.user.id,
            service: serviceId,
            quantity,
            link,
            options,
            totalPrice
        });
        
        await order.save();
        
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate('service');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};