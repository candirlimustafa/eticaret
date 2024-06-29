import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

const Item = (urunler) => {
  return (
    <div className='item'>
        <Link to='/${urunler.id}'><img src={urunler.image} alt="" /></Link>
        <p>{urunler.name}</p>
        <div className='item-prices'>
            <div className='item-price-new'>
                {urunler.new_price}₺
            </div>
            <div className='item-price-old'>
                {urunler.old_price}₺
            </div>
            <button >+</button>
        </div>
    </div>
  )
}

export default Item