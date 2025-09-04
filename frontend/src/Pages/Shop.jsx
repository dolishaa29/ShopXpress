import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Productbox from '../Components/Productbox/Productbox';

const Shop = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleFetchProduct = () => {
    setLoading(true); 
    axios
      .get('http://localhost:9000/viewallproduct')
      .then((response) => {
        console.log("Full API response:", response.data);

        if (Array.isArray(response.data)) {
          setProductData(response.data);  
        } else if (response.data.products) {
          setProductData(response.data.products);  
        } else if (response.data.product) {
          setProductData(response.data.product);  
        } else {
          setProductData([]);  
        }
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleFetchProduct();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (!productData || productData.length === 0) return <p>No products found</p>;

  return (
    <div className="products-container">
      {productData.map((p) => (
        <Productbox key={p._id || p.id} product={p} />
      ))}
     
    </div>
   
  );
};

export default Shop;
