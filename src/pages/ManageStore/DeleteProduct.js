import React, { Component } from 'react';
import DeleteProductContainer from './DeleteProductContainer';

class DeleteProduct extends Component {
  render() {
    return (
      <div className='admin-container'>
        <h1 className='admin-h1'>Delete A Product</h1>
      
        <div className='store-container'>
          <DeleteProductContainer
            products = {this.props.products}
            deleteProduct = {this.props.deleteProduct}
          />
        </div>
    </div>
    )
    }
}

export default DeleteProduct
