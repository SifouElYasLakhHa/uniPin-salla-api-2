const express = require("express");

const router = express.Router();
const {
    loginPage,
} = require("./../../controllers/pages/loginController");

router.get("/login", loginPage);

module.exports = router;
