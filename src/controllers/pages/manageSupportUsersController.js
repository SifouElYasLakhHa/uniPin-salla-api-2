//manageSupportUsers

const db = require('./../moduls/mongo/index.js');

exports.supportUsersPage = async (req, res) => {
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
      return res.render('pages/manageSupportUsers', {
        mainTitle: process.env.APP_NAME,
        host: process.env.HOST,
        subTitle: 'حساباب الدعم',
      });
    })
  } catch (e) {
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
