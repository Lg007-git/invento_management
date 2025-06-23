const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },          // for login
    crudPassword: { type: String, }       // for second login (CRUD)
});

module.exports = mongoose.model("Users", userSchema);
