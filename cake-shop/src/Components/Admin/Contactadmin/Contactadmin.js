import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactAdmin = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '', phone: '' });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/contact');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages', error);
    }
  };

  const handleEdit = (message) => {
    setSelectedMessage(message.id);
    setFormState({
      name: message.name,
      email: message.email,
      message: message.message,
      phone: message.phone,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await axios.delete(`http://localhost:5000/contact/${id}`);
        fetchMessages(); // Refresh messages
      } catch (error) {
        console.error('Error deleting message', error);
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (selectedMessage) {
      try {
        await axios.put(`http://localhost:5000/contact/${selectedMessage}`, formState);
        fetchMessages(); // Refresh messages
        setSelectedMessage(null);
        setFormState({ name: '', email: '', message: '', phone: '' });
      } catch (error) {
        console.error('Error updating message', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-800 text-white text-center py-4 mb-8 rounded-md">
        <h2 className="text-xl font-bold">Manage Contact Page</h2>
      </div>


      <form onSubmit={handleUpdate} className="bg-gray-100 text-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            className="p-3 bg-white rounded text-black placeholder-grey-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="email"
            placeholder="Your Email"
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            className="p-3  bg-white rounded text-black placeholder-grey-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <textarea
          name="message"
          placeholder="Your Message"
          value={formState.message}
          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
          className="w-full p-3 bg-white rounded text-black placeholder-grey-500 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="phone"
          placeholder="Your Phone"
          value={formState.phone}
          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
          className="p-3  bg-white rounded text-black placeholder-grey-500 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="mt-6 w-full p-3 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Message
        </button>
      </form>

      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
        <table className="min-w-full table-auto text-black">
          <thead>
            <tr className="bg-white">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message.id} className="bg-white-700 hover:bg-white">
                <td className="px-4 py-2">{message.id}</td>
                <td className="px-4 py-2">{message.name}</td>
                <td className="px-4 py-2">{message.email}</td>
                <td className="px-4 py-2">{message.message}</td>
                <td className="px-4 py-2">{message.phone}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(message)}
                    className="bg-blue-600 px-4 py-2 rounded text-white mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(message.id)}
                    className="bg-red-600 px-4 py-2 rounded text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactAdmin;
