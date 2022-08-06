const express = require("express");

const router = express.Router();
const {
    orderAddPage,
} = require("../../controllers/pages/gamesController");
const {
    authLogin,
} = require("../../utils/auth");

router.get("/order/add", authLogin, orderAddPage);

module.exports = router;
