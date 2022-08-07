const express = require("express");

const router = express.Router();
const {
    loginApi,
    addAdminApi,
    signOutApi,
} = require("../../controllers/apis/authController");

const {
    authLogin,
} = require("../../utils/auth");

router.post("/login", loginApi);
router.post("/add", addAdminApi);
router.post('/sign_out', authLogin, signOutApi);

module.exports = router;
