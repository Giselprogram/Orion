const { response } = require('express');
const User = require('../models/user');
const {getFilePath,unlinkFile, hashPassword} =require('../util/util');

function getUsers(req,res){
    User.find().then(response => {
        res.status(200).send({response});
    }).catch(err => {
        res.status(500).send({response});
    })
}

function getUserById(req,res){
    const {id}=req.params;
    User.findById(id).then(response => {
        res.status(200).send({response});
    }).catch(err => {
        res.status(500).send({response});
    })
}

function createUser(req,res){
    const payload = req.body;
    payload.email = payload.email.toLowerCase();
    payload.password= hashPassword(payload.password);
    if(req.files.img) {
    payload.img = getFilePath(req.files.img);
    }
    User.create(payload).then(response => {
        res.status(200).send({response});
    }).catch(err => {
        if(payload.img) unlinkFile(payload.img);   
        res.status(500).send({response:err});
    })
}

 async function updateUser(req,res){
    const {id}=req.params;
    const payload = req.body;
    if(payload.password) payload.password = hashPassword(payload.password);
    if(req.files.img) {
   payload.img = getFilePath(req.files.img);
   const userData = await User.findById(id).exec();
    if(userData.img)unlinkFile(userData.img);
    payload.img = getFilePath(req.files.img);
    }
    User.findByIdAndUpdate(id,payload).then(response => {
        res.status(200).send({response});
    }).catch(err => {
        if(payload.img) unlinkFile(payload.img);   
        res.status(500).send({response:err});
    })
}
function destroyUser(req,res){
    const {id}=req.params;
    User.findByIdAndDelete(id).then(response => {
        res.status(200).send({response});
    }).catch(err => {
        res.status(500).send({response});
    })
}

module.exports ={
    getUsers,
    createUser,
    getUserById,
    destroyUser,
    updateUser
}