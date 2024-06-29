import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Kullanıcı oturumunu sonlandırma işlemleri
    localStorage.removeItem('username'); // localStorage'dan kullanıcı adını kaldırma

    // Çıkış işleminden sonra ana sayfaya yönlendirme
    navigate('/'); // Ana sayfa ya da istediğiniz bir sayfaya yönlendirme yapabilirsiniz
  };

  const loggedInUser = localStorage.getItem('username'); // localStorage'dan kullanıcı adını alma

  return (
    <div>
      <h1>Çıkış Yap</h1>
      <p>{loggedInUser ? `${loggedInUser}, emin misiniz? Çıkış yapmak istediğinizden emin misiniz?` : `Emin misiniz? Çıkış yapmak istediğinizden emin misiniz?`}</p>
      <button onClick={handleLogout}>Çıkış Yap</button>
    </div>
  );
};

export default Logout;
