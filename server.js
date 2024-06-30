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

// Sepet içeriğini getiren endpoint
app.get('/api/sepet', async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query(`
      SELECT 
        sepet.sepetID, 
        sepet.urunID, 
        sepet.urunAdet, 
        urunler.urunAd, 
        urunler.urunFiyat,
        urunler.urunResim  -- Include urunResim field
      FROM 
        sepet 
      INNER JOIN 
        urunler 
      ON 
        sepet.urunID = urunler.urunID
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('Sepet bilgilerini getirirken bir hata oluştu: ' + err.message);
  }
});




// Sepete ekleme endpoint'i
// Sepete ekleme endpoint'i
app.post('/api/sepet', async (req, res) => {
  const { urunID, urunAdet } = req.body;

  if (!urunID || !urunAdet) {
    return res.status(400).send('Ürün ID ve Ürün Adet bilgileri gereklidir.');
  }

  try {
    const pool = await connectToDatabase();
    await pool.request()
      .input('urunID', sql.Int, urunID)
      .input('urunAdet', sql.Int, urunAdet)
      .query('INSERT INTO sepet (urunID, urunAdet) VALUES (@urunID, @urunAdet)');
    res.status(201).send('Ürün sepete başarıyla eklendi');
  } catch (err) {
    console.error('Sepete eklerken bir hata oluştu:', err.message);
    res.status(500).send('Sepete eklerken bir hata oluştu');
  }
});

// Sepetten ürün çıkarma endpoint'i
app.delete('/api/sepet/:sepetID', async (req, res) => {
  const sepetID = req.params.sepetID;
  try {
    const pool = await connectToDatabase();
    await pool.request()
      .input('sepetID', sql.Int, sepetID)
      .query('DELETE FROM sepet WHERE sepetID = @sepetID');
    res.status(200).send(`Sepetten ID'si ${sepetID} olan ürün başarıyla çıkarıldı.`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// Endpoint to confirm order and update stock
app.post('/api/sepet/onayla', async (req, res) => {
  const sepet = req.body.sepet;

  if (!sepet || sepet.length === 0) {
    return res.status(400).send('Sepet boş olamaz.');
  }

  try {
    const pool = await connectToDatabase();
    const transaction = new sql.Transaction(pool);
    await transaction.begin();

    for (const item of sepet) {
      const { urunID, urunAdet } = item;

      // Stock check and update
      const result = await transaction.request()
        .input('urunID', sql.Int, urunID)
        .query('SELECT urunAdet FROM urunler WHERE urunID = @urunID');

      const currentStock = result.recordset[0].urunAdet;

      if (currentStock < urunAdet) {
        await transaction.rollback();
        return res.status(400).send(`Yetersiz stok: ${item.urunAd}`);
      }

      await transaction.request()
        .input('urunID', sql.Int, urunID)
        .input('urunAdet', sql.Int, urunAdet)
        .query('UPDATE urunler SET urunAdet = urunAdet - @urunAdet WHERE urunID = @urunID');

      // Remove item from cart
      await transaction.request()
        .input('sepetID', sql.Int, item.sepetID)
        .query('DELETE FROM sepet WHERE sepetID = @sepetID');
    }

    await transaction.commit();
    res.status(200).send('Sipariş başarıyla alındı ve stok güncellendi.');
  } catch (err) {
    console.error('Siparişi onaylarken bir hata oluştu:', err.message);
    res.status(500).send('Siparişi onaylarken bir hata oluştu: ' + err.message);
  }
});


// Siparişleri getiren endpoint
app.get('/api/siparisler', async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query(`
      SELECT 
        siparisID, 
        musteriID, 
        siparisTarih
      FROM 
        siparisler
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('Siparişleri getirirken bir hata oluştu: ' + err.message);
  }
});






const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
