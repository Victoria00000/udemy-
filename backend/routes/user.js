const express = require("express");

const router = express.Router();

const { home } = require("../controllers/userController.js");

router.get("/user", home);

module.exports = router;
