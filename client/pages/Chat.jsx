import React, { useState, useEffect, useRef } from 'react';
import VoiceRecorder from '../components/VoiceRecorder';
import { motion } from 'framer-motion';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  const fetchMessages = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/messages', { headers: { 'Authorization': `Bearer ${token}` } });
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input) return;
    const token = localStorage.getItem('token');
    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ type: 'text', content: input })
    });
    setInput('');
    fetchMessages();
  };

  return (
    <div className="p-4 flex flex-col h-[calc(100vh-60px)]">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: msg.type === 'text' ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-2 rounded max-w-xs ${msg.type === 'voice' ? 'bg-secondary text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'} `}
          >
            {msg.type === 'voice' ? (
              <audio controls src={msg.content}></audio>
            ) : (
              msg.content
            )}
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2 mt-4">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 border p-2 rounded dark:bg-gray-800"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-primary text-white px-4 rounded">Send</button>
        <VoiceRecorder onUpload={fetchMessages} />
      </div>
    </div>
  );
}
