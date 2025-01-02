const express = require("express");
const { protect, admin } = require("../middlewares/authMiddleware");
const controllers = require("../controllers");

const router = express.Router();
router.get("/", controllers.productController.getAllProducts);
router.get("/:id", controllers.productController.getProductById);
router.post("/", protect, admin, controllers.productController.createProduct);
router.put("/:id", protect, admin, controllers.productController.updateProduct);
router.delete(
  "/:id",
  protect,
  admin,
  controllers.productController.deleteProduct
);

module.exports = router;
