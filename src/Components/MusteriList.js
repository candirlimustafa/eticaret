// src/components/MusteriList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MusteriList = () => {
  const [musteriler, setMusteriler] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/musteriler')
      .then(response => {
        setMusteriler(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the customers!', error);
      });
  }, []);

  return (
    <div>
      <h1>Müşteri Listesi</h1>
      <ul>
        {musteriler.map(musteri => (
          <li key={musteri.musteriID}>
            {musteri.kullaniciAd} - {musteri.mail}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusteriList;
