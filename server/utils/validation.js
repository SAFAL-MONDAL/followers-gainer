const Joi = require('joi');

const serviceValidationSchema = Joi.object({
    platform: Joi.string().valid('YouTube', 'Instagram', 'Facebook', 'TikTok', 'Telegram').required(),
    category: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().allow(''),
    minQuantity: Joi.number().integer().min(1).required(),
    maxQuantity: Joi.number().integer().min(Joi.ref('minQuantity')).required(),
    pricePerUnit: Joi.number().min(0.0001).required(),
    discount: Joi.number().min(0).max(100),
    options: Joi.array().items(
        Joi.object({
            name: Joi.string().required(),
            price: Joi.number().min(0).required()
        })
    ),
    isActive: Joi.boolean()
});

const orderValidationSchema = Joi.object({
    serviceId: Joi.string().hex().length(24).required(),
    quantity: Joi.number().integer().min(Joi.ref('$minQuantity')).max(Joi.ref('$maxQuantity')).required(),
    link: Joi.string().uri().required(),
    options: Joi.array().items(
        Joi.object({
            name: Joi.string().required(),
            price: Joi.number().min(0).required()
        })
    )
});

const validateService = (data) => {
    return serviceValidationSchema.validate(data);
};

const validateOrder = (data, context) => {
    return orderValidationSchema.validate(data, { context });
};

module.exports = { validateService, validateOrder };