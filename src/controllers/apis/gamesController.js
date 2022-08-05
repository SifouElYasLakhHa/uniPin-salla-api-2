
const db = require('./../../moduls/index.js');

const { 
    getGameDetailsUniPinApi,
 } = require('./../../utils/auth');

exports.gameDetailsUniPin = async (req, res) => {
    try {
        const { gameCode } = req.body;
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
