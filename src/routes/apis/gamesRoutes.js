const express = require("express");

const router = express.Router();
const {
    gameDetailsUniPin,
    validateUserUniPin,
} = require("../../controllers/apis/gamesController");

router.get("/game/views", gameDetailsUniPin);
router.post("/user/validate", validateUserUniPin);

module.exports = router;
