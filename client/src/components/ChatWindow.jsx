import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ChatWindow({ token }) {
  const [messages, setMessages] = useState([])
  const [content, setContent] = useState('')

  const fetchMessages = async () => {
    const res = await axios.get('/api/messages', { headers: { Authorization: token } })
    setMessages(res.data)
  }

  const sendMessage = async () => {
    if (!content.trim()) return
    await axios.post('/api/messages', { content }, { headers: { Authorization: token } })
    setContent('')
    fetchMessages()
  }

  useEffect(() => {
    fetchMessages()
    const interval = setInterval(fetchMessages, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container">
      <div className="navbar">WhatsApp Clone</div>
      <div className="chat-window">
        {messages.map((m, i) => (
          <div className="message" key={i}>
            <b>{m.sender}:</b> {m.content || <audio controls src={m.voiceFile}></audio>}
          </div>
        ))}
      </div>
      <div className="input-bar">
        <input value={content} onChange={e => setContent(e.target.value)} placeholder="Type a message..." />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}
