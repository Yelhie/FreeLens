const express = require("express");
const router = express.Router();

router.use("/photographes", require("./photographer.routes"));

module.exports = router;
