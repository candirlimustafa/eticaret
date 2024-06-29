import './App.css';
import React from 'react'
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Magaza} from './Pages/Magaza.jsx';
import { MagazaKategori } from './Pages/MagazaKategori.jsx';
import Urunler from './Pages/Urun.jsx';
import { Cart } from './Pages/Cart.jsx';
import { GirisYap } from './Pages/GirisYap.jsx';
import Footer from './Components/Footer/Footer.jsx';
import men_benner from './Components/Assets/banner_mens.png'
import women_benner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'
import { Giris } from './Pages/giris.jsx';
import Logout from './Pages/Logout.jsx';
import UrunDetay from './Pages/urundetay.jsx';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Urunler/>
      <Routes>
        <Route path='/' element={<Magaza/>}></Route>

        <Route path='/urun' element={<Urunler/>}>
          <Route path=':urunId' element={<Urunler/>}/>
        </Route>    
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<GirisYap/>}/>
        <Route path='/giris' element={<Giris/>}/>
        <Route path="/logout" element={<Logout />} /> 
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
/*
        <Route path='/erkek' element={<MagazaKategori banner={men_benner} category="men"/>}/>
        <Route path='/kadın' element={<MagazaKategori banner={women_benner} category="women"/>}/>
        <Route path='/cocuk' element={<MagazaKategori banner={kid_banner} category="kid"/>}/>*/