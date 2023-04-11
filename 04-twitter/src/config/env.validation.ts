import * as Joi from 'joi';

export const EnvValidationSchema = Joi.object({
  // MONGODB_URI: Joi.required(),

  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string().default('dev'),
  // HOST_API: Joi.string().default('localhost'), //=http://localhost:3000/api/v1
  DEFAULT_LIMIT_PAGE: Joi.number().default(10),

  DB_PASSWORD: Joi.required(),
  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().default('postgres'),
  DB_HOST: Joi.string().default('localhost'),

  S3_USERNAME: Joi.string().required(),
  S3_PASSWORD: Joi.string().required(),

  JWT_SECRET: Joi.required(),
});
