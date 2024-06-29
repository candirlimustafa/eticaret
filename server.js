const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./db');
const sql = require('mssql');

const app = express();
app.use(express.json());
app.use(cors());

// Müşteri (kullanıcı) verilerini getirme endpoint'i
app.get('/api/musteriler', async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query('SELECT * FROM musteriler');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Ürünler endpoint'i
app.get('/api/urunler', async (req, res) => {
    try {
      const pool = await connectToDatabase();
      const result = await pool.request().query('SELECT * FROM urunler');
      res.json(result.recordset);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

// Kullanıcı kaydı endpoint'i
app.post('/api/register', async (req, res) => {
  const { kullaniciAd, mail, sifre } = req.body;
  try {
    const pool = await connectToDatabase();
    await pool.request()
      .input('kullaniciAd', sql.NVarChar, kullaniciAd)
      .input('mail', sql.NVarChar, mail)
      .input('sifre', sql.NVarChar, sifre)
      .query('INSERT INTO musteriler (kullaniciAd, mail, sifre) VALUES (@kullaniciAd, @mail, @sifre)');
    res.status(201).send('Kullanıcı başarıyla kaydedildi');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Kullanıcı giriş endpoint'i
app.post('/api/login', async (req, res) => {
  const { kullaniciAd, sifre } = req.body;
  try {
    const pool = await connectToDatabase();
    const result = await pool.request()
      .input('kullaniciAd', sql.NVarChar, kullaniciAd)
      .input('sifre', sql.NVarChar, sifre)
      .query('SELECT * FROM musteriler WHERE kullaniciAd = @kullaniciAd AND sifre = @sifre');

    if (result.recordset.length > 0) {
      // Kullanıcı doğrulandı, başarılı giriş
      res.status(200).json({ message: 'Giriş başarılı', kullanici: result.recordset[0] });
    } else {
      // Kullanıcı bulunamadı veya şifre hatalı
      res.status(401).json({ message: 'Kullanıcı adı veya şifre yanlış' });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
