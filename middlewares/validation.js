const userModel = require('../models/userModel');

const message = {
  email: 'O email deve ter o formato email@mail.com',
  password: 'A senha deve ter pelo menos 6 caracteres',
  confirmPass: 'As senhas tem que ser iguais',
  name: 'O primeiro nome deve ter, no mínimo, 3 caracteres, sendo eles apenas letras',
};

const validationMessage = (validationBool, type) => (validationBool ? null : message[type]);

const validationMiddleware = (req, res, next) => {
  const { email, password, passwordConfirm, firstName } = req.body;
  const { emailCheck, passwordCheck, confirmPassCheck, nameCheck } = userModel.isValid;

  const emailValidation = emailCheck(email);
  const passValidation = passwordCheck(password);
  const confirmPassValidation = confirmPassCheck(password, passwordConfirm);
  const nameValidation = nameCheck(firstName);

  if (emailValidation && passValidation && confirmPassValidation && nameValidation) {
    req.isValid = true;
  } else req.isValid = false;

  req.messages = {
    email: validationMessage(emailValidation, 'email'),
    password: validationMessage(passValidation, 'password'),
    confirmPassword: validationMessage(confirmPassValidation, 'confirmPass'),
    name: validationMessage(nameValidation, 'name'),
  };
  return next();
};

module.exports = {
  validationMiddleware,
};
