const { index, show, create } = require("../controllers/movies.controllers");

const router = require("express").Router();

router.get("/", index);
router.get("/:id", show);

module.exports = router;