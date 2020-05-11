import React from 'react'
import { NavLink } from 'react-router-dom'
export default function Nav() {

  const routes = () => {
    return (
      <div className="nav-container">
        <div className="nav-stuff1">
          <NavLink to="/">FROOOM</NavLink>
        </div>
        <div className="nav-stuff2">
          <NavLink to="/Join">Join Chat</NavLink>
          <NavLink to="/Aboutus">About Us</NavLink>
          <NavLink to="/FAQ">FAQ</NavLink>
        </div>
      </div >
    )
  }

  return (
    <div>
      {routes()}
    </div>
  )
}
