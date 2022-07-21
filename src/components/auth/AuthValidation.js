const Joi = require("joi");
const AuthValidationException = require("./Exception/AuthValidationException");

const loginSchema = Joi.object({
  password: Joi.string(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
});

async function login(email, password) {
  try {
    return await loginSchema.validateAsync({ email, password });
  } catch (err) {
    const message = err.message.replace(/\"/g, ""); // strip quotation mark off the paramter name
    throw new AuthValidationException(message);
  }
}

module.exports = {
  login
};
