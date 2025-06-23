const express = require("express");
const router = express.Router();
const {checkCrudStatus,setCrudPassword, crudLogin , register, login} = require("../controllers/authController.js");
const authMiddleware =require('../middlewares/authMiddleware.js');

router.post("/register", register);
router.post("/login", login);
router.post("/checkcrud", authMiddleware, checkCrudStatus);
router.post("/setcrud", authMiddleware, setCrudPassword);
router.post("/crudlogin", authMiddleware, crudLogin);

module.exports = router;
