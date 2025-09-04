import cookie from 'js-cookie';
import React, { useState, useEffect } from 'react';
import Cartproduct from '../Components/Cartproduct/Cartproduct';
import './CSS/Viewcart.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Viewcart = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false); 
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    const token = cookie.get('emtoken');

    if (!token) {
      setError('You need to be logged in!');
      setIsLoading(false);
      navigate('/loginpage1');
      return;
    }

    setIsLoading(true);

    try {
      const cartResponse = await axios.get('http://localhost:9000/viewcart', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      console.log("cart response--",cartResponse);

      if (cartResponse.data.success) {
        console.log("cart data---", cartResponse.data.product);
        setCart(cartResponse.data.product);
      } else {
        setError('Your cart is empty.');
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError('Failed to fetch cart items');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleRemove = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };


 const handlePayment = async () => {
  const token = cookie.get("emtoken");
  if (!token) {
    alert("User not logged in!");
    navigate("/loginpage1");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:9000/placeorder",
      {
        cartItems: cart, 
      },
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.data.success) {
      alert("Order placed successfully");
      setCart([]); 
      navigate("/orderhistory");
    } else {
      alert(res.data.msg || "Order failed, please try again.");
    }
  } catch (error) {
    console.error("Error placing order:", error);
    alert("Something went wrong while placing the order.");
  }

  setShowPopup(false);
};


  if (isLoading) return <p>Loading your cart...</p>;
  if (error) return <p>{error}</p>;
  if (!cart || cart.length === 0) return <div>Your cart is empty.</div>;

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);




  const hihi=async()=>
  {
    alert("heyyy not");
    
  }


  return (
    <div className="viewcart">
      <h1>Shopping Cart</h1>
      <div className="cartitems">
        {cart.map((cartItem) => (
          <div key={cartItem._id} className="cart-item">
            <Cartproduct 
              product={cartItem} 
              quantity={cartItem.quantity}
              onRemove={handleRemove}
            />
          </div>
        ))}
      </div>

      <div className="cartsummary">
        <h2>Cart Summary</h2>
        <p>Total Items: <b>{totalQuantity}</b></p>
        <p>Total Price: <b>₹{totalPrice}</b></p>
        <button className="pay" onClick={() => setShowPopup(true)}>Proceed to Payment</button>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Confirm Payment</h2>
            <p>Total Amount: <b>₹{totalPrice}</b></p>
            <button className="paynow" onClick={handlePayment}>Pay</button>
            <button className="close" onClick={() => setShowPopup(false)}>Close</button>
            <button className="hihi" onClick={hihi}>Hey</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Viewcart;

