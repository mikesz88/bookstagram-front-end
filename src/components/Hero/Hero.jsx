import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <>
      <nav>
        <ul style={{ display: 'flex', justifyContent: 'space-between'}}>
          <li>
            Bookstagram
          </li>
          <div style={{ display: 'flex', width: 200, justifyContent: 'space-evenly'}}>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register User</Link>
            </li>
          </div>
        </ul>
      </nav> 
    </>
  )
}

export default Hero