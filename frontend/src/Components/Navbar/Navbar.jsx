import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.webp';
import logo2 from '../Assets/cart2.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import cookie from 'js-cookie';

export default function Navbar() {
  const [menu, setMenu] = useState("shop");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); 


  

  useEffect(() => {
    const token = cookie.get('emtoken');
    const storedRole = localStorage.getItem("role"); 
    setIsLoggedIn(!!token);
    setRole(storedRole);
  }, [location]);

  const handleLogout = () => {
    cookie.remove('emtoken');
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole(null);
    navigate('/login'); 
  };

    const handleLogoutseller = () => {
    cookie.remove('emstoken');
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole(null);
    navigate('/login'); 
  };

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt=""/>
        <p>EVERZAAR</p>
      </div>

      <ul className='nav-menu'>
        {role === "seller" ? (
          <>
            <li onClick={() => setMenu('addproduct')}>
              <Link style={{ textDecoration: 'none' }} to='/addproduct'>Add Product</Link>
              {menu === "addproduct" && <hr />}
            </li>
            <li onClick={() => setMenu('viewproduct')}>
              <Link style={{ textDecoration: 'none' }} to='/viewproduct'>View Product</Link>
              {menu === "viewproduct" && <hr />}
            </li>

            <div className='nav-login-cart'>
            <Link to='/sellerprofile'>
              <button>Profile</button>
            </Link>
            <button onClick={handleLogoutseller}>Logout</button>
            </div>
            
          </>
        ) : (
          <>
            <li onClick={() => setMenu('shop')}>
              <Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>
              {menu === "shop" && <hr />}
            </li>
            <li onClick={() => setMenu('mens')}>
              <Link style={{ textDecoration: 'none' }} to='category/mens'>Mens</Link>
              {menu === "mens" && <hr />}
            </li>
            <li onClick={() => setMenu('womens')}>
              <Link style={{ textDecoration: 'none' }} to='category/womens'>Womens</Link>
              {menu === "womens" && <hr />}
            </li>
            <li onClick={() => setMenu('kids')}>
              <Link style={{ textDecoration: 'none' }} to='category/kids'>Kids</Link>
              {menu === "kids" && <hr />}
            </li>
            <li onClick={() => setMenu('accessories')}>
              <Link style={{ textDecoration: 'none' }} to='category/accessories'>Accessories</Link>
              {menu === "accessories" && <hr />}
            </li>
            <li onClick={() => setMenu('homedecor')}>
              <Link style={{ textDecoration: 'none' }} to='category/homedecor'>Home Decor</Link>
              {menu === "homedecor" && <hr />}
            </li>
            <li onClick={() => setMenu('electronics')}>
              <Link style={{ textDecoration: 'none' }} to='category/electronics'>Electronics</Link>
              {menu === "electronics" && <hr />}
            </li>
          </>
        )}
      </ul>

      <div className='nav-login-cart'>
       {isLoggedIn ? (
  <>
    <Link to='/profile'>
      <button>Profile</button>
    </Link>
    <button onClick={handleLogout}>Logout</button>
  </>
) : (
   (   
    
    <Link to='/slide'>
      <button>Login</button>
    </Link>
  )
)}


        {role !== "seller" && ( 
          <>
            <Link to='/viewcart'>
              <img src={logo2} alt="Cart" />
            </Link>
            <div className='nav-cart-count'>0</div>
          </>
        )}
      </div>
    </div>
  );
}
