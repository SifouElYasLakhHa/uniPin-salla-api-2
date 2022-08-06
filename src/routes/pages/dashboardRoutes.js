const express = require("express");

const router = express.Router();
const {
    dashboardPage,
} = require("../../controllers/pages/dashboardController");
const {
    authLogin,
} = require("../../utils/auth");

router.get("/dashboard", authLogin, dashboardPage);

module.exports = router;
