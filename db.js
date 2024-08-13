// db.js
const sql = require('mssql');

const config = {
  user: '', // MSSQL kullanıcı adı
  password: '', // MSSQL şifresi
  server: 'localhost',
  database: 'demusto', // Kullanmak istediğiniz veritabanı
  options: {
    encrypt: true, // Azure kullanıyorsanız
    trustServerCertificate: true // Yerel geliştirme ve test için
  }
};

const connectToDatabase = async () => {
  try {
    const pool = await sql.connect(config);
    if (pool.connected) console.log('Connected to MSSQL');
    return pool;
  } catch (err) {
    console.error('Database connection failed: ', err);
    throw err;
  }
};

module.exports = { sql, connectToDatabase };
