const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/logout", (req, res) => {
    res.clearCookie("token", { httpOnly: true, sameSite: "None", secure: true });
    res.json({ message: "Logged out successfully" });
});

module.exports = router;
