import React from 'react'
import './Offers.css'
import exclucive_image from '../Assets/exclusive_image.png'

const Offers = () => {
  return (
    <div className='offers'>
        <div className='offers-left'>
            <h1>Özel</h1>
            <h1>Senin İçin</h1>
            <p>ÇOK SATAN ÜRÜNLERDE</p>
            <button>Şimdi Kontrol Et</button>
        </div>
        <div className='offers-right'>
            <img src={exclucive_image} alt="" />
        </div>
    </div>
  )
}

export default Offers