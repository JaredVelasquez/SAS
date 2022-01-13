const { hash } = require('bcrypt');
const express = require('express');
const router = require('express').Router();
const profile = require('../models/profile.model');
const auth = require('../models/profile.model');
const {AuthService} = require('../services/auth.service');
const {EncryptService} = require('../services/encrypt.service');

class ProfileService{
    encriptS = new EncryptService;
    jwtS = new AuthService;
    constructor(){

    }

    async singUp(firstName, lastName, emailPrimary,username ,password){
        if(!(firstName && lastName && emailPrimary && username && password))
            return 'error: Missing data';
        userExist = await auth.findOne({username} || {emailPrimary});
        
        if(userExist)
            return 'error: user already exist';

        const newHash = await this.encriptS.Encrypt(password);

        if(!newHash)
            return 'error: Missing hash';

        const newProfile = await profile.create({
            firstName,
            lastName,
            emailPrimary,
            update: new Date.now(),
        })

        if(newProfile){
            const newAuth= await auth.create({
                username,
                emailPrimary,
                newHash,
            })
            return newProfile;
        }

        return 'error: Missing profile';

    }
    async singIn(username, password){
        const hash = undefined;
        const token = undefined;
        const userExist = profile.findOne({username});

        if(!username)
            return 'error: Missing data';

        if(userExist)
             hash = await this.encriptS.Verify(password, userExist.password);
        
        if(hash)
            token = await this.jwtS.generateToken(userExist.emailPrimary, userExist.username);

        if(token)
            return token;

        return false;


    }

}

module.exports = ProfileService;