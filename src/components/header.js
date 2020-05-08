import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class Header extends Component {  
    render() {
        return (
                <div className='header'>
                    <div>
                        <div className='logo'>
                            <li className='logoFont'><Link to='/'>Bonsai</Link></li>
                        </div>
                    </div>

                    <div className='headerLinksContainer'>
                        <li className='headerLinkItem'> 
                            <Link to="/signin" className='headerLink'>Sign In</Link>
                        </li>
                        <li className='headerLinkItem'> 
                            <Link to="/register" className='headerLink'>Register</Link>
                        </li>
                    </div>  
                </div>
        )
    }
}

export default Header;