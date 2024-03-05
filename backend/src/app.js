//manejador de la aplicación
const express = require('express');
const cors = require('cors');
const {API_NAME,API_VERSION}=require('./config/configuracion')

const app=express();

const userRoutes = require('./router/user');
const authRoutes = require('./router/auth');


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.use(express.static('src/image'));

const baseUrl =`/${API_NAME}/${API_VERSION}`;
app.use(baseUrl, userRoutes);
app.use(baseUrl, authRoutes);


app.get('/',(req,res)=>{
    res.send({ok:'Funciona'});
})

module.exports = app;