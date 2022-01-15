const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const profile = require('../models/profile.model');
const auth = require('../models/ath.model');

const key ='projectSAS2022';



router.post('/profile/singup', async (req, res) => {
    
    const { firstName, lastName, email, username, password } = req.body;
    if(!(firstName && lastName && email && username && password))
            res.status(400).send('error: Missing data');

        userExist = await auth.findOne({username} || {email});
        if(userExist)
            res.status(400).send('error: user already exist');

        const newHash = await bcrypt.hash(password, 10);
        
        if(!newHash)
            res.status(400).send('error: Missing hash');

        const newProfile = await profile.create({
            firstName: firstName,
            lastName: lastName,
            emailPrimary: email,
            update: Date.now(),
        })

        console.log(newProfile);
        if(!newProfile){
            res.status(400).send('error: Missing hash');
        }

        const newAuth = await auth.create({
            username: username,
            email: email,
            hash: newHash,
        })

        console.log(newAuth);

        if(newAuth)
            res.status(200).send(newProfile);
        
        
});

router.post('/login', async (req, res)=>
{
    const{identificator, password} = req.body;

    const userExist = await auth.findOne({identificator});
    console.log(userExist);
    if(!userExist)
        res.status(400).send('This user does not exist');
    
    const match = await bcrypt.compare(password, userExist.hash);
    if(!(match))
        res.status(400).send('Incorrect password');
    
    const token = jwt.sign(
        {
            Id: userExist._id,
            Email: identificator, 
            Username: userExist.username
        },
        key,
        {
            expiresIn: '2h',
        }
    );
    
    const userSession ={
        username: identificator,
        token: token
    }
    res.status(200).send(userSession);


        


    
});

module.exports = router;