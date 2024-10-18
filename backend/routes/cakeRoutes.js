// routes/cakeRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const { getAllCakes, addCake, updateCake, deleteCake } = require('../controllers/cakeController');

const router = express.Router();

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// API routes
router.get('/cakes', getAllCakes); // Fetch all cakes
router.post('/cakes', upload.single('image'), addCake); // Add a new cake
router.put('/cakes/:id', upload.single('image'), updateCake); // Update a cake
router.delete('/cakes/:id', deleteCake); // Delete a cake

module.exports = router;
