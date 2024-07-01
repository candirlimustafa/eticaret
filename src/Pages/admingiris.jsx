import React, { useState } from 'react';
import axios from 'axios';
import './CSS/AdminGiris.css';

const AdminGiris = () => {
  const [adminKullanici, setAdminKullanici] = useState('');
  const [adminSifre, setAdminSifre] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/admin/login', { adminKullanici, adminSifre });
      console.log(response.data.message); // Optional: Handle success message

      // Show alert on successful login
      alert('Admin girişi başarıyla gerçekleşti. Tamam\'a tıklayın.');

      // Redirect to AdminUrunEkle page
      window.location.href = '/admin-urun-ekle';
      
    } catch (error) {
      setError('Admin girişi başarısız. Kullanıcı adı veya şifre hatalı.');
      console.error('Admin girişi başarısız:', error);
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Girişi</h2>
      <div>
        <label>Kullanıcı Adı:</label>
        <input type="text" value={adminKullanici} onChange={(e) => setAdminKullanici(e.target.value)} />
      </div>
      <div>
        <label>Şifre:</label>
        <input type="password" value={adminSifre} onChange={(e) => setAdminSifre(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Giriş Yap</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AdminGiris;
