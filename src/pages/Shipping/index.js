import React, { Component } from 'react';
import ShippingForm from './ShippingForm'
// import CartTotal from './CartTotal';

class Shipping extends Component {
    render() {
        // if (this.props.cart.length === 0) {
        //     return (
        //         <div className='temp-testing'>
        //             <h1>Your cart is empty</h1>
        //         </div>
        //     )
        // } else {
            return (
                <React.Fragment>
                <div className='shipping-container'>
                    <ShippingForm
                        handleShippingFormChange = {this.props.handleShippingFormChange}
                        onShippingFormSubmit = {this.props.onShippingFormSubmit}
                        // cart = {this.props.cart}
                        // removeProductFromCart = {this.props.removeProductFromCart}
                    />
                </div>
                {/* <div className = 'cart-total-container'>
                    <CartTotal 
                        cart = {this.props.cart}
                        cartQuantity = {this.props.cartQuantity}
                        cartSubtotal = {this.props.cartSubtotal}
                        calculateCartSubtotal = {this.props.calculateCartSubtotal}
                        onCheckoutClick = {this.props.onCheckoutClick}
                    />
                </div> */}
                </React.Fragment>
            )
        }
    // }
}

export default Shipping