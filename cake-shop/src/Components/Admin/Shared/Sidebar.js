// src/Components/Admin/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaBirthdayCake, FaTools, FaPhone } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar " style={{
      backgroundColor:"rgb(4,12,21)",
      color:"white"
    }}> {/* Ensure this class is applied */}
      <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" className="w-24 h-auto mb-4" />
      <ul className="space-y-4">
        <li className="flex items-center">
          <FaBirthdayCake className="mr-2" />
          <Link to="/admin/regular" className="font-bold  " style={{color:'white'}}>Regular Cakes</Link>
        </li>
        <li className="flex items-center">
          <FaTools className="mr-2" />
          <Link to="/admin/customize" className="font-bold "style={{color:'white'}}>Customize Cakes</Link>
        </li>
        <li className="flex items-center">
          <FaPhone className="mr-2" />
          <Link to="/admin/contact" className="font-bold "style={{color:'white'}}>Contact Info</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
