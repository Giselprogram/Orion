//rutas para el usuario
const express = require('express');
const multipary = require('connect-multiparty');
const { register, login } = require('../controllers/auth');


const mdUser =multipary({uploadDir:'src/image/users'});
const app = express.Router();

app.post('/auth/register',mdUser, register);
app.post('/auth/login',login);

module.exports =app;