const express = require("express");

const router = express.Router();
const {
    dashboardPage,
} = require("../../controllers/pages/dashboardController");

router.get("/dashboard", dashboardPage);

module.exports = router;
