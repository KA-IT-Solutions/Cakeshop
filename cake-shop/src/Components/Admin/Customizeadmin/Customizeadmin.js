

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import './AdminPanel.css';

// const CustomizeAdmin= () => {
//   const [cakeData, setCakeData] = useState({
//     id: '',
//     name: '',
//     category: '',
//     price: '',
//     quantity: '',
//   });
//   const [image, setImage] = useState(null);
//   const [cakes, setCakes] = useState([]);

//   useEffect(() => {
//     fetchCakes();
//   }, []);

//   const fetchCakes = async () => {
//     const res = await axios.get('http://localhost:5000/custom_cakes');
//     setCakes(res.data);
//   };

//   const handleInputChange = (e) => {
//     setCakeData({ ...cakeData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('name', cakeData.name);
//     formData.append('category', cakeData.category);
//     formData.append('price', cakeData.price);
//     formData.append('quantity', cakeData.quantity);
//     if (image) formData.append('image', image);

//     try {
//       if (cakeData.id) {
//         await axios.put(`http://localhost:5000/custom_upload/${cakeData.id}`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         alert('Custom cake updated successfully!');
//       } else {
//         await axios.post('http://localhost:5000/custom_upload', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         alert('Custom cake uploaded successfully!');
//       }
//       fetchCakes();
//     } catch (err) {
//       console.error('Error uploading cake data', err);
//     }
//   };

//   const handleEdit = (cake) => {
//     setCakeData(cake);
//     setImage(null);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this custom cake?')) {
//       await axios.delete(`http://localhost:5000/custom_upload/${id}`);
//       fetchCakes();
//       alert('Custom cake deleted successfully!');
//     }
//   };

//   return (
//     <div>
//       <div><h2>Manage Custom Cake</h2></div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Cake Name"
//           value={cakeData.name}
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           name="category"
//           placeholder="Category"
//           value={cakeData.category}
//           onChange={handleInputChange}
//         />
//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={cakeData.price}
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           name="quantity"
//           placeholder="Quantity (e.g., 1 kg)"
//           value={cakeData.quantity}
//           onChange={handleInputChange}
//         />
//         <input type="file" onChange={handleImageChange} />
//         <button type="submit">{cakeData.id ? 'Update Cake' : 'Upload Cake'}</button>
//       </form>

//       <h2>Existing Custom Cakes</h2>
//       <div className="cake-list">
//         {cakes.map((cake) => (
//           <div key={cake.id} className="cake-item">
//             <h3>{cake.name}</h3>
//             <img src={`http://localhost:5000${cake.image}`} alt={cake.name} />
//             <button onClick={() => handleEdit(cake)}>Edit</button>
//             <button onClick={() => handleDelete(cake.id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CustomizeAdmin;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css'; // Import the CSS file for styling

const CustomizeAdmin = () => {
  const [cakeData, setCakeData] = useState({
    id: '',
    name: '',
    category: '',
    price: '',
    quantity: '',
  });
  const [image, setImage] = useState(null);
  const [cakes, setCakes] = useState([]);

  useEffect(() => {
    fetchCakes();
  }, []);

  const fetchCakes = async () => {
    const res = await axios.get('http://localhost:5000/custom_cakes');
    setCakes(res.data);
  };

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
    if (image) formData.append('image', image);

    try {
      if (cakeData.id) {
        await axios.put(`http://localhost:5000/custom_upload/${cakeData.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Custom cake updated successfully!');
      } else {
        await axios.post('http://localhost:5000/custom_upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Custom cake uploaded successfully!');
      }
      fetchCakes();
    } catch (err) {
      console.error('Error uploading cake data', err);
    }
  };

  const handleEdit = (cake) => {
    setCakeData(cake);
    setImage(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this custom cake?')) {
      await axios.delete(`http://localhost:5000/custom_upload/${id}`);
      fetchCakes();
      alert('Custom cake deleted successfully!');
    }
  };

  return (
    <div>
      <div style={{
        color: 'white',
        font: 'bold',
        height: '70px',
        backgroundColor: 'rgb(5,12,22)',
        textAlign: 'center',
        fontSize: '1.5rem',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        marginBottom: '50px',
        marginTop: '-10px'
      }}>
        <h2>Manage Custom Cake</h2>
      </div>
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
          placeholder="Quantity (e.g., 1 kg)"
          value={cakeData.quantity}
          onChange={handleInputChange}
        />
        <input type="file" onChange={handleImageChange} />
        <button className='uploadbutton' type="submit">{cakeData.id ? 'Update Cake' : 'Upload Cake'}</button>
      </form>

      <h2 style={{ font: 'bold' }}>Existing Custom Cakes</h2>
      <div className="cake-list">
        {cakes.map((cake) => (
          <div key={cake.id} className="cake-item">
            <h3>{cake.name}</h3>
            <img src={`http://localhost:5000${cake.image}`} alt={cake.name} />
            <div className='edbutton'>
              <button className="edit-button" onClick={() => handleEdit(cake)}>Edit</button>
              <button className="delete-button" onClick={() => handleDelete(cake.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomizeAdmin;
