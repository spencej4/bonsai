import React, {Component} from 'react';

class LoggedInMessage extends Component {
    
    render() {
        return (
            <div className='sign-in-success'>
                <div className='sign-in-title'>You're logged in as:</div>
                <div className='sign-in-userID'>{this.props.log_email}</div>
                {/* can add call to action button here */}
            </div>  
        )
    }
}

export default LoggedInMessage