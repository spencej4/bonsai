import React, {Component} from 'react';

class RegisterErrorMessage extends Component {
    
    render() {
        return (
            <div className='register-error'>
                <h1 className='error'>Unable to Register <br>
                
                </br>Please enter valid Email and Matching Passwords</h1>
            </div>
        )
    }
}

export default RegisterErrorMessage;