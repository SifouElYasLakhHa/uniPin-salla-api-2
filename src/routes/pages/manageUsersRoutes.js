const express = require("express");

const router = express.Router();
const {
    usersPage,
    twitterUsersUpdate,
} = require("../controllers/manageUsersController");

router.get("/users", usersPage);
router.put("/users/update", twitterUsersUpdate);

module.exports = router;