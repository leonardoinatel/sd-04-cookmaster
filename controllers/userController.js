const { v4: uuid } = require('uuid');
const { SESSIONS } = require('../middlewares/auth');

const { validateNewUser, insertUser, findByEmail } = require('../models/userModel');

const loginForm = (req, res) => {
  const { token = '' } = req.cookies || {};

  if (SESSIONS[token]) return res.redirect('/');

  return res.render('admin/login', {
    message: null,
    redirect: req.query.redirect,
  });
};

const login = async (req, res) => {
  const { email, password, redirect } = req.body;

  if (!email || !password) {
    return res.render('admin/login', {
      message: 'Preencha o email e a senha',
      redirect: null,
    });
  }

  const user = await findByEmail(email);
  if (!user || user.password !== password) {
    return res.render('admin/login', {
      message: 'Email ou senha incorretos',
      redirect: null,
    });
  }

  const token = uuid();
  SESSIONS[token] = user.id;

  res.cookie('token', token, { httpOnly: true, sameSite: true });
  return res.redirect(redirect || '/');
};

const logout = (req, res) => {
  res.clearCookie('token');
  if (!req.cookies || !req.cookies.token) return res.redirect('/login');
  return res.render('admin/logout');
};

const registerPage = (_req, res) => res.render('admin/registerUser', { message: {}, data: {} });

const registerNew = ({ body }, res) => {
  const message = validateNewUser(body);
  if (message.confirmMsg) insertUser(body);
  res.render('admin/registerUser', { message, data: message.confirmMsg ? {} : body });
};

module.exports = {
  login,
  loginForm,
  logout,
  registerPage,
  registerNew,
};
