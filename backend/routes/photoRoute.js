// backend/routes/photoRoutes.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const photoController = require('../controllers/cakeController');

// Multer setup for image uploads
const upload = multer({ dest: 'public/uploads/' });

// Define routes
// Route to get all photos
router.get('/photos', photoController.getPhotos);

// Route to add a photo
router.post('/photos', upload.single('image'), photoController.addPhoto);

// Route to delete a photo by ID
router.delete('/photos/:id', photoController.deletePhoto);

// Route to update a photo by ID
router.put('/photos/:id', upload.single('image'), photoController.updatePhoto);

module.exports = router;