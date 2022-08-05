const express = require("express");

const router = express.Router();
const {
    supportUsersPage,
} = require("../controllers/manageSupportUsersController");

router.get("/support/users", supportUsersPage);

module.exports = router;