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
      isAuthenticated: false,
      user_ID: null
    }
    this.handleSignInChange = this.handleSignInChange.bind(this);
    this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.setCookie = this.setCookie.bind(this);
    this.setCookieID = this.setCookieID.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.getCookieID = this.getCookieID.bind(this);
    this.checkCookie = this.checkCookie.bind(this);
  }



  //sets state to input value of sign-in/ register fields
  handleSignInChange(event) {
    event.preventDefault();
    this.setState({ 
      [event.target.name]: event.target.value 
    });
  }


  // registers user
  onRegisterSubmit(event) {
    event.preventDefault();

    // confirms that user typed same password twice
    if (this.state.password !== this.state.password_confirm) {
      alert("The passwords doesn't match")
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



  render() {
    return (
      <Router history={history}>
        <Header />
        <Routes 
          handleSignInChange = {this.handleSignInChange}
          onRegisterSubmit = {this.onRegisterSubmit}
          isRegistered = {this.state.isRegistered}
          onLoginSubmit = {this.onLoginSubmit}
          isAuthenticated = {this.state.isAuthenticated}
          loginError = {this.state.loginError}
        />
      </Router>
    );
  }
}
export default App;