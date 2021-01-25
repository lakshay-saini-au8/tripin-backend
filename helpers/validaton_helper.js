const Joi = require("joi");

const joiValidate = (schema, bodyData) => {
  const JoiSchema = Joi.object(schema);
  return JoiSchema.validate(bodyData);
};

const register = (body) => {
  return joiValidate(
    {
      name: Joi.string().min(3).required(),
      email: Joi.string().min(3).required().email(),
      password: Joi.string().min(3).required(),
    },
    body
  );
};

const login = (body) => {
  return joiValidate(
    {
      email: Joi.string().min(3).required().email(),
      password: Joi.string().min(3).required(),
    },
    body
  );
};

const product = (body) => {
  return joiValidate(
    {
      bookName: Joi.string().min(3).required(),
      authorName: Joi.string().min(3).required(),
      description: Joi.string().min(3).required(),
      gener: Joi.string().min(3).required(),
    },
    body
  );
};

module.exports = {
  register,
  login,
  product,
};
