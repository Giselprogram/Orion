//configuración de puerto y bd
const mongoose =require('mongoose');
const app=require('./app');
const {DB_HOST,DB_USER,DB_PASSWORD,PORT}=require('./config/configuracion');

const mongoDbUri=`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority`

async function start(){
    try{
        await mongoose.connect(mongoDbUri);
        app.listen(PORT,()=>console.log('Escuchando puerto',PORT));
    
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}
start();