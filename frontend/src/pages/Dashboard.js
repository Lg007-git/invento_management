  import { useEffect, useState } from "react";
  import axios from "axios";
  import {Button,Modal,Box,Typography,TextField,Grid} from "@mui/material";
  import ProductCard from "../components/Cards.js";
  import AddProduct from "../components/AddProduct.js";
  import EditProduct from "../components/EditProduct";  


  function Dashboard() {
    const [products, setProducts] = useState([]);
    const [crudMode, setCrudMode] = useState(false);
    const [crudPassword, setCrudPassword] = useState("");
    const [open, setOpen] = useState(false);
    const token = localStorage.getItem("token");
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // ✅ new state
    const [editingProduct, setEditingProduct] = useState(null);


    useEffect(() => {
      if (!token) return;
      const fetchProducts = async () => {
        try {
          const res = await axios.get("https://invento-management.onrender.com/api/products",{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });   
          setProducts(res.data);
        } catch (err) {
          alert("Session expired or unauthorized");
        }
      };
      fetchProducts();
    }, [token]);


    const handleDelete = async (productId) => {
          if (!window.confirm("Are you sure you want to delete this product?")) return;

          try {
            const crudToken = localStorage.getItem("crudToken");
            await axios.delete(`https://invento-management.onrender.com/api/products/${productId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
                "x-crud-token": crudToken, // if your backend expects it, else remove this
              },
            });

            // Remove from state
            setProducts(prev => prev.filter(p => p._id !== productId));
          } catch (err) {
            console.error("❌ Delete Error:", err);
            alert("Error deleting product");
          }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
      };


    const handleCrudLogin = async () => {
      try {
        const res = await axios.post(
          "https://invento-management.onrender.com/api/crudlogin",
          { crudPassword },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(crudPassword);
        console.log(res.data.success);
        if (res.data.success && res.data.crudToken) {
          localStorage.setItem("crudToken", res.data.crudToken); // ✅ Save CRUD token
          console.log(res.data.crudToken);
          setCrudMode(true);
          setOpen(false);
        }
      } catch (err) {
        alert("Invalid CRUD password");
      }
    };

    const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

    return (
      <div style={{padding: "2rem" }}>
        <div style={{ display: "flex", flexDirection: "column",gap:"-2rem",justifyContent: "space-between" }}>
          <div style={{ display: "flex", justifyContent: "space-between",marginBottom:"0.1rem" }}>
          <h2>Your Products</h2>
          <form
              onSubmit={(e) => {
                e.preventDefault(); // Prevent page reload
                // You can optionally trigger something here if needed
              }}
            >
              <TextField
                label="Search"
                variant="outlined"
                color="white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ width: "10rem" }}
                slotProps={{inputLabel: {sx: { color: "white" }, },}} // ✅ Label color} // Also ensures label color is white
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // Ensure no form submission/reload
                  }
                }}
              />
            </form>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between",marginBottom:"1rem" }}>
          {(!crudMode)?
          <Button onClick={() => setOpen(true)} variant="outlined">
            Admin Login
          </Button>
          :
          <Button onClick={() => setCrudMode(false)} color="secondary">
              Exit Admin Mode
          </Button>
          }
          {crudMode && (
              <Button variant="contained" onClick={() => setShowAddDialog(true)} sx={{ mt: 2 }}>
                    Add Product
              </Button>
            )}
            </div>
            <AddProduct
                  open={showAddDialog}
                  onClose={() => setShowAddDialog(false)}
                  token={token}
                  onProductAdded={(res) => setProducts(prev => [...prev, res.product])}
            />

        </div>

        {products.length === 0 ? (
          // console.log(products),
          <p>No products found.</p>
        ) : (
          <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <ProductCard 
                    product={product} 
                    crudMode={crudMode} 
                    onEdit={handleEdit}
                    onDelete={() => handleDelete(product._id)}                    
              />
            </Grid>
          ))}
        </Grid>
        )}

        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300, bgcolor: 'black', boxShadow: 24, p: 4
          }}>
            <Typography variant="h6">Enter CRUD Password</Typography>
            <TextField
              type="password"
              fullWidth
              margin="normal"
              value={crudPassword}
              onChange={(e) => setCrudPassword(e.target.value)}
            />
            <Button fullWidth variant="contained" onClick={handleCrudLogin}>
              Submit
            </Button>
          </Box>
          

        </Modal>
        <EditProduct
                open={!!editingProduct}
                onClose={() => setEditingProduct(null)}
                token={token}
                product={editingProduct}
                onProductUpdated={(updatedProduct) =>
                  setProducts((prev) =>
                    prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
                  )
                }
            />

      </div>
    );
  }

  export default Dashboard;
