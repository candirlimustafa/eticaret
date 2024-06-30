import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/Magaza.css'; // CSS dosyasını import ettik

const Erkek = () => {
  const [urunler, setUrunler] = useState([]);
  const [adetler, setAdetler] = useState({});

  useEffect(() => {
    fetchUrunler();
  }, []);

  const fetchUrunler = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/urunler');
      const erkekUrunler = response.data.filter(urun => urun.urunKategori === 'erkek');
      setUrunler(erkekUrunler);
    } catch (error) {
      console.error('Ürünleri getirirken bir hata oluştu:', error);
    }
  };

  const handleAdetDegistir = (urunID, degisim) => {
    setAdetler(prevState => ({
      ...prevState,
      [urunID]: (prevState[urunID] || 1) + degisim
    }));
  };

  const handleSepeteEkle = async (urunID) => {
    const urunAdet = adetler[urunID] || 1; // Eğer adet belirlenmediyse varsayılan olarak 1

    try {
      await axios.post('http://localhost:3000/api/sepet', {
        urunID,
        urunAdet
      });
      console.log(`Ürün ID'si ${urunID} olan ürün sepete eklendi.`);
    } catch (error) {
      console.error('Sepete eklerken bir hata oluştu:', error);
    }
  };

  const handleSepetiOnayla = async () => {
    try {
      await axios.post('http://localhost:3000/api/sepet/onayla', { sepet: urunler });
      alert('Siparişiniz alındı ve veritabanına kaydedildi.');
      // Sepeti sıfırla veya güncelleme işlemi yapılabilir
      setUrunler([]);
      setAdetler({});
    } catch (error) {
      console.error('Siparişi onaylarken bir hata oluştu:', error);
    }
  };

  return (
    <div className="magaza-container">
      <h1>Erkek Ürünleri</h1>
      <div className="urun-listesi">
        {urunler.map(urun => (
          <div key={urun.urunID} className="urun-karti">
            <img src={urun.urunResim} alt={urun.urunAd} className="urun-resim" />
            <h2>{urun.urunAd}</h2>
            <p>Adet: {urun.urunAdet}</p>
            <p>Fiyat: {urun.urunFiyat}</p>
            <div className="adet-kontrol">
              <button onClick={() => handleAdetDegistir(urun.urunID, -1)} disabled={adetler[urun.urunID] <= 1}>-</button>
              <span>{adetler[urun.urunID] || 1}</span>
              <button onClick={() => handleAdetDegistir(urun.urunID, 1)}>+</button>
            </div>
            <button onClick={() => handleSepeteEkle(urun.urunID)} className="sepete-ekle-btn">Sepete Ekle</button>
          </div>
        ))}
      </div>
      <button onClick={handleSepetiOnayla} className="sepeti-onayla-btn">Sepeti Onayla</button>
    </div>
  );
};

export default Erkek;
