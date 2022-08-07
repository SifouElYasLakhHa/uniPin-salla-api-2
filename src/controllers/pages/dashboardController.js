const db = require('./../../moduls/index.js');

exports.dashboardPage = async (req, res) => {
  try {
    console.log(req.user)
    return res.render('pages/dashboard', {
      mainTitle: process.env.APP_NAME,
      host: process.env.HOST,
      subTitle: 'الرئيسية',
      user: {
        username: req.user.username,
      }
    });
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      error: true,
      type: 'site',
      error: {
        status: true,
        message: 'please contact developer for fixing issues',
      }
    });
  }
};
