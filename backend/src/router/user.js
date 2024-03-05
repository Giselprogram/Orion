//rutas para hacer crud con el usuario
const express = require('express');
const multipary = require('connect-multiparty');

const{getUsers,createUser, getUserById, destroyUser, updateUser}=require('../controllers/user');

const mdUser =multipary({uploadDir:'src/image/users'});
const app =express.Router();

app.get('/users', getUsers);
app.get('/users/:id', getUserById);
app.patch('/users/:id',mdUser, updateUser);
app.delete('/users/:id', destroyUser);
app.post('/users/register',mdUser, createUser);


module.exports=app;