const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

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

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, './../public')));
app.set('view engine', 'ejs');

const authRoutesApi = require('./routes/apis/authRoutes');
const loginRoutesPage = require('./routes/pages/loginRoutes');
const gamesRoutesApi = require('./routes/apis/gamesRoutes');
const dashboardRoutesPage = require('./routes/pages/dashboardRoutes');
const gamesRoutesPage = require('./routes/pages/gamesRoutes');

app.use('/api/auth', authRoutesApi);
app.use('/admin', 
  loginRoutesPage,
  gamesRoutesApi,
  dashboardRoutesPage,
  gamesRoutesPage,
);

module.exports = app;