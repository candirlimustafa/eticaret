import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/Logout.css'; // CSS dosyasını import ettik

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  const loggedInUser = localStorage.getItem('username');

  return (
    <div className="logout-container">
      <h1>Çıkış Yap</h1>
      <p>{loggedInUser ? `${loggedInUser}, emin misiniz? Çıkış yapmak istediğinizden emin misiniz?` : `Emin misiniz? Çıkış yapmak istediğinizden emin misiniz?`}</p>
      <button onClick={handleLogout}>Çıkış Yap</button>
    </div>
  );
};

export default Logout;
