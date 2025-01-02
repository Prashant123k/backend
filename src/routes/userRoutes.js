const express = require("express");
const controllers = require("../controllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/register", controllers.userController.registerUser);
router.post("/login", controllers.userController.loginUser);
router.get("/profile", protect, controllers.userController.getUserProfile);

module.exports = router;
