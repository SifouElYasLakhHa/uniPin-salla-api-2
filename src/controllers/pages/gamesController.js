const db = require('./../../moduls/index.js');
const { 
    getGamesUniPinApi,
 } = require('./../../utils/auth');

exports.orderAddPage = async (req, res) => {
    try {
        console.log('Test');
        var getGamesUniPinApiResponse = await getGamesUniPinApi().then((rs) => rs);
        console.log(getGamesUniPinApiResponse);
        if(getGamesUniPinApiResponse.status === false) throw new Error(getGamesUniPinApiResponse.error.message);
        //console.log(getGamesUniPinApiResponse)
        return res.render('pages/manageOrder', {
            mainTitle: process.env.APP_NAME,
            host: process.env.HOST,
            subTitle: 'اظافة طلب جديد',
            games: getGamesUniPinApiResponse.games.game_list.length === 0?[]:getGamesUniPinApiResponse.games.game_list,
            user: {
                username: req.user.username,
            }
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
