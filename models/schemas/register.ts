import Joi from "joi";

export const RegisterSchema = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "The field 'username' must not be empty",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "any.required": "The field 'email' must not be empty",
      "string.email": "The field must be an valid email",
    }),
  password: Joi.string().min(8).required().messages({
    "any.required": "The field 'password' must not be empty",
    "string.min": "The field 'password' must have at least 8 characters",
  }),
});
