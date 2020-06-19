import React, { Component } from 'react';
import StoreContainer from './StoreContainer';

class Store extends Component {
  componentDidMount() {
    this.props.scrollWindow();
  }
  
  render() {
    return (
      <div className='content-wrap'>
        <div className='store-container'>
          <StoreContainer
            products = {this.props.products}
            viewProduct = {this.props.viewProduct}
            addProductToCart = {this.props.addProductToCart}
          />
        </div>
      </div>
    )
  }
}

export default Store