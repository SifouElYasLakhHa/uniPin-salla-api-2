const db = require('./../../moduls/index.js');

exports.loginPage = async (req, res) => {
  try {
    db.Users.find({}, (e, users) => {
      if(e) {
        return res.status(500).json({
            error: true,
            type: 'Find user',
            error: {
              status: true,
              message: 'please contact developer for fixing issues',
            }
          });
      }
      return res.render('pages/loginPage', {
        mainTitle: process.env.APP_NAME,
        host: process.env.HOST,
        subTitle: 'تسجيل الدخول',
      });
    })
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
