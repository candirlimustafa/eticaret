import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CSS/Siparisler.css';

const Siparisler = () => {
  const [siparisler, setSiparisler] = useState([]);
  const navigate = useNavigate(); // useNavigate kancasını kullanarak yönlendirme yapmak için

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

  const handleDetayGoster = (siparisID) => {
    // Detay sayfasına yönlendirme yap
    navigate(`/siparisler/${siparisID}`);
  };

  return (
    <div className="siparisler-container">
      <h1>Siparişlerim</h1>
      {siparisler.length > 0 ? (
        <div className="siparis-listesi">
          {siparisler.map((siparis) => (
            <div key={siparis.siparisID} className="siparis-karti">
              <p>Sipariş ID: {siparis.siparisID}</p>
              <p>Müşteri ID: {siparis.musteriID}</p>
              <p>Sipariş Tarihi: {new Date(siparis.siparisTarih).toLocaleDateString()}</p>
              <button onClick={() => handleDetayGoster(siparis.siparisID)} className="detay-btn">
                Detaylar
              </button>
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
