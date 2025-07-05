import { useState } from "react";
import {Modal,Box,Typography,TextField,Button} from "@mui/material";
import axios from "axios";

export default function AddProduct({ open, onClose, token, onProductAdded }) {
const [name, setName] = useState("");
const [price, setPrice] = useState("");
const [option, setOption] = useState("");
const [image, setImage] = useState(null);
const [extraInfo,setExtraInfo] =useState("");

const handleSubmit = async (e) => {
    // what
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);    
    formData.append("category", option);
    formData.append("image", image);
    formData.append("extraInfo",extraInfo);

    try {
        console.log("Adding product:", { name, price, option, image });
        const res = await axios.post("https://invento-management.onrender.com/api/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-crud-token": localStorage.getItem("crudToken"), 
          "Content-Type": "multipart/form-data"
        },
      });

      console.log("Add product response:", res.data);

      onProductAdded(res.data); // Pass new product to parent
      onClose(); // Close modal
      setName("");
      setPrice("");
      setOption("");
      setImage(null);
      setExtraInfo("");
    } catch (err) {
        console.error("Failed to add product:", err.response?.data || err.message);
      console.error(err);
      alert("Failed to add product");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '20rem',
          bgcolor: 'white',
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          color: 'black'
        }}
      >
        <Typography variant="h6" gutterBottom>Add New Product</Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <TextField
            label="Name"
            type="string"
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
            type ="string"
            fullWidth
            value={option}
            onChange={(e) => setOption(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label ="Extra_Info"
            type= "string"
            fullWidth
            value ={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
            margin="normal"
            required
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            capture="environment"  // 📸 this line opens rear camera
            required
            style={{ marginTop: "1rem" ,color: 'black'}}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
