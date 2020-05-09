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
                        {/* if user is not logged in */}
                        {(!this.props.isAuthenticated) ? ( 
                            <li className='headerLinkItem'> 
                                <NavLink to="/signin" className='headerLink' activeStyle={{color: "red"}} 
                                         onClick={() => this.props.clearAuthenticationErrors()}>Sign In
                                </NavLink>
                            </li>
                        ) : null }
                        {/* if user is not logged in */}
                        {(!this.props.isAuthenticated) ? ( 
                            <li className='headerLinkItem'> 
                                <NavLink to="/register" className='headerLink' activeStyle={{color: "red"}}
                                         onClick={() => this.props.clearAuthenticationErrors()}>Register</NavLink>
                            </li>
                        ) : null }
                        {/* if user is logged in */}
                        {(this.props.isAuthenticated) ? ( 
                            <li className='headerLinkItem'> 
                            <NavLink to="/user_info" className='headerLink' activeStyle={{color: "red"}}>User Info</NavLink>
                        </li>
                        ) : null }
                        {/* if user is logged in */}
                        {(this.props.isAuthenticated) ? ( 
                            <li className='headerLinkItem'> 
                                <Link to="/" className='headerLink' onClick={() => this.props.onLogoutClick('desktop')}>Logout</Link>
                        </li>
                        ) : null }

                    </div> 
                    
                    {/* mobile menu */}

                    {(!this.props.isAuthenticated) ? ( 
                            <div className='dd-login-title'>
                                <div className='dd-login-button'
                                    onClick={this.props.toggleLoginMenu}>
                                </div>
                            </div>
                        ) : (null)}
                          

                        {(this.props.isAuthenticated) ? ( 
                            <div className='dd-login-title'>
                                <div className='dd-login-button-logged-in'
                                    onClick={this.props.toggleLoginMenu}>
                                </div>
                            </div>
                        ) : (null)}
                    <div className='dd-login-menu hide' id='dd-login-menu' >
                        <ul className='login-options hide' id='login-options'>
                                {/* standard links, no login necessary*/}
                                <li className='login-option'>
                                    <Link to="/store" className='headerLink' activeStyle={{color: "red"}}
                                        onClick={() => this.props.closeLoginMenu()}>Store
                                    </Link>
                                </li>
                                <hr></hr>
                                <li className='login-option'>
                                    <Link to="/musings" className='headerLink' activeStyle={{color: "red"}}
                                        onClick={() => this.props.closeLoginMenu()}>Musings
                                    </Link>
                                </li>
                                <hr></hr>
                                {/* login necessary, links */}
                                {(!this.props.isAuthenticated) ? ( 
                                    <li className='login-option'>
                                        <Link to="/signin" className='headerLink' activeStyle={{color: "red"}}
                                            onClick={() => { this.props.closeLoginMenu(); this.props.clearAuthenticationErrors()}}
                                            >Sign In
                                        </Link>
                                    </li>
                                ) : (null)} 
                                <hr></hr>
                                {(!this.props.isAuthenticated) ? ( 
                                    <li className='login-option'>
                                        <Link to="/register" className='headerLink' activeStyle={{color: "red"}}
                                            onClick={() => { this.props.closeLoginMenu(); this.props.clearAuthenticationErrors()}}
                                            >Register
                                        </Link>
                                    </li>
                                ) : (null)}  
                        </ul>


                        {/* user is logged in */}
                        <ul className='user-options hide' id='user-options'>
                            {/* standard links, no login necessary*/}
                            <li className='login-option'>
                                    <Link to="/store" className='headerLink' activeStyle={{color: "red"}}
                                        onClick={() => this.props.closeLoginMenu()}>Store
                                    </Link>
                            </li>
                            <hr></hr>
                            <li className='login-option'>
                                <Link to="/musings" className='headerLink' activeStyle={{color: "red"}}
                                    onClick={() => this.props.closeLoginMenu()}>Musings
                                </Link>
                            </li>
                            <hr></hr>

                            {/* user is logged in, info and links */}
                            {(this.props.isAuthenticated) ? ( 
                                <li className='user-card' 
                                    id='user-card' 
                                   >Logged In As: <br></br><br></br>{this.props.log_email}
                                </li>
                            ) : (null)} 
                            <hr></hr>
                            {(this.props.isAuthenticated) ? ( 
                                <li className='login-option'>
                                    <Link to="/user_info" className='headerLink' activeStyle={{color: "red"}}
                                        onClick={() => this.props.closeLoginMenu()}>User Info
                                    </Link>
                                </li>
                            ) : (null)} 
                            <hr></hr>
                             
                            {(this.props.isAuthenticated) ? ( 
                                <li className='login-option' onClick={() => this.props.onLogoutClick('mobile')}>
                                    <Link to='/'>Logout</Link>
                                </li>

                            ) : (null)}
                        </ul>
                    </div> 
                </div> 
        )
    }
}

export default Header;