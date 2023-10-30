import Joi from "joi";

import validation from "./validation";

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  phone: Joi.string().min(9).max(14).required(),
  email: Joi.string()
    .min(6)
    .max(256)
    .required()
    .email({ tlds: { allow: false } }),
    message: Joi.string().min(2).max(1024).required(),
});

const validateContactSchema = (userInput) =>
  validation(contactSchema, userInput);

export default validateContactSchema;
