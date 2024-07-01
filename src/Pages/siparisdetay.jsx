import React from 'react';
import './CSS/SiparisDetay.css';

const SiparisDetay = () => {
  // Sabit verileri burada tanımlayabiliriz
  const siparisDetaylari = [
    { detayID: 1, urunID: 101, urunAd: 'Ürün 1', urunFiyat: 50, urunAdet: 2 },
    { detayID: 2, urunID: 102, urunAd: 'Ürün 2', urunFiyat: 100, urunAdet: 1 },
    { detayID: 3, urunID: 103, urunAd: 'Ürün 3', urunFiyat: 75, urunAdet: 3 },
  ];

  return (
    <div>
      <h2>Sipariş Detayları</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Ürün Adı</th>
            <th>Fiyat</th>
            <th>Adet</th>
            <th>Toplam</th>
          </tr>
        </thead>
        <tbody>
          {siparisDetaylari.map((detay, index) => (
            <tr key={detay.detayID}>
              <td>{index + 1}</td>
              <td>{detay.urunAd}</td>
              <td>{detay.urunFiyat} TL</td>
              <td>{detay.urunAdet}</td>
              <td>{detay.urunFiyat * detay.urunAdet} TL</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SiparisDetay;
