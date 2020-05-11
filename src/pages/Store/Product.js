import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Product extends Component {   
    render() {
        return (
            <Link to={`/store/view_product/` + this.props.product}>
                <div className='product-container'
                    onClick={() => this.props.viewProduct(this.props.product, this.props.price, this.props.description, this.props.image)}>
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
            </Link>
        )
    }  
}


export default Product