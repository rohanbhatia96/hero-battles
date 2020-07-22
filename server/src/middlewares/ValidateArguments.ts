import { createMethodDecorator } from "type-graphql";
import Joi from "@hapi/joi";
import { ApolloError } from "apollo-server-express";

export const ValidateArgs = (schema: Joi.ObjectSchema) => {
  return createMethodDecorator(async ({ args }, next) => {
    try {
      await schema.validateAsync(args);
      return next();
    } catch (err) {
      throw new ApolloError(err.details[0].message);
    }
  });
}
