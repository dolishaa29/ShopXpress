import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS/Shopcategory.css'
import Productbox from '../Components/Productbox/Productbox'; 

export default function Shopcategory() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:9000/getProductsByCategory?type=${category}`)
      .then(res => {
        if (res.data.success) setProducts(res.data.products);
        else setProducts([]);
      })
      .catch(err => console.error("Error:", err));
  }, [category]);

  return (
    <div className="shop-container">
      <h1 className="shop-title">{category}</h1>
      <div className="products-grid">
        {products.length === 0 ? (
          <p>No products available in this category.</p>
        ) : (
          products.map(p => <Productbox key={p._id} product={p} />)
        )}
      </div>
    </div>
  );
}
