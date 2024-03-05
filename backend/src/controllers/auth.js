//controlador del usuario
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const{hashPassword} = require('../util/util')

function register(req, res){
    const {firstName,lastName,email,password,role}=req.body;

    const payload={
        firstName,
        lastName,
        email:email.toLowerCase(),
        password:hashPassword(password)
    }
    if(role) payload.role = role;
    if(req.files.img) {
        payload.img = getFilePath(req.files.img);
    }

    User.create(payload).then(response =>{
        res.status(200).send({response});
    }).catch(err => {
        if(payload.img) unlinkFile(payload.img);   
        res.status(500).send({response:err});
    })
}
function login(req,res){
  const { email, password } = req.body;
  User.findOne({email:email.toLowerCase()}).then(response =>{
   bcrypt.compare(password,response.password,(err,check)=>{
    if(err) return res.status(500).send({response:'Error en el servidor'});
    if (!check) return res.status(400).send({response:'Los datos ingresados son incorrectos, verifica'});
    if (!response.active) return res.status(401).send({response:'Usuario inativo'});
    res.status(200).send({response:'Bienvenido, querido usuario a este sistema'});
});
    
}).catch(err=>{
    res.status(500).send({response:'Error obteniendo el usuario'});
})
}
module.exports = {
    register,
    login
}