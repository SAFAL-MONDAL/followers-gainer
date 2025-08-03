const Order = require('../models/Orders');
const Service = require('../models/Services');
const User = require('../models/User');
const { ApiError } = require('../utils/apiResponse');

// Get all orders (admin view)
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('user service');
    res.status(200).json(orders);
  } catch (err) {
    next(new ApiError(500, 'Failed to fetch orders'));
  }
};

// Update order status
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('service');

    if (!order) {
      throw new ApiError(404, 'Order not found');
    }

    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

// Create a new service (admin-only)
exports.createService = async (req, res, next) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    next(new ApiError(400, 'Failed to create service'));
  }
};

// Delete a service
exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      throw new ApiError(404, 'Service not found');
    }
    res.status(200).json({ message: 'Service deleted' });
  } catch (err) {
    next(err);
  }
};

// Get all users (admin-only)
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, '-password');
    res.status(200).json(users);
  } catch (err) {
    next(new ApiError(500, 'Failed to fetch users'));
  }
};