import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS/Iade.css';

const Iadeler = () => {
  const [iadeler, setIadeler] = useState([]);

  useEffect(() => {
    fetchIadeler();
  }, []);

  const fetchIadeler = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/iade');
      setIadeler(response.data);
    } catch (error) {
      console.error('İadeleri getirirken bir hata oluştu:', error);
    }
  };

  return (
    <div className="iadeler-container">
      <h1>İadeler</h1>
      {iadeler.length > 0 ? (
        <div className="iade-listesi">
          {iadeler.map((iade) => (
            <div key={iade.iadeID} className="iade-karti">
              <p>İade ID: {iade.iadeID}</p>
              <p>Sipariş ID: {iade.siparisID}</p>
              <p>İade Tarihi: {new Date(iade.iadeTarih).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Hiç iade yok.</p>
      )}
    </div>
  );
};

export default Iadeler;
