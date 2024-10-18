const Photo = require('../Models/Photo');
const path = require('path');
const multer = require('multer');
const fs = require('fs'); // Import the fs module to handle file operations

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/upoads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Get all photos
exports.getPhotos = (req, res) => {
  Photo.getAll((err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

// Add a photo
exports.addPhoto = (req, res) => {
  const filePath = `/uploads/${req.file.filename}`;
  Photo.add(filePath, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Photo added', filePath });
  });
};

// Delete a photo
exports.deletePhoto = (req, res) => {
  Photo.getById(req.params.id, (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    // Get the path of the photo to delete it from the filesystem
    const filePath = path.join(__dirname, '../public', result[0].path);

    // Delete the photo record from the database
    Photo.delete(req.params.id, (err) => {
      if (err) throw err;

      // Delete the photo from the filesystem
      fs.unlink(filePath, (fsErr) => {
        if (fsErr) {
          console.error('Error deleting file:', fsErr);
          return res.status(500).json({ message: 'Photo deleted from database but failed to delete from filesystem', error: fsErr });
        }

        res.json({ message: 'Photo deleted successfully' });
      });
    });
  });
};

// Update a photo
exports.updatePhoto = (req, res) => {
  const filePath = `/uploads/${req.file.filename}`;
  Photo.update(req.params.id, filePath, (err) => {
    if (err) throw err;
    res.json({ message: 'Photo updated' });
  });
};