import Joi from "joi";

import validation from "./validation";

const ordersValidation = Joi.object({
  name: Joi.string().min(2).max(256).required(),
  phone: Joi.string()
    .regex(new RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)).messages({
      "string.empty": "the phone should not be empty",
      "string.pattern.base":
        "The phone number should contain only numbers and up to 10 digits",
    })
    .required(),
    email: Joi.string()
    .min(6)
    .max(256)
    .required()
    .email({ tlds: { allow: false } }),
  city: Joi.string().min(2).max(256).required(),
  street: Joi.string().min(2).max(256).required(),
  houseNumber: Joi.number().min(1).required(),
  takeAway: Joi.boolean().required(),
  bizNumber: Joi.number().min(1000000).max(9999999).allow(""),
});

const validateOrders = (userInput) =>
  validation(ordersValidation, userInput);

export default validateOrders;
