const Products = require("../models/Products.js");
const path = require("path");
const fs = require("fs");
const cloudinary = require("../config/cloudinary.js");

// GET all products for logged-in user
const getProducts = async (req, res) => {
  try {
    const products = await Products.find({ userId: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching products" });
  }
};

// // CREATE product (CRUD token required)
// const createProduct = async (req, res) => {
//   try {
//     console.log("BODY:", req.body);
//     console.log("FILE:", req.file);
//     console.log("USER:", req.user);
//     const { name, price, category} = req.body;
//     // const imageUrl = req.file ? `uploads/${req.file.filename}` : "";
//     const imageUrl = req.file ? req.file.path : ""; // Cloudinary gives a hosted URL

//     const product = new Products({
//       name,
//       price,
//       category,
//       imageUrl,
//       userId: req.user.id,
//     });

//     await product.save();
//     res.status(201).json({ msg: "Product created", product });
//   } catch (err) {
//     console.error("❌ Product Creation Error:", err);
//     res.status(500).json({ msg: "Error creating product" });
//   }
// };


// CREATE product (with Cloudinary image upload)
const createProduct = async (req, res) => {
  try {
    const { name, price, category,extraInfo } = req.body;

    if (!req.file) {
      return res.status(400).json({ msg: "Image file is required" });
    }

    // Upload to Cloudinary using absolute path
    const filePath = path.resolve(req.file.path);

    const result = await cloudinary.uploader.upload(filePath, {
      folder: "products",
    });

    // Save product to DB
    const product = new Products({
      name,
      price,
      category,
      imageUrl: result.secure_url,
      extraInfo,
      userId: req.user.id,

    });

    await product.save();

    // Delete local file
    fs.unlinkSync(filePath);

    res.status(201).json({ msg: "Product created", product });
  } catch (err) {
    console.error("❌ Product Creation Error:", err);
    res.status(500).json({ msg: "Error creating product" });
  }
};


// // UPDATE product (only owner with CRUD token)
// const updateProduct = async (req, res) => {
//   const { id } = req.params;
//   const { name, price, category, imageUrl } = req.body;

//   try {
//     const updated = await Products.findOneAndUpdate(
//       { _id: id, userId: req.user.id },
//       { name, price, category, imageUrl },
//       { new: true }
//     );
//     if (!updated) return res.status(404).json({ msg: "Product not found" });
//     res.json({ msg: "Product updated", updated });
//   } catch (err) {
//     res.status(500).json({ msg: "Error updating product" });
//   }
// };

// // DELETE product (only owner with CRUD token)
// const deleteProduct = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deleted = await Products.findOneAndDelete({ _id: id, userId: req.user.id });
//     if (!deleted) return res.status(404).json({ msg: "Product not found" });
//     res.json({ msg: "Product deleted" });
//   } catch (err) {
//     res.status(500).json({ msg: "Error deleting product" });
//   }
// };

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, category, extraInfo } = req.body;

  try {
    const product = await Products.findOne({ _id: id, userId: req.user.id });
    if (!product) return res.status(404).json({ msg: "Product not found" });

    let imageUrl = product.imageUrl; // keep existing

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path);
      imageUrl = uploadResult.secure_url;
      fs.unlinkSync(req.file.path);
    }

    product.name = name;
    product.price = price;
    product.category = category;
    product.extraInfo = extraInfo ;
    product.imageUrl = imageUrl;

    const updated = await product.save();

    res.json({ msg: "Product updated", updated });
  } catch (err) {
    console.error("❌ Product Update Error:", err);
    res.status(500).json({ msg: "Error updating product" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Products.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!product) return res.status(404).json({ msg: "Product not found" });

    // Optional: delete image from Cloudinary (if using public_id structure)
    // const publicId = extractPublicId(product.imageUrl); // You must implement this
    // await cloudinary.uploader.destroy(publicId);

    res.json({ msg: "Product deleted" });
  } catch (err) {
    console.error("❌ Product Deletion Error:", err);
    res.status(500).json({ msg: "Error deleting product" });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
