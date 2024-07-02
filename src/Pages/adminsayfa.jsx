import React, { useState } from 'react';
import axios from 'axios';
import './CSS/AdminSayfa.css'; // Import CSS file

const AdminUrunEkle = () => {
  const [formData, setFormData] = useState({
    urunKategori: '',
    urunAd: '',
    urunAdet: '',
    urunFiyat: '',
    urunResim: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/admin/urun-ekle', formData)
      .then(response => {
        setMessage('Ürün başarıyla eklendi');
        setFormData({
          urunKategori: '',
          urunAd: '',
          urunAdet: '',
          urunFiyat: '',
          urunResim: ''
        });
      })
      .catch(error => {
        console.error('Ürün eklenirken bir hata oluştu:', error);
        setMessage('Ürün eklenirken bir hata oluştu.');
      });
  };

  return (
    <div className='admin-urun-ekle'>
      <form className="admin-urun-ekle-container" onSubmit={handleSubmit}>
        <h1>Ürün Ekle</h1>
        <div className="admin-urun-ekle-fields">
          <input
            type="text"
            name="urunKategori"
            placeholder='Kategori'
            value={formData.urunKategori}
            onChange={handleChange}
          />
          <input
            type="text"
            name="urunAd"
            placeholder='Ürün Adı'
            value={formData.urunAd}
            onChange={handleChange}
          />
          <input
            type="number"
            name="urunAdet"
            placeholder='Adet'
            value={formData.urunAdet}
            onChange={handleChange}
          />
          <input
            type="number"
            name="urunFiyat"
            placeholder='Fiyat'
            value={formData.urunFiyat}
            onChange={handleChange}
          />
          <input
            type="text"
            name="urunResim"
            placeholder='Resim URL'
            value={formData.urunResim}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Ürün Ekle</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default AdminUrunEkle;
