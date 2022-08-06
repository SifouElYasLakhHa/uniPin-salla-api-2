const express = require("express");

const router = express.Router();
const {
    gameDetailsUniPin,
    validateUserUniPin,
    createOrderUniPin,
} = require("../../controllers/apis/gamesController");
const {
    authLogin,
} = require("../../utils/auth");

router.get("/game/views", authLogin, gameDetailsUniPin);
router.post("/user/validate", authLogin, validateUserUniPin);
router.post("/order/create", authLogin, createOrderUniPin);

module.exports = router;
