const jwt = require('jsonwebtoken');
const {EncryptService} = require('../services/encrypt.service');
const key = 'projectSAS2022';

class AuthService{
    encriptS = new EncryptService;
    constructor(
    ){

    }

    generateToken(email, username){
        if(!(email && username && id))
        return 'error: Missing arguments to generate token.';

        const token = jwt.sign(
            {
                Email: email, 
                Username: username
            },
            key,
            {
                expiresIn: '2h',
            }
        )

        return token;
    }
}

module.exports = AuthService;