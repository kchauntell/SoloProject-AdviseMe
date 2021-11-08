const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize')
const routes = require('./routes');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

//Security Middleware
//enable cors only in development
if(!isProduction) app.use(cors());

// helmet helps set a variety of headers to better secure your app
app.use(helmet({
  contentSecurityPolicy: false
}));

//Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && 'Lax',
      httpOnly: true,
    },
  })
  );

app.use(routes) //connect all the routes

//Catch unhandled requests and forward to error handler
app.use((_req, _res, next) => {
  const error = new Error(`The requested resource couldn't be found.`);
  error.title = "Resource Not Found";
  error.errors = [`The requested resource couldn't be found.`];
  error.status = 404;
  next(error);
});

//Process sequelize errors
app.use((error, _req, _res, next) => {
  //check if error is a Sequelize error:
  if(error instanceof ValidationError) {
    error.errors = error.errors.map((e) => e.message);
    error.title = 'Validation error';
  }
  next(error);
});

//Error Formatter
app.use((error, _req, res, _next) => {
  res.status(error.status || 500);
  console.error(error);
  res.json({
    title: error.title || 'Server Error',
    message: error.message,
    errors: error.errors,
    stack: isProduction ? null : error.stack,
  });
});


module.exports = app;
