import React from "react";
import '../card.css';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material"; 

export default function ProductCard({ product, crudMode, onEdit, onDelete }) {
  return (
    <Card  className="card" sx={{width: { xs: 150, sm: 200, md: 245 },height: crudMode ? 375 : 290,display: "flex",flexDirection: "column", boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="140"
        sx={{ flex: "0 0 60%", objectFit: "cover" }}
        image={`${product.imageUrl}`}
        alt={product.name}
      />
      <CardContent sx={{ flex: "0 0 40%", padding: 1 }}>
        <Typography variant="body2">{product.name}</Typography>
        <Typography variant="body2" color="black"  type="string" >
          Price: ₹{product.price}
        </Typography> 
        <Typography variant="body2" color="black"  type="string">
          Option: {product.category}
        </Typography>
        <Typography variant="body2" color="text.secondary"  type="string">
          Extra_Info: {product.extraInfo}
        </Typography>

        {crudMode && (
          <Box sx={{ mt: 2 }}>
            <Button size="small" variant="outlined" onClick={() => onEdit(product)}>
              Edit
            </Button>
            <Button
              size="small" variant="outlined" color="error" sx={{ ml: 1 }} onClick={() => onDelete(product._id)}>
              Delete
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
