const bcrypt = require('bcrypt');
const res = require('express/lib/response');
const auth = require('../models/ath.model');

class EncryptService{
    constructor(){
        
    }
    async Encrypt(password){
        const encriptedPassword = await bcrypt.hash(password, 10);
        if(!encriptedPassword){
            return "Encript error";
        }
        if(encriptedPassword){
            return encriptedPassword;
        }
    }
    async Verify(username, password){
        const userExist = await auth.findOne({username});

        if(userExist){
            
            const match = await bcrypt.compare(password, userExist.hash);
            
            return match;
        }

        return 'error: User not exist';
    }

}
