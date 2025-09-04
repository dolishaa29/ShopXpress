import React from 'react'
import './stock.css'
import hand from '../Assets/hand_icon.png'
import arrow from '../Assets/arrow.png'
import image from '../Assets/imageeh.png'
const stock = () => {
  return (
    <div className='stock'>
        <div className='stock-left'>
            <h2 >New Arrivals</h2>
            <div>
                <div className='stock-hand-icon'>
                   <p>New</p>
                   <img src={hand} alt=''/>
                </div>
                <p>Collections</p>
                <p>For Everyone</p>
            </div>
            <div className='buttonn'>
              <div>Latest Collection</div>
              <img src={arrow} alt=''/>
            </div>
        </div>
        <div className='stock-right'>
        <img src={image} alt=''/>
        </div>
      
    </div>
  )
}

export default stock
