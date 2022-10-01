const db = require('./../../moduls/index.js');

exports.vouchersPages = async (req, res) => {
    try {
        //console.log(getGamesUniPinApiResponse)
        return res.render('pages/manageVouchers', {
            mainTitle: process.env.APP_NAME,
            host: process.env.HOST,
            subTitle: 'Add voucher',
            user: {
                username: '' // req.user.username,
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
