import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class ManageStore extends Component {
    state = {
        redirect: false,
        caller: null
      }


      setRedirect = (caller) => {
        if (caller === 'add'){
            this.setState({
                caller: 'add'
            })
        }else if (caller === 'delete') {
            this.setState({
                caller: 'delete'
            })
        }else if (caller === 'modify') {
            this.setState({
                caller: 'modify'
            })
        }
        this.setState({
          redirect: true
        })
      }


      renderRedirect = (caller) => {
        if (this.state.redirect) {
            if (this.state.caller === 'add'){
                return <Redirect to={{
                            pathname: '/manage-store/add-product',
                        }}/>
            } else if (this.state.caller === 'delete') {
                return <Redirect to={{
                            pathname: '/manage-store/delete-product',
                }}/>
            } else if (this.state.caller === 'modify') {
                return <Redirect to={{
                            pathname: '/manage-store/modify-product',
                }}/>
            }
        }
      }
  render() {
    return (
        <div className='manage-store-container'>
          {this.renderRedirect()}
          <ul className = 'manage-list'>
                <li className = 'manage-link'>
                    <button className = 'manage-button'
                            onClick = {() => {this.setRedirect("add");}}>Add Product
                    </button>
                </li>
                <li className = 'manage-link'>
                    <button className = 'manage-button'
                            onClick = {() => {this.setRedirect("delete");}}>Delete Product
                    </button>
                </li>
                <li className = 'manage-link'>
                    <button className = 'manage-button'
                            onClick = {() => {this.setRedirect("modify");}}>Modify Product
                    </button>
                </li>
            </ul>
        </div>
    )
  }
}

export default ManageStore