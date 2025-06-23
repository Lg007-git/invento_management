const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

const {getProducts,createProduct,updateProduct,deleteProduct} = require("../controllers/productController.js");

const authMiddleware = require("../middlewares/authMiddleware.js");
const crudMiddleware = require("../middlewares/crudMiddleware.js");

// Routes
router.post("/products",authMiddleware,crudMiddleware,upload.single("image"), createProduct); // <-- this handles image upload
router.get("/products", authMiddleware, getProducts);
// router.post("/products", authMiddleware, crudMiddleware, createProduct);
router.put("/products/:id", authMiddleware, crudMiddleware, updateProduct);
router.delete("/products/:id", authMiddleware, crudMiddleware, deleteProduct);


module.exports = router;
