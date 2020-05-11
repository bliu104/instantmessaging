import React from 'react'
import Nav from './Nav'

export default function Landing(props) {

  const redirect = () => {
    props.history.push(`/Join`)

  }

  return (
    <>
      <Nav />
      <div>
        <div className='landing-container'>
          <div className="introduction">
            <div>Simple. Easy. FROOOOM.</div>
            <div>Instant Messaging</div>
            <div className="intro-3">Get in contact with just a click of a button!</div>
            <button className="intro-button" onClick={redirect}>Chat Now!</button>
          </div>
        </div>
      </div>
    </>
  )
}
