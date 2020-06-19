import React, { Component } from 'react';

class AddProduct extends Component {
  resetForm = () => { 
    document.getElementById("add-product-form").reset();
  }
  render() {
    return (
      <div className='content-wrap'>
        <div className='admin-container'>
          <h1 className ='admin-h1'>Add a New Product</h1>
          <form id='add-product-form'
                action = " "
                method = " "
                onSubmit={(event) => {this.props.onAddProductSubmit(event); this.resetForm()}}
          >
              <div className='input-field-container form-row'>
                <label>Product Name
                    <br></br>
                    <input className='add-product-input-field'
                          id='new_product_name'
                          name='new_product_name'
                          value={this.props.value}
                          placeholder='Product Name'
                          onChange={(event) => this.props.handleAddProductChange(event)}>
                    </input>
                  </label>
              </div>

              <div className='input-field-container form-row'>
                <label>Product Price
                  <br></br>
                  <input className='add-product-input-field'
                      id='new_product_price'
                      name='new_product_price'
                      value={this.props.value}
                      placeholder='Product Price (integer)'
                      onChange={(event) => this.props.handleAddProductChange(event)}>
                  </input>
                </label>
              </div>

              <div className='input-field-container form-row'>
                  <label>Product Description
                    <br></br>
                    <input className='add-product-input-field'
                        id='new_product_description'
                        name='new_product_description'
                        value={this.props.value}
                        placeholder='Product Description'
                        onChange={(event) => this.props.handleAddProductChange(event)}>
                    </input>
                  </label>
              </div>

              <div className='input-field-container form-row'>
                <label>Product Image
                  <br></br>
                  <input className='add-product-input-field'
                      id='new_product_image_url'
                      name='new_product_image_url'
                      value={this.props.value}
                      placeholder='Product Image (url)'
                      onChange={(event) => this.props.handleAddProductChange(event)}>
                  </input>
                </label>
              </div>
            
              
              <div className='form-row'>
                  <button type='submit' className='submit-btn'>Add New Product</button>
              </div>
          </form>
        </div>
      </div>
    )
    }
}

export default AddProduct