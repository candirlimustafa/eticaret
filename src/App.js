import './App.css';
import React from 'react'
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Magaza} from './Pages/Magaza.jsx';
import { MagazaKategori } from './Pages/MagazaKategori.jsx';
import Urunler from './Pages/Urun.jsx';
import Sepet from './Pages/Cart.jsx';
import { GirisYap } from './Pages/GirisYap.jsx';
import Footer from './Components/Footer/Footer.jsx';
import men_benner from './Components/Assets/banner_mens.png'
import women_benner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'
import { Giris } from './Pages/giris.jsx';
import Logout from './Pages/Logout.jsx';
import UrunDetay from './Pages/urundetay.jsx';
import Erkek from './Pages/Urun.jsx';
import Kadın from './Pages/Kadın.jsx';
import Cocuk from './Pages/Cocuk.jsx';
import MusteriList from './Components/MusteriList.js';
import Siparislerim from './Pages/siparis.jsx';
import Siparisler from './Pages/siparis.jsx';


function App() {
  const musteriID = 1;
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/erkek' element={<Erkek/>}></Route>
        <Route path='/kadın' element={<Kadın/>}></Route>
        <Route path='/cocuk' element={<Cocuk/>}></Route>
        

        <Route path='/urun' element={<Urunler/>}>
          <Route path=':urunId' element={<Urunler/>}/>
        </Route>    
        <Route path='/cart' element={<Sepet/>}/>
        <Route path='/login' element={<GirisYap/>}/>
        <Route path='/giris' element={<Giris/>}/>
        <Route path="/logout" element={<Logout />} /> 
        <Route path="/siparislerim" element={<Siparisler />} />
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