import React, { useState } from 'react'
import Nav from "./Nav"

export default function Join(props) {
  const [name, setName] = useState("")
  const [room, setRoom] = useState("")

  const handleChangeName = (event) => {
    setName(event.target.value)
  }
  const handleChangeRoom = (event) => {
    setRoom(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const redirect = () => {
    if (!name || !room) {
      return null
    } else {
      props.history.push(`/chat?name=${name}&room=${room}`)
    }
  }

  console.log(props)
  return (
    <>
      <Nav />
      <div className="join-container">
        <div className="sub-join-container">
          <div className="join-title"> Join A Room Now!</div>
          <form onSubmit={handleSubmit} className='form-container'>
            <div>
              <div className="join-sub-title">Username</div>
              <input type="text" value={name} onChange={handleChangeName} />
            </div>
            <div>
              <div className="join-sub-title">Room</div>
              <input type="text" value={room} onChange={handleChangeRoom} />
            </div>
            <button onClick={redirect} type='submit' className="join-button">Create Room</button>
          </form>
        </div>
      </div>
    </>
  )
}

