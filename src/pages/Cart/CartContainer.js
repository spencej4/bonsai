import React, { Component } from 'react';
import CartItem from './CartItem'

class CartContainer extends Component {
    render() {
        return (
            this.props.cart.map((item, id) => {
                return(
                    <li key = {item.product.toString()}
                        className = 'cart-list-item'>
                        <CartItem 
                            image = {item.image}
                            description = {item.description}
                            product = {item.product}
                            price = {item.price}
                            _id = {item._id}
                            removeProductFromCart = {this.props.removeProductFromCart}
                        ></CartItem>
                    </li>
                )
            })
        )
    }
}

export default CartContainer