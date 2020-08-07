import Joi from "@hapi/joi";

export const getSingleCharacterSchema: Joi.ObjectSchema = Joi.object({
  id: Joi.number().integer().greater(0),
  apiId: Joi.number().integer().greater(0),
}).or("id", "apiId");
