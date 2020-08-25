import Joi from "@hapi/joi";

export const addCharToUserSchema: Joi.ObjectSchema = Joi.object().keys({
  charId: Joi.number().integer().greater(0),
});
