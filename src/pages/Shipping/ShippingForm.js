import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class ShippingForm extends Component {
  state = {
    redirect: false,
    formError: false,
    errorMessage: "Please Check Form for Errors"
  }


  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }


  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{
                pathname: '/process-payment',
                state: {cartSubtotal: this.props.cartSubtotal}
              }}/>
    }
  }

  validateForm(event) {
    event.preventDefault();
    let formElements = {
      shipping_email: this.props.shipping_email,
      shipping_name_first: this.props.shipping_name_first,
      shipping_name_last: this.props.shipping_name_last,
      shipping_street_address: this.props.shipping_street_address,
      shipping_apt_unit: this.props.shipping_apt_unit,
      shipping_city: this.props.shipping_city,
      shipping_state: this.props.shipping_state,
      shipping_zipcode: this.props.shipping_zipcode
    }

    console.log(formElements)

    Object.keys(formElements).forEach(key => {
      console.log(`key: ${key}, value: ${formElements[key]}`)
  
      if (formElements[key] === null) {
        document.getElementById(key).style.border = "1px solid red"
        document.getElementById(key).style.borderRadius = "5px";

        this.setState({
          formError: true
        })
      }
    })

    if (!this.state.formError) {
      this.props.onShippingFormSubmit(event);
      this.setRedirect();
    }

  
  }
  

  render() {
    return (
      <div className='content-wrap'>
        <div className='admin-container'>
          <h1 className ='admin-h1'>Enter Shipping Information</h1>
          {this.renderRedirect()}
          <form id='add-product-form'
                action = " "
                method = " "
                onSubmit={(event) => {this.validateForm(event)}}
          >   
              <div className='input-field-container form-row'>
                <label>Email
                    <br></br>
                    <input className='add-product-input-field'
                          id='shipping_email'
                          name='shipping_email'
                          value={this.props.value}
                          placeholder='Email Address'
                          onChange={(event) => this.props.handleShippingFormChange(event)}>
                    </input>
                  </label>
              </div>

              <div className='input-field-container form-row'>
                <label>First Name
                    <br></br>
                    <input className='add-product-input-field'
                          id='shipping_name_first'
                          name='shipping_name_first'
                          value={this.props.value}
                          placeholder='First Name'
                          onChange={(event) => this.props.handleShippingFormChange(event)}>
                    </input>
                  </label>
              </div>

              <div className='input-field-container form-row'>
                <label>Last Name
                  <br></br>
                  <input className='add-product-input-field'
                      id='shipping_name_last'
                      name='shipping_name_last'
                      value={this.props.value}
                      placeholder='Last Name'
                      onChange={(event) => this.props.handleShippingFormChange(event)}>
                  </input>
                </label>
              </div>

              <div className='input-field-container form-row'>
                  <label>Street Address
                    <br></br>
                    <input className='add-product-input-field'
                        id='shipping_street_address'
                        name='shipping_street_address'
                        value={this.props.value}
                        placeholder='Street Address'
                        onChange={(event) => this.props.handleShippingFormChange(event)}>
                    </input>
                  </label>
              </div>

              <div className='input-field-container form-row'>
                  <label>Apartment/ Unit Number
                    <br></br>
                    <input className='add-product-input-field'
                        id='shipping_apt_unit'
                        name='shipping_apt_unit'
                        value={this.props.value}
                        placeholder='Apt / Unit #'
                        onChange={(event) => this.props.handleShippingFormChange(event)}>
                    </input>
                  </label>
              </div>

              <div className='input-field-container form-row'>
                <label>City
                  <br></br>
                  <input className='add-product-input-field'
                      id='shipping_city'
                      name='shipping_city'
                      value={this.props.value}
                      placeholder='City'
                      onChange={(event) => this.props.handleShippingFormChange(event)}>
                  </input>
                </label>
              </div>

              <div className='input-field-container form-row'>
                <label>State
                  <br></br>
                  <input className='add-product-input-field'
                      id='shipping_state'
                      name='shipping_state'
                      value={this.props.value}
                      placeholder='State'
                      onChange={(event) => this.props.handleShippingFormChange(event)}>
                  </input>
                </label>
              </div>

              <div className='input-field-container form-row'>
                <label>Zipcode
                  <br></br>
                  <input className='add-product-input-field'
                      id='shipping_zipcode'
                      name='shipping_zipcode'
                      value={this.props.value}
                      placeholder='Zipcode'
                      onChange={(event) => this.props.handleShippingFormChange(event)}>
                  </input>
                </label>
              </div>
            
              
              <div className='form-row'>
                  <button type='submit' className='submit-btn'>Submit and Checkout</button>
              </div>
              {(this.state.formError ? (
                <div className = 'form-row'>
                  <div className = 'form-error'>
                    <p className = 'error'>{this.state.errorMessage}</p>
                  </div>
                </div>
              ) : null)}
              
          </form>
        </div>
      </div>
    )
    }
}

export default ShippingForm