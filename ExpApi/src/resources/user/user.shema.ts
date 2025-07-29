import Joi from 'joi';
import { UserTypes } from './user.types';

const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    userTypeId: Joi.string().valid(UserTypes.admin, UserTypes.client).required(),
});

export default schema;