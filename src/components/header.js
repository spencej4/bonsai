import React, {Component} from 'react';

import { Link, NavLink } from 'react-router-dom';


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
                            <NavLink to="/store" className='headerLink'activeStyle={{color: "red"}}>Store</NavLink>
                        </li>
                        <li className='headerLinkItem'> 
                            <NavLink to="/musings" className='headerLink' activeStyle={{color: "red"}}>Musings</NavLink>
                        </li>
                        <li className='headerLinkItem'> 
                            <NavLink to="/signin" className='headerLink' activeStyle={{color: "red"}}>Sign In</NavLink>
                        </li>
                        <li className='headerLinkItem'> 
                            <NavLink to="/register" className='headerLink' activeStyle={{color: "red"}}>Register</NavLink>
                        </li>
                    </div>  
                </div>
        )
    }
}

export default Header;