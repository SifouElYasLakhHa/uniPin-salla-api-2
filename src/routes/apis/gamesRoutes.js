const express = require("express");

const router = express.Router();
const {
    gameDetailsUniPin,
} = require("../../controllers/apis/gamesController");

router.get("/game/views", gameDetailsUniPin);

module.exports = router;
