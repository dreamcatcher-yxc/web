import React, { Component } from 'react';
import ProductCategoryRow from './ProductCategoryRow';
import ProductRow from './ProductRow'

class ProductTable extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            style : { 
                display : "inline-block", 
                margin : '10px',
                fontWeight: 'bold'
            }
        };
    }

    render() {
        const categories = this.props.tableData.map((item, index) => {
            const rs = item.rows.map((row, index2) => {
                return <ProductRow key={ index2 } name={ row.name } price={ row.price }/>
            });

            return (
                <div className="body" key={ index }>
                    <div className="category">
                        <ProductCategoryRow name={ item.tag }/>
                    </div>    
                    <div className="items">
                        { rs } 
                    </div>
                </div>
            );
        });

        // console.log(categories);

        return (
            <div>
                <div className="title">
                    <div style={ this.state.style } className="name">Name</div>
                    <div style={ this.state.style } className="price">Price</div>
                </div>
                { categories }
            </div>
        );
    }
}

export default ProductTable;