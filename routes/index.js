const { index,create } = require("../controllers/bookmarks.controllers");
const auth = require("../middleware/auth.middleware");
const router = require("express").Router();

router.use(require("./auth"));
router.use(auth);

router.use("/movies", require("./movies"));
router.post("/bookmark/:id", create);
router.get("/mybookmark", index);

module.exports = router;
