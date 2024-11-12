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



// const express = require('express');
// const cors = require('cors');
// const multer = require('multer');
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');
// const path = require('path');
// const fs = require('fs');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static('uploads'));

// // MySQL database connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',  // Your MySQL username
//   password: '',  // Your MySQL password
//   database: 'cakeshop',  // Your database name
// });

// db.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to MySQL database');
// });

// // Multer configuration for image uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Store images with unique names
//   },
// });

// const upload = multer({ storage });

// // Endpoint for adding new cake data and image
// app.post('/upload', upload.single('image'), (req, res) => {
//   const { name, category, price, quantity } = req.body;
//   const imagePath = `/uploads/${req.file.filename}`;

//   // Insert data into MySQL database
//   const query = 'INSERT INTO cakes (name, category, price, quantity, image) VALUES (?, ?, ?, ?, ?)';
//   db.query(query, [name, category, price, quantity, imagePath], (err, result) => {
//     if (err) {
//       res.status(500).send('Error saving data');
//       return;
//     }
//     res.status(200).send({ success: true, message: 'Cake added successfully', cakeId: result.insertId });
//   });
// });


// // Serve the uploaded images
// app.use('/uploads', express.static('uploads'));


// // Endpoint to fetch cake data
// app.get('/cakes', (req, res) => {
//     const query = 'SELECT * FROM cakes';
    
//     db.query(query, (err, results) => {
//       if (err) {
//         res.status(500).send('Error fetching data');
//         return;
//       }
//       res.status(200).json(results); // Send cake data to frontend
//     });
//   });
  

// // Start the server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });






const express = require('express');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const app = express();
const SECRET_KEY = process.env.SECRET_KEY; 
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); //json middleware
app.use(express.static('uploads'));
app.use('/photos', express.static('photos')); // Use 'photos' folder for custom cakes
const verifyToken = require('./middleware/authMiddleware');
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

// Endpoint to save contact messages
app.post('/contact', (req, res) => {
  const { name, email, message, phone } = req.body;

  const query = 'INSERT INTO contact_messages (name, email, message, phone) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, message, phone], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Error saving contact message' });
    }
    res.status(200).json({ success: true, message: 'Message saved successfully', messageId: result.insertId });
  });
});

// Endpoint to fetch contact messages for admin
app.get('/contact', (req, res) => {
  const query = 'SELECT * FROM contact_messages ORDER BY created_at DESC'; // Fetch messages in descending order

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Error fetching contact messages' });
    }
    res.status(200).json(results); // Send contact messages to frontend
  });
});

// Endpoint to update a contact message
app.put('/contact/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, message, phone } = req.body;

  const query = 'UPDATE contact_messages SET name = ?, email = ?, message = ?, phone = ? WHERE id = ?';
  db.query(query, [name, email, message, phone, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Error updating contact message' });
    }
    res.status(200).json({ success: true, message: 'Message updated successfully' });
  });
});

// Endpoint to delete a contact message
app.delete('/contact/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM contact_messages WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Error deleting contact message' });
    }
    res.status(200).json({ success: true, message: 'Message deleted successfully' });
  });
});



// Endpoint to update a cake's image
app.put('/upload/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { name, category, price, quantity } = req.body;
  let imagePath;

  if (req.file) {
    imagePath = `/uploads/${req.file.filename}`; // New image path if updated
  }

  // Update query to update the cake's details
  const query = `
    UPDATE cakes 
    SET name = ?, category = ?, price = ?, quantity = ? ${req.file ? ', image = ?' : ''} 
    WHERE id = ?
  `;
  const params = [name, category, price, quantity, ...(req.file ? [imagePath] : []), id];

  db.query(query, params, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Error updating cake' });
    }
    res.status(200).json({ success: true, message: 'Cake updated successfully' });
  });
});









// Endpoint to delete a cake
app.delete('/upload/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM cakes WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Error deleting cake' });
    }
    res.status(200).json({ success: true, message: 'Cake deleted successfully' });
  });
});












// Endpoint to update a cake's image
app.put('/upload/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { name, category, price, quantity } = req.body;
  let imagePath;

  if (req.file) {
    imagePath = `/uploads/${req.file.filename}`; // New image path if updated
  }

  // Update query to update the cake's details
  const query = `
    UPDATE cakes 
    SET name = ?, category = ?, price = ?, quantity = ? ${req.file ? ', image = ?' : ''} 
    WHERE id = ?
  `;
  const params = [name, category, price, quantity, ...(req.file ? [imagePath] : []), id];

  db.query(query, params, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Error updating cake' });
    }
    res.status(200).json({ success: true, message: 'Cake updated successfully' });
  });
});























// Multer configuration for custom cake image uploads
const customStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'photos/'); // Destination folder for custom cake images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Store images with unique names
  },
});

const customUpload = multer({ storage: customStorage });

// Endpoint for adding a new custom cake
app.post('/custom_upload', customUpload.single('image'), (req, res) => {
  const { name, category, price, quantity } = req.body;
  const imagePath = `/photos/${req.file.filename}`;

  const query = 'INSERT INTO custom_cakes (name, category, price, quantity, image) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, category, price, quantity, imagePath], (err, result) => {
    if (err) {
      res.status(500).send('Error saving data');
      return;
    }
    res.status(200).send({ success: true, message: 'Custom cake added successfully', cakeId: result.insertId });
  });
});

// Endpoint to fetch custom cake data
app.get('/custom_cakes', (req, res) => {
  const query = 'SELECT * FROM custom_cakes';

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error fetching data');
      return;
    }
    res.status(200).json(results);
  });
});

// Endpoint to update a custom cake
app.put('/custom_upload/:id', customUpload.single('image'), (req, res) => {
  const { id } = req.params;
  const { name, category, price, quantity } = req.body;
  let imagePath;

  if (req.file) {
    imagePath = `/photos/${req.file.filename}`;
  }

  const query = `
    UPDATE custom_cakes 
    SET name = ?, category = ?, price = ?, quantity = ? ${req.file ? ', image = ?' : ''} 
    WHERE id = ?
  `;
  const params = [name, category, price, quantity, ...(req.file ? [imagePath] : []), id];

  db.query(query, params, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Error updating custom cake' });
    }
    res.status(200).json({ success: true, message: 'Custom cake updated successfully' });
  });
});

// Endpoint to delete a custom cake
app.delete('/custom_upload/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM custom_cakes WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Error deleting custom cake' });
    }
    res.status(200).json({ success: true, message: 'Custom cake deleted successfully' });
  });
});




// Endpoint to save contact messages
app.post('/contact', (req, res) => {
  const { name, email, message, phone } = req.body;

  const query = 'INSERT INTO contact_messages (name, email, message, phone) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, message, phone], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Error saving contact message' });
    }
    res.status(200).json({ success: true, message: 'Message saved successfully', messageId: result.insertId });
  });
});

// Endpoint to fetch contact messages for admin
app.get('/contact', (req, res) => {
  const query = 'SELECT * FROM contact_messages ORDER BY created_at DESC'; // Fetch messages in descending order

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Error fetching contact messages' });
    }
    res.status(200).json(results); // Send contact messages to frontend
  });
});




// Endpoint to update a contact message
app.put('/contact/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, message, phone } = req.body;

  const query = 'UPDATE contact_messages SET name = ?, email = ?, message = ?, phone = ? WHERE id = ?';
  db.query(query, [name, email, message, phone, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Error updating contact message' });
    }
    res.status(200).json({ success: true, message: 'Message updated successfully' });
  });
});

// Endpoint to delete a contact message
app.delete('/contact/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM contact_messages WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Error deleting contact message' });
    }
    res.status(200).json({ success: true, message: 'Message deleted successfully' });
  });
});












// //admin login authentication
// // Backend route (e.g., Express.js)
// app.post('/api/admin/login', (req, res) => {
//   const { username, password } = req.body;
//   if (username === 'admin' && password === 'password123') {
//     const token = generateToken(); // Generate a secure token
//     res.json({ token });
//   } else {
//     res.status(401).json({ message: 'Invalid credentials' });
//   }
// });


app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'password123') {
    // Generate a token using the secret key from .env
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('/api/admin', verifyToken, (req, res) => {
  res.json({ message: 'Welcome to the Admin Panel', user: req.user });
});















// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




// const express = require('express');
// const cors = require('cors');
// const multer = require('multer');
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');
// const path = require('path');
// const fs = require('fs');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static('uploads')); // Use 'uploads' folder for normal cakes
// app.use('/photos', express.static('photos')); // Use 'photos' folder for custom cakes

// // MySQL database connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root', // Your MySQL username
//   password: '', // Your MySQL password
//   database: 'cakeshop', // Your database name
// });

// db.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to MySQL database');
// });

// // Multer configuration for normal cake image uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Destination folder for normal cake images
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Store images with unique names
//   },
// });

// const upload = multer({ storage });

// // Endpoint for adding new cake data and image
// app.post('/upload', upload.single('image'), (req, res) => {
//   const { name, category, price, quantity } = req.body;
//   const imagePath = `/uploads/${req.file.filename}`;

//   // Insert data into MySQL database
//   const query = 'INSERT INTO cakes (name, category, price, quantity, image) VALUES (?, ?, ?, ?, ?)';
//   db.query(query, [name, category, price, quantity, imagePath], (err, result) => {
//     if (err) {
//       res.status(500).send('Error saving data');
//       return;
//     }
//     res.status(200).send({ success: true, message: 'Cake added successfully', cakeId: result.insertId });
//   });
// });

// // Endpoint to fetch cake data
// app.get('/cakes', (req, res) => {
//   const query = 'SELECT * FROM cakes';

//   db.query(query, (err, results) => {
//     if (err) {
//       res.status(500).send('Error fetching data');
//       return;
//     }
//     res.status(200).json(results); // Send cake data to frontend
//   });
// });

// // Endpoint to update a cake's image
// app.put('/upload/:id', upload.single('image'), (req, res) => {
//   const { id } = req.params;
//   const { name, category, price, quantity } = req.body;
//   let imagePath;

//   if (req.file) {
//     imagePath = `/uploads/${req.file.filename}`; // New image path if updated
//   }

//   // Update query to update the cake's details
//   const query = `
//     UPDATE cakes 
//     SET name = ?, category = ?, price = ?, quantity = ? ${req.file ? ', image = ?' : ''} 
//     WHERE id = ?
//   `;
//   const params = [name, category, price, quantity, ...(req.file ? [imagePath] : []), id];

//   db.query(query, params, (err, result) => {
//     if (err) {
//       console.error('Database error:', err);
//       return res.status(500).json({ success: false, message: 'Error updating cake' });
//     }

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ success: false, message: 'Cake not found' });
//     }

//     res.status(200).json({ success: true, message: 'Cake updated successfully' });
//   });
// });

// // Endpoint to delete a cake
// app.delete('/upload/:id', (req, res) => {
//   const { id } = req.params;

//   const query = 'DELETE FROM cakes WHERE id = ?';
//   db.query(query, [id], (err, result) => {
//     if (err) {
//       console.error('Database error:', err);
//       return res.status(500).json({ success: false, message: 'Error deleting cake' });
//     }

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ success: false, message: 'Cake not found' });
//     }

//     res.status(200).json({ success: true, message: 'Cake deleted successfully' });
//   });
// });

// // Multer configuration for custom cake image uploads
// const customStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'photos/'); // Destination folder for custom cake images
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Store images with unique names
//   },
// });

// const customUpload = multer({ storage: customStorage });

// // Endpoint for adding a new custom cake
// app.post('/custom_upload', customUpload.single('image'), (req, res) => {
//   const { name, category, price, quantity } = req.body;
//   const imagePath = `/photos/${req.file.filename}`;

//   const query = 'INSERT INTO custom_cakes (name, category, price, quantity, image) VALUES (?, ?, ?, ?, ?)';
//   db.query(query, [name, category, price, quantity, imagePath], (err, result) => {
//     if (err) {
//       res.status(500).send('Error saving data');
//       return;
//     }
//     res.status(200).send({ success: true, message: 'Custom cake added successfully', cakeId: result.insertId });
//   });
// });

// // Endpoint to fetch custom cake data
// app.get('/custom_cakes', (req, res) => {
//   const query = 'SELECT * FROM custom_cakes';

//   db.query(query, (err, results) => {
//     if (err) {
//       res.status(500).send('Error fetching data');
//       return;
//     }
//     res.status(200).json(results);
//   });
// });

// // Endpoint to update a custom cake
// app.put('/custom_upload/:id', customUpload.single('image'), (req, res) => {
//   const { id } = req.params;
//   const { name, category, price, quantity } = req.body;
//   let imagePath;

//   if (req.file) {
//     imagePath = `/photos/${req.file.filename}`;
//   }

//   const query = `
//     UPDATE custom_cakes 
//     SET name = ?, category = ?, price = ?, quantity = ? ${req.file ? ', image = ?' : ''} 
//     WHERE id = ?
//   `;
//   const params = [name, category, price, quantity, ...(req.file ? [imagePath] : []), id];

//   db.query(query, params, (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ success: false, message: 'Error updating custom cake' });
//     }
//     res.status(200).json({ success: true, message: 'Custom cake updated successfully' });
//   });
// });

// // Endpoint to delete a custom cake
// app.delete('/custom_upload/:id', (req, res) => {
//   const { id } = req.params;

//   const query = 'DELETE FROM custom_cakes WHERE id = ?';
//   db.query(query, [id], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ success: false, message: 'Error deleting custom cake' });
//     }
//     res.status(200).json({ success: true, message: 'Custom cake deleted successfully' });
//   });
// });




// // Endpoint to save contact messages
// app.post('/contact', (req, res) => {
//   const { name, email, message, phone } = req.body;

//   const query = 'INSERT INTO contact_messages (name, email, message, phone) VALUES (?, ?, ?, ?)';
//   db.query(query, [name, email, message, phone], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ success: false, message: 'Error saving contact message' });
//     }
//     res.status(200).json({ success: true, message: 'Message saved successfully', messageId: result.insertId });
//   });
// });

// // Endpoint to fetch contact messages for admin
// app.get('/contact', (req, res) => {
//   const query = 'SELECT * FROM contact_messages ORDER BY created_at DESC'; // Fetch messages in descending order

//   db.query(query, (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ success: false, message: 'Error fetching contact messages' });
//     }
//     res.status(200).json(results); // Send contact messages to frontend
//   });
// });




// // Endpoint to update a contact message
// app.put('/contact/:id', (req, res) => {
//   const { id } = req.params;
//   const { name, email, message, phone } = req.body;

//   const query = 'UPDATE contact_messages SET name = ?, email = ?, message = ?, phone = ? WHERE id = ?';
//   db.query(query, [name, email, message, phone, id], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ success: false, message: 'Error updating contact message' });
//     }
//     res.status(200).json({ success: true, message: 'Message updated successfully' });
//   });
// });

// // Endpoint to delete a contact message
// app.delete('/contact/:id', (req, res) => {
//   const { id } = req.params;

//   const query = 'DELETE FROM contact_messages WHERE id = ?';
//   db.query(query, [id], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ success: false, message: 'Error deleting contact message' });
//     }
//     res.status(200).json({ success: true, message: 'Message deleted successfully' });
//   });
// });

// // Start the server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



















































































































