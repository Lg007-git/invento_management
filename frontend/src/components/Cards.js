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

export default function ProductCard({ product, crudMode }) {
  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="160"
        image={`${product.imageUrl}`}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ₹{product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Option: {product.category}
        </Typography>

        {crudMode && (
          <Box sx={{ mt: 2 }}>
            <Button size="small" variant="outlined">
              Edit
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="error"
              sx={{ ml: 1 }}
            >
              Delete
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
