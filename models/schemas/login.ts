import Joi from "joi";

export const LoginSchema = Joi.object({
  email: Joi.string().required().messages({
    "any.required": "The field 'email' must not be empty",
  }),
  password: Joi.string().min(8).required().messages({
    "any.required": "The field 'password' must not be empty",
    "string.min": "The field 'password' must have at least 8 characters",
  }),
});
