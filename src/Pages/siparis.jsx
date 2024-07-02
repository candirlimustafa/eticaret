import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CSS/Siparisler.css';

const Siparisler = () => {
  const [siparisler, setSiparisler] = useState([]);
  const navigate = useNavigate();

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
    navigate(`/siparisler/${siparisID}`);
  };

  const handleIadeEt = (siparisID) => {
    setSiparisler((prevSiparisler) =>
      prevSiparisler.map((siparis) =>
        siparis.siparisID === siparisID ? { ...siparis, iadeEdildi: true } : siparis
      )
    );
  };

  return (
    <div className="siparisler-container">
      <h1>Siparişlerim</h1>
      {siparisler.length > 0 ? (
        <div className="siparis-listesi">
          {siparisler.map((siparis) => (
            <div key={siparis.siparisID} className={`siparis-karti ${siparis.iadeEdildi ? 'iade-edildi' : ''}`}>
              <p>Sipariş ID: {siparis.siparisID}</p>
              <p>Müşteri ID: {siparis.musteriID}</p>
              <p>Sipariş Tarihi: {new Date(siparis.siparisTarih).toLocaleDateString()}</p>
              {siparis.iadeEdildi && <p className="iade-edildi-mesaj">Bu sipariş iade edildi</p>}
              <button onClick={() => handleDetayGoster(siparis.siparisID)} className="detay-btn">
                Detaylar
              </button>
              <button onClick={() => handleIadeEt(siparis.siparisID)} className="iade-btn" disabled={siparis.iadeEdildi}>
                İade Et
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
