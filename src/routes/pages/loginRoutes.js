const express = require("express");

const router = express.Router();
const {
    loginPage,
} = require("./../../controllers/pages/loginController");

const {
    authLoginPage,
} = require("../../utils/auth");

router.get("/login", authLoginPage, loginPage);

module.exports = router;
