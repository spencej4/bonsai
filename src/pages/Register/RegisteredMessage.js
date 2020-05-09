import React, {Component} from 'react';

class RegisteredMessage extends Component {
    
    render() {
        return (
            <div className='register-success'>
                <div className='sign-in-title'>Thanks! You're registered as:</div>
                <div className='sign-in-userID'>{this.props.email}</div>
            </div>
        )
    }
}

export default RegisteredMessage