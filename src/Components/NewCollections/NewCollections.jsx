import React from 'react'
import './NewCollestions.css'
import new_collesction from '../Assets/new_collections'
import Item from '../Item/Item'

const NewCollections = () => {
  return (
    <div className='newcollection'>
        <h1>YENİ KOLEKSİYONLAR</h1>
        <hr/>
        <div className='collections'>
            {new_collesction.map((item, i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            }
            )}
        </div>
    </div>
  )
}

export default NewCollections