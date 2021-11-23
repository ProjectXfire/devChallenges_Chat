import Joi from "joi";

export const UserSchema = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "The field 'username' must not be empty",
  }),
});
