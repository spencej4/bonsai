import React, { Component, Link } from 'react';


class Product extends Component {
    render() {
        return (
                <div className='product-container' style={{"display": "block"}}>
                    <div className = 'product-info'>
                        <div className ='product-name'>{this.props.product}</div>
                        <div className ='product-price'>Price: ${this.props.price}</div>
                        <div className ='product-description'>About: {this.props.description}</div>
                    </div>
                    <div className = 'product-image-container'>
                        <img src={this.props.image} 
                            className='product-image' alt={this.props.description}></img>
                    </div>
                </div>
        )
    }  
}

export default Product