import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class CartTotal extends Component {  
    render() {
        return (
            <div className = 'cart-subtotal-info'>
                <p>Subtotal:
                    <span className ='cart-items-integer'> ( {this.props.cartQuantity} items): 
                        <span className = 'cart-subtotal-integer'>${this.props.cartSubtotal}</span>
                    </span>
                </p>
            </div>
        )
    }  
}


export default CartTotal