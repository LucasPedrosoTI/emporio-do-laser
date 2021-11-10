const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session'); // teste
const methodOverride = require('method-override');
require('dotenv').config();
const env = process.env.NODE_ENV || 'development';

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/usuarios');
const produtosRouter = require('./routes/produtos');
const minhaContaRouter = require('./routes/minha-conta');
const carrinhoRouter = require('./routes/carrinho');
const cupomRouter = require('./routes/cupoms');
const enderecoRouter = require('./routes/enderecos');
const cookieLogin = require('./middlewares/cookieLogin');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ------------ Sessão ------------ //
// teste //
app.use(
  session({
    secret: 'emporiodolaser',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: env === 'development' ? null : 360000 },
  })
);
// -------------------------------- //

// faz com que a session fique disponivel em todas as paginas

app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieLogin);
app.use(function (req, res, next) {
  res.locals.USUARIO = req.session.usuario;
  res.locals.error = null;
  res.locals.menu = null;
  res.locals.title = 'Empório do Laser';
  next();
});

app.use('/', indexRouter);
app.use('/usuarios', usersRouter);
app.use('/produtos', produtosRouter);
app.use('/minha-conta', minhaContaRouter);
app.use('/carrinho', carrinhoRouter);
app.use('/cupoms', cupomRouter);
app.use('/enderecos', enderecoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
