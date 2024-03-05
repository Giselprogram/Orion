//modelo para crear el usuario en la bd
const mongoose =require('mongoose');

const UserSchema=mongoose.Schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:String,
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    active:{
        type:Boolean,
        default:true
    },
    img:String
});
module.exports =mongoose.model('User',UserSchema);