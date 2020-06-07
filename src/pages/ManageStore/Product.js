import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import deleteIcon from '../../img/delete.png'; 

class Product extends Component {   
    render() {
        return (
                <div className='product-container-admin'
                    // onClick={() => this.props.viewProduct(this.props._id, this.props.product, this.props.price, this.props.description, this.props.image)}
                >
                    <img src={deleteIcon}
                         className='delete-icon'
                         onClick={(event) => {this.props.deleteProduct(event, this.props._id);}}
                    >
                    </img>
                    <div className = 'product-info'>
                        <div className ='product-name'>{this.props.product}</div>
                        <div className ='product-price'>${this.props.price}</div>
                        {/* <div className ='product-description'>About: {this.props.description}</div> */}
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