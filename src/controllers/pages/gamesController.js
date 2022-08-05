const db = require('./../../moduls/index.js');
const { 
    getGamesUniPinApi,
 } = require('./../../utils/auth');

exports.orderAddPage = async (req, res) => {
    try {
        var getGamesUniPinApiResponse = await getGamesUniPinApi().then((rs) => rs);
        if(getGamesUniPinApiResponse.status === false) throw new Error(getGamesUniPinApiResponse.error.message);
        //console.log(getGamesUniPinApiResponse)
        return res.render('pages/manageOrder', {
            mainTitle: process.env.APP_NAME,
            host: process.env.HOST,
            subTitle: 'اظافة طلب جديد',
            games: getGamesUniPinApiResponse.games.game_list,
        });
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            status: false,
            error: {
                status: true,
                message: e,
            }
        });
    }
};
