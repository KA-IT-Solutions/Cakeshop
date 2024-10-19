// src/Components/Admin/ContactAdmin.js
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
    <div>
      <h1>Manage Contact Messages</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
        />
        <input
          type="text"
          name="email"
          placeholder="Your Email"
          value={formState.email}
          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formState.message}
          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
        />
        <input
          type="text"
          name="phone"
          placeholder="Your Phone"
          value={formState.phone}
          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
        />
        <button type="submit">Update Message</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id}>
              <td>{message.id}</td>
              <td>{message.name}</td>
              <td>{message.email}</td>
              <td>{message.message}</td>
              <td>{message.phone}</td>
              <td>
                <button onClick={() => handleEdit(message)}>Edit</button>
                <button onClick={() => handleDelete(message.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactAdmin;





