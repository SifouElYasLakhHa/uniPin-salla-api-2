const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require("passport");
const SallaAPIFactory = require("@salla.sa/passport-strategy");
const session = require("express-session");

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
    verify : (req, res, buf, encoding) => {
      try {
        JSON.parse(buf);
      } catch(e) {
        res.status(404).send({
          status: false,
          message: 'invalid JSON'
        });
        throw Error('invalid JSON');
      }
    }
}));


var sess = {
  secret: 'keyboard cat',
  cookie: {}
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))


// we initialize our Salla API
const SallaAPI = new SallaAPIFactory({
  clientID: '3656d307673dad4a1401ece99f5f7b4d',  // The client ID assigned to you by Salla in Salla Partner Portal
  clientSecret: '56b143d4f83faf8d0e394d4d89374e41', // The client password assigned to you by Salla in Salla Partner Portal
  callbackURL: "http://localhost:9595/oauth/callback", // the /oauth/callback in your service
});

//   Use the Salla Strategy within Passport.
passport.use(SallaAPI.getPassportStrategy());

// GET /
// render the index page

app.get("/", function (req, res) {
  SallaAPI.requestNewAccessToken(SallaAPI.getRefreshToken())
  .then((tokken) => {
    res.send({ tokken });
  })
  .catch((err) => res.send(err));
});

// GET /oauth/redirect
//   Use passport.authenticate() as route middleware to authenticate the
//   request. The first step in salla authentication will involve redirecting
//   the user to accounts.salla.sa. After authorization, salla will redirect the user
//   back to this application at /oauth/callback
app.get("/oauth/redirect", passport.authenticate("salla"));

// GET /oauth/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request. If authentication fails, the user will be redirected back to the
//   login page. Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get(
  "/oauth/callback",
  passport.authenticate("salla", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);



const { moogoldApiBalance } = require('./api/moogoldApi');

//moogoldApiBalance().then((response) => response);
module.exports = app;