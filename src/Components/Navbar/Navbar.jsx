import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import sepet from '../Assets/sepet.png'
import { Link } from "react-router-dom"

const Navbar = () => {
  const [menu,setMenu] = useState('magaza');

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img height={150} width={200} src={logo} alt=''/>
        <p>DE MUSTO</p>
      </div>
    <ul className='nav-menu'>
      <li onClick={()=>{setMenu("magaza")}}><Link style={{textDecoration: 'none'}} to='/'>Mağaza</Link>{menu==="magaza"?<hr/>:<></>} </li>
      <li onClick={()=>{setMenu("erkek")}}><Link style={{textDecoration: 'none'}} to='/erkek'>Erkek</Link>{menu==="erkek"?<hr/>:<></>}</li>
      <li onClick={()=>{setMenu("kadın")}}><Link style={{textDecoration: 'none'}} to='/kadın'>Kadın</Link>{menu==="kadın"?<hr/>:<></>}</li>
      <li onClick={()=>{setMenu("cocuk")}}><Link style={{textDecoration: 'none'}} to='/cocuk'>Çocuk</Link>{menu==="cocuk"?<hr/>:<></>}</li>
    </ul>
    <div className='nav-login-cart'>
      <Link to='/login'><button>Kayıt Ol</button></Link>
      <Link to='/giris'><button>Giriş Yap</button></Link>
      <Link to='/logout'><button>Çıkış Yap</button></Link>
      <Link to='/cart'><img height={50} src={sepet} alt=''/></Link>
      <div className='nav-cart-count'>0</div>
    </div>
    </div>
    
  )
}

export default Navbar
