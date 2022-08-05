const express = require("express");

const router = express.Router();
const {
    loginApi,
    addAdminApi,
} = require("../../controllers/apis/authController");

router.post("/login", loginApi);
router.post("/add", addAdminApi);

module.exports = router;
