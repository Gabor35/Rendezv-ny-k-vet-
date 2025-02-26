import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [token] = useState('YOUR_API_TOKEN'); // Replace with your actual token

  // Fetch existing chat messages from the backend when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/ChatMessage');
        setMessages(response.data); // Set fetched messages in state
      } catch (error) {
        console.error('Error fetching chat messages:', error);
      }
    };

    fetchMessages();
  }, []);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const newMessageObj = {
        user: 'You', // You can modify the user name dynamically if needed
        text: newMessage,
        time: new Date().toISOString(), // Send current time in ISO format
      };

      try {
        // Post the new message to the backend API
        const response = await axios.post(`http://localhost:5000/api/ChatMessage/${token}`, newMessageObj);
        console.log(response.data);
        setMessages([...messages, newMessageObj]); // Add new message to the UI
        setNewMessage(''); // Clear the input field
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-900 text-white p-4 rounded-lg ">
    <div className="border border-gray-700 p-3 h-72 overflow-y-auto mb-3 bg-black scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-800">
      {messages.map((message) => (
        <div key={message.id} className="mb-2">
          <strong className={message.user === 'You' ? 'text-green-400' : 'text-yellow-400'}>
            {message.user}
          </strong>
          : <span className="bg-gray-700 px-2 py-1 rounded inline-block ml-2">{message.text}</span>
          <div className="text-xs text-gray-400 mt-1">{new Date(message.time).toLocaleString()}</div>
        </div>
      ))}
    </div>
    <div className="flex gap-2">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Írj egy üzenetet..."
        className="flex-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
      />
      <button
        onClick={handleSendMessage}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-black font-bold"
      >
        Küldés
      </button>
    </div>
  </div>  
  );
};
