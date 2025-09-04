import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Sellerprofile = () => {    
    const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleFetchProfile = () => {
    const token = cookie.get('emstoken');
    if (token) {
      setLoading(true);
      axios
        .get('http://localhost:9000/sellerprofile', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((response) => {
          setProfile(response.data.profile); 
          console.log("profile data--", response.data.profile);
        })
        .catch((error) => {
          console.error('Error fetching profile data:', error);
          navigate('/login'); 
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      navigate('/login'); 
    }
  };

  useEffect(() => {
    handleFetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
console.log("profile name-", profile.sname);

  return (
   
      <div>
      <h2>My Profile</h2>
      {profile ? (
        <div>
          <p>Name: {profile.sname}</p>
          <p>Email: {profile.semail}</p>
          <p>Contact:{profile.scontact}</p>
          <p>Address:{profile.companyname}</p>
        </div>
      ) : (
        <p>No profile data available.</p>
      )}
    
    </div>
  )
}

export default Sellerprofile
