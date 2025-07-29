import Joi from 'joi';

const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
});

export default schema;
