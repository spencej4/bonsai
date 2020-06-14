import React, { useState, useEffect } from 'react';
import Square from './Square';


const PaymentPage = ({ cartSubtotal, onSuccessfullPayment, new_payment_success, new_order_success_confirmation_number }) => {
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
            { squarePayment }
            { successMessage }
        </div>
   
    );
  
}

export default PaymentPage
