import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/Sepet.css';

const Sepet = () => {
  const [sepet, setSepet] = useState([]);
  const [toplamFiyat, setToplamFiyat] = useState(0);

  useEffect(() => {
    fetchSepet();
  }, []);

  useEffect(() => {
    hesaplaToplamFiyat();
  }, [sepet]);

  const fetchSepet = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/sepet');
      setSepet(response.data);
    } catch (error) {
      console.error('Sepet bilgilerini getirirken bir hata oluştu:', error);
    }
  };

  const hesaplaToplamFiyat = () => {
    const toplam = sepet.reduce((acc, item) => acc + (item.urunAdet * item.urunFiyat), 0);
    setToplamFiyat(toplam);
  };

  const handleSepettenCikar = async (sepetID) => {
    try {
      await axios.delete(`http://localhost:3000/api/sepet/${sepetID}`);
      fetchSepet(); // Sepeti güncelle
    } catch (error) {
      console.error('Ürünü sepetten çıkartırken bir hata oluştu:', error);
    }
  };

  const handleSepetiOnayla = async () => {
    try {
      await axios.post('http://localhost:3000/api/sepet/onayla', { sepet });
      alert('Siparişiniz alındı');
      fetchSepet(); // Sepeti güncelle
    } catch (error) {
      console.error('Siparişi onaylarken bir hata oluştu:', error);
    }
  };

  return (
    <div className="sepet-container">
      <h1>Sepetiniz</h1>
      {sepet.length > 0 ? (
        <>
          <div className="urun-listesi">
            {sepet.map(item => (
              <div key={item.sepetID} className="urun-karti">
                <img src={item.urunResim} alt={item.urunAd} className="urun-resim" />
                <div className="urun-detay">
                  <h2>{item.urunAd}</h2>
                  <p>ID: {item.urunID}</p>
                  <p>Fiyat: {item.urunFiyat} TL</p>
                  <p>Adet: {item.urunAdet}</p>
                  <p>Toplam: {item.urunAdet * item.urunFiyat} TL</p>
                  <button onClick={() => handleSepettenCikar(item.sepetID)} className="sepetten-cikar-btn">Sepetten Çıkar</button>
                </div>
              </div>
            ))}
          </div>
          <h2>Toplam Fiyat: {toplamFiyat} TL</h2>
          <button onClick={handleSepetiOnayla} className="sepeti-onayla-btn">Sepeti Onayla</button>
        </>
      ) : (
        <p>Sepetinizde ürün bulunmamaktadır.</p>
      )}
    </div>
  );
};

export default Sepet;
