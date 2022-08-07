const EmailValidator = require('email-validator')
const db = require('./../../moduls/index.js');
const bcrypt = require('bcrypt');
const { 
  generateAuthToken,
  hashPasswordUser
 } = require('./../../utils/auth');

exports.loginApi = async (req, res) => {
    try {
      const errors = {
        status: false,
        password: {
          status: false,
          message: '',
        },
        auth: {
          status: false,
          message: '',
        },
        all: {
          status: false,
          message: '',
        },
      };
      const { auth, password } = req.body
      const usernameValidations = false;

      if (typeof auth === 'undefined' || auth.length === 0) {
        errors.status = true
        errors.auth.status = true
        errors.auth.message = 'حقل ضروري';
      } else if(EmailValidator.validate(auth) === false) {
        usernameValidations = true;
      } else {
        emailValidations = true;
      }

      if (typeof password === 'undefined' || password.length === 0) {
        errors.status = true
        errors.password.status = true
        errors.password.message = 'حقل ضروري';
      } else if(password.length < 8) {
        errors.status = true
        errors.password.status = true
        errors.password.message = 'يجب ادخال على الاقل 8 أحرف';
      }

      if(errors.status){
        return res.status(200).json({
          status: false,
          errors
        });
      }
      var objUser = {
      }
      if(usernameValidations) {
        objUser.username  = auth;
      } else {
        objUser.email  = auth;
      }
      db.Users
      .findOne(objUser)
      .then(async (findUser) => {
        if(!findUser) {
          return res.status(200).json({
            status: false,
            error: true,
            errors: {
              status: false,
              message: 'كلمة المرور او اسم المستخدم غير صحيح'
            },
          });
        } else {
          const isMatch = await bcrypt.compare(password, findUser.password);
          if (!isMatch) {
            return res.status(200).json({
              error: true,
              status: false,
              errors: {
                status: false,
                message: 'كلمة المرور او اسم المستخدم غير صحيح'
              },
            });
          }
          const options = {
            ////expires: new Date(`${Date.now()}9999`),
            secure: false, // set to true if your using https
          };
          let token = await generateAuthToken(findUser)
            
          await res.cookie('auth_token', `Bearer ${token.authToken}`, options);
          ////console.log('hi_test')
          return res.status(200).json({
            error: false,
            status: true,
            message: 'تم تسجيل دخولك بنجاح انتظر قليلا يتم توجيهك الى لوحة التحكم',
          });
        }
      })
      .catch((e) => {
        console.log(e)
        return res.status(200).json({
          error: true,
          status: false,
          errors: {
            status: false,
            message: 'حدث خطأ ما في نظامنا أعد المحاولة لاحقا',
          },
        });
      })
      
    } catch (e) {
      console.log(e)
      return res.status(200).json({
        error: true,
        status: false,
        errors: {
          status: false,
          message: 'حدث خطأ ما في نظامنا أعد المحاولة لاحقا',
        },
      });
    }
};

exports.addAdminApi = async (req, res) => {
  try {
    var password = await hashPasswordUser({
      password: req.body.password
    }).then((rs) => rs.hasPassword);
    
    db.Users.find({})
    .then((findUsers) => {
      db.Users.create({
        user: findUsers.length === 0? 1: findUsers[findUsers.length - 1].user + 1,
        email: req.body.email,
        username: req.body.username,
        password,
      })
      .then(async (newUser) => {
        return res.status(200).json({
          error: false,
          status: true,
          message: 'تم تسجيل دخولك بنجاح انتظر قليلا يتم توجيهك الى لوحة التحكم',
        });
      })
      .catch((e) => {
        console.log(e);
        return res.status(200).json({
          error: true,
          status: false,
          errors: {
            status: false,
            all: {
              status: true,
              message: 'حدث خطأ ما في نظامنا أعد المحاولة لاحقا',
            }
          },
        });
      })
    })
    .catch((e) => {
      console.log(e);
      return res.status(200).json({
        error: true,
        status: false,
        errors: {
          status: false,
          all: {
            status: true,
            message: 'حدث خطأ ما في نظامنا أعد المحاولة لاحقا',
          }
        },
      });
    })

  } catch (e) {
    console.log(e);
    return res.status(200).json({
      error: true,
      status: false,
      errors: {
        status: false,
        all: {
          status: true,
          message: 'حدث خطأ ما في نظامنا أعد المحاولة لاحقا',
        }
      },
    });
  }
};
exports.signOutApi = async (req, res) => {
  try {
    await res.clearCookie('auth_token');
    await res.cookie('auth_token', '', { maxAge: 0, httpOnly: true });
    return res.redirect('/');
  } catch(e) {
    //console.log(e)
    return res.status(500).json({
      error: true,
      status: false,
      type: 'site',
      all: {
        status: true,
         message: 'حدث خطأ ما رجاءا تواصل مع الدعم الفني',
      }
    })
  }
}