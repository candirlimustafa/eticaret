import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS/Kargo.css'; // Assuming you have a CSS file for styling

const KargoListesi = () => {
  const [kargolar, setKargolar] = useState([]);

  useEffect(() => {
    fetchKargolar();
  }, []);

  const fetchKargolar = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/kargo');
      setKargolar(response.data);
    } catch (error) {
      console.error('Kargoları getirirken bir hata oluştu:', error);
    }
  };

  return (
    <div className="kargo-listesi-container">
      <h2>Kargo Listesi</h2>
      <table className="kargo-listesi">
        <thead>
          <tr>
            <th>Kargo ID</th>
            <th>Sipariş ID</th>
            <th>Durum</th>
          </tr>
        </thead>
        <tbody>
          {kargolar.map((kargo) => (
            <tr key={kargo.takipID}>
              <td>{kargo.takipID}</td>
              <td>{kargo.siparisID}</td>
              <td>{kargo.durum}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KargoListesi;


