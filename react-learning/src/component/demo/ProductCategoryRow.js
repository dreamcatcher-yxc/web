import React, { Component } from 'react';

class ProductCategoryRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style : {
                fontWeight: 'bold'
            }
        }
    }

    render() {
        return (
            <div>
                <div style={ this.state.style } className="category"> { this.props.name } </div>
            </div>
        );
    }
}

export default ProductCategoryRow;