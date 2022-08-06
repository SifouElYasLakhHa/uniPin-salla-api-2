const express = require("express");

const router = express.Router();
const {
    gameDetailsUniPin,
    validateUserUniPin,
    createOrderUniPin,
} = require("../../controllers/apis/gamesController");

router.get("/game/views", gameDetailsUniPin);
router.post("/user/validate", validateUserUniPin);
router.post("/order/create", createOrderUniPin);

module.exports = router;
