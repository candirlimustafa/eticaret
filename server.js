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

// admin giriş endpoint'i
app.post('/api/admin/login', async (req, res) => {
  const { adminKullanici, adminSifre } = req.body;
  try {
    const pool = await connectToDatabase();
    const result = await pool.request()
      .input('adminKullanici', sql.NVarChar, adminKullanici)
      .input('adminSifre', sql.NVarChar, adminSifre)
      .query('SELECT * FROM admin WHERE adminKullanici = @adminKullanici AND adminSifre = @adminSifre');

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

// Ürün ekleme endpoint'i
app.post('/api/admin/urun-ekle', async (req, res) => {
  const { urunKategori, urunAd, urunAdet, urunFiyat, urunResim } = req.body;
  try {
    const pool = await connectToDatabase();
    await pool.request()
      .input('urunKategori', sql.NVarChar, urunKategori)
      .input('urunAd', sql.NVarChar, urunAd)
      .input('urunAdet', sql.Int, urunAdet)
      .input('urunFiyat', sql.Decimal, urunFiyat)
      .input('urunResim', sql.NVarChar, urunResim)
      .query('INSERT INTO urunler (urunKategori, urunAd, urunAdet, urunFiyat, urunResim) VALUES (@urunKategori, @urunAd, @urunAdet, @urunFiyat, @urunResim)');
    
    res.status(201).send('Ürün başarıyla eklendi');
  } catch (err) {
    console.error('Ürün eklerken bir hata oluştu:', err.message);
    res.status(500).send('Ürün eklerken bir hata oluştu');
  }
});

// İade işlemi endpoint'i
app.post('/api/iade', async (req, res) => {
  const { siparisID, iadeTarih } = req.body;

  try {
    const pool = await connectToDatabase();
    const request = pool.request();
    
    const query = `
      INSERT INTO iade (siparisID, iadeTarih)
      VALUES (@siparisID, @iadeTarih)`;

    await request
      .input('siparisID', sql.Int, siparisID)
      .input('iadeTarih', sql.DateTime, new Date(iadeTarih)) // Assuming iadeTarih is a valid date string or Date object
      .query(query);

    res.status(201).send('İade işlemi başarıyla tamamlandı.');
  } catch (err) {
    console.error('İade eklerken bir hata oluştu:', err.message);
    res.status(500).send('İade işlemi sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
  }
});


// İadeleri getiren endpoint
app.get('/api/iade', async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query(`
      SELECT iadeID, siparisID, iadeTarih
      FROM iade
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('İadeleri getirirken bir hata oluştu: ' + err.message);
  }
});


// Endpoint to fetch kargolar from the 'kargo' table
app.get('/api/kargo', async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query('SELECT takipID, siparisID, durum FROM kargo'); // 'durum *' yerine 'durum' olmalı
    res.json(result.recordset);
  } catch (error) {
    console.error('Kargoları getirirken bir hata oluştu:', error.message);
    res.status(500).send('Kargoları getirirken bir hata oluştu.');
  }
});





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
