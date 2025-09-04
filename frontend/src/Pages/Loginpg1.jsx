import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import cookie from 'js-cookie';

const LoginPg1 = () => {
  const [formData, setFormData] = useState({
    uemail: '',
    upassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:9000/userlogin',
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("token--", response.data);

      if (response.status === 200 && response.data.token) {
        cookie.set('emtoken', response.data.token, { expires: 1 }); 
        localStorage.setItem("role", "user");  
        navigate('/');
        window.location.reload(); 
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
              name='uemail'
              value={formData.uemail}
              onChange={handleChange}
            />
            <input
              type='password'
              placeholder='Your Password'
              name='upassword'
              value={formData.upassword}
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

export default LoginPg1;
