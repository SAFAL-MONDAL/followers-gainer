const Service = require('../models/Services');

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find({ isActive: true });
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json(service);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getServicesByPlatform = async (req, res) => {
    try {
        const services = await Service.find({ 
            platform: req.params.platform,
            isActive: true 
        });
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};