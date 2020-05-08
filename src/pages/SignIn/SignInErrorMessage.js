import React, {Component} from 'react';

class SignInErrorMessage extends Component {
    
    render() {
        return (
            <div className='form-error'>
                <h1 className='error'>Unable to Authenticate <br>
                
                </br>Please enter valid Email and Password</h1>
            </div>
        )
    }
}

export default SignInErrorMessage;