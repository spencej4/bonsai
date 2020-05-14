import React, { Component } from 'react';

class CartItem extends Component {
  render() {
        return (
            <div className = 'cart-product-container'>
                <div className = 'cart-image-container'>
                    <img src={this.props.image} 
                        className='cart-product-image' alt={this.props.description}> 
                    </img>
                </div>
                <div className = 'cart-product-info-container'>
                    <div className ='cart-product-name'>{this.props.product}</div>
                    <div className ='cart-product-price'>Price: ${this.props.price}</div>
                    <div className ='cart-product-description'>About: {this.props.description}</div>
                    <button className = 'cart-remove-from-cart-button'
                            onClick = {() => this.props.removeProductFromCart(this.props._id)}>Remove From Cart</button>
                </div>
            </div>
        )
    }
}

export default CartItem;