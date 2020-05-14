import React, { Component } from 'react';

class ViewProduct extends Component {
    render() {
            if (this.props.cartContains_id_array.includes(this.props.currentProduct_id)) {
                return (
                    <div className = 'current-product-container'>
                        <div className = 'current-product-image-container'>
                            <img src={this.props.currentProductImage} 
                                className='current-product-image' alt={this.props.currentProductDescription}> 
                            </img>
                        </div>
                        <div className = 'current-product-info-container'>
                            <div className ='current-product-name'>{this.props.currentProduct}</div>
                            <div className ='current-product-price'>Price: ${this.props.currentProductPrice}</div>
                            <div className ='current-product-description'>About: {this.props.currentProductDescription}</div>
                            <button className = 'remove-from-cart-button'
                                    onClick = {() => this.props.removeProductFromCart(this.props.currentProduct_id)}>Remove From Cart</button>
                        </div>
                    </div>
                )
            } else {
                return (
                        <div className = 'current-product-container'>
                    <div className = 'current-product-image-container'>
                        <img src={this.props.currentProductImage} 
                            className='current-product-image' alt={this.props.currentProductDescription}> 
                        </img>
                    </div>
                    <div className = 'current-product-info-container'>
                        <div className ='current-product-name'>{this.props.currentProduct}</div>
                        <div className ='current-product-price'>Price: ${this.props.currentProductPrice}</div>
                        <div className ='current-product-description'>About: {this.props.currentProductDescription}</div>
                        <button className = 'add-to-cart-button'
                                onClick = {() => this.props.addProductToCart(this.props.currentProduct_id, this.props.currentProduct, this.props.currentProductPrice, this.props.currentProductDescription, this.props.currentProductImage)}>Add To Cart</button>
                    </div>
                </div>
                )
            }
        }
}

export default ViewProduct