import Joi from 'joi';

 const contactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});

export const createValidationShema = contactSchema.fork(
  ['name', 'phoneNumber', 'contactType'],
  (field) => field.required(),
);

export const updateValidationShema = contactSchema;