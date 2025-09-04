import React, { useState } from "react";
import "./Cartproduct.css";
import axios from "axios";

const Cartproduct = ({ product, onRemove }) => {
  const [quantity, setQuantity] = useState(product.quantity || 1);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => {
  
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  }

  const totalPrice = product.price * quantity;

  const handleRemove = async () => {
    try {
      const res = await axios.delete(`http://localhost:9000/removeproduct/${product.id}`);
      console.log("delete res--",res);
      
      if (res.data.success) {
     window.location.reload(); 
        if (onRemove) onRemove(product.id); 
      }
    } catch (err) {
      console.error("Error removing product:", err);
      alert("Failed to remove product");
    }
  };

  return (
    <div className="cart">
      <img
        src={`http://localhost:9000/images/${product.image}`}
        alt=""
        className="productimage"
      />
      <div className="productdetails">
        <h4 className="productname">{product.name}</h4>
        <p className="productprice">Rs.{product.price}</p>

        <div className="quantitycontrols">
          <button className="quantitybutton" onClick={handleDecrease}>-</button>
          <span className="quantity">{quantity}</span>
          <button className="quantitybutton" onClick={handleIncrease}>+</button>
        </div>

        <p className="producttotal">
          <strong>Rs.{totalPrice}</strong>
        </p>
      </div>

      <button className="removebutton" onClick={handleRemove}>Remove</button>
    </div>
  );
};

export default Cartproduct;
