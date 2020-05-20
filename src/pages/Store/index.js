import React, { Component } from 'react';
import StoreContainer from './StoreContainer';

class Store extends Component {
  render() {
    return (
        <div className='store-container'>
          <StoreContainer
            products = {this.props.products}
            viewProduct = {this.props.viewProduct}
            addProductToCart = {this.props.addProductToCart}
          />
        </div>
    )
  }
}

export default Store