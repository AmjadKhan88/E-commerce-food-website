import React from 'react'
import {assets} from '../../assets/assets'
import './Navbar.css'
function Navbar() {
  return (
    <div className='navbar'>
      <img src={assets.logo} alt="" className='logo' />
      <img src={assets.profile_image} alt="" className='profile' />
    </div>
  )
}

export default Navbar
