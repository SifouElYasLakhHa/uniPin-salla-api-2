const express = require("express");

const router = express.Router();
const {
    vouchersPages,
} = require("../../controllers/pages/manageVouchersController");

router.get("/voucher/add", vouchersPages);

module.exports = router;