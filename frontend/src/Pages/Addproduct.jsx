import React, { useState } from 'react';
import './CSS/addUp.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import cookie from 'js-cookie';

const   Addproduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    type: '',
    price: '',
    description: '',
    image: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setProductData({ ...productData, image: e.target.files[0] });
    } else {
      setProductData({ ...productData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = cookie.get("emstoken"); 
      if (!token) {
        alert("Unauthorized! Please login as seller.");
        navigate("/login"); 
        return;
      }

      const formData = new FormData();
      for (let key in productData) {
        formData.append(key, productData[key]);
      }

      const response = await axios.post(
        "http://localhost:9000/addproducts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, 
          },
          withCredentials:true
        }
      );

      if (response.status === 201) {
        setProductData({
          name: '',
          type: '',
          price: '',
          description: '',
          image: '',
        });
        navigate('/viewproduct');
      }
    } catch (err) {
      console.error(err);
      alert("Add Product failed! Unauthorized or Invalid token.");
    }
  };

  return (
    <div className="addproduct">
      <div className="addproduct-container">
        <h1>Add Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="addproductfeild">
            <input
              type="text"
              placeholder="Product Name"
              name="name"
              value={productData.name}
              onChange={handleChange}
              required
            />
            <select
              id="type"
              name="type"
              value={productData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select Product Type</option>
              <option value="mens">Mens</option>
              <option value="womens">Womens</option>
              <option value="kids">Kids</option>
              <option value="accessories">Accessories</option>
              <option value="homedecor">Home Decor</option>
              <option value="electronics">Electronics</option>
            </select>
            <input
              type="number"
              id="price"
              placeholder="Enter product price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              id="description"
              placeholder="Enter product description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              required
            />
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>
          <button>Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
