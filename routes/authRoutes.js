const express = require('express');
const { signup,login } = require('../controllers/authControllers');

const router = express.Router();

// // Sign-Up Route
router.post("/signup",signup)

// // Login Route
router.post('/login', login);

module.exports = router;