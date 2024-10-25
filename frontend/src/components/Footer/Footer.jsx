import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets';
function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga consectetur magnam provident doloribus cumque ex odio, dolor tempore rerum vero.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>9200000008</li>
                <li>contact@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyrigth">
        Copyright 2024 © Tomato.com - All rights reserved
      </p>
    </div>
  );
}

export default Footer
