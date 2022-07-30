const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = process.env.DB_URL;
exports.connectDB = async () => {
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Connected Successfully'))
    .catch((e) => {
      console.error(e)
      console.error('Not Connected')
    });
};
