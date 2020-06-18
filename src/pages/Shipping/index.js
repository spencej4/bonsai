import React, { Component } from 'react';
import ShippingForm from './ShippingForm'
// import CartTotal from './CartTotal';

class Shipping extends Component {
    render() {
            return (
                <React.Fragment>
                    <div className='shipping-container'>
                        <ShippingForm
                            handleShippingFormChange = {this.props.handleShippingFormChange}
                            onShippingFormSubmit = {this.props.onShippingFormSubmit}
                        />
                    </div>
                </React.Fragment>
            )
        }
    // }
}

export default Shipping