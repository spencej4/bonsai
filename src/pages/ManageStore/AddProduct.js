import React, { Component } from 'react';

class AddProduct extends Component {
  render() {
    return (
      <div className='admin-container'>
        <h1 className ='admin-h1'>Add a New Product:</h1>
        <form id='add-product-form'
              action = " "
              method = " "
              onSubmit={(event) => this.props.onAddProductSubmit(event)}
        >
            <div className='input-field-container'>
              <label className='input_label'>Product Name</label>
                <input className='add-product-input-field'
                      id='new_product_name'
                      name='new_product_name'
                      value={this.props.value}
                      placeholder='Product Name'
                      onChange={(event) => this.props.handleAddProductChange(event)}>
                </input>
            </div>

            <div className='input-field-container'>
              <label className='input_label'>Product Price</label>
                <input className='add-product-input-field'
                    id='new_product_price'
                    name='new_product_price'
                    value={this.props.value}
                    placeholder='Product Price'
                    onChange={(event) => this.props.handleAddProductChange(event)}>
                </input>
            </div>

            <div className='input-field-container'>
                <label className='input_label'>Product Description</label>
                  <input className='add-product-input-field'
                      id='new_product_description'
                      name='new_product_description'
                      value={this.props.value}
                      placeholder='Product Description'
                      onChange={(event) => this.props.handleAddProductChange(event)}>
                  </input>
            </div>

            <div className='input-field-container'>
              <label className='input_label'>Product Image (url)</label>
                <input className='add-product-input-field'
                    id='new_product_image_url'
                    name='new_product_image_url'
                    value={this.props.value}
                    placeholder='Product Image (url)'
                    onChange={(event) => this.props.handleAddProductChange(event)}>
                </input>
            </div>
           
            
            <div className='form-row'>
                <button type='submit' className='submit-btn'>Add New Product</button>
            </div>
        </form>
      </div>
    )
    }
}

export default AddProduct