import React from 'react';
import Seller from '../Components/Assets/seller2.png';
import User from '../Components/Assets/buyer2.png';
import './CSS/slide.css'
import { Link } from 'react-router-dom';

const Slide = () => {

  return (
    <div className='slide'>
      <div className="user">
        <Link style={{ textDecoration: 'none' }} to='/buyer'><img src={User} alt='Buyer' /></Link>
        <h1>User</h1>
      </div>
      <div className="seller">
      <Link style={{ textDecoration: 'none' }} to='/seller'><img src={Seller} alt='Seller' /></Link>
        <h1>Seller</h1>
      </div>
    </div>
  );
}

export default Slide;

