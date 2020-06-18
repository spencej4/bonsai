import React, {Component} from 'react';

class Footer extends Component {  
    render() {
        return (
                <div className='footer'>
                    <div className='footer-container'>
                        <div className='footer-logo-container'>
                            <p className='footer-logo'>Bonsai</p>
                        </div>
                        <p className='copyright-symbol'>©</p><p className='footer-text'>Copyright 2020 Mendiola Farms. All rights reserved.</p>
                    </div>
                </div> 
        )
    }
}

export default Footer;