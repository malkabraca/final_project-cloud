import Joi from "joi";

import validation from "./validation";

const createValidation = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  imageUrl: Joi.string().min(6).max(2000).required(),
  imageAlt: Joi.string().min(2).max(256).required(),
  price: Joi.number().min(1).required(),
  category:Joi.string().min(2).max(256).required(),
  bizNumber: Joi.number().min(1000000).max(9999999).allow(""),
});
const validateCreateSchema = (userInput) =>
  validation(createValidation, userInput);

export default validateCreateSchema;
