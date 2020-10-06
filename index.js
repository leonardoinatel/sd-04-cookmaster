const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const middlewares = require('./middlewares');
const { userController, recipesController } = require('./controllers');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/login', userController.loginForm);
app.get('/logout', userController.logout);
app.get('/register', userController.register);
app.post('/login', userController.login);

app.get('/', middlewares.auth(false), recipesController.homeRecipes);
app.get('/recipes/:id', middlewares.auth(false), recipesController.oneRecipe);

app.use(middlewares.auth());

app.get('/admin', (req, res) => res.render('admin/home', { user: req.userData }));
app.get('/recipes/:id/edit', recipesController.editRecipe);
app.get('/recipes/:id/delete', recipesController.deletePage);

app.post('/recipes/:id/delete', recipesController.deleteRecipe);
app.post('/recipes/:id', recipesController.postRecipe);

app.listen(3000, () => console.log('Listening on 3000'));
