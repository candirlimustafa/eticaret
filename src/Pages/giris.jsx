import React, { useState } from 'react';
import axios from 'axios';


export const Giris = () => {
  const [formData, setFormData] = useState({
    kullaniciAd: '',
    sifre: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/login', formData)
      .then(response => {
        // Başarılı giriş durumunda localStorage'a kullanıcı adını kaydet
        localStorage.setItem('username', formData.kullaniciAd);
  
        alert('Giriş başarılı');
        // Başarılı giriş durumunda kullanıcıyı ana sayfaya yönlendirme örneği
        window.location.href = '/MagazaKategori.jsx';
      })
      .catch(error => {
        console.error('Giriş yaparken bir hata oluştu!', error);
        alert('Giriş başarısız, lütfen tekrar deneyin');
      });
  };
  

  return (
    <div className='loginsignup'>
      <form className="loginsignup-container" onSubmit={handleSubmit}>
        <h1>Giriş Yap</h1>
        <div className="loginsignup-fields">
          <input
            type="text"
            name="kullaniciAd"
            placeholder='Kullanıcı Adı'
            value={formData.kullaniciAd}
            onChange={handleChange}
          />
          <input
            type="password"
            name="sifre"
            placeholder='Şifre'
            value={formData.sifre}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Giriş Yap</button>
        <p className="loginsignup-login">Henüz hesabınız yok mu? <span>Kayıt Ol</span></p>
      </form>
    </div>
  );
};
