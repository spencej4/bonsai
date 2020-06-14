import React, { Component } from 'react';
import './App.css';
import { Router } from 'react-router-dom';
import history from './services/history';
import Header from './components/header';
import Routes from './routes';
import '../src/fonts/Cervanttis.ttf';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminLogged: false,
      isRegistered: false,
      loginError: false,
      registerError: false,
      isAuthenticated: false,
      user_ID: null,
      loginMenuVisible: false,
      errorFetchingProducts: false,
      products: [],
      currentProduct_id: null,
      currentProduct: null,
      currentProductPrice: null,
      currentProductDescription: null,
      currentProductImage: null,
      cartQuantity: 0,
      cart: [],
      cartSubtotal: 0,
      cartContains_id_array: [],
      new_payment_success: false,
      new_order_success_confirmation_number: null,
      manageStoreSubmenuActive: false
    }
    this.onAdminLogin = this.onAdminLogin.bind(this);
    this.toggleManageStoreMenu = this.toggleManageStoreMenu.bind(this);
    this.scrollWindow = this.scrollWindow.bind(this);
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
    this.getProducts = this.getProducts.bind(this);
    this.viewProduct = this.viewProduct.bind(this);
    this.addProductToCart = this.addProductToCart.bind(this);
    this.removeProductFromCart = this.removeProductFromCart.bind(this);
    this.calculateCartSubtotal = this.calculateCartSubtotal.bind(this);
    this.onCheckoutClick = this.onCheckoutClick.bind(this);
    this.handleShippingFormChange = this.handleShippingFormChange.bind(this);
    this.onShippingFormSubmit = this.onShippingFormSubmit.bind(this);
    this.onSuccessfullPayment = this.onSuccessfullPayment.bind(this);
    this.handleAddProductChange = this.handleAddProductChange.bind(this);
    this.onAddProductSubmit = this.onAddProductSubmit.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  

  // scroll window to the top
  scrollWindow() {
    window.scrollTo(0, 0);
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
          this.scrollWindow();
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
          if(this.state.log_email === 'admin@admin.com') {
            this.onAdminLogin();
          }
          this.scrollWindow();
          this.setState({
            isAuthenticated: true,
            user_ID: data
          })
          this.setCookie('username', this.state.log_email, 30);
          this.setCookieID('idName', data, 30);
        
      }.bind(this))
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
      loginError: false,
      adminLogged: false
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


  getProducts() {  
      let query = 'products';

      this.setState({
        products: []
      })

      fetch('/api/products/' + query,{
            method: 'GET',
            mode: "cors",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: "same-origin"
        }).then(response => response.json())
        // get returned products from database
        .then(response => {
          let returnedData = response[0].products;
            //iterate through return for products
            for (var index in returnedData) {
              this.setState({
                //push each product to state array
                products:  [...this.state.products, 
                  {
                    _id: returnedData[index]._id,
                    product: returnedData[index].product, 
                    price: returnedData[index].price,
                    description: returnedData[index].description,
                    image: returnedData[index].image
                  }
                ]
              })
            }
        }) 
  }


  viewProduct(_id, product, price, description, image) {
    this.setState({
      currentProduct_id: _id,
      currentProduct: product,
      currentProductPrice: price,
      currentProductDescription: description,
      currentProductImage: image
    })
  }


  // adds product to cart
  addProductToCart(_id, product, price, description, image) {
    this.setState(prevState => ({
      cart: [...prevState.cart, {_id: _id, product: product, price: price, description: description, image: image}],
      cartQuantity: prevState.cartQuantity + 1,
      cartContains_id_array: [...prevState.cartContains_id_array, _id]
    }))
    this.calculateCartSubtotal();
  }

  
  removeProductFromCart(_id) {
    let filtered_cart = this.state.cart.filter(product => product._id !== _id);
    let filtered_cart_id = this.state.cartContains_id_array.filter(product => product !== _id);

    this.setState(prevState => ({
      cart: filtered_cart,
      cartContains_id_array: filtered_cart_id,
      cartQuantity: prevState.cartQuantity - 1
    }))

    this.calculateCartSubtotal();
  }


  calculateCartSubtotal() {

    this.setState({
      cartSubtotal: 0
    },
    () => {for (let item in this.state.cart) {
        let newItemPrice = this.state.cart[item].price;

        this.setState({
          cartSubtotal: this.state.cartSubtotal += newItemPrice
        })
      }}
    );
  }


  onCheckoutClick() {
    // alert('checkout clicked');
  }


  onAdminLogin() {
    this.setState({
      adminLogged: true
    })
  } 


  toggleManageStoreMenu() {
    if (!this.state.manageStoreSubmenuActive) {
      this.setState({
        manageStoreSubmenuActive: true
      })
    } else {
      this.setState({
        manageStoreSubmenuActive: false
      })
    }
  }

  
  //sets state to input value of add product form fields
  handleAddProductChange(event) {
    // event.preventDefault();
    this.setState({ 
      [event.target.name]: event.target.value,
    });
  }


  handleShippingFormChange(event) {
    // event.preventDefault();
    this.setState({ 
     [event.target.name]: event.target.value,
   });
 }


  onShippingFormSubmit(event) {
    event.preventDefault();
    // console.log('shipping form success')
  }

  onSuccessfullPayment() {
    this.setState({
      new_payment_success: true
    })

    // post new order to db
    fetch('/api/add-shipping-information',{
      method: 'POST',
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "same-origin",
      body: JSON.stringify({
        shipping_email: this.state.shipping_email,
        shipping_name_first: this.state.shipping_name_first,
        shipping_name_last: this.state.shipping_name_last,
        shipping_street_address: this.state.shipping_street_address,
        shipping_apt_unit: this.state.shipping_apt_unit,
        shipping_city: this.state.shipping_city,
        shipping_state: this.state.shipping_state,
        shipping_zipcode: this.state.shipping_zipcode,
        cart: this.state.cart
      }) 
    }).then(function(response){
      // could not add shipping info 
      if (response.status !== 200) {
        // alert('problem posting form');
        return response.json();
      } else {
        // successfull shipping info 
        return response.json();
      }
    })
    .then(function(data){
      this.setState({
        new_order_success_confirmation_number: data,
        shipping_email: null,
        shipping_name_first: null,
        shipping_name_last: null,
        shipping_street_address: null,
        shipping_apt_unit: null,
        shipping_city: null,
        shipping_state: null,
        shipping_zipcode: null,
        cart: []
      })
    }.bind(this));
  }


  // admin adds a product to db
  onAddProductSubmit(event) {
    event.preventDefault();

    fetch('/api/add-product',{
      method: 'POST',
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "same-origin",
      body: JSON.stringify({
        new_product_name: this.state.new_product_name,
        new_product_price: this.state.new_product_price,
        new_product_description: this.state.new_product_description,
        new_product_image_url: this.state.new_product_image_url
      }) 
  }).then(function(response){
     // could not register user
     if (response.status !== 200) {
      alert('problem adding new product');
      return response.json();
    }
    // return response.json();
  }).then(function(data){
    alert('Successfully added new product!')
    this.setState({
      new_product_name: null,
      new_product_price: null,
      new_product_description: null,
      new_product_image_url: null
    })
  }.bind(this));
  }

  
  // admin deletes a product
  deleteProduct(event, productID) {
    event.preventDefault();
    event.stopPropagation();

    fetch('/api/delete-product',{
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: productID
          }) 
      }).then(response => {
        // rebuild store
        this.getProducts();
        alert('Product successfully deleted!')
        return response.json();
    });
  }
  

  render() {
    return (
      <Router history={history}>
        <Header 
          adminLogged = {this.state.adminLogged}
          toggleManageStoreMenu = {this.toggleManageStoreMenu}
          isAuthenticated = {this.state.isAuthenticated}
          log_email = {this.state.log_email}
          onLogoutClick = {this.onLogoutClick}
          clearAuthenticationErrors = {this.clearAuthenticationErrors}
          toggleLoginMenu = {this.toggleLoginMenu}
          closeLoginMenu = {this.closeLoginMenu}
          getProducts = {this.getProducts}
          cartQuantity = {this.state.cartQuantity}
          calculateCartSubtotal = {this.calculateCartSubtotal}
          scrollWindow = {this.scrollWindow}
          manageStoreSubmenuActive = {this.state.manageStoreSubmenuActive}
          deleteProduct = {this.deleteProduct}
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
          log_email = {this.state.log_email}
          email = {this.state.email}
          products = {this.state.products}
          cart = {this.state.cart}
          cartQuantity = {this.state.cartQuantity}
          cartSubtotal = {this.state.cartSubtotal}
          calculateCartSubtotal = {this.calculateCartSubtotal}
          currentProduct_id = {this.state.currentProduct_id}
          currentProduct = {this.state.currentProduct}
          currentProductPrice = {this.state.currentProductPrice}
          currentProductDescription = {this.state.currentProductDescription}
          currentProductImage = {this.state.currentProductImage}
          viewProduct = {this.viewProduct}
          history = {history}
          addProductToCart = {this.addProductToCart}
          removeProductFromCart = {this.removeProductFromCart}
          cartContains_id_array = {this.state.cartContains_id_array}
          onCheckoutClick = {this.onCheckoutClick}
          handleShippingFormChange = {this.handleShippingFormChange}
          onShippingFormSubmit = {this.onShippingFormSubmit}
          onSuccessfullPayment = {this.onSuccessfullPayment}
          new_payment_success = {this.state.new_payment_success}
          new_order_success_confirmation_number = {this.state.new_order_success_confirmation_number}
          handleAddProductChange = {this.handleAddProductChange}
          new_product_name = {this.state.new_product_name}
          new_product_price = {this.state.new_product_price}
          new_product_description = {this.state.new_product_description}
          new_product_image_url = {this.state.new_product_image_url}
          onAddProductSubmit = {this.onAddProductSubmit}
          getProducts = {this.getProducts}
          deleteProduct = {this.deleteProduct}
        />
      </Router>
    );
  }
}
export default App;