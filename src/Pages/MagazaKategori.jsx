import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/Magaza.css'; // CSS dosyasını import ettik

const Magaza = () => {
  const [urunler, setUrunler] = useState([]);

  useEffect(() => {
    fetchUrunler();
  }, []);

  const fetchUrunler = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/urunler');
      setUrunler(response.data);
    } catch (error) {
      console.error('Ürünleri getirirken bir hata oluştu:', error);
    }
  };

  const handleSepeteEkle = (urunID) => {
    // Burada normalde sepete ekleme işlemleri yapılır, örneğin bir sepete eklemek için backend'e bir POST isteği yapılabilir.
    console.log(`Ürün ID'si ${urunID} olan ürün sepete eklendi.`);
    // Örnek olarak sadece konsola mesaj basıyoruz.
  };

  return (
    <div className="magaza-container">
      <h1>Ürünler</h1>
      <div className="urun-listesi">
        {urunler.map(urun => (
          <div key={urun.urunID} className="urun-karti">
            <h2>{urun.urunAd}</h2>
            <p>Adet: {urun.urunAdet}</p>
            <p>Fiyat: {urun.urunFiyat}</p>
            <button onClick={() => handleSepeteEkle(urun.urunID)} className="sepete-ekle-btn">Sepete Ekle</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Magaza;
