import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import cookie from 'js-cookie';

const Loginpg2 = () => {
  const [formData, setFormData] = useState({
    semail: '',
    spassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:9000/sellerlogin',
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("token--", response.data);

      if (response.status === 200 && response.data.token) {
        cookie.set('emstoken', response.data.token, { expires: 1 }); 
        localStorage.setItem("role", "seller");   // ✅ mark as seller
        navigate('/');
        window.location.reload(); // ✅ Navbar refresh hoga turant
      } else {
        alert("Invalid login response");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed!");
    }
  };

  return (
    <div className='loginup'>
      <div className='loginup-container'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='logfield'>
            <input
              type='text'
              placeholder='Your Email Address'
              name='semail'
              value={formData.semail}
              onChange={handleChange}
            />
            <input
              type='password'
              placeholder='Your Password'
              name='spassword'
              value={formData.spassword}
              onChange={handleChange}
            />
          </div>
          <button>Login</button>
        </form>
        <p className='log'>
          Don't Have an Account?
          <span><Link to='/register'>Register</Link></span>
        </p>
      </div>
    </div>
  );
};

export default Loginpg2;
