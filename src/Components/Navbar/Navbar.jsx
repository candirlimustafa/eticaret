import React from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import sepet from '../Assets/sepet.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt='Logo' />
        <p>DE MUSTO</p>
      </div>

      <div className='nav-links'>
      <Link to='/anasayfa' className='nav-link'>
          Ana Sayfa
        </Link>
        <Link to='/erkek' className='nav-link'>
          Erkek
        </Link>
        <Link to='/kadın' className='nav-link'>
          Kadın
        </Link>
        <Link to='/cocuk' className='nav-link'>
          Çocuk
        </Link>
        <Link to='/login' className='nav-link'>
          Kayıt Ol
        </Link>
        <Link to='/giris' className='nav-link'>
          Giriş Yap
        </Link>
        <Link to='/logout' className='nav-link'>
          Çıkış Yap
        </Link>
        <Link to='/cart' className='nav-link'>
          <img src={sepet} alt='Sepet' />
        </Link>
        <Link to='/siparislerim' className='nav-link'>
          Siparişlerim
        </Link>
        <Link to='/admin/login' className='nav-link'>
          Admin
        </Link>
        <div className='nav-cart-count'>0</div>
      </div>
    </div>
  );
};

export default Navbar;
