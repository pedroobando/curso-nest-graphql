import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  // MONGODB_URI: Joi.required(),

  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string().default('dev'),
  DEFAULT_LIMIT: Joi.number().default(7),

  DB_PASSWORD: Joi.required(),
  DB_NAME: Joi.string().default('anylistDB'),
  DB_USERNAME: Joi.string().default('postgres'),
  DB_HOST: Joi.string().default('localhost'),

  JWT_SECRET: Joi.required(),
});
