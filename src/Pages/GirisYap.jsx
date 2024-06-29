import React, { useState } from 'react';
import axios from 'axios';
import './CSS/GirisYap.css';

export const GirisYap = () => {
  const [formData, setFormData] = useState({
    kullaniciAd: '',
    mail: '',
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
    axios.post('http://localhost:3000/api/register', formData)
      .then(response => {
        alert('Kullanıcı başarıyla kaydedildi');
      })
      .catch(error => {
        console.error('There was an error registering the user!', error);
      });
  };

  const handleLoginClick = () => {
    // Giriş yap sayfasına yönlendirme işlemi
    window.location.href = './giris.jsx';
  };

  return (
    <div className='loginsignup'>
      <form className="loginsignup-container" onSubmit={handleSubmit}>
        <h1>Kayıt Ol</h1>
        <div className="loginsignup-fields">
          <input
            type="text"
            name="kullaniciAd"
            placeholder='Kullanıcı Adı'
            value={formData.kullaniciAd}
            onChange={handleChange}
          />
          <input
            type="email"
            name="mail"
            placeholder='E-mail Adresi'
            value={formData.mail}
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
        <button type="submit">Devam Et</button>
        <p className="loginsignup-login">Zaten hesabın var mı? <span onClick={handleLoginClick}>Giriş Yap</span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>Devam etmek için kullanıcı sözleşmesini okuyun.</p>
        </div>
      </form>
    </div>
  );
};
