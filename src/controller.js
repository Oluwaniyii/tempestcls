const removeSubdocs = require("mongoose/lib/plugins/removeSubdocs");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ hello: "hi" });
});

router.use("/auth", require("./components/auth/auth_api"));

module.exports = router;
