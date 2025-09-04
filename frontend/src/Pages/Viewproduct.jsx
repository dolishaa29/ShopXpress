import cookie from 'js-cookie';
import React ,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CSS/Viewproduct.css'
import Productbox from '../Components/Productadd/Productadd';

const ProductView = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleFetchProduct = () => {
    const token = cookie.get('emstoken');
    if (token) {
      setLoading(true);
      axios
        .get('http://localhost:9000/viewproducts', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((response) => {
          setProductData(response.data.product); 
          console.log("product data--", response.data.product);
        })
        .catch((error) => {
          console.error('Error fetching product data:', error);
          navigate('/loginpage2'); 
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      navigate('/loginpage2'); 
    }
  };

  useEffect(() => {
    handleFetchProduct();
  }, []);

  if (loading) return <p>Loading products...</p>;
if (!productData || productData.length === 0) return <p>No products found</p>;

return (
  <div className="products-container">
    {productData.map((p) => (
      <Productbox key={p._id} product={p} />
    ))}
  </div>
);

};

export default ProductView;
