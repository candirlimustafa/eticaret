import React from 'react'
import './Breadcrums.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'

const Breadcrums = (props) => {
    const {urun} = props;
  return (
    <div className='breadcrum'>
        HOME <img src={arrow_icon} alt="" /> MAĞAZA <img src={arrow_icon} alt="" /> {urun.category} <img src={arrow_icon} alt="" />{urun.name}
    </div>
  )
}

export default Breadcrums