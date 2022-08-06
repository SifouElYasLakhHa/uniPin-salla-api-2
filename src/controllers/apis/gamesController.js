
const e = require('express');
const db = require('./../../moduls/index.js');

const { 
    getGameDetailsUniPinApi,
    validateUserUniPinApi,
 } = require('./../../utils/auth');

exports.gameDetailsUniPin = async (req, res) => {
    try {
        const { gameCode } = req.query;
        //console.log(gameCode);
        //return
        const getGameDetailsUniPinApiResponse = await getGameDetailsUniPinApi({ gameCode }).then((rs) => rs);
        if(getGameDetailsUniPinApiResponse.status === false) throw new Error(getGameDetailsUniPinApiResponse.error.message);
        return res.status(200).json({
            status: true,
            gameDetails: getGameDetailsUniPinApiResponse.gameDetails
        })
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            status: false,
            errors: {
                status: true,
                message: e
            }
        });
    }
};

exports.validateUserUniPin = async (req, res) => {
    try {
        const { gameCode, zoneId, serverId, type, userId} = req.query;
        var data = {
            fields: {
            }
        };
        if(Number(type) === 1) {
            data = {
                game_code: gameCode,
                fields: {
                    userid: userId,
                    server: serverId,
                }
            };
        } else {
            data = {
                game_code: gameCode,
                fields: {
                    userid: userId,
                    zoneid: Number(zoneId),
                }
            };
        }
        const validateUserUniPinApiResponse = await validateUserUniPinApi(data).then((rs) => rs);
        console.log(validateUserUniPinApiResponse)
        if(validateUserUniPinApiResponse.status === false) {
            return res.status(200).json({
                status: false,
                errors: {
                    status: true,
                    message: validateUserUniPinApiResponse.error.message
                }
            })
        } else {
            return res.status(200).json({
                status: true,
                validationToken: validateUserUniPinApiResponse.games.validation_token
            });
        }
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            status: false,
            errors: {
                status: true,
                message: e
            }
        });
    }
};
