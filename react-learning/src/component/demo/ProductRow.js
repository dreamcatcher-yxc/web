import React, { Component } from 'react';

class ProductRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            style : { display : "inline-block", margin : '10px' }
        };
    }

    render() {
        return (
            <div>
                <div style={ this.state.style } className="col-of-name">{ this.props.name }</div>
                <div style={ this.state.style } className="col-of-price">{ '$' + this.props.price }</div>
            </div>
        );
    }
}

export default ProductRow;