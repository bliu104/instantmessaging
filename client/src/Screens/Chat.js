import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from "socket.io-client"
const ENDPOINT = "localhost:5000"
let socket

export default function Chat({ location }) {


  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    const { name, room } = queryString.parse(location.search)

    socket = io(ENDPOINT)

    setName(name)
    setRoom(room)

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error)
      }
    })
    return () => {
      socket.emit('disconnect')
      socket.off();
      // turn off instance
    }
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages(messages => [...messages, message])
    })
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    })
  }, [])

  const handleChange = (event) => {
    setMessage(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  const messageBox = () => {
    return messages.map((message) => {
      if (message.user === name) {
        return (
          <div className="user-message-box">
            <div className="user-message">{message.message}</div>
          </div>

        )
      } else if (message.user === 'admin') {
        return (
          <div>{message.message}</div>
        )
      } else {
        return (
          <div className="other-message-box">
            <div className="other-message">{message.message}</div>
            <div className='message-name'>{message.user}</div>
          </div>
        )
      }

    })
  }
  const getUser = () => {
    return users.map((user) => {
      return <div className='user-room'>{user.name}</div>
    })
  }



  const routeChange = () => {
    return <a href="/" className="room-button">Leave Room</a>
  }


  return (
    <div className="outer-message-layer">
      < div className="messaging-container" >
        <div className="room-info">
          <div className="room-info-title">Current Users in {room}</div>
          <div className="sub-room-info">
            <div>
              {getUser()}
            </div>
            <div className='button'>
              {routeChange()}
            </div>
          </div>
        </div>
        <div className='message-container'>
          <div className='room-name'>Current Room Name: {room}</div>
          <div className='message-box'>
            {messageBox()}
          </div>
          <form onSubmit={handleSubmit} className="sub-messaging-container">
            <div className='messaging-input-container'>
              <input className='messaging-input' placeholder="Message" type="text" value={message} onChange={handleChange} />
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}
