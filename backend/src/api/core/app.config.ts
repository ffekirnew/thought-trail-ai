import dotenv from "dotenv";
import path from "path";
import Joi from "joi";

dotenv.config({ path: path.join(__dirname, "../.env") });

const envVarsSchema = Joi.object()
  .keys({
    ENV: Joi.string().valid("development", "production", "test").required(),
    PORT: Joi.number().default(3000),
    MONGODB_URI: Joi.string().required().description("Mongo DB url"),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    JWT_EXPIRATION_DAYS: Joi.number()
      .default(7)
      .description("JWT expiration days"),
    JWT_EXPIRATION_HOURS: Joi.number()
      .default(0)
      .description("JWT expiration hours"),
    JWT_EXPIRATION_MINUTES: Joi.number()
      .default(0)
      .description("JWT expiration minutes"),
    JWT_EXPIRATION_SECONDS: Joi.number()
      .default(0)
      .description("JWT expiration seconds"),
    EMAIL_USER: Joi.string().required().description("Email for nodemailer"),
    EMAIL_HOST: Joi.string().required().description("Host for nodemailer"),
    EMAIL_FROM: Joi.string()
      .required()
      .description("Email sender for nodemailer"),
    EMAIL_PASS: Joi.string().required().description("Password for nodemailer"),
    EMAIL_SERVICE: Joi.string()
      .required()
      .description("Service for nodemailer"),
    SALT: Joi.number().default(10).description("Salt for password salting"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET,
    expiresIn:
      envVars.JWT_EXPIRATION_DAYS *
      envVars.JWT_EXPIRATION_HOURS *
      envVars.JWT_EXPIRATION_MINUTES *
      envVars.JWT_EXPIRATION_SECONDS,
  },
  mongoose: {
    url: envVars.MONGODB_URI + (envVars.NODE_ENV === "test" ? "-test" : ""),
    options: {},
  },
  email: {
    user: envVars.EMAIL_USER,
    from: envVars.EMAIL_FROM,
    pass: envVars.EMAIL_PASS,
    service: envVars.EMAIL_SERVICE,
    host: envVars.EMAIL_HOST,
  },
  password: {
    salt: envVars.SALT,
  },
};

export default config;
