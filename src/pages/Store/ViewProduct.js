import React, { Component } from 'react';

class ViewProduct extends Component {
    render() {
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
                    <button className = 'add-to-cart-button'>Add To Cart</button>
                </div>
            </div>
        )
    }
}

export default ViewProduct