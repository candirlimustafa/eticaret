// src/components/MusteriList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const MusteriList = () => {
  const [sepet, setSepet] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/sepet')
      .then(response => {
        setSepet(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the customers!', error);
      });
  }, []);

  return (
    <div>
      <h1>Müşteri Listesi</h1>
      <ul>
        {sepet.map(sepet => (
          <li key={sepet.musteriID}>
            {sepet.kullaniciAd} - {sepet.mail}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusteriList;
