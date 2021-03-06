import React, {Component} from 'react';
import { Link, NavLink } from 'react-router-dom';
import cartImage from '../img/cart-icon.png';


class Header extends Component {  
    render() {
        return (
                <div className='header'>
                        <div className='logo'>
                                <Link to='/'>
                                    <h1 className='header-logo'>Bonsai</h1>
                                </Link>
                        </div>

                    <div className='headerLinksContainer'>
                        {/* admin is logged in */}
                        {(this.props.adminLogged) ? ( 
                            <li className='headerLinkItem'> 
                                <Link className='headerLink' 
                                      onClick={() => this.props.toggleManageStoreMenu()}>Manage Store
                                </Link>
                                {(this.props.manageStoreSubmenuActive) ? (
                                    <div id = 'manageStoreSubmenuContainer'>
                                        <Link to='/manage-store/add-product'
                                              onClick = {() => {this.props.toggleManageStoreMenu();}}>
                                            <li className = 'submenuLink'>Add a Product</li>
                                        </Link>
                                        <Link to='/manage-store/delete-product'
                                              onClick = {() => {this.props.toggleManageStoreMenu(); this.props.getProducts();}}>
                                            <li className = 'submenuLink'>Delete a Product</li>
                                        </Link>
                                        <Link to='/manage-store/modify-product'>
                                            <li className = 'submenuLink'>Edit a Product</li>
                                        </Link>
                                    </div>
                                ) : null}
                            </li>
                         ) : null } 
                        <li className='headerLinkItem'> 
                            <NavLink to="/store" className='headerLink' activeclassname="active"
                                     onClick={() => this.props.getProducts()}>Store</NavLink>
                        </li>
                        <li className='headerLinkItem'> 
                            <NavLink to="/musings" className='headerLink' activeclassname="active">Musings</NavLink>
                        </li>
                        {/* if user is not logged in */}
                        {(!this.props.isAuthenticated) ? ( 
                            <li className='headerLinkItem'> 
                                <NavLink to="/signin" className='headerLink' activeclassname="active" 
                                         onClick={() => this.props.clearAuthenticationErrors()}>Sign In
                                </NavLink>
                            </li>
                        ) : null }
                        {/* if user is not logged in */}
                        {(!this.props.isAuthenticated) ? ( 
                            <li className='headerLinkItem'> 
                                <NavLink to="/register" className='headerLink' activeclassname="active"
                                         onClick={() => this.props.clearAuthenticationErrors()}>Register</NavLink>
                            </li>
                        ) : null }
                        {/* if user is logged in */}
                        {(this.props.isAuthenticated) ? ( 
                            <li className='headerLinkItem'> 
                            <NavLink to="/user_info" className='headerLink' activeclassname="active">User Info</NavLink>
                        </li>
                        ) : null }
                        {/* if user is logged in */}
                        {(this.props.isAuthenticated) ? ( 
                        <li className='headerLinkItem'> 
                            <Link to="/" className='headerLink' onClick={() => this.props.onLogoutClick('desktop')}>Logout</Link>
                        </li>
                        ) : null }
                        <li className='headerLinkItem cart-link'> 
                            <NavLink to="/cart" className='headerLink' activeclassname="active"
                                onClick = {() => this.props.calculateCartSubtotal()}>
                                <img className='cart-image' alt='cart icon' src={cartImage}></img>
                                <span className='cart-quantity'>{this.props.cartQuantity}</span>
                            Cart</NavLink>
                        </li>

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
                                    <Link to="/store" className='headerLink' activeclassname="active"
                                        onClick={() => { this.props.closeLoginMenu(); this.props.getProducts(); this.props.scrollWindow() }}>Store
                                    </Link>
                                </li>
                                <hr></hr>
                                <li className='login-option'>
                                    <Link to="/musings" className='headerLink' activeclassname="active"
                                        onClick={() => this.props.closeLoginMenu()}>Musings
                                    </Link>
                                </li>
                                <hr></hr>
                                <li className='login-option'>
                                    <Link to="/cart" className='headerLink' activeclassname="active"
                                        onClick={() => { this.props.closeLoginMenu(); this.props.calculateCartSubtotal(); this.props.scrollWindow() }}>Cart
                                    </Link>
                                </li>
                                <hr></hr>
                                {/* login necessary, links */}
                                {(!this.props.isAuthenticated) ? ( 
                                    <li className='login-option'>
                                        <Link to="/signin" className='headerLink' activeclassname="active"
                                            onClick={() => { this.props.closeLoginMenu(); this.props.clearAuthenticationErrors() }}
                                            >Sign In
                                        </Link>
                                    </li>
                                ) : (null)} 
                                <hr></hr>
                                {(!this.props.isAuthenticated) ? ( 
                                    <li className='login-option'>
                                        <Link to="/register" className='headerLink' activeclassname="active"
                                            onClick={() => { this.props.closeLoginMenu(); this.props.clearAuthenticationErrors() }}
                                            >Register
                                        </Link>
                                    </li>
                                ) : (null)}  
                        </ul>


                        {/* user is logged in */}
                        <ul className='user-options hide' id='user-options'>
                            {/* standard links, no login necessary*/}
                            <li className='login-option'>
                                    <Link to="/store" className='headerLink' activeclassname="active"
                                        onClick={() => this.props.closeLoginMenu()}>Store
                                    </Link>
                            </li>
                            <hr></hr>
                            <li className='login-option'>
                                <Link to="/musings" className='headerLink' activeclassname="active"
                                    onClick={() => this.props.closeLoginMenu()}>Musings
                                </Link>
                            </li>
                            <hr></hr>
                            <li className='login-option'>
                                <Link to="/cart" className='headerLink' activeclassname="active"
                                    onClick={() => { this.props.closeLoginMenu(); this.props.calculateCartSubtotal(); this.props.scrollWindow() }}>Cart
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
                            {/* Admin is logged in */}
                            {(this.props.adminLogged) ? ( 
                                <li className='login-option'> 
                                    <Link to="/manage-store" className='headerLink' activeclassname="active"
                                            onClick={() => this.props.closeLoginMenu()}>Manage Store
                                    </Link>
                                </li>
                            ): null}
                            {(this.props.isAuthenticated) ? ( 
                                <li className='login-option'>
                                    <Link to="/user_info" className='headerLink' activeclassname="active"
                                        onClick={() => this.props.closeLoginMenu()}>User Info
                                    </Link>
                                </li>
                            ) : (null)} 
                            <hr></hr>
                             
                            {(this.props.isAuthenticated) ? ( 
                                <li className='login-option' onClick={() => this.props.onLogoutClick('mobile')}>
                                    <Link to='/' className='headerLink'>Logout</Link>
                                </li>

                            ) : (null)}
                        </ul>
                    </div> 
                </div> 
        )
    }
}

export default Header;