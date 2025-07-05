import { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";

export default function EditProduct({ open, onClose, token, product, onProductUpdated }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [option, setOption] = useState("");
  const [image, setImage] = useState(null); // New image file
  const [extraInfo, setExtraInfo] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price || "");
      setOption(product.category || "");
      setExtraInfo(product.extraInfo || "");
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", option);
    formData.append("extraInfo", extraInfo);
    if (image) formData.append("image", image);

    try {
      const res = await axios.put(
        `https://invento-management.onrender.com/api/products/${product._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-crud-token": localStorage.getItem("crudToken"),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onProductUpdated(res.data.updated); // Update parent state
      onClose();
    } catch (err) {
      console.error("Edit error:", err.response?.data || err.message);
      alert("Failed to update product");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "20rem",
          bgcolor: "white",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          color: "black",
        }}
      >
        <Typography variant="h6" gutterBottom>Edit Product</Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Price"
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Category"
            fullWidth
            value={option}
            onChange={(e) => setOption(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Extra_Info"
            fullWidth
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
            margin="normal"
            required
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            style={{ marginTop: "1rem", color: "black" }}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Update
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
