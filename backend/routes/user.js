const express = require("express");

const router = express.Router();

const { register, activateAccount } = require("../controllers/userController.js");

router.post("/register", register);

router.post("/activate", activateAccount);

module.exports = router;
