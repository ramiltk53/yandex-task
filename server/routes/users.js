const express = require('express');
const {
  getUser,
  getUsers
} = require("../controllers/users");

const router = express.Router();

router.route("/").get(getUsers);
router.route("/:id").get(getUser);

module.exports = router;
