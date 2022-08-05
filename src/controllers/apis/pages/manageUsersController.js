const db = require('../moduls/mongo/index.js.js');
const TwitterUsers = require("../moduls/mysql/twitter_db.model.js.js");

exports.usersPage = async (req, res) => {
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
      return res.render('pages/manageUsers', {
        mainTitle: process.env.APP_NAME,
        host: process.env.HOST,
        subTitle: 'المستخدمين',
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

exports.twitterUsersUpdate = async (req, res) => {
  try {
      // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    db.Databases.find({})
    .then(async (databases) => {
      for(let d of databases) {
        if(d.type === 1) {
          TwitterUsers.updateById(
            {
              username: req.body.usernames[0]
            },
            {
              host: 'localhost',
              user: 'root',
              password: '',
              dbName: d.fullNameDatabase,
            },
            (err, data) => {
              if (err) {
                if (err.kind === "not_found") {
                  throw `Not found Twitter with id ${req.body.usernames[0]}.`;
                } else {
                  throw "Error updating Twitter with id " + req.body.usernames[0];
                }
              }
            }
          );
        } else if(d.type === 2) {
          TwitterUsers.updateById(
            {
              username: req.body.usernames[1]
            },
            {
              host: 'localhost',
              user: 'root',
              password: '',
              dbName: d.fullNameDatabase,
            },
            (err, data) => {
              if (err) {
                if (err.kind === "not_found") {
                  throw `Not found Twitter with id ${req.body.usernames[1]}.`;
                } else {
                  throw "Error updating Twitter with id " + req.body.usernames[1];
                }
              }
            }
          );
        } else {
          TwitterUsers.updateById(
          {
            username: req.body.usernames[2]
          },
          {
            host: 'localhost',
            user: 'root',
            password: '',
            dbName: d.fullNameDatabase,
          },
          (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                throw `Not found Twitter with id ${req.body.usernames[2]}.`;
              } else {
                throw "Error updating Twitter with id " + req.body.usernames[2];
              }
            }
          }
        );
        }
      }
      return res.status(200).json({
        status: true
      })
    })
    .catch((e) => {
      console.log(e)
      return res.status(500).json({
        error: true,
        type: 'Find databases',
        error: {
          status: true,
          message: e,
        }
      });
    })
      
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      error: true,
      type: 'site',
      error: {
        status: true,
        message: e,
      }
    });
  }
};

