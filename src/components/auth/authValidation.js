const Joi = require("joi");
const AuthValidationException = require("./Exception/AuthValidationException");

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required()
});
const createSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required()
});

async function login({ email, password }) {
  try {
    return await loginSchema.validateAsync({ email, password });
  } catch (err) {
    const message = err.message.replace(/\"/g, ""); // strip quotation mark off the paramter name
    throw new AuthValidationException(message);
  }
}

async function create({ username, email, password }) {
  try {
    return await createSchema.validateAsync({ username, email, password });
  } catch (err) {
    console.log(err);
    const message = err.message.replace(/\"/g, ""); // strip quotation mark off the paramter name
    throw new AuthValidationException(message);
  }
}

module.exports = {
  login,
  create
};
