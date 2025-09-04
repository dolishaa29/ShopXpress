import React, { useState } from 'react'
import './CSS/login.css'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
  const [formData,setFormData]=useState({
    uname:'',
    uemail:'',
    upassword:'',
    address:'',
    ucontact:'',
  }  
)
const navigate = useNavigate(); 

const handleChange=async(e)=>{
  setFormData({...formData,[e.target.name]:e.target.value});
}  
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:9000/userregister', formData);

    if (response.status === 201) {
      setFormData({
        uname: '',
        uemail: '',
        upassword: '',
        address: '',
        ucontact: '',
      });
navigate('/loginpg1')
    }
  } catch (err) {
    console.error(err);
    alert("Registration failed!");
  }
};

  return (
    
    <div className='loginup'>
      <div className='loginup-container'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
        <div className='logfield'>
            <input type='text' placeholder='Your Name' name='uname' value={formData.uname} onChange={handleChange}/>
            <input type='text' placeholder='Your Email Address' name='uemail' value={formData.uemail} onChange={handleChange}/>
            <input type='password' placeholder='Your Password'name='upassword' value={formData.upassword} onChange={handleChange}/>
            <input type='text' placeholder='Your Address' name='address' value={formData.address} onChange={handleChange}/>
            <input type='number' placeholder='Contact' name='ucontact' value={formData.ucontact} onChange={handleChange}/>
        </div>
      <button>Sign Up</button>
      </form>
      <p className='log'>Already Have an Account?<span><Link style={{ textDecoration: 'none' }} to='/loginpg1'>Login</Link></span></p>
      <div className="login-agree">
        <input type='checkbox' name='' id='' />
        <p>By Continuning , i agree to the terms of use privacy policy</p>
      </div>
      </div> 
    </div>
  )
}

export default Login
