import React, { useState, useEffect } from 'react'
import axios from 'axios'
import VoiceRecorder from '../components/VoiceRecorder'

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')

  const fetchMessages = async () => {
    const res = await axios.get('/api/messages/get', { headers: { Authorization: localStorage.getItem('token') } })
    setMessages(res.data)
  }

  const sendMessage = async () => {
    if (!text) return
    await axios.post('/api/messages/send', { content: text }, { headers: { Authorization: localStorage.getItem('token') } })
    setText('')
    fetchMessages()
  }

  useEffect(() => { fetchMessages() }, [])

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-scroll p-4 bg-blue-50">
        {messages.map((m, i) => (
          <div key={i} className="mb-2">
            <span className="bg-white p-2 rounded shadow">{m.content}</span>
          </div>
        ))}
      </div>
      <div className="p-4 flex">
        <input className="border p-2 flex-1 mr-2" value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded">Send</button>
        <VoiceRecorder onSend={fetchMessages} />
      </div>
    </div>
  )
}
