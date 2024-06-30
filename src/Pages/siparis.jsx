import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS/Siparisler.css';

const Siparisler = () => {
  const [siparisler, setSiparisler] = useState([]);

  useEffect(() => {
    fetchSiparisler();
  }, []);

  const fetchSiparisler = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/siparisler');
      setSiparisler(response.data);
    } catch (error) {
      console.error('Siparişleri getirirken bir hata oluştu:', error);
    }
  };

  return (
    <div className="siparisler-container">
      <h1>Siparişlerim</h1>
      {siparisler.length > 0 ? (
        <div className="siparis-listesi">
          {siparisler.map(siparis => (
            <div key={siparis.siparisID} className="siparis-karti">
              <p>Sipariş ID: {siparis.siparisID}</p>
              <p>Müşteri ID: {siparis.musteriID}</p>
              <p>Sipariş Tarihi: {new Date(siparis.siparisTarih).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Hiç siparişiniz yok.</p>
      )}
    </div>
  );
};

export default Siparisler;
