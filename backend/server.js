const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); 

dotenv.config();
const app = express();

app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(express.json());


// Routes
const authRoutes = require("./routes/authRoute.js");
const productRoutes = require("./routes/productRoute.js");

app.use("/api", authRoutes);
app.use("/api", productRoutes);
    
// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
  app.listen(5000, () => console.log("Server running on port 5000"));
}).catch(err => console.log(err));