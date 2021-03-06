import React, { Component } from 'react';
import Product from './Product';

class StoreContainer extends Component {
  render() {
    return (
      this.props.products.map((item, id) => {   
          return ( 
            <li key = {item.product.toString()}
                className = 'product-list-item'>
                  <Product 
                        key = {item.id}
                        _id = {item._id}
                        product = {item.product}
                        price = {item.price}   
                        description = {item.description}   
                        image = {item.image}
                        viewProduct = {this.props.viewProduct}
                  ></Product>
            </li>
          )
      })
    )
  }
}

export default StoreContainer