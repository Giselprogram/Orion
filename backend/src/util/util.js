const fs = require('fs');
const bcrypt = require('bcryptjs');

function unlinkFile(path){
    try {
        fs.unlinkSync(`src/image/${path}`);
        
    } catch (error) {
        console.log(error)
    }
}

function getFilePath({path}){
    const arrPath=path.split('\\');
    const imgName=arrPath.pop();
    const folder =arrPath.pop();
    return`${folder}/${imgName}`;
}
function hashPassword(password){
const salt = bcrypt.genSaltSync(10);
return bcrypt.hashSync(password,salt);
}
module.exports={
    getFilePath,
    unlinkFile,
    hashPassword  
}
