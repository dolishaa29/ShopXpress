import React, { useState } from 'react';
import cookie from 'js-cookie';
import axios from 'axios';
import './Productbox.css';
import { Link } from 'react-router-dom';

const Productbox = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  const addToCart = async () => {
    try {
      const token = cookie.get('emtoken'); 
      if (!token) {
        alert("Please login first!");
        return;
      }

     const response = await axios.post(
  `http://localhost:9000/addcart`,
  {
    id: product._id,   
    quantity
  },
  {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true
  }
);

console.log("cart res--", response);

  
      if (response.data.success) {
        alert("Product added to cart!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  return (
    <div className="product">
      <img className="product-image" src={`http://localhost:9000/images/${product.image}`} />
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price">{product.price}</div>

        <div className="product-quantity">
          <label>Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            min="1"
            onChange={handleQuantityChange}
          />
        </div>

        <button className="product-button" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Productbox;
