
import Joi from 'joi';

const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    price: Joi.number().required(),
    stockQuantity: Joi.number().integer().required()
});

export default schema;