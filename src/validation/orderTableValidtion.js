import Joi from "joi";

import validation from "./validation";

const ordersTableValidation = Joi.object({
 name: Joi.string().min(2).max(256).required(),
  phone: Joi.string()
    .regex(new RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)).messages({
      "string.empty": "the phone should not be empty",
      "string.pattern.base":
        "The phone number should contain only numbers and up to 10 digits",
    })
    .required(),
  date: Joi.string()
    .regex(new RegExp(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)).messages({
      "string.empty": "the date should not be empty",
      "string.pattern.base":
        "The date is set to be in mm/dd/yyy format",
    })
    .required(),
  time: Joi.string()
    .regex(new RegExp(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)).messages({
      "string.empty": "the time should not be empty",
      "string.pattern.base":
        "The time should be in 00:00 format",
    })
    .required(),
  numOfPeople: Joi.string().min(1).max(10).required(),
  bizNumber: Joi.number().min(1000000).max(9999999).allow(""),
});

const validateTableOrders = (userInput) =>
  validation(ordersTableValidation, userInput);

export default validateTableOrders;
