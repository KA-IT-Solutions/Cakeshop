// // src/Components/Admin/Sidebar.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { FaBirthdayCake, FaTools, FaPhone } from 'react-icons/fa';

// const Sidebar = () => {

//   return (
//     <div className="sidebar " style={{
//       backgroundColor:"rgb(4,12,21)",
//       color:"white"
//     }}> {/* Ensure this class is applied */}
//       <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" className="w-24 h-auto mb-4" />
//       <ul className="space-y-4">
//         <li className="flex items-center">
//           <FaBirthdayCake className="mr-2" />
//           <Link to="/admin/regular" className="font-bold  " style={{color:'white'}}>Regular Cakes</Link>
//         </li>
//         <li className="flex items-center">
//           <FaTools className="mr-2" />
//           <Link to="/admin/customize" className="font-bold "style={{color:'white'}}>Customize Cakes</Link>
//         </li>
//         <li className="flex items-center">
//           <FaPhone className="mr-2" />
//           <Link to="/admin/contact" className="font-bold "style={{color:'white'}}>Contact Info</Link>
//         </li>

//       </ul>
//     </div>
//   );
// };

// export default Sidebar;



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaBirthdayCake, FaTools, FaPhone, FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar visibility on mobile

  // Handle logout from Sidebar
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/admin/login');
  };

  // Toggle the sidebar on mobile
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close the sidebar when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false); // Close the sidebar
  };

  return (
    <>
      <div className="relative">
        {/* Hamburger icon for mobile (visible only on mobile) */}
        <div className="lg:hidden p-4 text-white h-10 w-10 absolute top-4 left-4 z-10 bg-black flex justify-center items-center rounded-full" onClick={toggleSidebar}>
          <FaBars size={30} />
        </div>

        {/* Sidebar (Horizontal on Mobile, Vertical on Desktop) */}
        <div
          className={`sidebar fixed top-0 left-0 w-full h-full bg-gray-900 text-white p-4 transition-all duration-300 
            ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:w-64 lg:h-full lg:block lg:translate-x-0`} 
          style={{ backgroundColor: 'rgb(4,12,21)' }}
        >
          {/* Close button on mobile */}
          <div className="lg:hidden p-4 text-white absolute top-4 right-4" onClick={toggleSidebar}>
            <FaTimes size={30} />
          </div>

          {/* Logo */}
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="Logo"
            className="w-24 h-auto mb-4"
          />

          {/* Sidebar Links */}
          <ul className={`space-y-4 ${isOpen ? 'flex flex-col' : 'block'} lg:flex lg:flex-col lg:space-y-4`}>
            <li className="flex items-center">
              <FaBirthdayCake className="mr-2" />
              <Link to="/admin/regular" className="font-bold text-white-500" onClick={handleLinkClick}>
                <h3 className='text-white'>Regular Cakes</h3>
              </Link>
            </li>
            <li className="flex items-center">
              <FaTools className="mr-2" />
              <Link to="/admin/customize" className="font-bold text-white" onClick={handleLinkClick}>
              <h3 className='text-white'> Customize Cakes</h3>
              </Link>
            </li>
            <li className="flex items-center">
              <FaPhone className="mr-2" />
              <Link to="/admin/contact" className="font-bold text-white" onClick={handleLinkClick}>
              <h3 className='text-white'> Contact Info</h3>
              </Link>
            </li>
          </ul>

          {/* Logout Button */}
          <button
            className="logout-btn mt-6 p-2 w-full bg-red-600 text-white rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
