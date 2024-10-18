// backend/models/Photo.js
const db = require('../config/db');

const Photo = {
  // Get all photos
  getAll: (callback) => {
    const sql = 'SELECT * FROM photos';
    db.query(sql, callback);
  },

  // Get a photo by ID
  getById: (id, callback) => {
    const sql = 'SELECT * FROM photos WHERE id = ?';
    db.query(sql, [id], callback);
  },

  // Add a new photo
  add: (photoPath, callback) => {
    const sql = 'INSERT INTO photos (path) VALUES (?)';
    db.query(sql, [photoPath], callback);
  },

  // Delete a photo by ID
  delete: (id, callback) => {
    const sql = 'DELETE FROM photos WHERE id = ?';
    db.query(sql, [id], callback);
  },

  // Update an existing photo by ID
  update: (id, newPath, callback) => {
    const sql = 'UPDATE photos SET path = ? WHERE id = ?';
    db.query(sql, [newPath, id], callback);
  },
};

module.exports = Photo;