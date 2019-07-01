import React, { Component } from 'react';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';

class FilterableProductTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData : [
                {
                    tag : 'Sporting Goods',
                    rows : [
                        { name : 'Football', price : 49.99 },
                        { name : 'Baseball', price : 9.99 },
                        { name : 'Basketball',  price : 29.99 }
                    ]
                },
                {
                    tag : 'Electronics',
                    rows : [
                        { name : 'iPod Touch', price : 99.99 },
                        { name : 'iPhone5', price : 399.99 },
                        { name : 'Nexus', price : 199.99 }
                    ]
                }
            ]
        }
    }

    render() {
        return (
            <div style={ {margin : '10px auto', padding : '5px', width : '300px',  border: '1px solid #E5B456'} }>
                <SearchBar />
                <br/>
                <ProductTable tableData={ this.state.tableData }/>
            </div>
        );
    }
}

export default FilterableProductTable;