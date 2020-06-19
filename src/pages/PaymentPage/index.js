import React, { useState, useEffect } from 'react';
import Square from './Square';


const PaymentPage = ({ cartSubtotal, shipping_form_is_valid, shipping_email, shipping_name_first, shipping_name_last, shipping_street_address, shipping_apt_unit, shipping_city, shipping_state, shipping_zipcode, onSuccessfullPayment, new_payment_success, new_order_success_confirmation_number}) => {
  const [isLoad, setLoad] = useState(false);
  useEffect(() => {
    let sqPaymentScript = document.createElement("script");
    // sandbox: https://js.squareupsandbox.com/v2/paymentform
    // production: https://js.squareup.com/v2/paymentform
    sqPaymentScript.src = "https://js.squareupsandbox.com/v2/paymentform";
    sqPaymentScript.type = "text/javascript";
    sqPaymentScript.async = false;
    sqPaymentScript.onload = () => {
      setLoad(true);
    };
    document.getElementsByTagName("head")[0].appendChild(sqPaymentScript);
  });

  const shippingDetails = shipping_form_is_valid ? (
    <div className = 'shipping-details'>
      <h1>Shipping Details:</h1>
      <ul className = 'shipping-list-items'>
        <li className = 'shipping-detail'>
          <p className = 'shipping-key'>Email:</p>
          <p className = 'shipping-value'>{shipping_email}</p>
        </li>
        <li className = 'shipping-detail'>
          <p className = 'shipping-key'>First:</p> 
          <p className = 'shipping-value'>{shipping_name_first}</p>
        </li>
        <li className = 'shipping-detail'>
          <p className = 'shipping-key'>Last:</p>
          <p className = 'shipping-value'>{shipping_name_last}</p>
        </li>
        <li className = 'shipping-detail'>
          <p className = 'shipping-key'>Address:</p>
          <p className = 'shipping-value'>{shipping_street_address}</p>
        </li>
        <li className = 'shipping-detail'>
          <p className = 'shipping-key'>Apt/Unit:</p>
          <p className = 'shipping-value'>{shipping_apt_unit}</p>
        </li>
        <li className = 'shipping-detail'>
          <p className = 'shipping-key'>City:</p>
          <p className = 'shipping-value'>{shipping_city}</p>
        </li>
        <li className = 'shipping-detail'>
          <p className = 'shipping-key'>State:</p>
          <p className = 'shipping-value'>{shipping_state}</p>
        </li>
        <li className = 'shipping-detail'>
          <p className = 'shipping-key'>Zipcode:</p>
          <p className = 'shipping-value'>{shipping_zipcode}</p>
        </li>
        
      </ul>
    </div>
  ) : (null)

  const squarePayment = (isLoad && !new_payment_success) ? (
        <Square 
          paymentForm={ window.SqPaymentForm }
          cartSubtotal = { cartSubtotal }
          onSuccessfullPayment = { onSuccessfullPayment }
        />
    ) : ( null )
  
  const successMessage =  new_payment_success ? (
        <div className='confirmation-number-container'>
         <h1 className='success-h1'>Success!</h1>
         <br></br>
         <p className='success-number'>Your Confirmation Number:</p>
         <br></br>
         <p className='success-number-integer'> { new_order_success_confirmation_number } </p>
       </div>
  ) : ( null )

 
  return (
        
        <div className="App">
            { shippingDetails }
            { squarePayment }
            { successMessage }
        </div>
   
    );
  
}

export default PaymentPage
