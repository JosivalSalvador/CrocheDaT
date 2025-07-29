
import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  material: Joi.string().min(3).max(100).required(),
  productionTime: Joi.string().min(2).max(50).required(),
  price: Joi.number().precision(2).positive().required(),
  categoryId: Joi.string().uuid().required(),
  photos: Joi.array().items(
    Joi.object({
      title: Joi.string().min(1).required(),
      src: Joi.string().uri().required()
    })
  ).min(1).required()
});


export default schema;