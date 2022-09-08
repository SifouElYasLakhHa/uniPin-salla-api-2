const bcrypt = require("bcrypt");
var axios = require('axios');
var jwt = require('jsonwebtoken');
const db = require('./../moduls/index.js');

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
exports.authLogin = async (req, res, next) => {
    var auth = req.headers.authorization
    //typeof auth !== 'undefined'? auth = auth.split(' ')[1]: auth = undefined;
    
    var cookie = req.headers.cookie || auth
    //console.log(cookie)
    if(!cookie) {
      return res.redirect('/admin/login');
    }
   
    cookie = typeof cookie === 'string'? cookie.split('%20')[1]:'' || typeof cookie === 'string'? cookie.split(' ')[1]: '';
    
    if(typeof cookie === "undefined" || cookie === '') {
      return res.redirect('/admin/login');
    }
    
    cookie = cookie.split(';')[0]
      
    jwt.verify(cookie, process.env.JWT_SECRER, (e, user) => {
        if (e) {
            return res.redirect('/admin/login');
        }
        db.Users.findOne({ _id: user._id })
        .then(async usr => {
                if(!usr) {
                    return res.redirect('/admin/login');
                }
                req.user = usr;
                next();
        }).catch(e => {
            return res.redirect('/admin/login');
        });
    });
}

exports.authLoginPage = async (req, res, next) => {
    var auth = req.headers.authorization
    //typeof auth !== 'undefined'? auth = auth.split(' ')[1]: auth = undefined;
    
    var cookie = req.headers.cookie || auth
    //console.log(cookie)
    if(!cookie) {
        next();
        return
    }
   
    cookie = typeof cookie === 'string'? cookie.split('%20')[1]:'' || typeof cookie === 'string'? cookie.split(' ')[1]: '';
    
    if(typeof cookie === "undefined") {
        next();
        return
    }
    
    cookie = cookie.split(';')[0]
      
    jwt.verify(cookie, process.env.JWT_SECRER, (e, user) => {
        if (e) {
            next();
            return
        }
        if(typeof user === 'undefined') {

        } else {
            db.Users.findOne({ _id: user._id })
            .then(async usr => {
                    if(!usr) {
                        next();
                    }
                    req.user = usr;
                    return res.redirect('/admin/dashboard');
            }).catch(e => {
                next();
                return
            });
        }
    });
}

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
        //console.log('hash256Response')
        var hash256Response = await hash256(url).then((rs) => rs);
        
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
        console.log('hash256Response')
        axios(config)
        .then(function (response) {
            console.log(response)
           // if(response.data.status !== 1) throw new Error(response.data.error.message);
            resolve({
                status: true,
                games: response.data,
            });
        })
        .catch(function (e) {
            console.log(e)
            resolve({
                status: false,
                error: {
                    status: true,
                    message: e,
                },
            });
        });

    } catch (e) {
        console.log(e)
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
      //  console.log(`${process.env.HASH_HOST}/?url=${url}&guid=${process.env.UNIPIN_PARTNER_ID}&password=${process.env.UNIPIN_PARTNER_SECRET}`)
        var config = {
            method: 'get',
            url: `${process.env.HASH_HOST}/?url=${url}&guid=${process.env.UNIPIN_PARTNER_ID}&password=${process.env.UNIPIN_PARTNER_SECRET}`,
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