import React, { Component } from 'react';
import './App.css';
import { Router } from 'react-router-dom';
import history from './services/history';
import Header from './components/header';
import Routes from './routes';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegistered: false,
      loginError: false,
      registerError: false,
      isAuthenticated: false,
      user_ID: null,
      loginMenuVisible: false
    }
    this.handleSignInChange = this.handleSignInChange.bind(this);
    this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.clearAuthenticationErrors = this.clearAuthenticationErrors.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.setCookie = this.setCookie.bind(this);
    this.setCookieID = this.setCookieID.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.getCookieID = this.getCookieID.bind(this);
    this.checkCookie = this.checkCookie.bind(this);
    this.toggleLoginMenu = this.toggleLoginMenu.bind(this);
    this.closeLoginMenu = this.closeLoginMenu.bind(this);
  }



  //sets state to input value of sign-in/ register fields
  handleSignInChange(event) {
    event.preventDefault();
    this.setState({ 
      [event.target.name]: event.target.value,
      loginError: false,
      registerError: false,
    });
  }


  // registers user
  onRegisterSubmit(event) {
    event.preventDefault();

    // confirms that user typed same password twice
    if (this.state.password !== this.state.password_confirm) {
      this.setState({
        registerError: true
      })
    } else {
        fetch('/api/register',{
              method: 'POST',
              mode: "cors",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                password_confirm: this.state.password_confirm,
                content: []
              }) 
        }).then(function(response){
          // could not register user
          if (response.status !== 200) {
            this.setState({
              // for alerting user of authentiation issue
              registerError: true
            })
          }
          return response.json();
        }).then(function(data){
          this.setState({ 
            isRegistered: true 
          });
        }.bind(this));
    }
  }


  // logs in a user
  onLoginSubmit(event) {
    event.preventDefault();
    // this.scrollWindow();

    event.preventDefault();
    fetch('/api/login',{
          method: 'POST',
          mode: "cors",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: "same-origin",
          body: JSON.stringify({
            email: this.state.log_email,
            password: this.state.log_password
          }) 
      }).then(function(response){
        // could not authenticate user
        if (response.status !== 200) {
          this.setState({
            // for alerting user of authentiation issue
            loginError: true
          })
        }
        return response.json();
      }.bind(this))
      .then(function(data){
          this.setState({
            isAuthenticated: true,
            user_ID: data
          })
          this.setCookie('username', this.state.log_email, 30);
          this.setCookieID('idName', data, 30);
        
      }.bind(this));

      // this.createUserImageIDArray();
  }


  // logs user out
  onLogoutClick(caller) {
    // sets current cookie to expired
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "idName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    this.setState({
      isAuthenticated: false,
      log_email: '',
      user_ID: '', 
      loginError: false
    }) 
    if (caller === 'mobile') {
      this.toggleLoginMenu();
    }
  }

  // clears sign in and register errors from state 
  clearAuthenticationErrors() {
    this.setState({
      loginError: false,
      registerError: false
    })
  }

  
  // create a user cookie
  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }


  setCookieID(idName, idValue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = idName + "=" + idValue + ";" + expires + ";path-/";
  }


  // retrieve username from cookie
  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


  // retrieve userID from cookie
  getCookieID(idName){
    var id = idName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(id) === 0) {
        return c.substring(id.length, c.length);
      }
    }
    return "";
  }


  // verify a cookies
  checkCookie() {
    var user= this.getCookie("username");
    var id = this.getCookieID('idName');

    if (user !== "") {
      // updates state that user is logged in and set log_email value to user
      this.setState({
        isAuthenticated: true,
        log_email: user,
      })
      // updates state with mongo user id
    } if (id !== "") {
      this.setState({
        user_ID: id
      })
    } else {
      // user is not logged in, no cookie found
    }
  }

  // toggles the menu on click
  toggleLoginMenu() {
    let loginMenu = document.getElementById('dd-login-menu');
    let loginOptions = document.getElementById('login-options');
    let userOptions = document.getElementById('user-options')
    // user not authenticated
    if (!this.state.isAuthenticated) {
      if (this.state.loginMenuVisible === false) {
          this.setState({
              loginMenuVisible: true
          })
          loginMenu.classList.remove('hide');
          loginMenu.classList.add('show');
          loginOptions.classList.remove('hide');
          loginOptions.classList.add('show');
      }
      else if (this.state.loginMenuVisible === true) {
          this.setState({
              loginMenuVisible: false
          })
          loginMenu.classList.remove('show');
          loginMenu.classList.add('hide');
          loginOptions.classList.remove('show');
          loginOptions.classList.add('hide');
      } 
  // user authenticated
  }else if (this.state.isAuthenticated) {
      if (this.state.loginMenuVisible && this.state.showUserCard) {
        this.setState({
          loginMenuVisible: false
        })
        loginMenu.classList.add('hide');
        loginMenu.classList.remove('show');
        userOptions.classList.remove('show');;
        userOptions.classList.add('hide');
      }
      else if (this.state.loginMenuVisible === false) {
        this.setState({
            loginMenuVisible: true
        })
        loginMenu.classList.remove('hide');
        loginMenu.classList.add('show');
        userOptions.classList.remove('hide');
        userOptions.classList.add('show');
    }
    else if (this.state.loginMenuVisible === true) {
        this.setState({
            loginMenuVisible: false
        })
        loginMenu.classList.remove('show');
        loginMenu.classList.add('hide');
        userOptions.classList.remove('show');
        userOptions.classList.add('hide');
    } 
  }
  }

  // closes menu when user mouses out
  closeLoginMenu() {
    let loginMenu = document.getElementById('dd-login-menu');
    let userOptions = document.getElementById('user-options')

    this.setState({
      loginMenuVisible: false
    })
    loginMenu.classList.add('hide');
    loginMenu.classList.remove('show');
    userOptions.classList.add('hide');
    userOptions.classList.remove('show');;
  }



  render() {
    return (
      <Router history={history}>
        <Header 
          isAuthenticated = {this.state.isAuthenticated}
          log_email = {this.state.log_email}
          onLogoutClick = {this.onLogoutClick}
          clearAuthenticationErrors = {this.clearAuthenticationErrors}
          toggleLoginMenu = {this.toggleLoginMenu}
          closeLoginMenu = {this.closeLoginMenu}

        />
        <Routes 
          handleSignInChange = {this.handleSignInChange}
          onRegisterSubmit = {this.onRegisterSubmit}
          registerError = {this.state.registerError}
          isRegistered = {this.state.isRegistered}
          onLoginSubmit = {this.onLoginSubmit}
          loginError = {this.state.loginError}
          isAuthenticated = {this.state.isAuthenticated}
          clearAuthenticationErrors = {this.clearAuthenticationErrors}
        />
      </Router>
    );
  }
}
export default App;