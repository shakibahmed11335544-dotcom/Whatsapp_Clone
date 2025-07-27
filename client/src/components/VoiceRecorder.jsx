import React, { useState, useRef } from 'react'
import axios from 'axios'

export default function VoiceRecorder({ onSend }) {
  const [recording, setRecording] = useState(false)
  const mediaRecorder = useRef(null)
  const audioChunks = useRef([])

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorder.current = new MediaRecorder(stream)
    mediaRecorder.current.ondataavailable = (e) => audioChunks.current.push(e.data)
    mediaRecorder.current.onstop = uploadAudio
    mediaRecorder.current.start()
    setRecording(true)
  }

  const stopRecording = () => {
    mediaRecorder.current.stop()
    setRecording(false)
  }

  const uploadAudio = async () => {
    const blob = new Blob(audioChunks.current, { type: 'audio/webm' })
    const formData = new FormData()
    formData.append('voice', blob, 'voiceMessage.webm')
    await axios.post('/api/messages/voice', formData, { headers: { Authorization: localStorage.getItem('token') } })
    audioChunks.current = []
    onSend()
  }

  return (
    <button onClick={recording ? stopRecording : startRecording} className="bg-green-500 text-white p-2 rounded ml-2">
      {recording ? 'Stop' : 'Voice'}
    </button>
  )
}
