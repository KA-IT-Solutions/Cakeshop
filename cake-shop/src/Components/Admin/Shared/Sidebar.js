// src/Components/Admin/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaBirthdayCake, FaTools, FaPhone } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar bg-blue-600 text-white w-64 h-full p-4"> {/* Ensure this class is applied */}
      <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" className="w-24 h-auto mb-4" />
      <ul className="space-y-4">
        <li className="flex items-center">
          <FaBirthdayCake className="mr-2" />
          <Link to="/admin/regular" className="font-bold hover:underline">Regular Cakes</Link>
        </li>
        <li className="flex items-center">
          <FaTools className="mr-2" />
          <Link to="/admin/customize" className="font-bold hover:underline">Customize Cakes</Link>
        </li>
        <li className="flex items-center">
          <FaPhone className="mr-2" />
          <Link to="/admin/contact" className="font-bold hover:underline">Contact Info</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
