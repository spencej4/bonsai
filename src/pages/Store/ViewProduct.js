import React, {Component } from 'react';

class ViewProduct extends Component {
    render() {
        return (
            <div className='temp-testing'>
                <h1>{this.props.currentProduct}</h1>
            </div>
        )
    }
}

export default ViewProduct