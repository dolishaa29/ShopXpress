import React,{ useState } from 'react'
import './CSS/login.css'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login2 = () => {

    const [formData,setFormData]=useState({
      Name:'',
      email:'',
      password:'',
      address:'',
      mobile:'',
    }  
    )
  const navigate = useNavigate();


  const handleChange=async(e)=>{
  setFormData({...formData,[e.target.name]:e.target.value});
}  
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:9000/sellerregister', formData);

    if (response.status === 201) {
      setFormData({
        uname: '',
        uemail: '',
        upassword: '',
        companyname: '',
        ucontact: '',
      });
navigate('/loginpg2')
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
            <input type='text' placeholder='Your Name' name='sname' value={formData.sname} onChange={handleChange}/>
            <input type='email' placeholder='Your Email Address' name='semail' value={formData.semail} onChange={handleChange}/>
            <input type='password' placeholder='Your Password'name='spassword' value={formData.spassword} onChange={handleChange}/>
            <input type='text' placeholder='Your Address' name='companyname' value={formData.companyname} onChange={handleChange}/>
            <input type='number' placeholder='Contact' name='scontact' value={formData.scontact} onChange={handleChange}/>
        </div>
      <button>Sign Up</button>
      </form>
      <p className='log'>Already Have an Account?<span><Link style={{ textDecoration: 'none' }} to='/loginpg2'>Login</Link></span></p>
      <div className="login-agree">
        <input type='checkbox' name='' id='' />
        <p>By Continuning , i agree to the terms of use privacy policy</p>
      </div>
      </div> 
    </div>
  )
}

export default Login2
