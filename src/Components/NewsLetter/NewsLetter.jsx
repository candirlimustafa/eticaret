import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>E-postanızda Özel Teklifler Alın</h1>
        <p>Bültenimize Abone Olun ve Güncel Kalın</p>
        <div>
            <input type="email" placeholder='Email Adresin' />
            <button>Abone</button>
        </div>
    </div>
  )
}

export default NewsLetter