// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const photoRoutes = require('./routes/photoRoute');

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// // Serve images
// app.use('/uploads', express.static('public/uploads'));

// // Routes for photos
// app.use('/api', photoRoutes);

// // Start the server
// app.listen(5000, () => {
//     console.log('Server is running on port 5000');
//   });



const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('uploads'));

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Your MySQL username
  password: '',  // Your MySQL password
  database: 'cakeshop',  // Your database name
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Store images with unique names
  },
});

const upload = multer({ storage });

// Endpoint for adding new cake data and image
app.post('/upload', upload.single('image'), (req, res) => {
  const { name, category, price, quantity } = req.body;
  const imagePath = `/uploads/${req.file.filename}`;

  // Insert data into MySQL database
  const query = 'INSERT INTO cakes (name, category, price, quantity, image) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, category, price, quantity, imagePath], (err, result) => {
    if (err) {
      res.status(500).send('Error saving data');
      return;
    }
    res.status(200).send({ success: true, message: 'Cake added successfully', cakeId: result.insertId });
  });
});


// Serve the uploaded images
app.use('/uploads', express.static('uploads'));


// Endpoint to fetch cake data
app.get('/cakes', (req, res) => {
    const query = 'SELECT * FROM cakes';
    
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send('Error fetching data');
        return;
      }
      res.status(200).json(results); // Send cake data to frontend
    });
  });
  

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
