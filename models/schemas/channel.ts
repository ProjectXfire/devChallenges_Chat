import Joi from "joi";

export const ChannelSchema = Joi.object({
  name: Joi.string().max(20).required().messages({
    "any.required": "The field 'name' must not be empty",
    "string.max": "The field 'name' must have max 20 characters",
  }),
  description: Joi.string().max(50).required().messages({
    "any.required": "The field 'description' must not be empty",
    "string.max": "The field 'description' must have max 50 characters",
  }),
});
