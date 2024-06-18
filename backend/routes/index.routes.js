const express = require("express");
const router = express.Router();

router.use("/photographes", require("./photographer.routes"));
router.use("/medias", require("./media.routes"));

module.exports = router;
