import React from 'react';

// const Square = ({ paymentForm, cartSubtotal }) => {
const Square = ({ paymentForm, cartSubtotal, onSuccessfullPayment }) => {
    // Build your sqPaymentForm here
    // Set the application ID
    const applicationId = process.env.REACT_APP_APLLICATION_ID;

    // onGetCardNonce is triggered when the "Pay $1.00" button is clicked
    function onGetCardNonce(event) {
        // Don't submit the form until SqPaymentForm returns with a nonce
        event.preventDefault();
        // Request a nonce from the SqPaymentForm object
        form.requestCardNonce();
    }


    function submitPaymentRequest(event) {
        let nonce = document.getElementById("card-nonce").value;

        fetch("/api/process-payment", {
            method: "POST",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nonce: nonce,
                amount: cartSubtotal
            })
        })
            .then(response => {
                console.log(response);
                response.json()
            .then(data => {
                console.log(data);
                // response data title reads: "Payment Successful"
                if(data.title === 'Payment Successful') {
                    // calls function in app.js
                    onSuccessfullPayment();
                }
                // alert(JSON.stringify(data));
            });
            })
            .catch(function(error) {
                console.log("the error was", error);
            });
    }


    // Create and initialize a payment form object
    // const paymentForm = ({
    const form = new paymentForm({
        // Initialize the payment form elements
        applicationId: applicationId,
        inputClass: "sq-input",

        // Customize the CSS for SqPaymentForm iframe elements
        inputStyles: [
            {
            fontSize: "16px",
            lineHeight: "24px",
            padding: "16px",
            placeholderColor: "#a0a0a0",
            backgroundColor: "transparent"
            }
        ],

        // Initialize the credit card placeholders
        cardNumber: {
            elementId: "sq-card-number",
            placeholder: "Card Number"
        },
        cvv: {
            elementId: "sq-cvv",
            placeholder: "CVV"
        },
        expirationDate: {
            elementId: "sq-expiration-date",
            placeholder: "MM/YY"
        },
        postalCode: {
            elementId: "sq-postal-code",
            placeholder: "Postal"
        },
        amount: {
            elementId: "sq-amount",
            placeholder: "Amount"
        },

        // SqPaymentForm callback functions
        callbacks: {
            /*
            * callback function: cardNonceResponseReceived
            * Triggered when: SqPaymentForm completes a card nonce request
            */
            cardNonceResponseReceived: function(errors, nonce, cardData) {
            if (errors) {
                // Log errors from nonce generation to the browser developer console.
                console.error("Encountered errors:");
                errors.forEach(function(error) {
                    console.error("  " + error.message);
                });
                // amend this to alert user of bad payment process
                alert( "Encountered errors, check browser developer console for more details");
                return;
            }

            // alert(`The generated nonce is:\n${nonce}`);
            // Uncomment the following block to
            // 1. assign the nonce to a form field and
            // 2. post the form to the payment processing handler
            document.getElementById("card-nonce").value = nonce;
            submitPaymentRequest(null);
            }
        }
    });
    form.build();

    return (
        <div id="form-container">
            <div id="sq-ccbox">
                <form id="nonce-form" noValidate>
                        <div id="sq-card-number"></div>
                        <div className="third">
                            <div id="sq-expiration-date"></div>
                        </div>
                        <div className="third">
                            <div id="sq-cvv"></div>
                        </div>
                        <div className="third">
                            <div id="sq-postal-code"></div>
                        </div>
                    <button id="sq-creditcard" className="button-credit-card" onClick={(event) => onGetCardNonce(event)}>Pay ${ cartSubtotal }</button>
                    <input type="hidden" id="card-nonce" name="nonce"></input>
                </form>
            </div> 
       </div> 
    )
}

export default Square;