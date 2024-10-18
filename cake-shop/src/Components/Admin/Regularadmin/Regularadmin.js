// // frontend/src/components/AdminPanel.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Regularadmin = () => {
//   const [photos, setPhotos] = useState([]);
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     fetchPhotos();
//   }, []);

//   const fetchPhotos = () => {
//     axios.get('http://localhost:5000/api/photos').then((res) => setPhotos(res.data));
//   };

//   const handleAddPhoto = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('image', image);
//     axios.post('http://localhost:5000/api/photos', formData).then(() => fetchPhotos());
//   };

//   const handleDeletePhoto = (id) => {
//     axios.delete(`http://localhost:5000/api/photos/${id}`).then(() => fetchPhotos());
//   };

//   return (
//     <div className="admin-panel">
//       <form onSubmit={handleAddPhoto}>
//         <input type="file" onChange={(e) => setImage(e.target.files[0])} />
//         <button type="submit">Add Photo</button>
//       </form>

//       <div className="photo-list">
//         {photos.map((photo) => (
//           <div key={photo.id}>
//             <img src={`http://localhost:5000${photo.path}`} alt="Photo" />
//             <button onClick={() => handleDeletePhoto(photo.id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Regularadmin;


import React, { useState } from 'react';
import axios from 'axios';

const RegularAdmin = () => {
  const [cakeData, setCakeData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    setCakeData({ ...cakeData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', cakeData.name);
    formData.append('category', cakeData.category);
    formData.append('price', cakeData.price);
    formData.append('quantity', cakeData.quantity);
    formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Cake uploaded successfully!');
    } catch (err) {
      console.error('Error uploading cake data', err);
    }
  };

  return (
    <div>
      <h2>Upload New Cake</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Cake Name"
          value={cakeData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={cakeData.category}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={cakeData.price}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="quantity"
          placeholder="Quantity (e.g., 1 kg, 1/2 kg)"
          value={cakeData.quantity}
          onChange={handleInputChange}
        />
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Upload Cake</button>
      </form>
    </div>
  );
};

export default RegularAdmin;
