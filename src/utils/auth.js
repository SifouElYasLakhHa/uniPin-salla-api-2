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
        var url = 'in-game-topup/detail'
        var hash256Response = await hash256(url).then((rs) => rs);
        console.log(hash256Response)
        if(hash256Response.status === false) throw new Error(error.message);
        hash256Response = hash256Response.hash256;

        var data = {
            game_code: game.gameCode,
        };
        console.log(`${process.env.UNIPIN_API_URL}/${url}`)
        var config = {
            method: 'post',
            url: `${process.env.UNIPIN_API_URL}/${url}`,
            headers: { 
                'partnerid': process.env.UNIPIN_PARTNER_ID, 
                'timestamp': hash256Response.timestamp, 
                'path': url, 
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



exports.getGamesUniPinApi = async () => await new Promise(async (resolve, reject) => {
    try {
        var url = 'in-game-topup/list'
        var hash256Response = await hash256(url).then((rs) => rs);
        //console.log(hash256Response)
        if(hash256Response.status === false) throw new Error(error.message);
        hash256Response = hash256Response.hash256;

        var data = {};

        var config = {
            method: 'post',
            url: `${process.env.UNIPIN_API_URL}/${url}`,
            headers: { 
                'partnerid': process.env.UNIPIN_PARTNER_ID, 
                'timestamp': hash256Response.timestamp, 
                'path': url, 
                'auth': hash256Response.hash256, 
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
        .then(function (response) {
            //console.log(response.data.status)
           // if(response.data.status !== 1) throw new Error(response.data.error.message);
            resolve({
                status: true,
                games: response.data,
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

exports.createOrderUniPinApi = async (data) => await new Promise(async (resolve, reject) => {
    try {
        var url = 'in-game-topup/order/create'
        var hash256Response = await hash256(url).then((rs) => rs);

        if(hash256Response.status === false) throw new Error(error.message);
        hash256Response = hash256Response.hash256;
        //console.log(data)
        var config = {
            method: 'post',
            url: `${process.env.UNIPIN_API_URL}/${url}`,
            headers: {
                'partnerid': process.env.UNIPIN_PARTNER_ID, 
                'timestamp': hash256Response.timestamp, 
                'path': url, 
                'auth': hash256Response.hash256, 
                'Content-Type': 'application/json'
            },
            data: data
        };
        
        axios(config)
        .then(function (response) {
           // console.log(response.data.error.message);
            if(response.data.status === 1) {
                //response.data.error.message
                resolve({
                    status: true,
                    order: response.data,
                });
            } else {
                resolve({
                    status: false,
                    error: {
                        staus: true,
                        message: response.data.error.message,
                    }
                });
            }
            
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


exports.validateUserUniPinApi = async (data) => await new Promise(async (resolve, reject) => {
    try {
        var url = 'in-game-topup/user/validate'
        var hash256Response = await hash256(url).then((rs) => rs);

        if(hash256Response.status === false) throw new Error(error.message);
        hash256Response = hash256Response.hash256;
        console.log(data)
        var config = {
            method: 'post',
            url: `${process.env.UNIPIN_API_URL}/${url}`,
            headers: { 
                'partnerid': process.env.UNIPIN_PARTNER_ID, 
                'timestamp': hash256Response.timestamp, 
                'path': url, 
                'auth': hash256Response.hash256, 
                'Content-Type': 'application/json'
            },
            data: data
        };
        
        axios(config)
        .then(function (response) {
           // console.log(response.data.error.message);
            if(response.data.status === 1) {
                //response.data.error.message
                resolve({
                    status: true,
                    games: response.data,
                });
            } else {
                resolve({
                    status: false,
                    error: {
                        staus: true,
                        message: response.data.error.message,
                    }
                });
            }
            
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
            console.log(e)
            resolve({
                status: false,
                error: {
                    status: true,
                    message: 'Hash not success',
                },
            });
        });

    } catch (e) {
        console.log('test1')
        resolve({
            status: false,
            error: {
                status: true,
                message: 'Hash not success',
            },
        });
    }
});