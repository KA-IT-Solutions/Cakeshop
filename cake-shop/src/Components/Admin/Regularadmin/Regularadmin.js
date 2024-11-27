










// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './AdminPanel.css'; // Import the CSS file for styling

// const RegularAdmin = () => {
//   const [cakeData, setCakeData] = useState({
//     id: '', // Add id for updating cakes
//     name: '',
//     category: '',
//     price: '',
//     quantity: '',
//   });
//   const [image, setImage] = useState(null);
//   const [cakes, setCakes] = useState([]); // To hold the list of cakes

//   // Fetch cakes on component mount
//   useEffect(() => {
//     fetchCakes();
//   }, []);

//   const fetchCakes = async () => {
//     const res = await axios.get('http://localhost:5000/cakes'); // Get cakes from the server
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
//     if (image) formData.append('image', image); // Include image only if provided

//     try {
//       if (cakeData.id) {
//         // If id exists, update the cake
//         await axios.put(`http://localhost:5000/upload/${cakeData.id}`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         alert('Cake updated successfully!');
//       } else {
//         // Otherwise, create a new cake
//         await axios.post('http://localhost:5000/upload', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         alert('Cake uploaded successfully!');
//       }
//       fetchCakes(); // Refresh the cake list
//     } catch (err) {
//       console.error('Error uploading cake data', err);
//     }
//   };

//   const handleEdit = (cake) => {
//     // Set the selected cake data for editing
//     setCakeData(cake);
//     setImage(null); // Reset image to null for updating
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this cake?')) {
//       await axios.delete(`http://localhost:5000/upload/${id}`); // Endpoint for deleting
//       fetchCakes(); // Refresh the cake list after deletion
//       alert('Cake deleted successfully!');
//     }
//   };

//   return (
//     <div>
//       <div style={{
//         color:'white',
//         font:'bold',
       
//         height:'70px',
//         width:'1000px',
//         backgroundColor:'rgb(5,12,22)',
//         textAlign:'center',
//         fontSize:'1.5rem',
//         display:'flex',
//         justifyContent:"center",
//         alignItems:"center",
//         marginBottom:'50px',
//         marginTop:'-10px',
//         position:'fixed'
//       }} ><h2>Manage Regular Cake</h2></div>
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
//           placeholder="Quantity (e.g., 1 kg, 1/2 kg)"
//           value={cakeData.quantity}
//           onChange={handleInputChange}
//         />
//         <input type="file" onChange={handleImageChange} style={{marginTop:'30px'}}/>
//         <button className='uploadbutton' type="submit">{cakeData.id ? 'Update Cake' : 'Upload Cake'}</button>
//       </form>

//       <h2 style={{font:'bold'}}>Existing Cakes</h2>
//       <div className="cake-list">
//         {cakes.map((cake) => (
//           <div key={cake.id} className="cake-item">
//             <h3>{cake.name}</h3>
//             <img className="admin-cake-image" src={`http://localhost:5000${cake.image}`} alt={cake.name} />
//             <div className='edbutton'>
//             <button className="edit-button" onClick={() => handleEdit(cake)}>Edit</button>
//             <button className="delete-button" onClick={() => handleDelete(cake.id)}>Delete</button>

//           </div>
//           </div>
//         ))} 
//       </div>
//     </div>
//   );
// };

// export default RegularAdmin;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css'; // Import the CSS file for styling

const RegularAdmin = () => {
  const [cakeData, setCakeData] = useState({
    id: '', // Add id for updating cakes
    name: '',
    category: '',
    price: '',
    quantity: '',
  });
  const [image, setImage] = useState(null);
  const [cakes, setCakes] = useState([]); // To hold the list of cakes

  // Fetch cakes on component mount
  useEffect(() => {
    fetchCakes();
  }, []);

  const fetchCakes = async () => {
    const res = await axios.get('http://localhost:5000/cakes'); // Get cakes from the server
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
    if (image) formData.append('image', image); // Include image only if provided

    try {
      if (cakeData.id) {
        // If id exists, update the cake
        await axios.put(`http://localhost:5000/upload/${cakeData.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Cake updated successfully!');
      } else {
        // Otherwise, create a new cake
        await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Cake uploaded successfully!');
      }
      fetchCakes(); // Refresh the cake list
    } catch (err) {
      console.error('Error uploading cake data', err);
    }
  };

  const handleEdit = (cake) => {
    // Set the selected cake data for editing
    setCakeData(cake);
    setImage(null); // Reset image to null for updating
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this cake?')) {
      await axios.delete(`http://localhost:5000/upload/${id}`); // Endpoint for deleting
      fetchCakes(); // Refresh the cake list after deletion
      alert('Cake deleted successfully!');
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="bg-gray-800 text-white text-center py-4 mb-8 rounded-md">
        <h2 className="text-xl font-bold">Manage Regular Cake</h2>
      </div>

      {/* Form to add/update cakes */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          name="name"
          placeholder="Cake Name"
          value={cakeData.name}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={cakeData.category}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={cakeData.price}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="quantity"
          placeholder="Quantity (e.g., 1 kg, 1/2 kg)"
          value={cakeData.quantity}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-md"
        >
          {cakeData.id ? 'Update Cake' : 'Upload Cake'}
        </button>
      </form>

      {/* Existing Cakes */}
      <h2 className="text-xl font-bold mb-4">Existing Cakes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cakes.map((cake) => (
          <div key={cake.id} className="bg-gray-100 p-4 rounded-md shadow-md">
            <h3 className="font-bold text-center">{cake.name}</h3>
            <img
              src={`http://localhost:5000${cake.image}`}
              alt={cake.name}
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <div className="flex justify-between items-center">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md"
                onClick={() => handleEdit(cake)}
              >
                Edit
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md"
                onClick={() => handleDelete(cake.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegularAdmin;
