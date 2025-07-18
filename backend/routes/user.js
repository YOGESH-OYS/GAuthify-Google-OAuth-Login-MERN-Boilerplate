const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const router = express.Router();

router.get("/me", authenticateToken, (req, res) => {
  const { name, email, avatar, role } = req.user;
  res.json({ name, email, avatar, role });
});

module.exports = router;
