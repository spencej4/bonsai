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
                            shipping_email = {this.props.shipping_email}
                            shipping_name_first = {this.props.shipping_name_first}
                            shipping_name_last = {this.props.shipping_name_last}
                            shipping_street_address = {this.props.shipping_street_address}
                            shipping_apt_unit = {this.props.shipping_apt_unit}
                            shipping_city = {this.props.shipping_city}
                            shipping_state = {this.props.shipping_state}
                            shipping_zipcode = {this.props.shipping_zipcode}
                        />
                    </div>
                </React.Fragment>
            )
        }
    // }
}

export default Shipping