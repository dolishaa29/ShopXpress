import React from 'react'
import './CSS/addUp.css'

const Updateproduct = () => {
  return (
    <div className='addproduct'>
      <div className='addproduct-container'>
        <h1>Update Product</h1>
        <form onSubmit={handleSubmit}>
        <div className='addproductfeild'>
            <input type='text' placeholder='Product Name' name='name'/>
            <select id="type" name="type" required>
            <option value="mens">Mens</option>
            <option value="womens">Womens</option>
            <option value="kids">Kids</option>
            <option value="accessories">Accessories</option>
            <option value="homedecor">Homedecor</option>
            </select>
            <input type="number" id="price" placeholder="Enter product price" name="price" required/>
            <input type="text" id="description" placeholder="Enter product description" name="description" required/>
            <input type="file" id="image" name="image" accept="image/*" required/>
        </div>
      <button>Update Product</button>
      </form>
      </div> 
    </div>
  )
}

export default Updateproduct;
