import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'


class CartTotal extends Component {  
    state = {
        redirect: false
      }


      setRedirect = () => {
        this.setState({
          redirect: true
        })
      }


      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to={{
                    pathname: '/shipping',
                    state: {cartSubtotal: this.props.cartSubtotal}
                  }}/>
        }
      }

      
    render() {
        return (
            <div className = 'cart-subtotal-info'>
                <p>Subtotal:
                    <span className ='cart-items-integer'> ( {this.props.cartQuantity} items): 
                        <span className = 'cart-subtotal-integer'>${this.props.cartSubtotal}</span>
                    </span>
                </p>

                {this.renderRedirect()}
                <button className = 'cart-checkout-button'
                        onClick = {() => {this.props.onCheckoutClick(); this.setRedirect();}}>Checkout
                </button>
            </div>
        )
    }  
}


export default CartTotal