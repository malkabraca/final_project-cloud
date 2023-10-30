import Joi from "joi";

import validation from "./validation";

const profileSchema = Joi.object({
  firstName: Joi.string().min(2).max(255).required(),
  middleName: Joi.string().min(2).max(255).allow(""),
  lastName: Joi.string().min(2).max(255).required(),
  phone: Joi.string().min(9).max(14).required(),
  email: Joi.string()
  .min(6)
  .max(256)
  .required()
  .email({ tlds: { allow: false } }),
  imageUrl: Joi.string().min(6).max(1024).allow(""),
  imageAlt: Joi.string().min(6).max(256).allow(""),
  state: Joi.string().min(2).max(256).allow(""),
  country: Joi.string().min(2).max(256).required(),
  city: Joi.string().min(2).max(256).required(),
  street: Joi.string().min(2).max(256).required(),
  houseNumber: Joi.string().min(1).max(256).required(),
  zipCode: Joi.number().min(1).max(999999999).allow("").allow(null),
  biz: Joi.boolean(),
});

const validateProfileSchema = (userInput) =>
  validation(profileSchema, userInput);

export default validateProfileSchema;