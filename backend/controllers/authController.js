const Users = require("../models/Users.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Check if user has already set a CRUD password
const checkCrudStatus = async (req, res) => {
  try {
    // console.log("req.userId in checkCrudStatus:", req.userId);
    const user = await Users.findById(req.user.id);
    res.json({ hasCrudPassword: !!user.crudPassword });
  } catch (err) {
    // console.error("checkCrudStatus error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

const setCrudPassword = async (req, res) => {
  const { crudPassword } = req.body;
  try {
    const hashed = await bcrypt.hash(crudPassword, 10);
    await Users.findByIdAndUpdate(req.userId, { crudPassword: hashed });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ msg: "Failed to set password" });
  }
};

// Login with CRUD password
const crudLogin = async (req, res) => {
  const { crudPassword } = req.body;
  if (!crudPassword) return res.status(400).json({ msg: "crudPassword is required" });

  try {
    const userId = req.user?.id || req.userId; // Support both possibilities
    const user = await Users.findById(userId);
    console.log(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });
    const isMatch = await bcrypt.compare(crudPassword, user.crudPassword);
    console.log(`${user.crudPassword}`);
    console.log(`${crudPassword}`);
    if (!isMatch) return res.status(401).json({ msg: "Invalid crud password" });
    const crudToken = jwt.sign({ id: user._id, crud: true }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ success:"true",crudToken });
    // res.json({ success: true });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExists = await Users.findOne({ username });
    if (userExists) return res.status(400).json({ msg: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    // const hashedCrudPassword = await bcrypt.hash(crudPassword, 10);

    const user = new Users({
      username,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error registering user" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({ username });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ msg: "Error logging in" });
  }
};


module.exports = {
  checkCrudStatus,
  setCrudPassword,
  crudLogin,
  register,
  login,
  
};
