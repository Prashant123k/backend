const express = require("express");
const { protect, admin } = require("../middlewares/authMiddleware");
const controllers = require("../controllers");

const router = express.Router();
router.post("/", protect, controllers.orderController.createOrder);
router.get("/my-orders", protect, controllers.orderController.getUserOrders);
router.get("/:id", protect, controllers.orderController.getOrderById);
router.get("/", protect, admin, controllers.orderController.getAllOrders);
router.put("/:id/pay", protect, controllers.orderController.updateOrderToPaid);

module.exports = router;
