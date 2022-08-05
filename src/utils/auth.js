const bcrypt = require("bcrypt");
var axios = require('axios');
require('dotenv').config();

exports.generateAuthToken = (user) => {
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRER, { expiresIn: '9999 days' });
    return new Promise((resolve, reject) => {
        resolve({
            authToken: token,
            status: true,
        });
    });
};

exports.hashPasswordUser = async (user) => await new Promise((resolve, reject) => {
    try {
        resolve({
            status: true,
            hasPassword: bcrypt.hash(user.password, 10),
        }) 
        //throw new Error('');
    } catch (e) {
        resolve({
            status: false,
            hasPassword: '',
            error: {
                status: true,
                message: e,
            },
        });
    }
});

exports.getGameDetailsUniPinApi = async (game) => await new Promise(async (resolve, reject) => {
    try {
        var hash256Response = await hash256('in-game-topup/detail').then((rs) => rs);
        if(hash256Response.status === false) throw new Error(error.message);
        hash256Response = hash256Response.hash256;

        var data = {
            game_code: game.gameCode,
        };

        var config = {
            method: 'post',
            url: process.env.UNIOIN_API_URL,
            headers: { 
                'partnerid': process.env.UNIOIN_PARTNER_ID, 
                'timestamp': hash256Response.timestamp, 
                'path': 'in-game-topup/detail', 
                'auth': hash256Response.hash256, 
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
        .then(function (response) {
           // console.log(response.data);
            resolve({
                status: true,
                gameDetails: response.data,
            });
        })
        .catch(function (e) {
            resolve({
                status: false,
                error: {
                    status: true,
                    message: e,
                },
            });
        });

    } catch (e) {
        resolve({
            status: false,
            error: {
                status: true,
                message: e,
            },
        });
    }
});



const hash256 = async (url) => await new Promise((resolve, reject) => {
    try {
        var config = {
            method: 'get',
            url: `${process.env.HASH_HOST}/?url=${url}`,
        };
        axios(config)
        .then(function (response) {
            resolve({
                status: true,
                hash256: response.data,
            });
        })
        .catch(function (e) {
            resolve({
                status: false,
                error: {
                    status: true,
                    message: e,
                },
            });
        });

    } catch (e) {
        resolve({
            status: false,
            error: {
                status: true,
                message: e,
            },
        });
    }
});