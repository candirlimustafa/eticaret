import React from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import sepet from '../Assets/sepet.png';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img height={150} width={200} src={logo} alt=''/>
        <p>DE MUSTO</p>
      </div>
    
      <div className='nav-login-cart'>
        <Link to='/erkek'><button>Erkek</button></Link>
        <Link to='/kadın'><button>Kadın</button></Link>
        <Link to='/cocuk'><button>Çocuk</button></Link>
        <Link to='/login'><button>Kayıt Ol</button></Link>
        <Link to='/giris'><button>Giriş Yap</button></Link>
        <Link to='/logout'><button>Çıkış Yap</button></Link>
        <Link to='/cart'><img height={50} src={sepet} alt=''/></Link>
        <Link to='/siparislerim'><button>Siparişlerim</button></Link> {/* Rota adını küçük harflerle güncelleyin */}
        <div className='nav-cart-count'>0</div>
      </div>
    </div>
  );
}

export default Navbar;
