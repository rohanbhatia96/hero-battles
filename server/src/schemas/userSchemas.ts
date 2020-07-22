import Joi from "@hapi/joi";

export const loginUserSchema: Joi.ObjectSchema = Joi.object().keys({
  email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().trim().min(8).max(16).required(),
});

export const registerUserSchema: Joi.ObjectSchema = Joi.object().keys({
  firstName: Joi.string().alphanum().min(3).max(50).required(),
  lastName: Joi.string().alphanum().min(3).max(50),
  email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().trim().min(8).max(16).required(),
});
