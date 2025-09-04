import React, { useState } from 'react';
import './Productadd.css';
import {Link } from 'react-router-dom';

const Productadd = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  return (
    <div className="product">
    
      <img className="product-image" src={`http://localhost:9000/images/${product.image}`}   alt={product.name} />
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price">{product.price}</div>

        {/* <div className="product-quantity">
          <label>Quantity:</label>
          <input type="number" id="quantity" value={quantity} min="1" onChange={handleQuantityChange}/>
        </div> */}

         <Link to='/update'>
      <button className='product-button'>Update</button>
    </Link>
    <Link to='/delete'>
      <button className='product-button'>Delete</button>
    </Link>
      </div>

    </div>
  );
};

export default Productadd;
