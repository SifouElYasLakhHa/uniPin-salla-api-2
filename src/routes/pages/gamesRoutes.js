const express = require("express");

const router = express.Router();
const {
    orderAddPage,
} = require("../../controllers/pages/gamesController");

router.get("/order/add", orderAddPage);

module.exports = router;
