import React, { Component } from 'react';
import StoreContainer from './StoreContainer';
// import Product from './Product';

class Store extends Component {
  render() {
    return (
      <div className='store-container'>
        <StoreContainer
          products = {this.props.products}
        />
      </div>
    )
  }
}

export default Store