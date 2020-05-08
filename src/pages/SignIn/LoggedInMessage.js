import React, {Component} from 'react';

class LoggedInMessage extends Component {
    
    render() {
        return (
            <div className='sign-in-success left'>
                <div className='sign-in-title'>You're logged in!</div>

              {/* can add call to action button here */}
            </div>  
        )
    }
}

export default LoggedInMessage