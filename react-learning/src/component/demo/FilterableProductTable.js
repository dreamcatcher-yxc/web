import React, { Component } from 'react';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';

const TABLE_DATA = [
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
];

function generateCopiedTableData() {
    return TABLE_DATA.map(item => {
        return {
            tag : item.tag,
            rows : item.rows.map(item2 => {
                let copiedRow = {...item2};
                return copiedRow;  
            })
        }
    });
}

class FilterableProductTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData : generateCopiedTableData(),
            searchValue : ''
        }
    }

    onChange(e) {
        let arr = !!e.target.checked ? [generateCopiedTableData()[0]] : generateCopiedTableData();
        this.setState({ tableData : this.filterData(arr, this.state.searchValue) });
    }

    onSearchChange(e) {
        this.setState({ searchValue : e.target.value }, () => {
            this.setState({ tableData : this.filterData(generateCopiedTableData(), this.state.searchValue) });
        });
    }

    filterData(arr, searchValue) {
        return arr.filter((item, index) => {
            // 分类标题匹配
            if(item.tag.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0) {
                return true;
            }
            
            // 商品列表名称匹配
            if(
                    !!item.rows && 
                    item.rows.some((item2, index2) => {
                        if(item2.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0) {
                            return true;
                        }
                        return false;
                    })
                ) {
                    item.rows = item.rows.filter((item2, index2) => {
                        if(item2.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0) {
                            return true;
                        }
                        return false;
                    });
                    return true;
            }

            return false;
        });
    }

    render() {
        return (
            <div style={ {margin : '10px auto', padding : '5px', width : '300px',  border: '1px solid #E5B456'} }>
                <SearchBar onSearchChange={ this.onSearchChange.bind(this) } onChange={ this.onChange.bind(this) } />
                <br/>
                <ProductTable tableData={ this.state.tableData }/>
            </div>
        );
    }
}

export default FilterableProductTable;