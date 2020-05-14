import React, { Component } from 'react';
import CartContainer from './CartContainer'

class Cart extends Component {
    render() {
        if (this.props.cart.length === 0) {
            return (
                <div className='temp-testing'>
                    <h1>Your cart is empty</h1>
                </div>
            )
        } else {
            return (
                <div className='cart-container'>
                    <CartContainer
                        cart = {this.props.cart}
                        removeProductFromCart = {this.props.removeProductFromCart}
                    />
                </div>
            )
        }
    }
}

export default Cart